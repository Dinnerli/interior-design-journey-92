"""Downloads the global Hugging Face datasets listed in data/global-datasets.json
and saves each one as a CSV in public/data/global/.

Run by the "Refresh global datasets" workflow (manual). The weekly pipeline does
NOT run this: it only collects the Facebook groups.

    pip install datasets pandas
    python scripts/build_global_dataset.py
"""
import json
from pathlib import Path

import pandas as pd
from datasets import load_dataset

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "data" / "global"


def main() -> None:
    config = json.loads((ROOT / "data" / "global-datasets.json").read_text(encoding="utf-8"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for entry in config["datasets"]:
        ds = load_dataset(entry["id"])
        frame = pd.concat([split.to_pandas() for split in ds.values()], ignore_index=True)
        target = OUT_DIR / entry["file"]
        frame.to_csv(target, index=False, encoding="utf-8")
        print(f"{entry['id']}: {len(frame)} rows -> {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
