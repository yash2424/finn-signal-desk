# NSE end-of-day snapshot

This dated research snapshot contains derived quote metrics for **18 NSE EQ-series companies** through **13 November 2026**. The data was fetched on 15 November 2026 from NSE India's official **CM-UDiFF Common Bhavcopy Final** daily archive.

The source archive URL pattern and fetch time are recorded in [`SOURCE.txt`](./SOURCE.txt). The derived quote file is [`quotes_2026-11-13.json`](./quotes_2026-11-13.json), with the archive URL retained on each quote. A 378-row (18 × 21 sessions) filtered CSV is retained in the local working copy for audit and reproducibility checks; it is excluded from the public repository and delivery ZIP. The fetch script can regenerate it when needed.

## Calculation

- **Close and daily change:** the NSE EQ-series close and prior close from the latest available session; change is `(close / previous close - 1) × 100`.
- **Latest volume:** total traded shares in the latest available session.
- **20-session average:** arithmetic mean of traded shares for the 20 available sessions immediately before the latest session.
- **Volume multiple:** latest-session shares divided by that 20-session mean.

The data is a historical prototype snapshot, not a live feed or a trading recommendation. `python scripts/fetch_nse_eod.py` rebuilds the snapshot using the official archive URL pattern; it requires Python 3 and the `requests` package. The script date range is set to reproduce this 13 November snapshot. NSE is the source of the underlying exchange data; consult NSE's current data-sharing terms before redistributing or using exchange data commercially.

