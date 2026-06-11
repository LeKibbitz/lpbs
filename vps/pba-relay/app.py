"""PBA relay - public endpoint for the Petit Bridge Audio Guide extension.

Holds the Anthropic API key server-side so the extension works for everyone
without any key. Abuse is bounded by: a fixed child-tutor system prompt,
small max_tokens, per-IP rate limiting and a global daily cap.
"""
import collections
import datetime
import os
import time

import httpx
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
MODEL = os.environ.get("PBA_MODEL", "claude-haiku-4-5-20251001")
PER_IP_PER_MIN = int(os.environ.get("PBA_IP_RPM", "10"))
DAILY_CAP = int(os.environ.get("PBA_DAILY_CAP", "2000"))

RULES = """Petit Bridge ("Luna et le grimoire des cartes", Fédération Française de Bridge) : jeu de cartes pédagogique pour enfants.
- 40 cartes, 4 familles de couleurs (bleu, vert, jaune, rouge), valeurs de 1 à 10 ; le 10 est la carte la plus forte. Chaque carte porte un animal ou un objet (exemple : le 6 vert est un paquebot).
- 4 joueurs assis Nord, Sud, Est, Ouest autour d'un tapis. On joue 2 contre 2 : Nord avec Sud, Est avec Ouest ; les partenaires se font face. Chaque joueur reçoit 10 cartes.
- Une levée (un pli) = 4 cartes, une par joueur, posées au centre. Il faut jouer la couleur demandée si on en a ; sinon on défausse une autre couleur. La carte la plus forte de la couleur demandée gagne la levée, et celui qui gagne rejoue en premier.
- Stratégie de base : ne pas gaspiller ses cartes fortes, observer les cartes jouées, jouer en équipe avec son partenaire.
- Dans le jeu Genially, l'enfant aide la magicienne Luna à réussir 4 leçons (forêt, grotte, salle des duos, bibliothèque) en répondant à des questions pour gagner des potions magiques."""

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

ip_hits: dict = collections.defaultdict(collections.deque)
day = {"date": None, "count": 0}


def rate_limited(ip: str) -> str | None:
    today = datetime.date.today().isoformat()
    if day["date"] != today:
        day["date"], day["count"] = today, 0
        ip_hits.clear()
    if day["count"] >= DAILY_CAP:
        return "daily-cap"
    now = time.monotonic()
    q = ip_hits[ip]
    while q and now - q[0] > 60:
        q.popleft()
    if len(q) >= PER_IP_PER_MIN:
        return "too-fast"
    q.append(now)
    day["count"] += 1
    return None


@app.get("/healthz")
def healthz():
    return {"ok": True, "today": day["count"]}


@app.post("/ask")
async def ask(req: Request):
    ip = req.headers.get("x-real-ip") or (req.client.host if req.client else "?")
    limited = rate_limited(ip)
    if limited:
        return JSONResponse({"ok": False, "error": limited}, status_code=429)
    try:
        body = await req.json()
    except Exception:
        return JSONResponse({"ok": False, "error": "bad-json"}, status_code=400)
    question = str(body.get("question", ""))[:500].strip()
    context = str(body.get("context", ""))[:2500]
    lang = "English" if body.get("lang") == "en" else "French"
    if not question:
        return JSONResponse({"ok": False, "error": "no-question"}, status_code=400)

    system = (
        "You are the friendly spoken companion of a blind child who is playing "
        "the educational card game Petit Bridge in a web game. Answer in "
        f"{lang}, in 1 to 3 short, warm, simple sentences meant to be read "
        "aloud by a speech synthesizer to a child. No formatting, no lists, "
        "no emojis. You may guide toward the answer of the current exercise, "
        "and give it if the child asks for it. Politely refuse subjects "
        "unrelated to the game or to card games.\n\n"
        f"Game rules:\n{RULES}\n\nCurrent page context:\n{context or '(unknown)'}"
    )
    async with httpx.AsyncClient(timeout=25) as client:
        r = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            json={
                "model": MODEL,
                "max_tokens": 300,
                "system": system,
                "messages": [{"role": "user", "content": question}],
            },
        )
    if r.status_code != 200:
        return JSONResponse({"ok": False, "error": f"api-{r.status_code}"}, status_code=502)
    data = r.json()
    text = " ".join(b["text"] for b in data.get("content", []) if b.get("type") == "text").strip()
    return {"ok": True, "text": text}
