/**
 * Live Pull research for companies outside the bundled snapshot, using the
 * Google Gemini API from the visitor's browser with the visitor's own key
 * (the site is static, so there is no server to hold one).
 *
 * Flow, designed to work on a free Gemini key:
 *  1. Read the company's Screener page with the URL-context tool and pick out
 *     its latest annual report and earnings-call transcript links (BSE filings).
 *     If none are found, try Google Search grounding, which needs a key with
 *     billing enabled.
 *  2. Read those PDFs with the URL-context tool and write a cited overview.
 *     Follow-up questions re-send the same documents.
 * If no filing can be reached, the answer is labelled as based on Screener's
 * compiled company page only.
 */
export const LIVE_MODEL = 'gemini-3.8-flash'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${LIVE_MODEL}:generateContent`

const SYSTEM = `You are FINN, a research assistant for Indian listed companies.
Answer only from the documents you are given and can read: annual reports, results filings and earnings-call transcripts. Do not use news, broker research or your own background knowledge for facts or figures. If the documents do not support an answer, say so plainly.
Name the period behind every figure (for example FY2025-26 or Q2 FY27) and keep standalone and consolidated figures distinct.
After each figure or claim taken from a PDF, add a tag in exactly this form: [AR p. N] for the annual report or [CALL p. N] for the call transcript, where N is the PDF page number. Use [SCREENER] for anything taken from the Screener page.
Write in short plain sentences for a retail investor. Use "## " headings and "- " bullets only. This is research, not a buy or sell recommendation; never give one.`

type Part = { text?: string; thought?: boolean }
type Content = { role: 'user' | 'model'; parts: Part[] }
type GeminiResponse = {
  candidates?: {
    content?: { parts?: Part[] }
    finishReason?: string
    urlContextMetadata?: { urlMetadata?: { retrievedUrl?: string; urlRetrievalStatus?: string }[] }
    groundingMetadata?: { groundingChunks?: { web?: { uri?: string; title?: string } }[] }
  }[]
  promptFeedback?: { blockReason?: string }
  error?: { code?: number; message?: string; status?: string }
}

export class GeminiError extends Error {
  constructor(message: string, public status?: number, public reason?: string) { super(message) }
}

export type LiveCitation = { title: string; url: string; page?: number }
export type LiveDocs = { companyName?: string; annualReport?: string; transcript?: string; transcriptPeriod?: string; screener: string; basis: 'filings' | 'screener' }
export type LiveTurn = { role: 'user' | 'assistant'; text: string; citations: LiveCitation[] }
export type LiveSession = { symbol: string; docs: LiveDocs; history: Content[]; turns: LiveTurn[]; sources: LiveCitation[] }

async function generate(apiKey: string, contents: Content[], tools: Record<string, object>[], system = SYSTEM) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, tools }),
  })
  const data = (await response.json().catch(() => ({}))) as GeminiResponse
  if (!response.ok || data.error) throw new GeminiError(data.error?.message || `HTTP ${response.status}`, data.error?.code ?? response.status, data.error?.status)
  if (data.promptFeedback?.blockReason) throw new GeminiError(`The request was blocked (${data.promptFeedback.blockReason}).`)
  const candidate = data.candidates?.[0]
  const text = (candidate?.content?.parts ?? []).filter((part) => !part.thought).map((part) => part.text ?? '').join('').trim()
  const retrieved = (candidate?.urlContextMetadata?.urlMetadata ?? [])
    .filter((item) => item.retrievedUrl && (!item.urlRetrievalStatus || /SUCCESS/i.test(item.urlRetrievalStatus)))
    .map((item) => item.retrievedUrl as string)
  const web = (candidate?.groundingMetadata?.groundingChunks ?? []).flatMap((chunk) => chunk.web?.uri ? [{ title: chunk.web.title || chunk.web.uri, url: chunk.web.uri }] : [])
  return { text, retrieved, web }
}

const isPdf = (url?: string) => !!url && /^https:\/\/[^\s"'<>]+\.pdf(\?[^\s"'<>]*)?$/i.test(url)
const pickJson = (text: string) => { try { return JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}') as Record<string, string> } catch { return {} } }

const FIND_PROMPT = (symbol: string, screener: string) => `Read ${screener}
It is Screener's page for the NSE-listed company with symbol ${symbol}. From its "Documents" section, find the link to the latest annual report and the latest earnings-call transcript (these usually point to bseindia.com PDFs).
Reply with JSON only, no other text:
{"companyName": "...", "annualReportUrl": "https://...pdf or empty", "transcriptUrl": "https://...pdf or empty", "transcriptPeriod": "for example Q2 FY27, or empty"}`

const SEARCH_PROMPT = (symbol: string, name: string) => `Find the latest annual report PDF and the latest earnings-call transcript PDF for ${name || symbol} (NSE: ${symbol}), as filed on bseindia.com or nseindia.com or published on the company's own investor-relations site.
Reply with JSON only: {"companyName": "...", "annualReportUrl": "...", "transcriptUrl": "...", "transcriptPeriod": "..."}`

async function locateDocuments(apiKey: string, symbol: string, onStatus: (s: string) => void): Promise<LiveDocs> {
  const screener = `https://www.screener.in/company/${encodeURIComponent(symbol)}/consolidated/`
  onStatus('Reading the company’s Screener page for filing links…')
  const first = await generate(apiKey, [{ role: 'user', parts: [{ text: FIND_PROMPT(symbol, screener) }] }], [{ url_context: {} }], 'Reply with JSON only.')
  let found = pickJson(first.text)
  if (!isPdf(found.annualReportUrl) && !isPdf(found.transcriptUrl)) {
    onStatus('Searching for the filings…')
    try {
      const second = await generate(apiKey, [{ role: 'user', parts: [{ text: SEARCH_PROMPT(symbol, found.companyName ?? '') }] }], [{ google_search: {} }], 'Reply with JSON only.')
      found = { ...found, ...pickJson(second.text) }
    } catch { /* Google Search grounding needs a key with billing enabled; fall back to Screener */ }
  }
  const annualReport = isPdf(found.annualReportUrl) ? found.annualReportUrl : undefined
  const transcript = isPdf(found.transcriptUrl) ? found.transcriptUrl : undefined
  return { companyName: found.companyName || undefined, annualReport, transcript, transcriptPeriod: found.transcriptPeriod || undefined, screener, basis: annualReport || transcript ? 'filings' : 'screener' }
}

const docList = (docs: LiveDocs) => [
  docs.annualReport && `Annual report (tag [AR p. N]): ${docs.annualReport}`,
  docs.transcript && `Earnings-call transcript${docs.transcriptPeriod ? `, ${docs.transcriptPeriod}` : ''} (tag [CALL p. N]): ${docs.transcript}`,
  `Screener company page, for orientation only (tag [SCREENER]): ${docs.screener}`,
].filter(Boolean).join('\n')

const OVERVIEW_PROMPT = (symbol: string, docs: LiveDocs) => `Company: ${docs.companyName || symbol} (NSE: ${symbol}).
Read these documents:
${docList(docs)}
Write a brief overview with these sections:
## Company
## Latest reported numbers (revenue, profit and one or two business-specific measures, with periods and growth)
## What management said
## What to watch
Keep it under 300 words. Tag every figure with its source page.`

const QUESTION_PROMPT = (question: string, docs: LiveDocs) => `Using the same documents:
${docList(docs)}
Question: ${question}
Answer briefly and tag every figure with its source page.`

/** Turn [AR p. N] / [CALL p. N] / [SCREENER] tags into numbered citations that open the document at that page. */
function linkTags(text: string, docs: LiveDocs) {
  const citations: LiveCitation[] = []
  const indexOf = (citation: LiveCitation) => {
    const found = citations.findIndex((item) => item.url === citation.url)
    if (found >= 0) return found + 1
    citations.push(citation); return citations.length
  }
  const out = text.replace(/\[(AR|CALL) p(?:p)?\.?\s*(\d+)(?:\s*[-–]\s*\d+)?\]|\[SCREENER\]/gi, (_match, kind?: string, page?: string) => {
    if (!kind) return `[${indexOf({ title: 'Screener company page', url: docs.screener })}]`
    const base = kind.toUpperCase() === 'AR' ? docs.annualReport : docs.transcript
    if (!base) return ''
    const n = Number(page)
    return `[${indexOf({ title: `${kind.toUpperCase() === 'AR' ? 'Annual report' : 'Earnings-call transcript'} · PDF p. ${n}`, url: `${base}#page=${n}`, page: n })}]`
  })
  return { text: out, citations }
}

function sourcesFor(docs: LiveDocs, retrieved: string[]): LiveCitation[] {
  const list: LiveCitation[] = []
  if (docs.annualReport) list.push({ title: 'Annual report (PDF)', url: docs.annualReport })
  if (docs.transcript) list.push({ title: `Earnings-call transcript${docs.transcriptPeriod ? ` · ${docs.transcriptPeriod}` : ''} (PDF)`, url: docs.transcript })
  list.push({ title: 'Screener company page', url: docs.screener })
  return list.filter((item) => !retrieved.length || retrieved.some((url) => url.split('#')[0] === item.url.split('#')[0]) || item.url === docs.screener)
}

export async function startLiveResearch(apiKey: string, symbol: string, onStatus: (status: string) => void): Promise<LiveSession> {
  const docs = await locateDocuments(apiKey, symbol, onStatus)
  onStatus(docs.basis === 'filings' ? 'Reading the annual report and call transcript…' : 'Reading the Screener page…')
  const history: Content[] = [{ role: 'user', parts: [{ text: OVERVIEW_PROMPT(symbol, docs) }] }]
  const result = await generate(apiKey, history, [{ url_context: {} }])
  if (!result.text) throw new GeminiError('Gemini returned an empty answer. Try again.')
  history.push({ role: 'model', parts: [{ text: result.text }] })
  const linked = linkTags(result.text, docs)
  return { symbol, docs, history, turns: [{ role: 'assistant', ...linked }], sources: sourcesFor(docs, result.retrieved) }
}

export async function askLiveResearch(apiKey: string, session: LiveSession, question: string, onStatus: (status: string) => void): Promise<LiveSession> {
  onStatus('Reading the documents again…')
  const history: Content[] = [...session.history, { role: 'user', parts: [{ text: QUESTION_PROMPT(question, session.docs) }] }]
  const result = await generate(apiKey, history, [{ url_context: {} }])
  if (!result.text) throw new GeminiError('Gemini returned an empty answer. Try again.')
  history.push({ role: 'model', parts: [{ text: result.text }] })
  const linked = linkTags(result.text, session.docs)
  return { ...session, history, turns: [...session.turns, { role: 'user', text: question, citations: [] }, { role: 'assistant', ...linked }] }
}

export function describeError(error: unknown) {
  if (error instanceof GeminiError) {
    if (error.status === 400 && /API_KEY_INVALID|API key not valid/i.test(error.message + (error.reason ?? ''))) return 'That Gemini API key was not accepted. Check it and try again.'
    if (error.status === 403) return 'This key is not allowed to call the Gemini API. Check the key’s API restrictions in Google AI Studio or Cloud Console.'
    if (error.status === 429) return 'Gemini rate limit or free-tier quota reached. Wait a minute and try again.'
    if (error.status === 404) return `The model ${LIVE_MODEL} is not available to this key.`
    return `Gemini API error${error.status ? ` ${error.status}` : ''}: ${error.message}`
  }
  if (error instanceof TypeError) return 'Could not reach the Gemini API. Check your connection.'
  return error instanceof Error ? error.message : 'Something went wrong.'
}
