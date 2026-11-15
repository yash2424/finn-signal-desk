# FINN Signal Desk

A mobile-first investment research prototype with two workflows:

- **Push** collects dated issuer filing examples and NSE end-of-day price/volume observations. Users can filter by company, attention level, snapshot window, and locally saved move/volume thresholds.
- **Pull** opens a cited brief for every watchlist company: reported figures, a two-sided research view, and a deterministic search across the included evidence. Every figure and claim opens its source PDF at the cited page. Any other NSE symbol can be researched live (overview plus follow-up questions) with the visitor's own Anthropic API key.

The default snapshot is dated **13 Nov 2026**. Its EOD observations use the NSE CM-UDiFF Common Bhavcopy close and the prior 20 available NSE EQ sessions for relative volume. Filing examples preserve their original **Apr–May 2025** publication dates. Pull covers all 18 watchlist companies with briefs built from each company's FY2025-26 annual report and its latest earnings-call transcript (calls held Jul–Nov 2026; ITC has no transcript, so its brief uses the annual report only), plus three FY25 on-demand briefs outside the watchlist (Bajaj Finance, Titan Company, and Dr Reddy’s).

## Run locally

Requirements: Node.js 20 or later and npm. No API keys are required.

```sh
npm ci
npm run dev
```

The production build is static and emitted to `dist/`:

```sh
npm run build
npm run preview
```

Vite uses relative asset paths so the build works on a GitHub Pages project site. The published build is on the `gh-pages` branch, served from its root. To refresh the demo, run `npm ci && npm run build` and publish the contents of `dist/` to that branch.

## Evaluator quickstart

1. In **Push**, open **Digest rules** and change the price-move or volume-vs-average slider. These filters are saved in browser-local storage and apply to the dated snapshot.
2. Change the window from **All snapshot dates** to **24h**, **7d**, or **30d**. Windows are anchored to 13 Nov 2026. The three filing examples are FY25 records, so shorter windows leave only matching market observations.
3. Switch to **Pull** and open any watchlist company (for example `HDFCBANK` or `RELIANCE`). Click **Source** on a figure: the filing opens at the cited PDF page. Search a term such as `deposits` or `margin`; results are labeled paraphrases, reported figures, or source topics.
4. Enter a symbol outside the snapshot (for example `TRENT`). With an Anthropic API key, **Research** produces a cited overview from BSE/NSE filings, and you can ask follow-up questions.

Search over the bundled briefs is deterministic and local: it removes common question words, matches whole words against included report/transcript notes, topic labels, and reported figures, and returns up to five ranked matches. It does not call a language model. No answer is generated when the index cannot support a query.

### Live research for other companies

For symbols outside the snapshot, `src/liveResearchApi.ts` calls Claude (`claude-opus-5-5`) directly from the browser with the visitor's own API key, because the site is static and has no server to hold one. The key is kept in session storage for that tab and sent only to `api.anthropic.com`. Claude may only use web search and web fetch on `bseindia.com`, `nseindia.com` and `screener.in`, is told to rely only on annual reports, results filings and call transcripts, and returns citations that link to the filing (at the cited page for PDFs). Server-side refusal fallbacks (`fallbacks: "default"`) are enabled. Each run costs API credit; answers are model-generated and should be checked against the cited documents.

## Data and behavior

The bundled snapshot is `app/data/finn-demo.json`. It contains 18 portfolio companies, 18 NSE EOD quote metrics, three FY25 results-release examples, 18 watchlist Pull briefs (35 BSE-filed or issuer-hosted documents, built by `scripts/portfolio_briefs.py`), and three ad-hoc FY25 Pull profiles. The market snapshot is dated 13 Nov 2026; every document keeps its own date. EOD source URLs and formulas are documented in [`app/data/eod/README.md`](app/data/eod/README.md). The fetch/build scripts are `scripts/fetch_nse_eod.py` and `scripts/build_finn_demo.py`.

Pull searches only the bundled company brief evidence, reported figures, and source-topic index; it does not call an LLM or invent unsupported answers. Evidence snippets are explicitly labeled as paraphrases, figures, topics, or verbatim excerpts when a direct excerpt is present. Unknown symbols show that no cited brief exists, a link to the NSE corporate-filings directory, and the optional live research panel.

The app has no live exchange connection, filing-ingestion service, background alert delivery, login, portfolio sync, or server-side AI; live research runs only in the visitor's browser with their key. Thresholds are browser-local filters over the snapshot, not live alerts. The window selector defaults to **All snapshot dates** so the historic examples stay visible; the suggested 24-hour default is not implemented. The NSE company directory and issuer investor-relations links are navigation aids, not verified coverage. The filing archive is a small historical sample; it does not compare current/prior-quarter and year-over-year revenue, EBITDA, PBT, and PAT across the full portfolio, and should not be read as a full results-alert engine.

All output is for research workflow demonstration and is not a buy/sell recommendation.

## Source material and build notes

- Screenshots: [desktop Push](submission/preview/desktop-push.png), [mobile Pull](submission/preview/mobile-pull.png), and [mobile evidence result](submission/preview/mobile-evidence.png).
- The public bundle includes derived EOD metrics, source notes, and the refresh script. The 378-row filtered CSV and private assignment/research files remain local and are excluded from the repository and delivery ZIP.
- The submission folder includes the factual AI build history, a sanitized export of available user/assistant text messages, and the covering-email draft.
