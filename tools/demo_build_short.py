#!/usr/bin/env python3
"""Build the vertical short (1080x1920, ~45s) for TikTok / Instagram Reels /
YouTube Shorts from the demo captures. Narration = the extension's own MP3s
(exact audio-map keys per scene); hook and CTA are edge-tts. Each scene is
composed as an HTML page (blurred cover background + framed screenshot +
big caption) rendered with headless Chromium.

Usage: uv run --with playwright,edge-tts python3 tools/demo_build_short.py
"""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from demo_build import (ROOT, AUDIO_DIR, FPS, sh, load_audio_map, decode_pcm,
                        tts, write_wav, silence)

WORK = ROOT / ".tmp" / "demo" / "short"
EP1 = ROOT / ".tmp" / "demo" / "ep1"
EP2 = ROOT / ".tmp" / "demo" / "ep2"
VOICE = "fr-FR-DeniseNeural"

# Each scene: (background/framed image, big top label, caption, audio spec).
# Audio spec items: ("seg", game, exact audio-map key) or ("tts", text).
SCENES = [
    (EP1 / "scene_03.png", None,
     "Et si un enfant qui ne voit pas l'écran\npouvait jouer à ce jeu ?",
     [("tts", "Et si un enfant qui ne voit pas l'écran pouvait jouer à ce jeu ?")],
     "hook"),
    (EP1 / "scene_03.png", "La voix de l'extension 👇",
     "Une extension Chrome gratuite\nlit le jeu à voix haute",
     [("seg", "ep1", "Bonjour ! Je suis ton guide audio"),
      ("seg", "ep1", "Luna et le grimoire des cartes. À la découverte du Petit Bridge")],
     "welcome"),
    (EP1 / "scene_10.png", "La voix de l'extension 👇",
     "Questions et réponses lues,\navec leur numéro",
     [("seg", "ep1", "Question : Combien y a-t-il de familles (couleurs) dans le jeu de cartes du Petit Bridge ?")],
     "question"),
    (EP1 / "scene_10.png", "La voix de l'extension 👇",
     "L'enfant répond\navec une seule touche",
     [("seg", "ep1", "4 familles"), ("seg", "ep1", "Bravo !")],
     "answer"),
    (EP2 / "scene_01.png", "La voix de l'extension 👇",
     "Déjà 2 jeux accessibles,\nune voix par épisode",
     [("seg", "ep2", "Mission BridgeBot : le protocole Mini Bridge")],
     "ep2"),
    (EP1 / "scene_03.png", None,
     "Petit Bridge Audio\ngithub.com/LeKibbitz/lpbs\nGratuit · Open source",
     [("tts", "Petit Bridge Audio. Extension Chrome gratuite et open source. "
              "Le lien est dans la description. À vous de jouer !")],
     "cta"),
]

PAGE = """<!doctype html><meta charset=utf-8><body style="margin:0">
<div style="position:relative;width:1080px;height:1920px;overflow:hidden;
  font-family:-apple-system,Helvetica,sans-serif;background:#160f2e">
 <img src="{img}" style="position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;filter:blur(42px) brightness(.45);transform:scale(1.2)">
 {label_html}
 {shot_html}
 <div style="position:absolute;left:50%;{caption_pos}
  width:92%;color:#fff;font-weight:800;text-align:center;
  line-height:1.3;text-shadow:0 4px 24px rgba(0,0,0,.8);white-space:pre-line">{caption}</div>
</div>"""
CAPTION_BOTTOM = "transform:translateX(-50%);bottom:200px;font-size:62px;"
CAPTION_CENTER = "top:50%;transform:translate(-50%,-50%);font-size:{size}px;"
LABEL = """<div style="position:absolute;left:50%;transform:translateX(-50%);top:170px;
  background:rgba(255,255,255,.16);color:#fff;font-size:44px;font-weight:700;
  padding:18px 44px;border-radius:999px;backdrop-filter:blur(8px)">{label}</div>"""
SHOT = """<img src="{img}" style="position:absolute;left:50%;top:50%;
  transform:translate(-50%,-58%);width:96%;border-radius:28px;
  box-shadow:0 24px 80px rgba(0,0,0,.6)">"""


def render_frames():
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={"width": 1080, "height": 1920})
        for i, (img, label, caption, _audio, tag) in enumerate(SCENES):
            html = PAGE.format(
                img=img.name,
                label_html=LABEL.format(label=label) if label else "",
                shot_html=SHOT.format(img=img.name) if label else "",
                caption_pos=(CAPTION_BOTTOM if label else
                             CAPTION_CENTER.format(size=64 if tag == "cta" else 84)),
                caption=caption)
            f = WORK / f"frame_{i}_{tag}.html"
            f.write_text(html)
            (WORK / img.name).write_bytes(img.read_bytes())
            page.goto(f.as_uri())
            page.wait_for_timeout(250)
            page.screenshot(path=str(WORK / f"frame_{i}_{tag}.png"))
        b.close()


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    maps = {"ep1": load_audio_map("697f6a08ef130744478db916"),
            "ep2": load_audio_map("6999b0b9d1e83ea5a328b462")}
    render_frames()

    parts = []
    for i, (_img, label, _caption, audio, tag) in enumerate(SCENES):
        pcm = silence(250)
        for j, item in enumerate(audio):
            if item[0] == "seg":
                pcm += decode_pcm(AUDIO_DIR / maps[item[1]][item[2]])
            else:
                pcm += decode_pcm(tts(item[1], VOICE, WORK / f"tts_{i}_{j}.mp3"))
            pcm += silence(300)
        pcm += silence(350)
        wav = WORK / f"audio_{i}_{tag}.wav"
        write_wav(wav, pcm)
        dur = len(pcm) / 48000
        frames = max(int(dur * FPS), FPS)
        out = WORK / f"part_{i}.mkv"
        grow = 0.07 if label else 0
        vf = (f"scale=2160:3840,zoompan=z='1+{grow}*on/{frames}':d={frames}"
              ":x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,"
              "format=yuv420p")
        sh(["ffmpeg", "-y", "-v", "error", "-i", str(WORK / f"frame_{i}_{tag}.png"),
            "-i", str(wav), "-filter_complex", f"[0:v]{vf}[v]",
            "-map", "[v]", "-map", "1:a", "-c:v", "libx264", "-qp", "0",
            "-preset", "ultrafast", "-c:a", "pcm_s16le",
            "-t", f"{dur:.3f}", "-r", str(FPS), str(out)])
        parts.append((out, dur))
        print(f" {tag}: {dur:.1f}s")

    final = ROOT / "videos" / "petit-bridge-audio-short.mp4"
    inputs = []
    for m, _ in parts:
        inputs += ["-i", str(m)]
    fc = "".join(f"[{i}:v][{i}:a]" for i in range(len(parts)))
    fc += (f"concat=n={len(parts)}:v=1:a=1[v][a0];"
           "[a0]loudnorm=I=-16:TP=-1.5:LRA=11[a]")
    sh(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", fc,
        "-map", "[v]", "-map", "[a]",
        "-c:v", "libx264", "-crf", "19", "-preset", "medium", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "160k", "-ar", "44100", "-ac", "2",
        "-movflags", "+faststart", str(final)])
    print(f"\n{final}  ({sum(d for _, d in parts):.0f}s)")


if __name__ == "__main__":
    main()
