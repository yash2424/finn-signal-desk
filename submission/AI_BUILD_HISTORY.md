# AI build history

**Project:** FINN — mobile-first investment research prototype  
**Date:** 15 November 2026  
**Record type:** factual task log, compiled from the available work records

## What this record contains

This document records the work completed for this prototype, the roles assigned to the AI-assisted work, and the implementation decisions visible in the project. A separate [conversation export](./AI_CONVERSATION_EXPORT.md) preserves the relevant user/assistant text messages from the local task session. It excludes machine-specific environment context, system/developer instructions, and tool calls/results. It is not a full transcript of tool activity or subagent conversations; those are summarized here from the work records. No evaluator-shareable conversation links were available, and none are fabricated. No private credentials are included.

The task coordinator cannot reliably report its own model identity. The assigned subtask models are recorded below from the work orchestration details: `gpt-6-luna` (maximum effort) for assignment research, application implementation, and this release/docs work; `gpt-6.1-sol` (high effort) for design direction. This identifies the assigned roles, not a verbatim transcript or proof of every internal inference.

## Work log

### 15 November 2026 — Assignment review

- **Research role:** Retrieved the main assignment brief and glossary from the supplied Google Drive materials and recorded a local requirements summary. The raw brief, glossary, and private research notes stay in the working folder and are not part of the public release.
- **Product decision:** Focus on a small, polished Push/Pull workflow. The brief favors a thin working prototype over broad coverage and requires Pull research to use primary company reports and transcripts rather than broker research, news, or unsupported model knowledge.
- **Scope decision:** Treat live data, always-on alert scheduling, public repository visibility, and a live model call as optional implementation choices, not guaranteed assignment requirements. Clearly identify any demo or snapshot data in the app and docs.
- **Design role (`gpt-6.1-sol`, high effort):** Produced a design direction specifying a mobile-first financial broadsheet layout, Push/Pull bottom navigation, claim-adjacent source evidence and a responsive source detail sheet, along with visual references and accessibility targets. The internal design note is not part of the public release.
- **Assignment research role (`gpt-6-luna`, maximum effort):** Extracted the brief, glossary, data-source constraints, and deliverables into the source-linked assignment summary. The summaries and product choices were shared with the implementation and release roles.

### 15 November 2026 — Workspace and release setup

- **Workspace/release role:** Confirmed the supplied project workspace was initially empty; checked local Git/GitHub CLI availability and verified an authenticated GitHub CLI session with repository access. Credential values were not read into this record.
- **Deployment setup:** Chose branch-based GitHub Pages deployment from a dedicated `gh-pages` branch. The tracked source repository contains the app and reproducibility files; a separate branch contains only the built static site.
- **Source hygiene:** Added [`.gitignore`](../.gitignore) for dependencies, generated build output, local environment files, logs, private research/assignment material, and the local-only workflow draft.
- **Repository decision:** Checked that `yash2424/finn-signal-desk` did not resolve to an existing GitHub repository before release. Repository creation and publication results are recorded below after deployment.
- **Conversation export:** Matched the exact task session in local Codex logs and wrote a sanitized export of its genuine user/assistant text messages to [`AI_CONVERSATION_EXPORT.md`](./AI_CONVERSATION_EXPORT.md). The export excludes other sessions, system/developer instructions, machine environment details, tool traces, and Drive document contents. It makes no claim to include separate agent transcripts.
- **Model role (`gpt-6-luna`, maximum effort):** Application implementation is being carried out by a separate coding role, with release/docs work coordinated alongside it to avoid competing edits to app files.

### 15 November 2026 — Application implementation

- **Build role (`gpt-6-luna`, maximum effort):** Implemented a Vite/React/TypeScript responsive web app with two workflows. Push derives 18 dated NSE price/volume rows plus three historical issuer results releases; users can filter by company/type/priority/window and set browser-local thresholds. Pull provides three on-demand company briefs and a source drawer for each included issuer document.
- **Retrieval decision:** No runtime model call or external API is used. Search tokenizes a query, scores case-insensitive substring matches against indexed company evidence, reported figures, and source topics, then returns up to five labeled results. The included snippets are identified as paraphrases when they are not verbatim source quotations; unsupported queries return no generated analysis.
- **Scope trade-offs:** The Push window selector defaults to all snapshot dates so the historical FY25 examples remain visible; the suggested 24-hour default is not implemented. The 24-hour, 7-day, and 30-day filters are anchored to 13 November 2026. Thresholds filter the static snapshot on this device; there is no background alert delivery, live exchange feed, filing ingestion, portfolio sync, login, or server-side AI.

### 15 November 2026 — Exchange snapshot preparation

- **Data role (`gpt-6-luna`, maximum effort):** Retrieved official NSE CM-UDiFF Common Bhavcopy Final files for 18 NSE EQ-series symbols across 21 sessions through 13 November 2026 (378 observations). The snapshot's source URL pattern, fetch time, and metric formulas are documented in [`app/data/eod/README.md`](../app/data/eod/README.md).
- **Release decision:** Keep the full filtered 378-row CSV locally for evidence, but exclude it and the raw assignment/research folder from publication. Publish only the derived latest quote metrics and source attribution, plus a reproducibility script. This supports transparent evaluation without including assignment materials or the bulk historical extract.

## Validation and release

- **Data validation:** 18 portfolios, 18 quote records, three historical Push filing examples, three ad-hoc Pull briefs, and six issuer annual-report/transcript source records are included. The latest NSE quotes are dated 13 November 2026. The 378-row/21-session CSV remains local and is excluded from the public release.
- **Build:** `npm run build` completed successfully (TypeScript check plus Vite production build).
- **Interaction and responsive review:** Playwright checks passed at 360, 390, and 1440 px. No horizontal overflow, page errors, or browser-console errors were observed. The checks confirmed threshold filtering and reload persistence, 30-day filing-window filtering, source drawer close button and Escape behavior, all three Pull cards, an `AUM` source-backed search, NSE ticker aliases without `.NS`, and coverage states for known-unindexed and unknown tickers.
- **Repository and hosted demo:** URLs, commit hash, GitHub Actions run, and hosted-page verification will be recorded here after release.

