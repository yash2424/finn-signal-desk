"""Cited Pull briefs for the 18 watchlist companies.

Every figure was read from the BSE-filed FY2025-26 annual report or the latest
earnings-call transcript listed for the company. Page references are PDF page
numbers of the linked file, so `url#page=N` opens the cited page directly.
"""
from __future__ import annotations

BSE = "https://www.bseindia.com/xml-data/corpfiling/AttachHis/"

DOCS = {
    # ticker: (annual report file id, filed date, call url, call title, call date, call period)
    "RELIANCE": ("cc08294f-ec68-4f15-aaa4-c14a3c4bdfb2", None, BSE + "8e997741-4d35-4188-933a-cf020fb9c816.pdf", "Reliance Industries Q2 FY2026-27 Media & Analyst Meet Transcript", "2026-10-30", "Quarter ended 2026-09-30"),
    "HDFCBANK": ("7d621500-082a-4342-b98d-ba677d3890c5", "2026-07-10", BSE + "d7e45614-ae12-4bb9-b92d-623b3a63f166.pdf", "HDFC Bank Q2 FY2027 Earnings Call Transcript", "2026-10-23", "Quarter ended 2026-09-30"),
    "ICICIBANK": ("01c30537-c969-4503-bbae-a07d51eb09a5", "2026-07-18", "https://www.icici.bank.in/content/dam/icicibank/india/managed-assets/docs/about-us/2027/transcript-for-earnings-call-held-on-july-18-2026.pdf", "ICICI Bank Q1 FY2027 Earnings Call Transcript", "2026-07-18", "Quarter ended 2026-06-30"),
    "SBIN": ("faa17496-838f-432d-a39f-32d82156799c", None, BSE + "91e92b69-f201-4d3b-9060-9f75feee9a58.pdf", "State Bank of India Q2 FY2027 Analyst Meet Transcript", "2026-11-03", "Quarter ended 2026-09-30"),
    "TCS": ("ad42e748-d73c-4c79-8c52-bcf1b1399bc1", None, BSE + "7dc14216-f892-46f1-bf82-5c7b387a83b9.pdf", "TCS Q2 FY2027 Earnings Call Transcript", "2026-10-14", "Quarter ended 2026-09-30"),
    "INFY": ("19dd605c-2b6b-4084-8dca-9d578a3eb7a0", "2026-05-29", BSE + "7982fc61-7765-4981-ab3d-6aec36ba2137.pdf", "Infosys Q2 FY2027 Press Conference and Earnings Call Transcripts", "2026-10-28", "Quarter ended 2026-09-30"),
    "WIPRO": ("d4ffaa08-a47a-487b-b136-eb4f26c1bace", "2026-06-22", BSE + "6b741bc5-7ed0-4223-900a-412aaf529820.pdf", "Wipro Q2 FY2027 Earnings Call Transcript", "2026-10-16", "Quarter ended 2026-09-30"),
    "BHARTIARTL": ("f8f6a174-8601-4747-9d0d-bd6b85fe53fc", None, BSE + "1ff3e14f-7e97-4074-89c7-049408721c5e.pdf", "Bharti Airtel Q2 FY2027 Earnings Call Transcript", "2026-11-12", "Quarter ended 2026-09-30"),
    "LT": ("825f9859-e7f2-4e90-8583-01a38850f795", None, "https://investors.larsentoubro.com/upload/Analysttrans/FY2027AnalysttransL%26T-Earnings-Jul28-2026.pdf", "Larsen & Toubro Q1 FY2027 Earnings Conference Call Transcript", "2026-07-28", "Quarter ended 2026-06-30"),
    "ITC": ("590b42ae-15c9-44cf-be69-e58053128a6b", None, None, None, None, None),
    "HINDUNILVR": ("881493e4-75af-4a7f-8c64-9d0886e63f1d", "2026-06-02", BSE + "6d90194e-b9dc-48b0-b48e-3de0d0ef5f6d.pdf", "Hindustan Unilever Q2 FY2027 Earnings Call Transcript", "2026-11-04", "Quarter ended 2026-09-30"),
    "BAJAJ-AUTO": ("5cfa2fc3-ea76-452d-a3a9-71d3c9bf5ad6", "2026-06-25", BSE + "c7171a79-5c93-47e1-b324-9056d5abea0e.pdf", "Bajaj Auto Q2 FY2027 Earnings Call Transcript", "2026-11-02", "Quarter ended 2026-09-30"),
    "MARUTI": ("09d38ee6-9c30-4892-b483-8d7c34697a7a", "2026-08-08", "https://www.marutisuzuki.com/content/dam/arena-eds/corporate/pdf/company-reports/2026-2027/Transcript_earnings_call_Maruti_Suzuki_Q2_FY_27.pdf", "Maruti Suzuki Q2 FY2027 Earnings Conference Call Transcript", "2026-10-27", "Quarter ended 2026-09-30"),
    "SUNPHARMA": ("cb65dea5-416a-4f98-95e2-0b58761b7442", None, BSE + "fe431adc-0e1a-48ee-9c2b-b6e39cba04e4.pdf", "Sun Pharmaceutical Q2 FY2027 Earnings Call Transcript", "2026-11-04", "Quarter ended 2026-09-30"),
    "NTPC": ("dbc69766-f1e1-4ecc-9fa9-7599477167db", None, BSE + "4d962dc4-6133-4998-8d2e-9fa5fec441f5.pdf", "NTPC Q2 FY2027 Conference Call with Analysts & Investors — Transcript", "2026-10-31", "Quarter ended 2026-09-30"),
    "TATAPOWER": ("a5491ca0-092d-4f99-a329-c62579cc6ef2", "2026-06-10", BSE + "f2eec946-af3f-4579-8a6b-1483aa6f7312.pdf", "Tata Power Q1 FY2027 Earnings Call Transcript", "2026-07-31", "Quarter ended 2026-06-30"),
    "ASIANPAINT": ("aeefecce-2626-4370-9455-c7c6dd94d670", "2026-06-12", BSE + "ee7e6efe-1f9b-4b5e-bff7-1da18902ffeb.pdf", "Asian Paints Q2 FY2027 Earnings Call Transcript", "2026-11-03", "Quarter ended 2026-09-30"),
    "HINDALCO": ("bb3b7080-855f-4cde-b688-d97575a72f3f", None, BSE + "0aa25d27-af53-48a8-bef6-dbfe01cd85a1.pdf", "Hindalco Industries Q2 FY2027 Earnings Call Transcript", "2026-11-12", "Quarter ended 2026-09-30"),
}


def _sources(ticker: str, name: str, ar_supports: list[str], call_supports: list[str]):
    ar_id, filed, call_url, call_title, call_date, call_period = DOCS[ticker]
    key = ticker.lower()
    out = {
        "ar": {
            "id": f"{key}-ar26",
            "title": f"{name} Annual Report 2025-26",
            "url": BSE + ar_id + ".pdf",
            "sourceType": "annual_report",
            "publishedAt": filed,
            "dateLabel": f"FY2025-26 report; filed with BSE {filed}" if filed else "FY2025-26 report as filed with BSE",
            "reportingPeriod": "Year ended 2026-03-31",
            "pageOrSection": "Annual report (BSE filing)",
            "basis": "Company-reported audited figures; page numbers are PDF pages of the linked BSE file",
            "supports": ar_supports,
        }
    }
    if call_url:
        out["call"] = {
            "id": f"{key}-call",
            "title": call_title,
            "url": call_url,
            "sourceType": "concall_transcript",
            "publishedAt": call_date,
            "dateLabel": f"Call transcript dated {call_date}",
            "reportingPeriod": call_period,
            "pageOrSection": "Earnings-call transcript",
            "basis": "Management commentary; page numbers are PDF pages of the linked transcript",
            "supports": call_supports,
        }
    return out


def _m(label, value, unit, period, src, page, yoy=None, basis=None, terms=None):
    row = {"label": label, "value": value, "unit": unit, "period": period, "sourceId": src, "pageOrSection": page}
    if yoy is not None:
        row["changeYoYPct"] = yoy
    if basis:
        row["basis"] = basis
    if terms:
        row["searchTerms"] = terms
    return row


def _c(claim, src, page):
    return {"claim": claim, "sourceId": src, "pageOrSection": page}


def _e(claim, src, page):
    return {"claim": claim, "sourceId": src, "pageOrSection": page, "excerpt": claim, "excerptType": "paraphrase"}


def _brief(ticker, name, src, *, snapshot, thesis, metrics, narrative, cash, bull, bear, evidence, watch):
    has_call = "call" in src
    call_note = f"; latest call {DOCS[ticker][4]}" if has_call else "; no earnings-call transcript found for this issuer"
    return {
        "ticker": ticker + ".NS",
        "name": name,
        "adHoc": False,
        "type": "portfolio",
        "asOf": "FY2025-26",
        "period": "Year ended 2026-03-31" + call_note,
        "basis": "Company-reported figures; ₹ crore unless stated. Where a document states figures but not the growth rate, the YoY % shown is computed from the two reported years; ₹ million figures are converted to ₹ crore (÷10).",
        "businessSnapshot": snapshot,
        "thesis": thesis,
        "metrics": metrics,
        "narrativeVsNumbers": narrative,
        "cashQuality": cash,
        "bull": bull,
        "bear": bear,
        "evidence": evidence,
        "watchItems": watch,
        "sources": [src["ar"]] + ([src["call"]] if has_call else []),
    }


def build():
    briefs = []

    # ---------- Reliance ----------
    s = _sources("RELIANCE", "Reliance Industries", ["Consolidated revenue, EBITDA, PBT, PAT and operating cash flow", "Retail and Digital Services segment revenue, EBITDA and margins"], ["Q2 FY27 consolidated EBITDA and PAT", "Retail demand, quick-commerce margin pressure, O2C performance, Jio fixed wireless"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("RELIANCE", "Reliance Industries", s,
        snapshot="Conglomerate spanning oil-to-chemicals (O2C), retail, and Jio digital services, plus a new energy business.",
        thesis="FY26 profit grew faster than revenue as Digital Services and O2C drove EBITDA up 13.4%; the latest quarter set an EBITDA record, but management flagged consumer demand and quick-commerce pressure in Retail.",
        metrics=[
            _m("Revenue (value of sales & services)", 1175919, "₹ crore", "FY26", ar, "Ten-year financial summary, PDF p. 44", 9.8, "Consolidated", ["revenue", "sales"]),
            _m("EBITDA", 207911, "₹ crore", "FY26", ar, "Financial performance review, PDF p. 44", 13.4, "Consolidated"),
            _m("Profit before tax", 123162, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 80", 16.2, "Consolidated"),
            _m("Profit after tax", 95754, "₹ crore", "FY26", ar, "Financial performance review, PDF p. 44", 17.8, "Consolidated; after share of associates and JVs"),
            _m("Net cash from operating activities", 192113, "₹ crore", "FY26", ar, "Consolidated cash flow statement, PDF p. 142", 7.5, "Consolidated", ["cash flow", "operating cash"]),
            _m("Digital Services EBITDA margin", 51.1, "%", "FY26", ar, "Digital Services performance, PDF p. 48", None, "Segment; on revenue from operations", ["Jio", "digital", "margin"]),
            _m("Consolidated EBITDA", 62409, "₹ crore", "Q2 FY27", call, "CFO opening remarks, PDF p. 3", 24, "Management-reported", ["quarter", "EBITDA"]),
        ],
        narrative="The annual report shows PAT up 17.8% on revenue up 9.8%, and Retail EBITDA margin slipped to 8.2% from 8.6% while Digital Services margin rose to 51.1%. On the Q2 FY27 call, management called it the strongest quarter yet, with EBITDA up 24%, while describing weaker discretionary demand in Retail.",
        cash="Consolidated operating cash flow rose to ₹1,92,113 crore in FY26 from ₹1,78,703 crore (PDF p. 142), while capex on property, plant, spectrum and intangibles was ₹1,22,916 crore.",
        bull=[_c("FY26 EBITDA rose 13.4% to ₹2,07,911 crore and PAT 17.8% to ₹95,754 crore, led by Digital Services and O2C.", ar, "PDF p. 44"),
              _c("Q2 FY27 consolidated EBITDA was a record ₹62,409 crore, up 24% year on year, with PAT up 34%.", call, "PDF p. 3")],
        bear=[_c("Retail EBITDA margin fell to 8.2% from 8.6% in FY26.", ar, "PDF p. 46"),
              _c("Management cited currency depreciation, a monsoon deficit and food inflation weighing on discretionary demand, and margin pressure from matching quick-commerce prices.", call, "PDF pp. 7, 9")],
        evidence=[
            _e("FY26 consolidated revenue was ₹11,75,919 crore versus ₹10,71,174 crore in FY25.", ar, "Ten-year financial summary, PDF p. 44"),
            _e("Consolidated PBT was ₹1,23,162 crore versus ₹1,06,017 crore; PAT attributable to owners was ₹80,775 crore.", ar, "Board's Report financial results, PDF p. 80"),
            _e("Retail revenue grew 12.1% to ₹3,71,085 crore with EBITDA of ₹27,034 crore; EBITDA margin was 8.2% versus 8.6%.", ar, "Retail performance, PDF p. 46"),
            _e("Digital Services revenue grew 14.3% and EBITDA 17.8%, with margin of 51.1%.", ar, "Digital Services performance, PDF p. 48"),
            _e("Management said demand pressure came from currency depreciation, the monsoon deficit and rising food prices, and that Retail is matching quick-commerce prices in metros to protect market share.", call, "Retail commentary, PDF pp. 7, 9"),
            _e("Jio reported 15.1 million fixed wireless connections and over 78% fixed wireless market share.", call, "Jio commentary, PDF p. 5"),
        ],
        watch=["Retail margin versus quick-commerce price matching", "O2C earnings sustainability after a record quarter", "Capex intensity versus operating cash flow"]))

    # ---------- HDFC Bank ----------
    s = _sources("HDFCBANK", "HDFC Bank", ["Net interest income, other income, net revenues, PAT, NIM, deposits, GNPA and cost-to-income ratio"], ["Q2 FY27 deposit and CASA growth, margin outlook, leadership transition"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("HDFCBANK", "HDFC Bank", s,
        snapshot="Private-sector bank with retail, wholesale and treasury businesses, merged with HDFC Ltd.",
        thesis="FY26 profit grew 10.9% with lower bad loans and a better cost ratio, but net interest income grew only 4.9%; the latest call pointed to a margin recovery as rates turn, under new leadership.",
        metrics=[
            _m("Net interest income", 128686.03, "₹ crore", "FY26", ar, "Financial highlights table, PDF p. 259", 4.9, "Standalone", ["NII", "interest"]),
            _m("Net revenues", 191218.60, "₹ crore", "FY26", ar, "Financial highlights table, PDF p. 259", 13.6, "Standalone"),
            _m("Profit after tax", 74671.3, "₹ crore", "FY26", ar, "Directors' Report, PDF p. 41", 10.9, "Standalone"),
            _m("Net interest margin", 3.34, "%", "FY26", ar, "Directors' Report, PDF p. 41", None, "On average assets", ["NIM", "margin"]),
            _m("Deposits", 3105250, "₹ crore", "2026-03-31", ar, "Financial performance summary, PDF p. 69", 14.4, "Standalone"),
            _m("Gross NPA ratio", 1.15, "%", "2026-03-31", ar, "Financial performance summary, PDF p. 69", None, "Versus 1.33% at 2025-03-31", ["GNPA", "asset quality", "NPA"]),
            _m("Cost-to-income ratio", 38.0, "%", "FY26", ar, "Financial performance summary, PDF p. 69", None, "Versus 40.5% in FY25", ["cost"]),
        ],
        narrative="Net revenues grew 13.6%, helped by other income rising to ₹62,533 crore from ₹45,632 crore, while core net interest income grew 4.9%. On the Q2 FY27 call, management said margins had borne the brunt of assets repricing faster than deposits and were positioned to recover in a rising-rate cycle.",
        cash=None,
        bull=[_c("Gross NPA ratio improved to 1.15% from 1.33%, and cost-to-income fell to 38.0% from 40.5%.", ar, "PDF p. 69"),
              _c("Q2 FY27 deposits grew 18.8% year on year, about 4 points of it from a special FCNR(B) window; CASA grew about 10.8%.", call, "PDF p. 3")],
        bear=[_c("Net interest income grew only 4.9% in FY26, much slower than net revenues, which were lifted by other income.", ar, "PDF p. 259"),
              _c("Management said margins had absorbed faster asset repricing and a lag in funding costs; a new leader is yet to set out strategy.", call, "PDF pp. 5, 7")],
        evidence=[
            _e("Net interest income was ₹1,28,686 crore in FY26 versus ₹1,22,670 crore; other income was ₹62,533 crore versus ₹45,632 crore.", ar, "Financial highlights table, PDF p. 259"),
            _e("PAT rose 10.9% to ₹74,671 crore; NIM was 3.34% of average assets; the balance sheet grew 11.6% to ₹43,64,886 crore.", ar, "Directors' Report, PDF p. 41"),
            _e("Deposits were ₹31,05,250 crore at March 2026 versus ₹27,14,715 crore; GNPA 1.15% versus 1.33%.", ar, "Financial performance summary, PDF p. 69"),
            _e("Q2 FY27 deposits grew 18.8% year on year including about 4 percentage points from a special FCNR(B) window.", call, "Opening remarks, PDF p. 3"),
            _e("Management said margins were positioned for a reversal as the rate cycle turns upward and retail and MSME assets grow as a share of the book.", call, "Opening remarks, PDF p. 5"),
        ],
        watch=["NIM recovery versus deposit costs", "Deposit growth excluding the FCNR(B) window", "Strategy update from the new leadership"]))

    # ---------- ICICI Bank ----------
    s = _sources("ICICIBANK", "ICICI Bank", ["Standalone and consolidated PAT, NII, NIM, deposits, loans and capital adequacy"], ["Q1 FY27 PAT and deposit growth, retail loan mix, credit cards"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("ICICIBANK", "ICICI Bank", s,
        snapshot="Large private-sector bank with retail, business and corporate banking, plus insurance, asset management and securities subsidiaries.",
        thesis="FY26 net interest income grew 8.5% with NIM steady at 4.32%; Q1 FY27 profit grew 15.9% and deposits 14%, though the credit-card book shrank.",
        metrics=[
            _m("Net interest income", 880.75, "₹ billion", "FY26", ar, "Management discussion, PDF p. 218", 8.5, "Standalone", ["NII", "interest"]),
            _m("Net interest margin", 4.32, "%", "FY26", ar, "Management discussion, PDF p. 218", None, "Stable versus FY25", ["NIM", "margin"]),
            _m("Profit after tax", 501.47, "₹ billion", "FY26", ar, "Management discussion, PDF p. 218", 6.2, "Standalone"),
            _m("Consolidated profit after tax", 542.08, "₹ billion", "FY26", ar, "Consolidated financials, PDF p. 234", 6.2, "Consolidated, Indian GAAP"),
            _m("Total deposits", 17946.25, "₹ billion", "2026-03-31", ar, "Key highlights, PDF p. 103"),
            _m("Capital adequacy ratio", 17.18, "%", "2026-03-31", ar, "Key highlights, PDF p. 103", None, None, ["capital", "CAR"]),
            _m("Profit after tax", 148.05, "₹ billion", "Q1 FY27", call, "Opening remarks, PDF p. 3", 15.9, "Standalone, management-reported", ["quarter"]),
        ],
        narrative="The annual report attributes NII growth to higher average interest-earning assets, with NIM unchanged at 4.32%. PAT grew 6.2% for the year, then accelerated to 15.9% in Q1 FY27.",
        cash=None,
        bull=[_c("NII grew 8.5% to ₹880.75 billion with NIM stable at 4.32%.", ar, "PDF p. 218"),
              _c("Q1 FY27 PAT grew 15.9% to ₹148.05 billion and deposits 14.0% year on year.", call, "PDF p. 3")],
        bear=[_c("FY26 standalone PAT grew 6.2%, slower than NII.", ar, "PDF p. 218"),
              _c("The credit-card portfolio declined 1.9% year on year and 1.7% sequentially in Q1 FY27.", call, "PDF p. 5")],
        evidence=[
            _e("Profit after tax rose from ₹472.27 billion to ₹501.47 billion; NII rose 8.5% to ₹880.75 billion; NIM was 4.32% in both years.", ar, "Management discussion, PDF p. 218"),
            _e("Consolidated PAT rose from ₹510.29 billion to ₹542.08 billion.", ar, "Consolidated financials, PDF p. 234"),
            _e("At March 2026 the bank reported capital adequacy of 17.18% and total deposits of ₹17,946.25 billion.", ar, "Key highlights, PDF p. 103"),
            _e("Q1 FY27 PAT grew 15.9% to ₹148.05 billion; deposits grew 14.0% year on year and 2.2% sequentially.", call, "Opening remarks, PDF p. 3"),
            _e("The credit-card portfolio declined 1.9% year on year; personal loans grew 12.9%.", call, "Loan portfolio, PDF p. 5"),
        ],
        watch=["Loan growth sustainability (analysts asked about high-teens growth)", "Credit-card book trend", "NIM as rates move"]))

    # ---------- SBI ----------
    s = _sources("SBIN", "State Bank of India", ["Net profit, operating profit, NII, cost-to-income, RoA, RoE, total assets and provision coverage"], ["Q2 FY27 net profit, operating profit, domestic NIM and H1 returns"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("SBIN", "State Bank of India", s,
        snapshot="Government-controlled bank with a nationwide branch network and subsidiaries in insurance, cards and asset management.",
        thesis="FY26 net profit grew 12.9% to ₹80,032 crore on cost control and better returns, while net interest income grew only 4.1%; the Q2 FY27 domestic NIM was 3.11%.",
        metrics=[
            _m("Net profit", 80032, "₹ crore", "FY26", ar, "Financial performance, PDF p. 49", 12.88, "Standalone"),
            _m("Operating profit", 123015, "₹ crore", "FY26", ar, "Financial performance, PDF p. 49", 11.25, "Standalone"),
            _m("Net interest income", 1.73, "₹ lakh crore", "FY26", ar, "Chairman's message, PDF p. 18", 4.08, "Standalone", ["NII", "interest"]),
            _m("Cost-to-income ratio", 50.11, "%", "FY26", ar, "Chairman's message, PDF p. 18", None, "Versus 51.64% in FY25", ["cost"]),
            _m("Return on equity", 18.57, "%", "FY26", ar, "Chairman's message, PDF p. 18", None, "RoA 1.12%", ["RoE", "RoA", "return"]),
            _m("Provision coverage ratio", 91.97, "%", "2026-03-31", ar, "Financial performance, PDF p. 49", None, "Including AUCA", ["NPA", "provision", "asset quality"]),
            _m("Net profit", 23038, "₹ crore", "Q2 FY27", call, "Opening remarks, PDF p. 5", None, "Management-reported", ["quarter"]),
        ],
        narrative="Profit growth of 12.9% outpaced NII growth of 4.1%, helped by a lower cost-to-income ratio (50.11% from 51.64%). In Q2 FY27, operating profit grew 7.28% and domestic NIM improved to 3.11%.",
        cash=None,
        bull=[_c("FY26 net profit rose 12.88% to ₹80,032 crore; RoA improved to 1.12% and RoE was 18.57%.", ar, "PDF pp. 18, 49"),
              _c("Q2 FY27 net profit was ₹23,038 crore and domestic NIM improved to 3.11%; H1 RoE was 18.68%.", call, "PDF p. 5")],
        bear=[_c("Net interest income grew only 4.08% in FY26.", ar, "PDF p. 18"),
              _c("Q2 FY27 operating profit growth slowed to 7.28% year on year.", call, "PDF p. 5")],
        evidence=[
            _e("Net profit increased 12.88% to ₹80,032 crore from ₹70,901 crore; operating profit rose 11.25% to ₹1,23,015 crore.", ar, "Financial performance, PDF p. 49"),
            _e("NII grew 4.08% to ₹1.73 lakh crore; cost-to-income improved to 50.11%; RoA was 1.12% and RoE 18.57%.", ar, "Chairman's message, PDF p. 18"),
            _e("Total assets increased 14.18% to ₹76,23,012 crore; provision coverage was 91.97%.", ar, "Financial performance, PDF p. 49"),
            _e("Q2 FY27 net profit was ₹23,038 crore, operating profit ₹34,226 crore (+7.28%), and domestic NIM 3.11%.", call, "Opening remarks, PDF p. 5"),
        ],
        watch=["NII growth versus loan growth", "Operating profit trend after Q2's 7.3%", "Asset quality and provision coverage"]))

    # ---------- TCS ----------
    s = _sources("TCS", "Tata Consultancy Services", ["Consolidated revenue, operating income and margin, net income and net margin"], ["Q2 FY27 revenue and constant-currency growth, demand environment, bench and subcontractor costs"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("TCS", "Tata Consultancy Services", s,
        snapshot="IT services company serving global enterprises across banking, retail, manufacturing and other industries.",
        thesis="FY26 revenue grew 4.6% but margins reached a four-year high (operating 25.0%, net 19.8%); Q2 FY27 growth stayed low at 2.8% in constant currency as management described demand as selective and uneven.",
        metrics=[
            _m("Revenue", 267021, "₹ crore", "FY26", ar, "Chairman's letter, PDF p. 9", 4.6, "Consolidated"),
            _m("Operating income", 66838, "₹ crore", "FY26", ar, "Chairman's letter, PDF p. 9", None, "Consolidated", ["EBIT", "operating profit"]),
            _m("Operating margin", 25.0, "%", "FY26", ar, "Chairman's letter, PDF p. 9", None, "Highest in four years", ["margin"]),
            _m("Net income", 52820, "₹ crore", "FY26", ar, "Chairman's letter, PDF p. 9", 8.8, "Consolidated", ["PAT", "profit"]),
            _m("Revenue", 73188, "₹ crore", "Q2 FY27", call, "Opening remarks, PDF p. 3", 2.8, "YoY growth in constant currency", ["quarter"]),
        ],
        narrative="Net income grew 8.8%, nearly twice revenue growth of 4.6%, as margins improved. In Q2 FY27, revenue grew 0.5% sequentially in constant currency; management cited a higher bench and subcontractor costs as margin headwinds, partly offset by currency gains.",
        cash=None,
        bull=[_c("FY26 operating margin of 25.0% and net margin of 19.8% were the highest in four years; net income grew 8.8%.", ar, "PDF p. 9"),
              _c("All international markets grew sequentially in Q2 FY27, led by the UK at 3.5%.", call, "PDF p. 3")],
        bear=[_c("FY26 revenue grew only 4.6%.", ar, "PDF p. 9"),
              _c("Management described the environment as selective and uneven, and cited bench and subcontractor costs as headwinds; it gives no guidance.", call, "PDF pp. 3, 5")],
        evidence=[
            _e("FY26 consolidated revenue was ₹2,67,021 crore, up 4.6%; operating income ₹66,838 crore at a 25.0% margin; net income ₹52,820 crore, up 8.8%, at a 19.8% margin.", ar, "Chairman's letter, PDF p. 9"),
            _e("Q2 FY27 revenue was ₹73,188 crore, up 0.5% sequentially and 2.8% year on year in constant currency.", call, "Opening remarks, PDF p. 3"),
            _e("Management said it invested in a higher bench and more subcontractors, partly offset by currency gains and operating leverage.", call, "Margin commentary, PDF p. 5"),
        ],
        watch=["Constant-currency growth versus peers", "Margin after bench and subcontractor investment", "Demand in North America and BFSI"]))

    # ---------- Infosys ----------
    s = _sources("INFY", "Infosys", ["Consolidated and standalone revenue, expenses, PBT and labour-code exceptional item"], ["Q2 FY27 operating margin, free cash flow, FY27 revenue and margin guidance, vertical demand"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("INFY", "Infosys", s,
        snapshot="Global IT services and consulting company, with digital, cloud and AI services for enterprise clients.",
        thesis="FY26 revenue grew 9.6% but PBT only 6.3% after a ₹1,289 crore labour-code charge; FY27 guidance of 1-2% constant-currency growth signals a much slower year.",
        metrics=[
            _m("Revenue from operations", 178650, "₹ crore", "FY26", ar, "Board's Report financial performance, PDF p. 34", 9.6, "Consolidated"),
            _m("Profit before tax", 39995, "₹ crore", "FY26", ar, "Board's Report financial performance, PDF p. 34", 6.3, "Consolidated; after labour-code exceptional item", ["PBT", "profit"]),
            _m("Exceptional item: impact of Labour Codes", 1289, "₹ crore", "FY26", ar, "Board's Report financial performance, PDF p. 34", None, "Consolidated", ["labour", "exceptional"]),
            _m("Operating margin", 21, "%", "Q2 FY27", call, "Press conference remarks, PDF p. 4", None, "Management-reported", ["margin"]),
            _m("Free cash flow", 928, "US$ million", "Q2 FY27", call, "Press conference remarks, PDF p. 4", None, "Management-reported", ["cash flow", "FCF"]),
            _m("FY27 revenue growth guidance", "1% to 2%", "", "FY27", call, "Press conference remarks, PDF p. 4", None, "Constant currency; margin guidance 20%-22%", ["guidance", "outlook"]),
        ],
        narrative="Revenue grew 9.6% in rupees, while expenses grew 9.9% and a labour-code charge cut PBT growth to 6.3%. For FY27, management guided to 1%-2% constant-currency growth and a 20%-22% operating margin, citing strength in financial services and weakness in retail and hi-tech.",
        cash="Management reported Q2 FY27 free cash flow of US$928 million.",
        bull=[_c("FY26 consolidated revenue grew 9.6% to ₹1,78,650 crore.", ar, "PDF p. 34"),
              _c("Q2 FY27 operating margin was stable at 21% with free cash flow of US$928 million.", call, "PDF p. 4")],
        bear=[_c("PBT grew only 6.3% after a ₹1,289 crore labour-code exceptional charge.", ar, "PDF p. 34"),
              _c("FY27 revenue guidance is 1%-2% in constant currency; management saw weakness in retail and hi-tech.", call, "PDF pp. 4-5")],
        evidence=[
            _e("Consolidated revenue was ₹1,78,650 crore versus ₹1,62,990 crore; PBT was ₹39,995 crore versus ₹37,608 crore after a ₹1,289 crore labour-code charge.", ar, "Board's Report financial performance, PDF p. 34"),
            _e("FY27 revenue growth guidance is 1%-2% in constant currency, and operating margin guidance remains 20%-22%.", call, "Press conference remarks, PDF p. 4"),
            _e("Management saw strength in financial services, energy utilities and manufacturing, and weakness in retail and hi-tech.", call, "Q&A, PDF p. 5"),
        ],
        watch=["Delivery against the 1%-2% FY27 guidance", "Margin within the 20%-22% band", "Retail and hi-tech demand"]))

    # ---------- Wipro ----------
    s = _sources("WIPRO", "Wipro", ["Consolidated and standalone sales and net profit"], ["Q2 FY27 IT services revenue, operating margin, Q3 guidance, US healthcare"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("WIPRO", "Wipro", s,
        snapshot="IT services and consulting company serving global clients, with strategic market units across the Americas, Europe and APMEA.",
        thesis="Growth is flat: FY26 sales grew 4.0% and net profit 0.4%, Q2 FY27 IT services revenue was flat sequentially, and Q3 guidance allows for a decline.",
        metrics=[
            _m("Sales", 92624, "₹ crore", "FY26", ar, "Board's Report financial performance, PDF p. 109", 3.97, "Consolidated; reported as ₹926,240 million", ["revenue"]),
            _m("Net profit", 13265.5, "₹ crore", "FY26", ar, "Board's Report financial performance, PDF p. 109", 0.36, "Consolidated; reported as ₹132,655 million", ["PAT", "profit"]),
            _m("IT services revenue", 2.61, "US$ billion", "Q2 FY27", call, "CFO remarks, PDF p. 4", 0.6, "YoY growth in constant currency", ["quarter"]),
            _m("Operating margin", 16.5, "%", "Q2 FY27", call, "CFO remarks, PDF p. 4", None, "Up 0.5 points sequentially", ["margin"]),
            _m("Q3 FY27 revenue guidance", "-1.5% to +0.5%", "", "Q3 FY27", call, "Guidance, PDF p. 5", None, "Sequential, constant currency", ["guidance", "outlook"]),
        ],
        narrative="Consolidated sales grew 3.97% and net profit 0.36% in FY26. In Q2 FY27 revenue was flat sequentially; management said US healthcare is affected by policy changes and guided Q3 to between -1.5% and +0.5% sequentially, citing seasonal furloughs.",
        cash=None,
        bull=[_c("Q2 FY27 operating margin improved 0.5 points to 16.5%, and three of four market units grew sequentially.", call, "PDF p. 4"),
              _c("Standalone net profit grew 11.15% in FY26.", ar, "PDF p. 109")],
        bear=[_c("Consolidated net profit grew only 0.36% in FY26 on 3.97% sales growth.", ar, "PDF p. 109"),
              _c("Q3 FY27 guidance is -1.5% to +0.5% sequential growth; US healthcare is affected by policy changes.", call, "PDF pp. 4-5")],
        evidence=[
            _e("Consolidated sales rose to ₹926,240 million from ₹890,884 million (+3.97%); net profit to ₹132,655 million from ₹132,180 million (+0.36%).", ar, "Board's Report financial performance, PDF p. 109"),
            _e("Q2 FY27 IT services revenue was US$2.61 billion, flat sequentially and up 0.6% year on year in constant currency; operating margin 16.5%.", call, "CFO remarks, PDF p. 4"),
            _e("Wipro guided Q3 FY27 IT services revenue growth of -1.5% to +0.5% sequentially in constant currency.", call, "Guidance, PDF p. 5"),
        ],
        watch=["Return to sequential growth", "US healthcare policy impact", "Margin after the Q2 improvement"]))

    # ---------- Bharti Airtel ----------
    s = _sources("BHARTIARTL", "Bharti Airtel", ["Consolidated revenue, EBITDAaL, PBT, net profit; ARPU and leverage"], ["Q2 FY27 consolidated revenue and EBITDAaL, Africa and India growth, cost pressures"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("BHARTIARTL", "Bharti Airtel", s,
        snapshot="Telecom operator in India and Africa offering mobile, home broadband, enterprise and digital services.",
        thesis="FY26 consolidated revenue rose 16.2% and EBITDAaL 15.7%, with India ARPU up to ₹257; reported PBT grew only 2% because FY25 included one-time gains.",
        metrics=[
            _m("Gross revenue", 210972.8, "₹ crore", "FY26", ar, "MD&A financial review, PDF p. 91", 16.2, "Consolidated; reported as ₹2,109,728 million", ["revenue"]),
            _m("EBITDAaL", 107946, "₹ crore", "FY26", ar, "MD&A financial review, PDF p. 91", 15.7, "Consolidated; EBITDA after leases", ["EBITDA"]),
            _m("Profit before exceptional items and tax", 48590.2, "₹ crore", "FY26", ar, "MD&A financial review, PDF p. 91", 31.4, "Consolidated", ["PBT", "profit"]),
            _m("Profit before tax", 45172.7, "₹ crore", "FY26", ar, "MD&A financial review, PDF p. 91", 2.1, "Consolidated; FY25 included one-time exceptional gains"),
            _m("ARPU", 257, "₹", "FY26 exit", ar, "Standalone highlights, PDF p. 50", None, "Standalone; up ₹12 year on year", ["ARPU", "pricing"]),
            _m("EBITDAaL margin", 51.7, "%", "Q2 FY27", call, "Opening remarks, PDF p. 3", None, "Consolidated, management-reported", ["margin"]),
        ],
        narrative="Profit before exceptional items rose 31% to ₹48,590 crore, but reported PBT rose only 2.1% because FY25 included one-time gains. In Q2 FY27, revenue grew 4% sequentially to about ₹60,900 crore, and management flagged building cost pressures.",
        cash=None,
        bull=[_c("FY26 consolidated revenue grew 16.2% and EBITDAaL 15.7%; India ARPU rose ₹12 to ₹257.", ar, "PDF pp. 4, 50"),
              _c("Q2 FY27 revenue grew 4% sequentially, Africa 6.7% in constant currency, with a 51.7% EBITDAaL margin.", call, "PDF p. 3")],
        bear=[_c("Reported PBT grew only 2.1% because FY25 included exceptional gains; tax expense rose sharply to ₹11,350 crore.", ar, "PDF p. 91"),
              _c("Management said cost pressures are building and growth funding depends on its War on Waste cost programme.", call, "PDF p. 5")],
        evidence=[
            _e("Consolidated gross revenue was ₹2,109,728 million versus ₹1,815,110 million; EBITDAaL ₹1,079,460 million versus ₹932,961 million; PBT ₹451,727 million versus ₹442,580 million.", ar, "MD&A financial review, PDF p. 91"),
            _e("The standalone business ended the year with ARPU of ₹257, up ₹12, and net debt of 1.3x EBITDAaL.", ar, "Standalone highlights, PDF p. 50"),
            _e("Q2 FY27 consolidated revenue was about ₹60,900 crore, up 4% sequentially; EBITDAaL about ₹31,500 crore at a 51.7% margin.", call, "Opening remarks, PDF p. 3"),
        ],
        watch=["ARPU progression", "Africa constant-currency growth versus currency moves", "Capex and cost pressure"]))

    # ---------- L&T ----------
    s = _sources("LT", "Larsen & Toubro", ["Order inflow, order book, revenue, recurring and consolidated PAT"], ["Q1 FY27 order inflow and domestic versus international mix"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("LT", "Larsen & Toubro", s,
        snapshot="Engineering and construction group spanning infrastructure, energy, heavy engineering, defence, IT services and financial services.",
        thesis="A record ₹7.40 lakh crore order book (+28%) gives multi-year visibility, but it is increasingly international: domestic Q1 FY27 inflows grew just 1%.",
        metrics=[
            _m("Order book", 740000, "₹ crore", "2026-03-31", ar, "Chairman's message, PDF p. 10", 28, "Group; reported as ₹7.40 lakh crore; 52% international", ["orders", "order book"]),
            _m("Order inflow", 436000, "₹ crore", "FY26", ar, "Chairman's message, PDF p. 10", 22, "Group; reported as ₹4.36 lakh crore", ["orders"]),
            _m("Revenue", 286000, "₹ crore", "FY26", ar, "Chairman's message, PDF p. 10", 12, "Group; reported as ₹2.86 lakh crore"),
            _m("Consolidated profit after tax", 16084, "₹ crore", "FY26", ar, "Directors' Report, PDF p. 46", 7.0, "Consolidated", ["PAT", "profit"]),
            _m("Recurring profit after tax", 17238, "₹ crore", "FY26", ar, "Chairman's message, PDF p. 10", 18, "Group; company-defined measure"),
            _m("Group order inflow", 108000, "₹ crore", "Q1 FY27", call, "Opening remarks, PDF p. 4", 14, "Reported as ₹1,080 billion", ["quarter", "orders"]),
        ],
        narrative="Revenue grew 12% and recurring PAT 18%, while reported consolidated PAT grew 7.0%. International orders made up 52% of the order book; in Q1 FY27, international inflows grew 27% and domestic 1%.",
        cash=None,
        bull=[_c("FY26 order inflow rose 22% to ₹4.36 lakh crore and the order book 28% to ₹7.40 lakh crore.", ar, "PDF p. 10"),
              _c("Q1 FY27 group order inflow grew 14% to ₹1,080 billion.", call, "PDF p. 4")],
        bear=[_c("Reported consolidated PAT grew 7.0%, well below the 18% recurring PAT growth the company highlights.", ar, "PDF pp. 10, 46"),
              _c("Domestic order inflow grew only 1% in Q1 FY27, versus 27% internationally.", call, "PDF p. 4")],
        evidence=[
            _e("Group order inflows were a record ₹4.36 lakh crore (+22%); the order book reached ₹7.40 lakh crore (+28%), 52% international; revenue grew 12% to ₹2.86 lakh crore.", ar, "Chairman's message, PDF p. 10"),
            _e("Consolidated PAT was ₹16,084 crore, up 7.0% from ₹15,037 crore.", ar, "Directors' Report, PDF p. 46"),
            _e("Q1 FY27 group order inflows were ₹1,080 billion, up 14%; international inflows grew 27% and domestic 1%.", call, "Opening remarks, PDF p. 4"),
        ],
        watch=["Domestic order momentum", "Execution of the international (GCC) backlog", "Reported versus recurring PAT"]))

    # ---------- ITC ----------
    s = _sources("ITC", "ITC", ["Gross revenue, EBITDA, PBT before exceptional items, PAT, segment commentary"], [])
    ar = s["ar"]["id"]
    briefs.append(_brief("ITC", "ITC", s,
        snapshot="Diversified company with cigarettes, packaged foods and personal care (FMCG), paperboards and packaging, and agri-business.",
        thesis="FY26 gross revenue grew 10.1% but EBITDA only 4.9% and PAT about 1%, suggesting cost pressure that the company says it offset through pricing and premiumisation.",
        metrics=[
            _m("Gross revenue", 80867.49, "₹ crore", "FY26", ar, "Directors' Report, PDF p. 70", 10.1, "As reported; includes amalgamation of Sresta and Wimco", ["revenue"]),
            _m("EBITDA", 25208.22, "₹ crore", "FY26", ar, "Directors' Report, PDF p. 70", 4.9),
            _m("Profit before exceptional items and tax", 26951.47, "₹ crore", "FY26", ar, "Directors' Report, PDF p. 70", 3.7, None, ["PBT"]),
            _m("Profit after tax", 20286.42, "₹ crore", "FY26", ar, "Directors' Report, PDF p. 70", 1.0, "Versus ₹20,093.29 crore", ["PAT", "profit"]),
        ],
        narrative="Revenue grew 10.1% while EBITDA grew 4.9% and PAT 1.0%. The report says input-cost pressure was progressively mitigated through net revenue management, premiumisation and cost control, and that cigarettes kept growing through premium offerings.",
        cash=None,
        bull=[_c("FY26 gross revenue grew 10.1% to ₹80,867 crore; the cigarettes segment grew through differentiated and premium offerings.", ar, "PDF pp. 69-70")],
        bear=[_c("EBITDA grew only 4.9% and PAT 1.0%, well below revenue growth.", ar, "PDF p. 70")],
        evidence=[
            _e("Gross revenue was ₹80,867.49 crore (+10.1%), EBITDA ₹25,208.22 crore (+4.9%), PBT before exceptional items ₹26,951.47 crore (+3.7%), and PAT ₹20,286.42 crore versus ₹20,093.29 crore.", ar, "Directors' Report, PDF p. 70"),
            _e("The report says cost pressure was progressively mitigated through net revenue management, premiumisation and cost management.", ar, "Segment review, PDF p. 69"),
        ],
        watch=["Margin recovery after cost pressure", "Cigarette volume versus pricing", "FMCG-others profitability"]))

    # ---------- HUL ----------
    s = _sources("HINDUNILVR", "Hindustan Unilever", ["Turnover, underlying sales and volume growth, EBITDA margin, PAT, dividends"], ["Q2 FY27 turnover, USG and UVG, segment performance"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("HINDUNILVR", "Hindustan Unilever", s,
        snapshot="FMCG company with home care, beauty and wellbeing, personal care, and foods brands.",
        thesis="Growth has re-accelerated: FY26 turnover grew 5%, quarterly underlying sales growth rose from 3% to 7% through the year, and Q2 FY27 hit 15%, the highest in 14 quarters.",
        metrics=[
            _m("Turnover", 63763, "₹ crore", "FY26", ar, "Chairman's statement, PDF p. 12", 5, None, ["revenue", "sales"]),
            _m("Underlying volume growth", 4, "%", "FY26", ar, "Chairman's statement, PDF p. 12", None, None, ["UVG", "volume"]),
            _m("EBITDA margin", 23.6, "%", "FY26", ar, "Chairman's statement, PDF p. 12", None, None, ["margin"]),
            _m("Profit after tax (continuing business)", 10652, "₹ crore", "FY26", ar, "Chairman's statement, PDF p. 12", None, None, ["PAT", "profit"]),
            _m("Turnover", 18071, "₹ crore", "Q2 FY27", call, "Opening remarks, PDF p. 4", None, "USG 15%, UVG 7%", ["quarter"]),
            _m("Underlying sales growth", 15, "%", "Q2 FY27", call, "Opening remarks, PDF p. 4", None, "Highest in 14 quarters", ["USG", "growth"]),
        ],
        narrative="The annual report shows USG stepping up from 3% in the first half of FY26 to 5% in the December quarter and 7% in the March quarter. In Q2 FY27, USG reached 15% with 7% volume growth; Foods grew 9% with softer mass tea due to inflation.",
        cash=None,
        bull=[_c("Quarterly USG improved from 3% in H1 FY26 to 7% in the March quarter.", ar, "PDF p. 12"),
              _c("Q2 FY27 USG was 15%, the highest in 14 quarters, with 7% UVG.", call, "PDF p. 4")],
        bear=[_c("FY26 turnover grew only 5% with 4% volume growth.", ar, "PDF p. 12"),
              _c("Inflation softened mass tea performance; Foods volume growth was low single digit.", call, "PDF p. 8")],
        evidence=[
            _e("FY26 turnover was ₹63,763 crore, up 5% with 4% UVG; USG improved from 3% in H1 to 5% in the December quarter and 7% in the March quarter.", ar, "Chairman's statement, PDF p. 12"),
            _e("EBITDA margin was 23.6% and PAT from continuing business ₹10,652 crore.", ar, "Chairman's statement, PDF p. 12"),
            _e("Q2 FY27 turnover was ₹18,071 crore with 15% USG and 7% UVG.", call, "Opening remarks, PDF p. 4"),
            _e("Foods delivered 9% USG with low-single-digit volume growth; inflation softened mass tea.", call, "Segment review, PDF p. 8"),
        ],
        watch=["Whether 15% USG is sustained", "Price versus volume mix", "Margin as inflation rises"]))

    # ---------- Bajaj Auto ----------
    s = _sources("BAJAJ-AUTO", "Bajaj Auto", ["Revenue, EBITDA and margin, PBT, PAT, surplus cash, dividend and buyback"], ["Q2 FY27 record volumes, revenue, EBITDA and PAT; exports; cost pressures"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("BAJAJ-AUTO", "Bajaj Auto", s,
        snapshot="Two- and three-wheeler maker with a large export business and a growing electric vehicle range.",
        thesis="FY26 was a record year (revenue +17.4%, PAT +20.5%, margin 20.5%) with all profit returned to shareholders; Q2 FY27 set new records again despite cost and capacity constraints.",
        metrics=[
            _m("Revenue from operations", 58732, "₹ crore", "FY26", ar, "Financial performance, PDF p. 32", 17.4, None, ["revenue"]),
            _m("EBITDA", 12019, "₹ crore", "FY26", ar, "Financial performance, PDF p. 32", 19.0, "Margin 20.5%, up 30 bps"),
            _m("Profit before tax", 13072, "₹ crore", "FY26", ar, "Financial performance, PDF p. 32", 18.3, None, ["PBT"]),
            _m("Profit after tax", 9825, "₹ crore", "FY26", ar, "Financial performance, PDF p. 32", 20.5, None, ["PAT", "profit"]),
            _m("Surplus cash and equivalents", 18137, "₹ crore", "2026-03-31", ar, "Financial performance, PDF p. 32", 6.7, None, ["cash"]),
        ],
        narrative="All four headline figures were records. In Q2 FY27, volumes passed 15 lakh units and revenue ₹20,000 crore for the first time; management called the environment difficult, with inflation, logistics and capacity constraints in high-end bikes, exports and EVs.",
        cash="Surplus cash rose 6.7% to ₹18,137 crore after ~₹500 crore capex, ₹2,300+ crore of strategic investments and ~₹5,900 crore of dividends; the final dividend plus buyback equals 100% of FY26 PAT (₹9,825 crore).",
        bull=[_c("FY26 revenue grew 17.4% and PAT 20.5%, with EBITDA margin up 30 bps to 20.5%.", ar, "PDF p. 32"),
              _c("Exports rose to about 7.5 lakh units a quarter from 6 lakh last year, and management expects to sustain it.", call, "PDF p. 4")],
        bear=[_c("Management cited inflationary pressures, logistics complexity and capacity limits for high-end bikes, exports and EVs.", call, "PDF p. 3")],
        evidence=[
            _e("Record FY26: revenue ₹58,732 crore (+17.4%), EBITDA ₹12,019 crore (+19.0%), PBT ₹13,072 crore (+18.3%), PAT ₹9,825 crore (+20.5%).", ar, "Financial performance, PDF p. 32"),
            _e("The Board recommended a ₹150 final dividend and a buyback; combined payout of ₹9,825 crore equals 100% of PAT.", ar, "Financial performance, PDF p. 32"),
            _e("Q2 FY27 volumes exceeded 15 lakh units, revenue ₹20,000 crore, EBITDA ₹4,000 crore and PAT ₹3,000 crore, all firsts.", call, "CFO remarks, PDF p. 7"),
        ],
        watch=["Domestic two-wheeler demand after the festive season", "Export run-rate", "Margin under input-cost inflation"]))

    # ---------- Maruti ----------
    s = _sources("MARUTI", "Maruti Suzuki India", ["Standalone total income, PBT, PAT and dividend"], ["Q2 FY27 volumes, pending orders, exports, cost control, commodities"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("MARUTI", "Maruti Suzuki India", s,
        snapshot="Passenger-car maker selling in India and exporting; management says it exported more cars than all other Indian car makers combined in H1 FY27.",
        thesis="FY26 income grew strongly but PBT fell 2.8%; volumes have since surged, with a record 6.97 lakh units in Q2 FY27 (+26.5%) and about 2 lakh pending orders.",
        metrics=[
            _m("Total income", 187658, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 114", 18.8, "Standalone; reported as ₹1,876,580 million; FY25 restated", ["revenue", "income"]),
            _m("Profit before tax", 18862.9, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 114", -2.8, "Standalone; reported as ₹188,629 million", ["PBT"]),
            _m("Profit after tax", 14445.4, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 114", 1.0, "Standalone; reported as ₹144,454 million", ["PAT", "profit"]),
            _m("Total sales volume", 696654, "units", "Q2 FY27", call, "Opening remarks, PDF p. 3", 26.5, "Domestic plus exports; highest ever quarter", ["volume", "units", "quarter"]),
            _m("Export volume", 108119, "units", "Q2 FY27", call, "Opening remarks, PDF p. 3", -2, "Logistics disruption", ["exports"]),
        ],
        narrative="Total income rose 18.8% in FY26 but PBT fell 2.8% and PAT rose 1.0%, so margins compressed. Q2 FY27 volumes jumped 26.5% on new capacity, and management said cost controls added about 0.8% to operating margin while commodities need watching in H2.",
        cash=None,
        bull=[_c("Q2 FY27 sales volume was a record 696,654 units, up 26.5%, with pending orders around 2 lakh units.", call, "PDF p. 3")],
        bear=[_c("FY26 standalone PBT fell to ₹188,629 million from ₹194,127 million despite higher income.", ar, "PDF p. 114"),
              _c("Q2 FY27 exports fell about 2% on logistics disruption; management gives no guidance and flagged commodity risk in H2.", call, "PDF pp. 3, 8")],
        evidence=[
            _e("Standalone total income was ₹1,876,580 million versus ₹1,579,326 million; PBT ₹188,629 million versus ₹194,127 million; PAT ₹144,454 million versus ₹142,976 million (FY25 restated).", ar, "Board's Report financial results, PDF p. 114"),
            _e("Q2 FY27 total volume was a record 696,654 units, up 26.5%; pending orders were about 2 lakh units; exports were 108,119 units, down about 2%.", call, "Opening remarks, PDF p. 3"),
            _e("Management said cost controls lifted operating performance by about 0.8% and that commodities need watching in H2; it does not give guidance.", call, "Q&A, PDF p. 8"),
        ],
        watch=["Margin recovery as volumes rise", "Commodity costs in H2 FY27", "Export logistics"]))

    # ---------- Sun Pharma ----------
    s = _sources("SUNPHARMA", "Sun Pharmaceutical Industries", ["Consolidated and standalone revenue, PBT, exceptional items and PAT"], ["Q2 FY27 India sales and market share, specialty launches, R&D spend"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("SUNPHARMA", "Sun Pharmaceutical Industries", s,
        snapshot="Pharmaceutical company (ranked first in India by market share on the Q2 FY27 call) with generics in India and emerging markets plus a global specialty (innovative) business.",
        thesis="FY26 consolidated revenue grew 11.2% and pre-exceptional PBT 13.8%, but a ₹1,307 crore exceptional item held PAT growth to 5.3%; India sales grew 17.3% in Q2 FY27.",
        metrics=[
            _m("Revenue from operations", 58462.0, "₹ crore", "FY26", ar, "Board's Report financial highlights, PDF p. 49", 11.2, "Consolidated; reported as ₹584,620.4 million", ["revenue", "sales"]),
            _m("Profit before exceptional item and tax", 16426.4, "₹ crore", "FY26", ar, "Board's Report financial highlights, PDF p. 49", 13.8, "Consolidated", ["PBT"]),
            _m("Exceptional item", 1307.5, "₹ crore", "FY26", ar, "Board's Report financial highlights, PDF p. 49", None, "Consolidated", ["exceptional"]),
            _m("Profit after tax", 11564.5, "₹ crore", "FY26", ar, "Board's Report financial highlights, PDF p. 49", 5.3, "Consolidated", ["PAT", "profit"]),
            _m("India market share", 8.6, "%", "Q2 FY27", call, "Opening remarks, PDF p. 5", None, "Rank 1; versus 8.3% a year earlier", ["India", "market share"]),
            _m("R&D spend", 4.8, "% of sales", "Q2 FY27", call, "Opening remarks, PDF p. 6", None, "₹7,784 million; 32.4% on innovative R&D", ["R&D"]),
        ],
        narrative="Consolidated revenue grew 11.2% and pre-exceptional PBT 13.8%, but PAT grew 5.3% after a ₹13,074.8 million exceptional item. The standalone entity's revenue fell 9.7%, so growth came from subsidiaries. In Q2 FY27, India sales grew 17.3% and R&D spend ran below plan.",
        cash=None,
        bull=[_c("Consolidated revenue grew 11.2% and pre-exceptional PBT 13.8% in FY26.", ar, "PDF p. 49"),
              _c("Q2 FY27 India sales grew 17.3% and market share rose to 8.6% from 8.3%.", call, "PDF p. 5")],
        bear=[_c("A ₹1,307 crore exceptional item cut PAT growth to 5.3%; standalone revenue fell to ₹207,546 million from ₹229,774 million.", ar, "PDF p. 49"),
              _c("R&D spend was tracking below plan, with management expecting H2 to catch up, which may weigh on H2 margins.", call, "PDF p. 6")],
        evidence=[
            _e("Consolidated revenue was ₹584,620.4 million versus ₹525,784.4 million; pre-exceptional PBT ₹164,263.6 million versus ₹144,299.8 million; exceptional item ₹13,074.8 million; PAT ₹115,645.2 million versus ₹109,801.0 million.", ar, "Board's Report financial highlights, PDF p. 49"),
            _e("Q2 FY27 India sales grew 17.3% and made up 34.5% of consolidated sales; Sun ranks first with 8.6% market share.", call, "Opening remarks, PDF p. 5"),
            _e("Q2 FY27 R&D was ₹7,784 million or 4.8% of sales, below the intended level, with a catch-up expected in H2.", call, "Opening remarks, PDF p. 6"),
        ],
        watch=["Specialty launch ramp-up", "R&D catch-up and margin in H2", "Nature of the FY26 exceptional item"]))

    # ---------- NTPC ----------
    s = _sources("NTPC", "NTPC", ["Consolidated and standalone PAT, standalone revenue and costs, group installed capacity"], ["Q2 FY27 power demand, renewable capacity guidance, transmission constraints"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("NTPC", "NTPC", s,
        snapshot="Government-owned power generator, mainly thermal, with a fast-growing renewables arm (NGEL).",
        thesis="FY26 consolidated PAT hit a record ₹27,546 crore (+15%) and group capacity grew 11.5%, while standalone revenue fell 2.7% on lower fuel costs; renewable guidance was cut on transmission delays.",
        metrics=[
            _m("Consolidated profit after tax", 27545.76, "₹ crore", "FY26", ar, "MD&A, PDF pp. 75-76", 15.0, "Consolidated; highest ever", ["PAT", "profit"]),
            _m("Standalone profit after tax", 23162, "₹ crore", "FY26", ar, "Chairman's message, PDF p. 11", 18, "Standalone"),
            _m("Revenue from operations", 165493.74, "₹ crore", "FY26", ar, "Key financial highlights, PDF p. 74", -2.67, "Standalone", ["revenue"]),
            _m("Fuel cost", 88605.04, "₹ crore", "FY26", ar, "Key financial highlights, PDF p. 74", -8.71, "Standalone", ["fuel", "coal"]),
            _m("Group installed capacity", 89108, "MW", "2026-03-31", ar, "MD&A, PDF p. 75", 11.48, "Group", ["capacity", "MW"]),
        ],
        narrative="Standalone revenue fell 2.67% as fuel costs fell 8.71%, while consolidated PAT rose 15%. On the Q2 FY27 call, management noted India power demand grew about 15% in H1, but renewable additions guidance was cut because of transmission constraints.",
        cash=None,
        bull=[_c("Consolidated PAT reached a record ₹27,546 crore, up 15%, and group capacity rose 11.48% to 89,108 MW.", ar, "PDF pp. 11, 75"),
              _c("India power demand grew about 15% in H1 FY27, with October up 21%.", call, "PDF p. 3")],
        bear=[_c("Profit from group companies fell 2.78% because FY25 included one-time revenue at RGPPL.", ar, "PDF p. 76"),
              _c("Renewable capacity guidance was cut because of transmission constraints.", call, "PDF p. 14")],
        evidence=[
            _e("Consolidated PAT rose 15% from ₹23,953.15 crore to ₹27,545.76 crore; profit attributable to group companies fell 2.78%.", ar, "MD&A, PDF p. 76"),
            _e("Standalone revenue was ₹1,65,493.74 crore versus ₹1,70,037.37 crore (-2.67%); fuel cost fell 8.71% to ₹88,605.04 crore.", ar, "Key financial highlights, PDF p. 74"),
            _e("India recorded about 11% generation growth and 15% power demand growth in H1 FY27.", call, "Opening remarks, PDF p. 3"),
            _e("An analyst noted renewable guidance had been cut because transmission was a challenge.", call, "Q&A, PDF p. 14"),
        ],
        watch=["Renewable additions versus transmission", "Thermal plant load factor with demand growth", "FY28 target of about 9.6 GW additions"]))

    # ---------- Tata Power ----------
    s = _sources("TATAPOWER", "Tata Power", ["Consolidated and standalone revenue, EBITDA, finance cost, PBT and PAT"], ["Q1 FY27 PAT and EBITDA growth, power demand"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("TATAPOWER", "Tata Power", s,
        snapshot="Integrated power company covering generation (thermal, hydro, solar, wind), transmission and distribution, plus solar manufacturing and EV charging.",
        thesis="FY26 revenue dipped 1.3% but EBITDA grew 11.2% and PAT 7.2%; higher interest costs absorbed part of the gain. Q1 FY27 PAT rose 11% on strong summer demand.",
        metrics=[
            _m("Revenue from operations", 63681, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 100", -1.3, "Consolidated", ["revenue"]),
            _m("EBITDA", 16090, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 100", 11.2, "Consolidated"),
            _m("Finance cost", 5257, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 100", 11.8, "Consolidated", ["interest", "debt"]),
            _m("Net profit after tax", 5118, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 100", 7.2, "Consolidated", ["PAT", "profit"]),
            _m("Profit after tax", 1401, "₹ crore", "Q1 FY27", call, "CEO remarks, PDF p. 3", 11, "Management-reported; EBITDA ₹4,249 crore (+8%)", ["quarter"]),
        ],
        narrative="EBITDA grew 11.2% on slightly lower revenue, but finance costs rose 11.8% and depreciation 16.9%, so PBT grew 5.0%. In Q1 FY27, management credited a long, dry summer and industrial demand for higher consumption.",
        cash=None,
        bull=[_c("FY26 consolidated EBITDA grew 11.2% to ₹16,090 crore and PAT 7.2% to ₹5,118 crore.", ar, "PDF p. 100"),
              _c("Q1 FY27 PAT grew 11% to ₹1,401 crore and EBITDA 8% to ₹4,249 crore.", call, "PDF p. 3")],
        bear=[_c("Finance costs rose to ₹5,257 crore from ₹4,702 crore, and standalone PAT fell to ₹1,125 crore from ₹3,133 crore.", ar, "PDF p. 100")],
        evidence=[
            _e("Consolidated revenue ₹63,681 crore versus ₹64,502 crore; EBITDA ₹16,090 crore versus ₹14,468 crore; finance cost ₹5,257 crore versus ₹4,702 crore; PBT ₹6,636 crore versus ₹6,320 crore; PAT ₹5,118 crore versus ₹4,775 crore.", ar, "Board's Report financial results, PDF p. 100"),
            _e("Q1 FY27 PAT was ₹1,401 crore (+11%) and EBITDA ₹4,249 crore (+8%).", call, "CEO remarks, PDF p. 3"),
            _e("Management linked higher consumption to a long summer with little rain and to industrial demand.", call, "CEO remarks, PDF p. 3"),
        ],
        watch=["Interest cost versus EBITDA growth", "Renewables and solar manufacturing ramp-up", "Standalone profit decline"]))

    # ---------- Asian Paints ----------
    s = _sources("ASIANPAINT", "Asian Paints", ["Standalone and consolidated revenue, EBITDA, PBT and exceptional items"], ["Q2 FY27 decorative volume and value growth, price increases, new capacity"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("ASIANPAINT", "Asian Paints", s,
        snapshot="Paints company with decorative and industrial coatings, home décor, and international operations.",
        thesis="FY26 revenue grew only 5% but EBITDA rose 12.8% and PBT 17.6%; in Q2 FY27 decorative value growth (14.5%) ran well ahead of volume (6.4%) because of price increases.",
        metrics=[
            _m("Revenue from operations", 35583.54, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 110", 4.95, "Consolidated", ["revenue"]),
            _m("EBITDA", 7419.72, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 110", 12.78, "Consolidated"),
            _m("Profit before tax", 6003.44, "₹ crore", "FY26", ar, "Board's Report financial results, PDF p. 110", 17.64, "Consolidated", ["PBT", "profit"]),
            _m("Decorative volume growth", 6.4, "%", "Q2 FY27", call, "Management remarks, PDF p. 14", None, "Value growth 14.5%", ["volume", "decorative"]),
        ],
        narrative="EBITDA grew more than twice as fast as revenue in FY26, and lower exceptional charges (₹157.6 crore versus ₹363.1 crore) lifted PBT growth to 17.6%. In Q2 FY27, decorative value growth of 14.5% was well above 6.4% volume growth, which management linked to price increases.",
        cash=None,
        bull=[_c("FY26 consolidated EBITDA grew 12.78% and PBT 17.64% on revenue growth of 4.95%.", ar, "PDF p. 110"),
              _c("Q2 FY27 decorative volume grew 6.4% and value 14.5%.", call, "PDF p. 14")],
        bear=[_c("Revenue grew under 5% in FY26.", ar, "PDF p. 110"),
              _c("Much of Q2 FY27 value growth came from price increases rather than volume.", call, "PDF p. 14")],
        evidence=[
            _e("Consolidated revenue ₹35,583.54 crore versus ₹33,905.62 crore (+4.95%); EBITDA ₹7,419.72 crore (+12.78%); PBT ₹6,003.44 crore (+17.64%).", ar, "Board's Report financial results, PDF p. 110"),
            _e("Decorative volume growth was 6.4% and value growth 14.5% in Q2 FY27, with price increases contributing.", call, "Management remarks, PDF p. 14"),
        ],
        watch=["Volume growth after price increases", "Competitive intensity in decorative paints", "Raw-material costs"]))

    # ---------- Hindalco ----------
    s = _sources("HINDALCO", "Hindalco Industries", ["Consolidated revenue and EBITDA, Novelis Oswego fire and US tariffs"], ["Q2 FY27 consolidated EBITDA and PAT, India business, copper, macro headwinds"])
    ar, call = s["ar"]["id"], s["call"]["id"]
    briefs.append(_brief("HINDALCO", "Hindalco Industries", s,
        snapshot="Aluminium and copper producer with Indian smelting and downstream operations and Novelis, a global aluminium rolling and recycling business.",
        thesis="FY26 revenue hit a record ₹2,74,944 crore (+15%) and EBITDA ₹38,097 crore (+7%) despite the Novelis Oswego fire; Q2 FY27 EBITDA jumped 52%, though part of copper's gain was one-time.",
        metrics=[
            _m("Revenue", 274944, "₹ crore", "FY26", ar, "Financial performance highlights, PDF p. 63", 15, "Consolidated; record", ["revenue"]),
            _m("EBITDA", 38097, "₹ crore", "FY26", ar, "Financial performance highlights, PDF p. 63", 7, "Consolidated; record"),
            _m("Consolidated EBITDA", 13869, "₹ crore", "Q2 FY27", call, "Results remarks, PDF p. 6", 52, "Management-reported", ["quarter"]),
            _m("Consolidated profit after tax", 7533, "₹ crore", "Q2 FY27", call, "Results remarks, PDF p. 6", 59, "Management-reported", ["PAT", "profit"]),
            _m("Copper EBITDA", 1673, "₹ crore", "Q2 FY27", call, "Results remarks, PDF p. 7", 164, "Record; includes one-time gains", ["copper"]),
        ],
        narrative="FY26 EBITDA grew 7% against 15% revenue growth because the Oswego fire interrupted Novelis shipments and US tariffs rose; the company expects the Oswego hot mills back earlier than end-Q1 FY27. In Q2 FY27, consolidated EBITDA rose 52% and India business EBITDA 66%.",
        cash=None,
        bull=[_c("FY26 consolidated revenue (+15%) and EBITDA (+7%) were records, led by India operations.", ar, "PDF p. 63"),
              _c("Q2 FY27 consolidated EBITDA rose 52% to ₹13,869 crore and PAT 59% to ₹7,533 crore.", call, "PDF p. 6")],
        bear=[_c("The Oswego fire and higher US tariffs hurt Novelis shipments and FY26 margins.", ar, "PDF p. 63"),
              _c("Q2 copper EBITDA included one-time gains, and management flagged geopolitical, commodity and trade headwinds.", call, "PDF pp. 5, 7")],
        evidence=[
            _e("FY26 consolidated revenue was ₹2,74,944 crore (+15%) and EBITDA a record ₹38,097 crore (+7%); the Oswego fire and US tariffs affected Novelis.", ar, "Financial performance highlights, PDF p. 63"),
            _e("Q2 FY27 consolidated EBITDA rose 52% to ₹13,869 crore and PAT 59% to ₹7,533 crore; India business EBITDA rose 66% to ₹9,011 crore.", call, "Results remarks, PDF p. 6"),
            _e("Copper EBITDA reached a record ₹1,673 crore, helped by by-product realisations and some one-time gains.", call, "Results remarks, PDF p. 7"),
        ],
        watch=["Novelis recovery after Oswego", "Aluminium prices and US tariffs", "Copper earnings without one-time gains"]))

    return briefs
