"""Fetch a small, source-verifiable NSE EOD snapshot for the FINN demo."""
from __future__ import annotations

import concurrent.futures
import csv
import datetime as dt
import io
import json
import statistics
import zipfile
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1] / "app" / "data" / "eod"
OUT = ROOT / "nse-eod"
OUT.mkdir(exist_ok=True)
SYMBOLS = [
    "RELIANCE", "HDFCBANK", "ICICIBANK", "SBIN", "TCS", "INFY", "WIPRO",
    "BHARTIARTL", "LT", "ITC", "HINDUNILVR", "BAJAJ-AUTO", "MARUTI",
    "SUNPHARMA", "NTPC", "TATAPOWER", "ASIANPAINT", "HINDALCO",
]
START = dt.date(2026, 10, 1)
END = dt.date(2026, 11, 13)
BASE = "https://nsearchives.nseindia.com/content/cm/BhavCopy_NSE_CM_0_0_0_{ymd}_F_0000.csv.zip"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36",
    "Referer": "https://www.nseindia.com/all-reports/",
}


def fetch(day: dt.date):
    ymd = day.strftime("%Y%m%d")
    url = BASE.format(ymd=ymd)
    try:
        response = requests.get(url, headers=HEADERS, timeout=25)
        if response.status_code == 404:
            return day, url, []
        response.raise_for_status()
        with zipfile.ZipFile(io.BytesIO(response.content)) as archive:
            csv_name = next(name for name in archive.namelist() if name.lower().endswith(".csv"))
            text = archive.read(csv_name).decode("utf-8-sig")
        rows = csv.DictReader(io.StringIO(text))
        selected = []
        for row in rows:
            if row.get("TckrSymb") in SYMBOLS and row.get("FinInstrmTp") == "STK" and row.get("SctySrs") == "EQ":
                if row.get("TradDt") != day.isoformat():
                    raise ValueError(f"Date mismatch in {url}: {row.get('TradDt')}")
                selected.append({
                    "date": row["TradDt"],
                    "ticker": row["TckrSymb"] + ".NS",
                    "name": row.get("FinInstrmNm", ""),
                    "openINR": float(row["OpnPric"]),
                    "highINR": float(row["HghPric"]),
                    "lowINR": float(row["LwPric"]),
                    "closeINR": float(row["ClsPric"]),
                    "prevCloseINR": float(row["PrvsClsgPric"]),
                    "volumeShares": int(row["TtlTradgVol"]),
                    "sourceUrl": url,
                })
        return day, url, selected
    except requests.HTTPError as exc:
        if exc.response is not None and exc.response.status_code in (403, 404):
            return day, url, []
        raise


dates = []
day = START
while day <= END:
    if day.weekday() < 5:
        dates.append(day)
    day += dt.timedelta(days=1)

records = []
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for fetched_day, url, rows in pool.map(fetch, dates):
        records.extend(rows)

by_symbol: dict[str, list[dict]] = {symbol + ".NS": [] for symbol in SYMBOLS}
for record in records:
    by_symbol[record["ticker"]].append(record)
for values in by_symbol.values():
    values.sort(key=lambda item: item["date"])

missing = [ticker for ticker, values in by_symbol.items() if len(values) < 21]
if missing:
    raise RuntimeError("Fewer than 21 NSE sessions found for: " + ", ".join(missing))

quotes = []
for ticker, values in by_symbol.items():
    latest = values[-1]
    previous_20 = values[-21:-1]
    avg20 = statistics.mean(item["volumeShares"] for item in previous_20)
    change = (latest["closeINR"] / latest["prevCloseINR"] - 1) * 100 if latest["prevCloseINR"] else None
    quotes.append({
        "ticker": ticker,
        "asOf": latest["date"],
        "closeINR": latest["closeINR"],
        "prevCloseINR": latest["prevCloseINR"],
        "changePct": round(change, 3) if change is not None else None,
        "volumeShares": latest["volumeShares"],
        "avg20VolumeShares": round(avg20, 2),
        "volumeMultiple": round(latest["volumeShares"] / avg20, 3) if avg20 else None,
        "recentSessions": 21,
        "sourceTitle": "CM-UDiFF Common Bhavcopy Final (zip)",
        "sourceUrl": latest["sourceUrl"],
        "provider": "NSE India",
        "priceBasis": "NSE cash market close, EQ series; INR per share",
        "volumeBasis": "shares traded; baseline is the prior 20 available sessions",
    })

window_records = [record for values in by_symbol.values() for record in values[-21:]]
flat_path = OUT / "NSE_EQ_EOD_21_sessions_through_2026-11-13.csv"
with flat_path.open("w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=list(window_records[0].keys()))
    writer.writeheader()
    writer.writerows(sorted(window_records, key=lambda item: (item["date"], item["ticker"])))

json_path = OUT / "quotes_2026-11-13.json"
json_path.write_text(json.dumps(quotes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
source_note = (
    "Source: NSE India, CM-UDiFF Common Bhavcopy Final (zip), fetched on "
    + dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    + ". Official archive URL pattern: " + BASE + "\n"
    + f"Rows in filtered 21-session extract: {len(window_records)}; symbols: {len(quotes)}; "
    + f"latest session: {quotes[0]['asOf']}. Missing dates are omitted where NSE did not publish a final file.\n"
    + "Change is (close / previous close - 1) x 100. Volume multiple compares latest-day shares traded with the arithmetic mean of the prior 20 available EQ sessions.\n"
)
(OUT / "SOURCE.txt").write_text(source_note, encoding="utf-8")
print(json.dumps({"quotes": len(quotes), "sessions": len({r['date'] for r in window_records}), "rows": len(window_records), "asOf": quotes[0]["asOf"], "files": [str(flat_path), str(json_path)]}, indent=2))

