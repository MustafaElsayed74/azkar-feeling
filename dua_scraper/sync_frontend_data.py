"""Copy validated scraper outputs into the Next.js data directory."""

import json
import shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = SCRIPT_DIR / "output"
FRONTEND_DATA_DIR = SCRIPT_DIR.parent / "src" / "data"
DATA_FILES = ("feelings.json", "duas_by_feeling.json", "duas_flat.json")


def validate_json(path):
    with path.open("r", encoding="utf-8") as file:
        json.load(file)


def main():
    FRONTEND_DATA_DIR.mkdir(parents=True, exist_ok=True)

    for filename in DATA_FILES:
        source = OUTPUT_DIR / filename
        destination = FRONTEND_DATA_DIR / filename
        if not source.exists():
            raise FileNotFoundError(f"Missing scraper output: {source}")
        validate_json(source)
        shutil.copy2(source, destination)
        print(f"Synced {filename}")


if __name__ == "__main__":
    main()
