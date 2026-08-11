# Islamic Duas & Feelings Web Scraper

Automated web scraper designed to discover all emotions/feelings from [https://allahuakbarofficial.com/i-am-feeling/](https://allahuakbarofficial.com/i-am-feeling/) and extract structured Islamic duas, adhkar, Quran verses, Hadiths, transliterations, translations, references, repeat counts, and audio URLs.

## Project Structure

```text
dua_scraper/
│
├── scraper.py
├── requirements.txt
├── README.md
│
└── output/
    ├── feelings.json
    ├── duas_by_feeling.json
    ├── duas_flat.json
    ├── duas.csv
    ├── failed_pages.json
    ├── scrape_report.json
    ├── checkpoint.json
    ├── raw/
    └── errors/
```

## Installation

1. Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   ```

   **Windows:**
   ```bash
   .venv\Scripts\activate
   ```

   **Linux / macOS:**
   ```bash
   source .venv/bin/activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   playwright install chromium
   ```

## Usage

Run the full scraper:
```bash
python scraper.py
```

Run in headful mode (visible browser window):
```bash
python scraper.py --headful
```

Resume scraping from checkpoint (skipping already scraped feeling pages):
```bash
python scraper.py --resume
```

Scrape only a specific feeling (e.g. `sad`):
```bash
python scraper.py --only sad
```

After reviewing a successful scrape, validate and copy the three frontend JSON
files into `src/data`:

```bash
python sync_frontend_data.py
```

Then run `npm test` from the repository root. The sync command validates that
every copied file contains valid JSON before replacing the frontend copy.

## Output Datasets

- `output/feelings.json`: Metadata of all discovered feelings.
- `output/duas_by_feeling.json`: Complete nested dataset grouped by emotion.
- `output/duas_flat.json`: Flattened array of all dua items.
- `output/duas.csv`: Excel-compatible CSV file with UTF-8 BOM encoding.
- `output/scrape_report.json`: Execution metrics and quality summary statistics.
- `output/failed_pages.json`: Failed URLs log if any occurred.
- `output/raw/`: Saved raw HTML pages for offline inspection.
- `output/errors/`: Screenshots captured during failed page attempts if any.
