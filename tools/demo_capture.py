#!/usr/bin/env python3
"""Capture a scripted demo session of the extension for the YouTube videos.

Loads the unpacked extension in headed Chromium, plays a fixed scenario, and
records (spoken text, screenshot) pairs: every time the guide enqueues speech
([PBA] speak: console log), a screenshot is taken ~0.9s later so the visual
state matches the narration. Output: .tmp/demo/<game>/scene_*.png + scenes.json.

The narration audio is rebuilt offline by tools/demo_build.py from the
extension's own MP3s, so capture can run faster than real-time listening.

Usage: uv run --with playwright python3 tools/demo_capture.py ep1|ep2
"""
import json
import pathlib
import shutil
import sys
import time

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXT = ROOT / "extension"

GAMES = {
    "ep1": {
        "url": "https://view.genially.com/697f6a08ef130744478db916",
        "steps": [
            "key:r",                 # first gesture -> welcome + cover announce
            "key:1",                 # Démarrer -> page 2
            "key:1",                 # open the grimoire -> lessons menu
            "key:d",                 # scenery audiodescription
            "key:1",                 # lesson 1 -> quiz page
            "answer:4 familles",     # correct answer -> feedback + advance
        ],
    },
    "ep2": {
        "url": "https://view.genially.com/6999b0b9d1e83ea5a328b462",
        "steps": [
            "key:r",
            "key:1",                 # Démarrer -> story/menu
            "key:1",                 # -> mission 1
            "key:1",                 # -> question 1
            "answer:4 couleurs",
            "answer:l'As",
        ],
    },
}


def main():
    game = sys.argv[1] if len(sys.argv) > 1 else "ep1"
    cfg = GAMES[game]
    out = ROOT / ".tmp" / "demo" / game
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)

    logs = []
    scenes = []

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=f"/tmp/pba-demo-{game}",
            headless=False,
            viewport={"width": 1920, "height": 1080},
            args=[
                f"--disable-extensions-except={EXT}",
                f"--load-extension={EXT}",
                "--mute-audio",
            ],
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.on("console", lambda m: logs.append(m.text) if "[PBA]" in m.text else None)
        page.goto(cfg["url"], wait_until="domcontentloaded")
        page.wait_for_timeout(7000)

        shot_n = 0

        def drain_speaks(seen, step_idx, quiet_ms=5000, max_ms=20000):
            """Wait for speech logs; pair each with a settled screenshot."""
            nonlocal shot_n
            t0 = time.time()
            last_new = time.time()
            while True:
                speaks = [l for l in logs if "speak:" in l]
                while seen < len(speaks):
                    text = speaks[seen].split("speak:", 1)[1].strip()
                    seen += 1
                    last_new = time.time()
                    page.wait_for_timeout(900)
                    shot_n += 1
                    png = f"scene_{shot_n:02d}.png"
                    page.screenshot(path=str(out / png))
                    scenes.append({"step": step_idx, "png": png, "text": text})
                    print(f"  [{png}] {text[:110]}")
                if (time.time() - last_new) * 1000 > quiet_ms:
                    break
                if (time.time() - t0) * 1000 > max_ms:
                    break
                page.wait_for_timeout(250)
            return seen

        def dump_interactives():
            return page.evaluate("""() => {
                const sel = '[role="radio"], [role="button"], button, a';
                return [...document.querySelectorAll(sel)]
                  .filter(e => e.offsetParent)
                  .map(e => e.textContent.trim().replace(/\\s+/g,' ').slice(0,60))
                  .filter(t => t).slice(0, 15);
            }""")

        seen = 0
        for i, step in enumerate(cfg["steps"]):
            kind, _, arg = step.partition(":")
            print(f"step {i}: {step}")
            if kind == "key":
                page.keyboard.press(arg)
            elif kind == "answer":
                radios = page.evaluate(
                    """() => [...document.querySelectorAll('[role="radio"]')]
                           .map(r => r.textContent.trim())"""
                )
                idx = next((j + 1 for j, t in enumerate(radios) if arg in t), None)
                print(f"  radios={radios} -> press {idx}")
                if idx is None:
                    scenes.append({"step": i, "png": None, "text": "",
                                   "error": f"answer '{arg}' not found in {radios}"})
                    continue
                page.keyboard.press(str(idx))
            seen = drain_speaks(seen, i)
            scenes.append({"step": i, "interactives": dump_interactives()})

        ctx.close()

    (out / "scenes.json").write_text(json.dumps(scenes, ensure_ascii=False, indent=1))
    print(f"\n{shot_n} screenshots -> {out}")


if __name__ == "__main__":
    main()
