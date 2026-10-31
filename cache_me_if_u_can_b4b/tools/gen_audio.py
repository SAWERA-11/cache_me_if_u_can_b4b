"""Generate Urdu voice clips from content/audio-script.csv into assets/audio/<id>.mp3.

Default route: edge-tts (voice from the VOICE env var, default ur-PK-UzmaNeural).
List voices with:  edge-tts --list-voices
Fallback route:    set USE_GTTS=1 to use gTTS (lang='ur').
Existing clips are skipped unless FORCE is set. To redo one clip, delete its mp3 and run again.

Usage:
    pip install edge-tts gTTS
    python tools/gen_audio.py
    python tools/gen_audio_map.py
"""
import asyncio
import csv
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "content" / "audio-script.csv"
OUT_DIR = ROOT / "assets" / "audio"
VOICE = os.environ.get("VOICE", "ur-PK-UzmaNeural")
USE_GTTS = os.environ.get("USE_GTTS") == "1"
FORCE = bool(os.environ.get("FORCE"))


def read_rows():
    with open(CSV_PATH, encoding="utf-8", newline="") as f:
        return [(r["id"].strip(), r["text_ur"].strip()) for r in csv.DictReader(f) if r.get("id")]


async def make_edge(text, path):
    import edge_tts
    await edge_tts.Communicate(text, VOICE).save(str(path))


def make_gtts(text, path):
    from gtts import gTTS
    gTTS(text, lang="ur").save(str(path))


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    made = skipped = failed = 0
    for clip_id, text in read_rows():
        path = OUT_DIR / f"{clip_id}.mp3"
        if path.exists() and not FORCE:
            skipped += 1
            continue
        if not text:
            print(f"skip {clip_id}: empty text")
            failed += 1
            continue
        try:
            if USE_GTTS:
                make_gtts(text, path)
            else:
                asyncio.run(make_edge(text, path))
            print(f"ok {clip_id}")
            made += 1
        except Exception as e:  # keep going; the text on screen is always enough
            print(f"error {clip_id}: {e}", file=sys.stderr)
            if path.exists() and path.stat().st_size == 0:
                path.unlink()
            failed += 1
    route = "gTTS (ur)" if USE_GTTS else f"edge-tts ({VOICE})"
    print(f"done via {route}: {made} made, {skipped} already existed, {failed} failed")


if __name__ == "__main__":
    main()
