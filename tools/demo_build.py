#!/usr/bin/env python3
"""Assemble the YouTube demo videos from a tools/demo_capture.py run.

For each curated scene, the narration is rebuilt from the extension's own
pre-generated MP3s (greedy longest-match of the spoken text against the
audio map, 300ms breath between segments — same pacing as the extension).
Unmatched chunks fall back to edge-tts with the game's voice. Title and end
cards are HTML rendered headless. Each scene becomes a still with a gentle
zoom + caption, all concatenated to 1080p30 H.264/AAC.

Usage: uv run --with playwright,edge-tts python3 tools/demo_build.py ep1|ep2
"""
import json
import pathlib
import re
import struct
import subprocess
import sys
import wave

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO_DIR = ROOT / "extension" / "audio"
SR = 24000  # edge-tts sample rate
FPS = 30

GAMES = {
    "ep1": {
        "gid": "697f6a08ef130744478db916",
        "voice": "fr-FR-DeniseNeural",
        "episode": "Épisode 1",
        "title": "Luna et le grimoire des cartes",
        "out": "petit-bridge-audio-demo-ep1.mp4",
        "intro": ("Petit Bridge Audio. Une extension Chrome gratuite qui raconte les jeux "
                  "Petit Bridge de la Fédération Française de Bridge aux enfants qui ne "
                  "voient pas l'écran. Démonstration sur l'épisode 1 : Luna et le grimoire "
                  "des cartes. Tout ce que vous entendez ensuite, c'est la voix de l'extension."),
        "outro": ("Petit Bridge Audio est gratuit et open source. "
                  "Le lien d'installation est dans la description. À vous de jouer !"),
        "scenes": [
            ("scene_03", "Au lancement, l'extension se présente et décrit la page"),
            ("scene_04", "Touche 1 → activer le bouton « Démarrer »"),
            ("scene_05", "Chaque nouvelle page est décrite automatiquement"),
            ("scene_06", "Touche 1 → continuer"),
            ("scene_08", "Touche D → audiodescription du décor"),
            ("scene_09", "Touche 1 → commencer la leçon"),
            ("scene_10", "La question et les réponses sont lues, numérotées"),
            ("scene_11", "Touche 1 → répondre « 4 familles »"),
            ("scene_12", "Feedback immédiat"),
        ],
    },
    "ep2": {
        "gid": "6999b0b9d1e83ea5a328b462",
        "voice": "fr-FR-HenriNeural",
        "episode": "Épisode 2",
        "title": "Mission BridgeBot",
        "out": "petit-bridge-audio-demo-ep2.mp4",
        "intro": ("Petit Bridge Audio. Une extension Chrome gratuite qui raconte les jeux "
                  "Petit Bridge de la Fédération Française de Bridge aux enfants qui ne "
                  "voient pas l'écran. Démonstration sur l'épisode 2 : Mission BridgeBot. "
                  "Tout ce que vous entendez ensuite, c'est la voix de l'extension."),
        "outro": ("Petit Bridge Audio est gratuit et open source. "
                  "Le lien d'installation est dans la description. À vous de jouer !"),
        "scenes": [
            ("scene_01", "Au lancement, l'extension se présente et décrit la page"),
            ("scene_03", "Touche 1 → démarrer la mission"),
            ("scene_04", "Le briefing de mission est lu intégralement"),
            ("scene_07", "Touche 1 → page suivante"),
            ("scene_08", "Question et réponses lues, numérotées"),
            ("scene_09", "Touche 2 → répondre « 4 couleurs »"),
            ("scene_10", "Feedback immédiat"),
            ("scene_11", "Question suivante, décrite à son tour"),
            ("scene_12", "Touche 1 → répondre « l'As »"),
            ("scene_13", "Et la mission continue…"),
        ],
    },
}

TITLE_HTML = """<!doctype html><meta charset=utf-8><body style="margin:0">
<div style="width:1920px;height:1080px;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:34px;font-family:-apple-system,Helvetica,sans-serif;color:#fff;
  background:linear-gradient(135deg,#160f2e 0%,#3b2667 55%,#0e2a4a 100%);text-align:center">
 <div style="font-size:120px">🎧</div>
 <div style="font-size:96px;font-weight:800;letter-spacing:-1px">Petit Bridge Audio</div>
 <div style="font-size:42px;opacity:.85;max-width:1250px;line-height:1.4">L'extension Chrome
  qui raconte les jeux Petit Bridge aux enfants déficients visuels</div>
 <div style="font-size:38px;background:rgba(255,255,255,.14);padding:18px 44px;
  border-radius:999px">Démo — {episode} · {title}</div>
 <div style="font-size:26px;opacity:.55;position:absolute;bottom:46px">Extension open source
  · non affiliée à la FFB · jeu « Petit Bridge » sur Genially</div>
</div>"""

END_HTML = """<!doctype html><meta charset=utf-8><body style="margin:0">
<div style="width:1920px;height:1080px;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:38px;font-family:-apple-system,Helvetica,sans-serif;color:#fff;
  background:linear-gradient(135deg,#0e2a4a 0%,#3b2667 55%,#160f2e 100%);text-align:center">
 <div style="font-size:72px;font-weight:800">Installez l'extension</div>
 <div style="font-size:52px;font-family:Menlo,monospace;background:rgba(255,255,255,.12);
  padding:20px 56px;border-radius:18px">github.com/LeKibbitz/lpbs</div>
 <div style="font-size:34px;opacity:.85;line-height:1.7;max-width:1400px">
  H aide · R répéter · L lister les boutons · 1-9 activer · Q question ·
  D décor · C poser une question à la voix · T English</div>
 <div style="font-size:40px;font-weight:600">Gratuit · Open source · Guide audio inclus</div>
</div>"""


def sh(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, **kw)
    if r.returncode != 0:
        raise RuntimeError(f"{cmd[0]} failed:\n{r.stderr.decode()[-1500:]}")
    return r.stdout


def load_audio_map(gid):
    raw = (ROOT / "extension" / "audio-map.js").read_text()
    obj = json.loads(raw[raw.index("=") + 1:].strip().rstrip(";"))
    return {k.split("|", 1)[1]: v for k, v in obj[gid].items() if k.startswith("fr|")}


def match_segments(text, keymap, keys_desc):
    """Greedy longest-match of the spoken text against audio-map keys."""
    parts, pos, n = [], 0, len(text)
    while pos < n:
        hit = None
        for k in keys_desc:
            if text.startswith(k, pos):
                j = pos + len(k)
                while j < n and text[j] == ".":
                    j += 1
                if j >= n or text[j] == " ":
                    hit = (k, j)
                    break
        if hit:
            parts.append(("file", keymap[hit[0]]))
            pos = hit[1]
        else:
            m = re.search(r"[.!?](\s|$)", text[pos:])
            end = pos + m.end() if m else n
            parts.append(("tts", text[pos:end].strip()))
            pos = end
        while pos < n and text[pos] == " ":
            pos += 1
    return parts


def decode_pcm(path):
    return sh(["ffmpeg", "-v", "error", "-i", str(path),
               "-f", "s16le", "-ar", str(SR), "-ac", "1", "-"])


def tts(text, voice, path):
    if not path.exists():
        sh(["uvx", "edge-tts", "--voice", voice, "--text", text,
            "--write-media", str(path)])
    return path


def write_wav(path, pcm):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm)


def silence(ms):
    return b"\x00" * (2 * SR * ms // 1000)


def build_scene_audio(parts, voice, work, tag):
    pcm = silence(300)
    for i, (kind, val) in enumerate(parts):
        if kind == "file":
            pcm += decode_pcm(AUDIO_DIR / val)
        else:
            print(f"   tts fallback: {val[:80]!r}")
            pcm += decode_pcm(tts(val, voice, work / f"tts_{tag}_{i}.mp3"))
        pcm += silence(300)
    pcm += silence(500)
    path = work / f"audio_{tag}.wav"
    write_wav(path, pcm)
    return path, len(pcm) / (2 * SR)


CAPTION_HTML = """<!doctype html><meta charset=utf-8>
<body style="margin:0;background:transparent">
<div style="width:1920px;height:1080px;display:flex;align-items:flex-end;
  justify-content:center;font-family:-apple-system,Helvetica,sans-serif">
 <div style="margin-bottom:64px;background:rgba(0,0,0,.62);color:#fff;font-size:40px;
  padding:16px 38px;border-radius:14px;max-width:1500px;text-align:center">{caption}</div>
</div>"""


def render_cards(cfg, work):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={"width": 1920, "height": 1080})
        for name, html in (("card_title", TITLE_HTML.format(**cfg)), ("card_end", END_HTML)):
            page.set_content(html)
            page.wait_for_timeout(400)
            page.screenshot(path=str(work / f"{name}.png"))
        for scene, caption in cfg["scenes"]:
            page.set_content(CAPTION_HTML.format(caption=caption))
            page.wait_for_timeout(150)
            page.screenshot(path=str(work / f"cap_{scene}.png"), omit_background=True)
        b.close()


def encode_part(img, wav, dur, out, cap_png=None, zoom=True):
    frames = max(int(dur * FPS), FPS)
    vf = ("scale=3840:2160:force_original_aspect_ratio=decrease,"
          "pad=3840:2160:(ow-iw)/2:(oh-ih)/2,"
          f"zoompan=z='1+{0.08 if zoom else 0}*on/{frames}':d={frames}"
          ":x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30")
    inputs = ["-i", str(img), "-i", str(wav)]
    if cap_png:
        inputs += ["-i", str(cap_png)]
        fc = f"[0:v]{vf}[z];[z][2:v]overlay=0:0,format=yuv420p[v]"
    else:
        fc = f"[0:v]{vf},format=yuv420p[v]"
    sh(["ffmpeg", "-y", "-v", "error", *inputs,
        "-filter_complex", fc, "-map", "[v]", "-map", "1:a",
        "-c:v", "libx264", "-qp", "0", "-preset", "ultrafast",
        "-c:a", "pcm_s16le", "-t", f"{dur:.3f}", "-r", str(FPS), str(out)])


def main():
    game = sys.argv[1] if len(sys.argv) > 1 else "ep1"
    cfg = GAMES[game]
    work = ROOT / ".tmp" / "demo" / game
    scenes = {s["png"].split(".")[0]: s for s in
              json.load(open(work / "scenes.json")) if s.get("png")}
    keymap = load_audio_map(cfg["gid"])
    keys_desc = sorted(keymap, key=len, reverse=True)

    render_cards(cfg, work)

    parts = []
    wav, dur = build_scene_audio([("tts", cfg["intro"])], cfg["voice"], work, "intro")
    parts.append((work / "card_title.png", wav, dur + 0.5, None, False))

    n_tts = 0
    for name, _caption in cfg["scenes"]:
        text = scenes[name]["text"]
        segs = match_segments(text, keymap, keys_desc)
        n_tts += sum(1 for k, _ in segs if k == "tts")
        wav, dur = build_scene_audio(segs, cfg["voice"], work, name)
        parts.append((work / f"{name}.png", wav, dur, work / f"cap_{name}.png", True))
        print(f" {name}: {dur:5.1f}s  {len(segs)} segments")

    wav, dur = build_scene_audio([("tts", cfg["outro"])], cfg["voice"], work, "outro")
    parts.append((work / "card_end.png", wav, dur + 2.0, None, False))

    mkvs = []
    for i, (img, wav, dur, caption, zoom) in enumerate(parts):
        out = work / f"part_{i:02d}.mkv"
        encode_part(img, wav, dur, out, caption, zoom)
        mkvs.append(out)

    out_dir = ROOT / "videos"
    out_dir.mkdir(exist_ok=True)
    final = out_dir / cfg["out"]
    inputs = []
    for m in mkvs:
        inputs += ["-i", str(m)]
    fc = "".join(f"[{i}:v][{i}:a]" for i in range(len(mkvs)))
    fc += (f"concat=n={len(mkvs)}:v=1:a=1[v][a0];"
           "[a0]loudnorm=I=-16:TP=-1.5:LRA=11[a]")
    sh(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", fc,
        "-map", "[v]", "-map", "[a]",
        "-c:v", "libx264", "-crf", "19", "-preset", "medium", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "160k", "-ar", "44100", "-ac", "2",
        "-movflags", "+faststart", str(final)])

    total = sum(p[2] for p in parts)
    print(f"\n{final}  ({total/60:.1f} min, {n_tts} tts fallbacks)")


if __name__ == "__main__":
    main()
