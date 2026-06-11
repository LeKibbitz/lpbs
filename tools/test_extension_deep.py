#!/usr/bin/env python3
"""Deep E2E test following the real blind-user path: listen to the
extension's announcements (via [PBA] console logs), press L for the numbered
list, and press the number that was announced. Plays through lesson 1
(3 quizzes + fill-in-the-blanks) and into lesson 2's rule popup."""
import re
import sys
import pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXT = ROOT / "extension"
URL = "https://view.genially.com/697f6a08ef130744478db916"

logs = []
checks = []


def check(name, ok, detail=""):
    checks.append((name, ok))
    print(("PASS " if ok else "FAIL ") + name + (" - " + str(detail)[:200] if detail else ""))


def spoken_since(n):
    return [l for l in logs[n:] if "speak:" in l]


def number_for(page, label_fragment, wait=2500):
    """Press L, parse 'N. <label>' from the spoken element list, return N."""
    n0 = len(logs)
    page.keyboard.press("l")
    page.wait_for_timeout(wait)
    lists = [l for l in spoken_since(n0) if "Éléments de la page" in l]
    listing = lists[-1] if lists else " ".join(spoken_since(n0))
    matches = re.findall(r"(\d)\.\s*([^.]+)\.", listing)
    exact = [n for n, lab in matches if lab.strip().lower() == label_fragment.lower()]
    loose = [n for n, lab in matches if label_fragment.lower() in lab.lower()]
    hits = exact or loose
    return (hits[0] if hits else None), listing


def choose(page, label_fragment, settle=6000):
    num, listing = number_for(page, label_fragment)
    if num is None:
        return False, listing
    n0 = len(logs)
    page.keyboard.press(num)
    page.wait_for_timeout(settle)
    return True, " ".join(spoken_since(n0))


def main():
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir="/tmp/pba-test-profile-deep",
            headless=False,
            args=[f"--disable-extensions-except={EXT}", f"--load-extension={EXT}", "--mute-audio"],
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.on("console", lambda m: logs.append(m.text) if "[PBA]" in m.text else None)
        page.goto(URL, wait_until="domcontentloaded")
        page.wait_for_timeout(6000)
        page.keyboard.press("h")          # first gesture starts the audio
        page.wait_for_timeout(2000)

        ok, out = choose(page, "Démarrer", settle=4500)
        check("start-game", ok and "grimoire des cartes" in out.lower(), out[-150:])

        ok, out = choose(page, "Continuer", settle=4500)
        check("open-grimoire", ok and "Forêt des Premiers Pas" in out, out[-150:])

        ok, out = choose(page, "leçon 1", settle=5000)
        check("start-lesson1", ok and "40 cartes" in out, out[-150:])

        # Q1: 4 familles
        ok, out = choose(page, "4 familles")
        check("q1-correct", ok and ("Bravo" in out or "plus faible" in out), out[-180:])

        # Q2: le 10
        ok, out = choose(page, "le 10")
        check("q2-correct", ok and ("Bravo" in out or "tapis de jeu" in out), out[-180:])

        # Q3: Sud
        ok, out = choose(page, "Sud")
        check("q3-correct", ok and ("Bravo" in out or "texte à trous" in out), out[-180:])

        # 1.4 fill-in-the-blanks: place the six words in correct order
        placed_all = True
        for word in ("40", "10", "équipe", "partenaire", "Est", "Ouest"):
            ok, out = choose(page, word, settle=1800)
            if not ok:
                placed_all = False
                check(f"word-{word}", False, out[-200:])
                break
        check("blanks-placed", placed_all)

        n0 = len(logs)
        page.keyboard.press("v")
        page.wait_for_timeout(8000)
        out = " ".join(spoken_since(n0))
        check("blanks-submit", "Bravo" in out or "Victoire" in out, out[-200:])

        # CORRECT 1 -> MENU 2 -> 2.1
        ok, out = choose(page, "Continuer", settle=4500)
        check("to-menu2", ok and "Grotte des Jeux Secrets" in out, out[-150:])

        ok, out = choose(page, "leçon 2", settle=5000)
        check("start-lesson2", ok and "table de jeu" in out, out[-150:])

        # 2.1 is a drag-and-drop: pick a green card (drag item) -> auto-drop on
        # the single target -> VERIFICATION -> rule popup
        num, listing = number_for(page, "vert")
        check("dnd-card-labeled", num is not None and "vert" in listing, listing[-260:])
        if num:
            n0 = len(logs)
            page.keyboard.press(num)
            page.wait_for_timeout(5500)
            out = " ".join(spoken_since(n0))
            check("dnd-dropped", "posé" in out.lower(), out[-180:])

            n0 = len(logs)
            page.keyboard.press("v")   # VERIFICATION
            page.wait_for_timeout(6000)
            out = " ".join(spoken_since(n0))
            low = out.lower()
            check("rule1-popup", "règle" in low or "bravo" in low or "couleur demandée" in low,
                  out[-260:])

        ctx.close()
        fails = [c for c in checks if not c[1]]
        print(f"\n{len(checks) - len(fails)}/{len(checks)} checks passed")
        sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
