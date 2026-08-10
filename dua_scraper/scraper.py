import os
import sys
import json
import csv
import time
import re
import random
import argparse
import asyncio
from datetime import datetime
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

sys.stdout.reconfigure(encoding='utf-8')

MAIN_URL = "https://allahuakbarofficial.com/i-am-feeling/"
BASE_DOMAIN = "https://allahuakbarofficial.com"

# Output directories
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "output")
RAW_DIR = os.path.join(OUTPUT_DIR, "raw")
ERRORS_DIR = os.path.join(OUTPUT_DIR, "errors")

for d in [OUTPUT_DIR, RAW_DIR, ERRORS_DIR]:
    os.makedirs(d, exist_ok=True)

def is_arabic(text):
    if not text:
        return False
    arabic_chars = len(re.findall(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]', text))
    latin_chars = len(re.findall(r'[a-zA-Z]', text))
    if latin_chars > arabic_chars:
        return False
    return (arabic_chars / len(text.strip())) > 0.25 if text.strip() else False

def extract_quran_details(text):
    if not text:
        return None, None, None
    m = re.search(r'(?:Quran|Qur\'an|Surah)\s*([A-Za-z0-9\-\'\s]+)?\s*\(?(\d+):(\d+)\)?', text, re.IGNORECASE)
    if m:
        quran_ref = m.group(0).strip()
        surah = m.group(1).strip() if m.group(1) and not m.group(1).strip().isdigit() else None
        ayah = None
        try:
            ayah = int(m.group(3))
        except:
            pass
        return quran_ref, surah, ayah
    return None, None, None

def parse_dua_page(html_content, page_url):
    soup = BeautifulSoup(html_content, 'lxml')
    entry = soup.find('div', class_='entry-content') or soup.find('article') or soup

    sections = entry.find_all('div', class_=lambda c: c and 'e-parent' in c)
    if not sections:
        sections = [entry]

    duas = []
    current_dua = None
    last_label = None

    for sec in sections:
        sec_text = sec.get_text(separator=' ', strip=True)
        if "When a person dies, his deeds come to an end" in sec_text or "See an error against Qur’an" in sec_text:
            continue
        if "Contact Us" in sec_text and not is_arabic(sec_text) and "Suicidal" not in sec_text:
            continue

        h5 = sec.find('h5')
        h2 = sec.find('h2')
        h3 = sec.find('h3')

        new_title = None
        if h5:
            t = h5.get_text(strip=True)
            if "Contact" not in t and "Donate" not in t and "Home" not in t:
                new_title = t
        elif h2:
            t = h2.get_text(strip=True)
            if "Prophet" not in t and "Home" not in t and "Contact" not in t and "Donate" not in t:
                new_title = t
        elif h3:
            t = h3.get_text(strip=True)
            if "Contact" not in t and "Donate" not in t:
                new_title = t

        if new_title:
            if current_dua and (current_dua['arabic'] or current_dua['translation'] or current_dua['transliteration']):
                duas.append(current_dua)
            current_dua = {
                "title": new_title,
                "arabic": None,
                "transliteration": None,
                "translation": None,
                "description": None,
                "benefit": None,
                "virtue": None,
                "hadith": None,
                "reference": None,
                "source": "Allahu Akbar Official",
                "quran_reference": None,
                "surah": None,
                "ayah": None,
                "narrator": None,
                "repeat_count": None,
                "audio_url": None,
                "image_url": None,
                "source_url": page_url
            }
            last_label = None

        if not current_dua:
            current_dua = {
                "title": soup.find('h1').get_text(strip=True) if soup.find('h1') else "Dua",
                "arabic": None,
                "transliteration": None,
                "translation": None,
                "description": None,
                "benefit": None,
                "virtue": None,
                "hadith": None,
                "reference": None,
                "source": "Allahu Akbar Official",
                "quran_reference": None,
                "surah": None,
                "ayah": None,
                "narrator": None,
                "repeat_count": None,
                "audio_url": None,
                "image_url": None,
                "source_url": page_url
            }
            last_label = None

        for img in sec.find_all('img'):
            src = img.get('src', '')
            if 'wp-content/uploads' in src and not any(x in src for x in ['logo', 'icon', 'cropped', 'I-am-feeling']):
                if not current_dua['image_url']:
                    current_dua['image_url'] = src

        for audio in sec.find_all(['audio', 'source', 'a']):
            src = audio.get('src') or audio.get('href')
            if src and any(src.endswith(ext) for ext in ['.mp3', '.wav', '.ogg', '.m4a']):
                if not src.startswith('http'):
                    src = BASE_DOMAIN + src
                current_dua['audio_url'] = src

        ps = sec.find_all('p')
        for p in ps:
            txt = p.get_text(separator=' ', strip=True)
            if not txt:
                continue

            clean_txt = txt.strip()
            if clean_txt in ['Transliteration:', 'Translation:', 'Audio:', 'Hadith:', 'Virtue:', 'Benefit:', 'Description:', 'Reference:', 'Reference']:
                last_label = clean_txt.replace(':', '').lower()
                continue

            if txt.startswith("Transliteration:"):
                val = txt.replace("Transliteration:", "").strip()
                current_dua['transliteration'] = val if val else None
                last_label = 'transliteration' if not val else None
                continue
            elif txt.startswith("Translation:"):
                val = txt.replace("Translation:", "").strip()
                current_dua['translation'] = val if val else None
                last_label = 'translation' if not val else None
                continue
            elif txt.startswith("Hadith:"):
                val = txt.replace("Hadith:", "").strip()
                current_dua['hadith'] = val if val else None
                last_label = 'hadith' if not val else None
                continue
            elif txt.startswith("Virtue:"):
                val = txt.replace("Virtue:", "").strip()
                current_dua['virtue'] = val if val else None
                last_label = 'virtue' if not val else None
                continue
            elif txt.startswith("Benefit:"):
                val = txt.replace("Benefit:", "").strip()
                current_dua['benefit'] = val if val else None
                last_label = 'benefit' if not val else None
                continue
            elif txt.startswith("Description:"):
                val = txt.replace("Description:", "").strip()
                current_dua['description'] = val if val else None
                last_label = 'description' if not val else None
                continue
            elif txt.startswith("Audio:"):
                last_label = 'audio'
                continue

            if last_label and txt:
                if last_label == 'transliteration' and not current_dua['transliteration']:
                    current_dua['transliteration'] = txt
                    last_label = None
                    continue
                elif last_label == 'translation' and not current_dua['translation']:
                    current_dua['translation'] = txt
                    last_label = None
                    continue
                elif last_label == 'hadith' and not current_dua['hadith']:
                    current_dua['hadith'] = txt
                    last_label = None
                    continue
                elif last_label == 'virtue' and not current_dua['virtue']:
                    current_dua['virtue'] = txt
                    last_label = None
                    continue
                elif last_label == 'benefit' and not current_dua['benefit']:
                    current_dua['benefit'] = txt
                    last_label = None
                    continue
                elif last_label == 'description' and not current_dua['description']:
                    current_dua['description'] = txt
                    last_label = None
                    continue
                elif last_label == 'audio':
                    last_label = None
                    continue

            m_rep = re.search(r'(?:Repeat|Recite)\.?\s*(?:x\s*(\d+)|(\d+)\s*times|(\d+)\s*x)', txt, re.IGNORECASE)
            if m_rep:
                count_str = m_rep.group(1) or m_rep.group(2) or m_rep.group(3)
                if count_str:
                    current_dua['repeat_count'] = int(count_str)

            if is_arabic(txt):
                if not current_dua['arabic']:
                    current_dua['arabic'] = txt
                else:
                    if any(kw in txt for kw in ["عَنْ", "رواه", "حديث", "سنن", "صحيح", "مسند"]) or "(" in txt:
                        if current_dua['reference']:
                            current_dua['reference'] += "\n" + txt
                        else:
                            current_dua['reference'] = txt
                    else:
                        current_dua['arabic'] += "\n" + txt
            else:
                if any(kw in txt for kw in ["(", "Bukhārī", "Muslim", "Mājah", "Dāwūd", "Tirmidhī", "Nasa'i", "Quran", "Surah", "Ibn"]):
                    if current_dua['reference']:
                        current_dua['reference'] += " | " + txt
                    else:
                        current_dua['reference'] = txt
                elif not current_dua['translation'] and not txt.startswith("Audio"):
                    current_dua['translation'] = txt

    if current_dua and (current_dua['arabic'] or current_dua['translation'] or current_dua['transliteration']):
        duas.append(current_dua)

    for d in duas:
        full_text = f"{d['title'] or ''} {d['reference'] or ''} {d['translation'] or ''}"
        q_ref, surah, ayah = extract_quran_details(full_text)
        if q_ref:
            d['quran_reference'] = q_ref
        if surah:
            d['surah'] = surah
        if ayah:
            d['ayah'] = ayah

        # Extract narrator if present
        m_nar = re.search(r'([A-Z][a-z\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\'\s\-]+(?:\(ra[ḍd]iy All[āa]hu ʿanhu?h[āa]?\)|narrates|said))', f"{d['hadith'] or ''} {d['virtue'] or ''} {d['reference'] or ''}")
        if m_nar:
            nar_str = m_nar.group(1).strip()
            if len(nar_str) < 60 and not nar_str.startswith("The ") and not nar_str.startswith("In "):
                d['narrator'] = nar_str

        if d['arabic']:
            lines = d['arabic'].split('\n')
            unique_lines = list(dict.fromkeys(lines))
            d['arabic'] = '\n'.join(unique_lines)

    # In-page deduplication
    unique_duas = []
    seen = set()
    for d in duas:
        norm_ar = (d['arabic'] or '').strip()[:50]
        key = (d['title'], norm_ar)
        if key not in seen:
            seen.add(key)
            unique_duas.append(d)

    return unique_duas

async def discover_feelings(page):
    print("[INIT] Discovering feelings from main page:", MAIN_URL)
    await page.goto(MAIN_URL, wait_until="domcontentloaded")

    # Scroll to load any lazy elements
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    await asyncio.sleep(1)

    html = await page.content()
    soup = BeautifulSoup(html, 'lxml')

    feelings = []
    seen_slugs = set()

    for a in soup.find_all('a', href=True):
        href = a['href']
        path = urlparse(href).path.strip('/')
        if not path or path in ['99-names-of-allah', 'daily-duas-and-dhikr', 'i-am-feeling', 'quran-images', 'support-our-mission', 'feed', 'comments', 'contact', 'privacy-policy', 'about']:
            continue
        if href.startswith('https://allahuakbarofficial.com/') and path:
            text = a.get_text(strip=True)
            img = a.find('img')
            img_alt = img.get('alt', '') if img else ''
            img_src = img.get('src', '') if img else ''
            name = text or img_alt or path.replace('-', ' ').title()

            if path not in seen_slugs:
                seen_slugs.add(path)
                feelings.append({
                    "feeling_name": name,
                    "feeling_slug": path,
                    "feeling_url": href,
                    "image_url": img_src,
                    "description": f"Duas and adhkar for feeling {name}"
                })

    print(f"[OK] Discovered {len(feelings)} feelings.")
    return feelings

async def scrape_feeling_page(context, feeling, retries=3):
    url = feeling['feeling_url']
    slug = feeling['feeling_slug']
    print(f"\n[...] Scraping {feeling['feeling_name']} ({slug})...")

    for attempt in range(1, retries + 1):
        page = None
        try:
            page = await context.new_page()
            # Random delay 300ms - 1200ms
            await asyncio.sleep(random.uniform(0.3, 1.2))

            response = await page.goto(url, wait_until="domcontentloaded", timeout=30000)

            # Check bot verification / cloudflare
            content = await page.content()
            if any(term in content for term in ["Bot Verification", "Verify you are human", "Checking your browser", "Cloudflare", "Access denied", "Just a moment"]):
                print(f"[WARN] Bot verification detected for {slug}, waiting...")
                await asyncio.sleep(3)
                content = await page.content()

            # Expand accordions if present
            accordions = await page.query_selector_all(".elementor-accordion-title, .accordion-title, details, summary")
            for acc in accordions:
                try:
                    await acc.click()
                    await asyncio.sleep(0.2)
                except:
                    pass

            # Scroll to bottom
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await asyncio.sleep(0.5)

            html = await page.content()

            # Save raw HTML backup
            raw_path = os.path.join(RAW_DIR, f"{slug}.html")
            with open(raw_path, 'w', encoding='utf-8') as f:
                f.write(html)

            # Parse duas
            duas = parse_dua_page(html, url)
            print(f"    Found {len(duas)} duas for {feeling['feeling_name']}")

            await page.close()
            return duas, None

        except Exception as e:
            err_msg = str(e)
            print(f"[ERROR] Attempt {attempt}/{retries} failed for {slug}: {err_msg}")

            if page:
                try:
                    error_img = os.path.join(ERRORS_DIR, f"{slug}.png")
                    await page.screenshot(path=error_img)
                    await page.close()
                except:
                    pass

            if attempt < retries:
                await asyncio.sleep(2 ** attempt)
            else:
                return None, err_msg

async def main():
    parser = argparse.ArgumentParser(description="Islamic Duas & Feelings Web Scraper")
    parser.add_argument("--resume", action="store_true", help="Resume scraping from checkpoint")
    parser.add_argument("--headful", action="store_true", help="Run browser visually")
    parser.add_argument("--only", type=str, help="Scrape only a specific feeling slug")
    args = parser.parse_args()

    start_time = datetime.now()
    print("=========================================")
    print("ALLAHU AKBAR OFFICIAL DUA SCRAPER")
    print(f"Started at: {start_time.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=========================================")

    checkpoint_file = os.path.join(OUTPUT_DIR, "checkpoint.json")
    checkpoint_data = {}
    if args.resume and os.path.exists(checkpoint_file):
        try:
            with open(checkpoint_file, 'r', encoding='utf-8') as f:
                checkpoint_data = json.load(f)
            print(f"[RESUME] Loaded checkpoint with {len(checkpoint_data.get('scraped_feelings', {}))} scraped feelings.")
        except Exception as e:
            print("[WARN] Could not load checkpoint:", e)

    scraped_feelings_dict = checkpoint_data.get("scraped_feelings", {})
    failed_pages = checkpoint_data.get("failed_pages", [])

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=not args.headful)
        context = await browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        page = await context.new_page()

        # Step 1: Discover feelings
        feelings = await discover_feelings(page)
        await page.close()

        # Save feelings.json
        feelings_path = os.path.join(OUTPUT_DIR, "feelings.json")
        with open(feelings_path, 'w', encoding='utf-8') as f:
            json.dump(feelings, f, ensure_ascii=False, indent=2)

        # Filter if --only specified
        if args.only:
            target_slug = args.only.lower().strip()
            feelings = [f for f in feelings if f['feeling_slug'] == target_slug]
            print(f"[FILTER] Running ONLY for feeling: {target_slug} (Found: {len(feelings)})")

        # Step 2: Scrape each feeling page concurrently with semaphore (3-5 max)
        semaphore = asyncio.Semaphore(4)

        async def worker(feeling):
            slug = feeling['feeling_slug']
            if args.resume and slug in scraped_feelings_dict:
                print(f"[SKIP] Already scraped: {feeling['feeling_name']} ({slug})")
                return

            async with semaphore:
                duas, err = await scrape_feeling_page(context, feeling)
                if duas is not None:
                    scraped_feelings_dict[slug] = {
                        "feeling": feeling['feeling_name'],
                        "slug": slug,
                        "url": feeling['feeling_url'],
                        "items_count": len(duas),
                        "duas": duas
                    }
                    # Save checkpoint incrementally
                    with open(checkpoint_file, 'w', encoding='utf-8') as f:
                        json.dump({
                            "scraped_feelings": scraped_feelings_dict,
                            "failed_pages": failed_pages
                        }, f, ensure_ascii=False, indent=2)
                else:
                    failed_pages.append({
                        "url": feeling['feeling_url'],
                        "feeling": feeling['feeling_name'],
                        "error": err,
                        "attempts": 3
                    })

        tasks = [worker(f) for f in feelings]
        await asyncio.gather(*tasks)
        await browser.close()

    end_time = datetime.now()
    duration = (end_time - start_time).total_seconds()

    # Step 3: Build datasets
    feelings_nested = []
    all_flat_duas = []
    total_duas = 0
    total_arabic = 0
    with_ref = 0
    with_audio = 0
    duplicates_removed = 0

    for slug, fdata in scraped_feelings_dict.items():
        feelings_nested.append(fdata)
        for d in fdata['duas']:
            total_duas += 1
            if d['arabic']:
                total_arabic += 1
            if d['reference'] or d['quran_reference']:
                with_ref += 1
            if d['audio_url']:
                with_audio += 1

            flat_item = {
                "feeling": fdata['feeling'],
                "feeling_slug": fdata['slug'],
                "title": d['title'],
                "arabic": d['arabic'],
                "transliteration": d['transliteration'],
                "translation": d['translation'],
                "description": d['description'],
                "benefit": d['benefit'],
                "virtue": d['virtue'],
                "hadith": d['hadith'],
                "reference": d['reference'],
                "source": d['source'],
                "quran_reference": d['quran_reference'],
                "surah": d['surah'],
                "ayah": d['ayah'],
                "narrator": d['narrator'],
                "repeat_count": d['repeat_count'],
                "audio_url": d['audio_url'],
                "image_url": d['image_url'],
                "source_url": d['source_url']
            }
            all_flat_duas.append(flat_item)

    # Save duas_by_feeling.json
    by_feeling_dataset = {
        "source_website": BASE_DOMAIN,
        "source_page": MAIN_URL,
        "scraped_at": end_time.isoformat(),
        "total_feelings": len(feelings_nested),
        "total_items": total_duas,
        "feelings": feelings_nested
    }
    with open(os.path.join(OUTPUT_DIR, "duas_by_feeling.json"), 'w', encoding='utf-8') as f:
        json.dump(by_feeling_dataset, f, ensure_ascii=False, indent=2)

    # Save duas_flat.json
    with open(os.path.join(OUTPUT_DIR, "duas_flat.json"), 'w', encoding='utf-8') as f:
        json.dump(all_flat_duas, f, ensure_ascii=False, indent=2)

    # Save duas.csv with UTF-8 BOM encoding for Excel
    csv_path = os.path.join(OUTPUT_DIR, "duas.csv")
    if all_flat_duas:
        headers = list(all_flat_duas[0].keys())
        with open(csv_path, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(all_flat_duas)

    # Save failed_pages.json
    with open(os.path.join(OUTPUT_DIR, "failed_pages.json"), 'w', encoding='utf-8') as f:
        json.dump(failed_pages, f, ensure_ascii=False, indent=2)

    # Save scrape_report.json
    report_data = {
        "started_at": start_time.isoformat(),
        "finished_at": end_time.isoformat(),
        "duration_seconds": round(duration, 2),
        "feelings_discovered": len(feelings),
        "feelings_scraped_successfully": len(scraped_feelings_dict),
        "feelings_failed": len(failed_pages),
        "total_duas": total_duas,
        "total_arabic_entries": total_arabic,
        "entries_with_reference": with_ref,
        "entries_with_audio": with_audio,
        "duplicate_entries_removed": duplicates_removed
    }
    with open(os.path.join(OUTPUT_DIR, "scrape_report.json"), 'w', encoding='utf-8') as f:
        json.dump(report_data, f, ensure_ascii=False, indent=2)

    print("\n=========================================")
    print("SCRAPE COMPLETE")
    print("=========================================")
    print(f"Feelings discovered: {len(feelings)}")
    print(f"Feelings successful: {len(scraped_feelings_dict)}")
    print(f"Feelings failed: {len(failed_pages)}")
    print(f"Total entries: {total_duas}")
    print(f"Arabic text: {total_arabic}")
    print(f"References: {with_ref}")
    print(f"Audio files: {with_audio}")
    print(f"Duration: {round(duration, 2)} seconds")
    print("\nGenerated Output Files:")
    print(" - output/feelings.json")
    print(" - output/duas_by_feeling.json")
    print(" - output/duas_flat.json")
    print(" - output/duas.csv")
    print(" - output/failed_pages.json")
    print(" - output/scrape_report.json")
    print("=========================================")

if __name__ == "__main__":
    asyncio.run(main())
