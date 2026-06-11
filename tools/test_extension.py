#!/usr/bin/env python3
"""End-to-end test: load the unpacked extension in Chromium, open the game,
play the first pages with the extension's keyboard layer, and assert the
audio guide announces every page (via [PBA] console logs)."""
import re
import sys
import time
import pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXT = ROOT / "extension"
URL = "https://view.genially.com/697f6a08ef130744478db916"

logs = []


def main():
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir="/tmp/pba-test-profile",
            headless=False,
            args=[
                f"--disable-extensions-except={EXT}",
                f"--load-extension={EXT}",
                "--mute-audio",
            ],
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.on("console", lambda m: logs.append(m.text) if "[PBA]" in m.text else None)

        page.goto(URL, wait_until="domcontentloaded")
        page.wait_for_timeout(6000)

        checks = []

        def check(name, ok, detail=""):
            checks.append((name, ok, detail))
            print(("PASS " if ok else "FAIL ") + name + (" - " + detail if detail else ""))

        # 1. boot
        check("boot", any("boot ok" in l for l in logs), next((l for l in logs if "boot" in l), "no boot log"))

        # 2. welcome announcement queued (pending until gesture) - press H to trigger
        page.keyboard.press("h")
        page.wait_for_timeout(1500)
        spoken = [l for l in logs if "speak:" in l]
        check("welcome-spoken", any("guide audio" in l.lower() or "couverture" in l.lower() for l in spoken),
              spoken[-1][:120] if spoken else "nothing spoken")

        # 3. press 1 => start the game (cover clickable)
        n_before = len(logs)
        page.keyboard.press("1")
        page.wait_for_timeout(4000)
        spoken = [l for l in logs[n_before:] if "speak:" in l]
        check("page2-announced", any("grimoire des cartes" in l.lower() for l in spoken), " | ".join(s[:80] for s in spoken[-3:]))

        # 4. press 1 => open grimoire => menu lesson 1
        n_before = len(logs)
        page.keyboard.press("1")
        page.wait_for_timeout(4000)
        spoken = [l for l in logs[n_before:] if "speak:" in l]
        check("page3-announced", any("Forêt des Premiers Pas" in l for l in spoken), " | ".join(s[:80] for s in spoken[-3:]))

        # 5. press 1 => start lesson 1 => quiz page with question + answers
        n_before = len(logs)
        page.keyboard.press("1")
        page.wait_for_timeout(4500)
        spoken = [l for l in logs[n_before:] if "speak:" in l]
        joined = " ".join(spoken)
        check("quiz-question", "familles" in joined, " | ".join(s[:80] for s in spoken[-3:]))

        # 6. Q key repeats the question with numbered answers
        n_before = len(logs)
        page.keyboard.press("q")
        page.wait_for_timeout(1500)
        spoken = [l for l in logs[n_before:] if "speak:" in l]
        check("q-key", any("Question" in l for l in spoken), spoken[-1][:140] if spoken else "nothing")

        # 7. answer the quiz with a number key: find which number is "4 familles"
        listing = page.evaluate("""() => {
            const radios = [...document.querySelectorAll('[role="radio"]')];
            return radios.map(r => r.textContent.trim());
        }""")
        idx = next((i + 1 for i, t in enumerate(listing) if "4 familles" in t), None)
        check("radios-found", idx is not None, str(listing))
        if idx:
            n_before = len(logs)
            page.keyboard.press(str(idx))
            page.wait_for_timeout(6000)
            spoken = [l for l in logs[n_before:] if "speak:" in l]
            joined = " ".join(spoken)
            ok = ("Bravo" in joined) or ("plus faible" in joined)
            check("answer-feedback-and-advance", ok, " | ".join(s[:90] for s in spoken[-4:]))

        # 8. language toggle
        n_before = len(logs)
        page.keyboard.press("t")
        page.wait_for_timeout(3000)
        spoken = [l for l in logs[n_before:] if "speak:" in l]
        joined = " ".join(spoken)
        check("english-mode", "English" in joined, " | ".join(s[:90] for s in spoken[-3:]))
        page.keyboard.press("t")  # back to FR
        page.wait_for_timeout(1500)

        ctx.close()

        fails = [c for c in checks if not c[1]]
        print(f"\n{len(checks) - len(fails)}/{len(checks)} checks passed")
        sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
