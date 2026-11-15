import Anthropic from '@anthropic-ai/sdk'

/**
 * Live Pull research for companies outside the bundled snapshot.
 *
 * Runs in the visitor's browser with the visitor's own Anthropic API key (the
 * site is static, so there is no server to hold one). Claude may only search
 * and fetch BSE, NSE and Screener pages, which carry the issuer's own filings:
 * annual reports, results and earnings-call transcripts.
 */
export const LIVE_MODEL = 'claude-opus-5-5'
const PRIMARY_DOMAINS = ['bseindia.com', 'nseindia.com', 'screener.in']

const SYSTEM = `You are FINN, a research assistant for Indian listed companies.
Answer only from primary company sources you find with your tools: annual reports, quarterly results filings, investor presentations and earnings-call transcripts filed on BSE or NSE (Screener pages may be used to locate those filings, not as evidence).
Do not use news, broker research, or your own background knowledge for facts or figures. If the filings you can reach do not support an answer, say so plainly.
Name the document and period behind every figure, keep standalone and consolidated figures distinct, and state the reporting period (for example FY2025-26 or Q2 FY27).
Write in short plain sentences for a retail investor. Use "## " headings and "- " bullets only. This is research, not a buy or sell recommendation; never give one.`

const OVERVIEW_PROMPT = (symbol: string) => `Research the NSE-listed company with symbol ${symbol}.
First confirm the company name. Then find its latest annual report and latest earnings-call transcript (or results filing if no transcript exists) and read them.
Write a brief overview with these sections:
## Company
## Latest reported numbers (revenue, profit and one or two business-specific measures, with periods and growth)
## What management said
## What to watch
Keep it under 300 words.`

export type LiveCitation = { title: string; url: string; page?: number; citedText?: string }
export type LiveTurn = { role: 'user' | 'assistant'; text: string; citations: LiveCitation[] }
export type LiveSession = { symbol: string; messages: Anthropic.Beta.BetaMessageParam[]; turns: LiveTurn[]; sources: LiveCitation[] }

const pageUrl = (url: string, page?: number) => (page && /\.pdf($|[?#])/i.test(url) && !url.includes('#') ? `${url}#page=${page}` : url)

function collect(content: Anthropic.Beta.BetaContentBlock[]) {
  const fetched = new Map<string, string>() // document title -> URL
  const sources: LiveCitation[] = []
  for (const block of content) {
    if (block.type === 'web_fetch_tool_result' && block.content.type === 'web_fetch_result') {
      const title = block.content.content.title || block.content.url
      fetched.set(title, block.content.url)
      sources.push({ title, url: block.content.url })
    }
  }
  let text = ''
  const citations: LiveCitation[] = []
  for (const block of content) {
    if (block.type !== 'text') continue
    text += block.text
    for (const c of block.citations ?? []) {
      if (c.type === 'web_search_result_location') citations.push({ title: c.title || c.url, url: c.url, citedText: c.cited_text })
      else if (c.type === 'page_location' || c.type === 'char_location') {
        const url = (c.document_title && fetched.get(c.document_title)) || sources[c.document_index]?.url
        if (url) citations.push({ title: c.document_title || url, url: c.type === 'page_location' ? pageUrl(url, c.start_page_number) : url, page: c.type === 'page_location' ? c.start_page_number : undefined, citedText: c.cited_text })
      }
    }
  }
  const unique = (list: LiveCitation[]) => Array.from(new Map(list.map((item) => [item.url, item])).values())
  return { text: text.trim(), citations: unique(citations), sources: unique(sources) }
}

async function run(apiKey: string, messages: Anthropic.Beta.BetaMessageParam[], onStatus: (status: string) => void) {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
  const turnContent: Anthropic.Beta.BetaContentBlock[] = []
  for (let attempt = 0; attempt < 4; attempt++) {
    const stream = client.beta.messages.stream({
      model: LIVE_MODEL,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'medium' },
      system: SYSTEM,
      messages,
      tools: [
        { type: 'web_search_20260209', name: 'web_search', max_uses: 6, allowed_domains: PRIMARY_DOMAINS },
        { type: 'web_fetch_20260209', name: 'web_fetch', max_uses: 4, allowed_domains: PRIMARY_DOMAINS, citations: { enabled: true }, max_content_tokens: 60000 },
      ],
    })
    stream.on('contentBlock', (block) => {
      if (block.type === 'server_tool_use') onStatus(block.name === 'web_fetch' ? 'Reading a filing…' : 'Searching BSE and NSE filings…')
      if (block.type === 'text') onStatus('Writing the answer…')
    })
    const message = await stream.finalMessage()
    turnContent.push(...message.content)
    messages.push({ role: 'assistant', content: message.content })
    if (message.stop_reason === 'refusal') throw new Error('The model declined this request.')
    if (message.stop_reason !== 'pause_turn') break
    onStatus('Continuing research…')
  }
  return collect(turnContent)
}

export async function startLiveResearch(apiKey: string, symbol: string, onStatus: (status: string) => void): Promise<LiveSession> {
  const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: 'user', content: OVERVIEW_PROMPT(symbol) }]
  const result = await run(apiKey, messages, onStatus)
  return { symbol, messages, turns: [{ role: 'assistant', text: result.text, citations: result.citations }], sources: result.sources }
}

export async function askLiveResearch(apiKey: string, session: LiveSession, question: string, onStatus: (status: string) => void): Promise<LiveSession> {
  const messages: Anthropic.Beta.BetaMessageParam[] = [...session.messages, { role: 'user', content: question }]
  const result = await run(apiKey, messages, onStatus)
  const sources = Array.from(new Map([...session.sources, ...result.sources].map((item) => [item.url, item])).values())
  return { ...session, messages, sources, turns: [...session.turns, { role: 'user', text: question, citations: [] }, { role: 'assistant', text: result.text, citations: result.citations }] }
}

export function describeError(error: unknown) {
  if (error instanceof Anthropic.AuthenticationError) return 'That API key was not accepted. Check it and try again.'
  if (error instanceof Anthropic.PermissionDeniedError) return 'This API key does not have access to the model or web tools.'
  if (error instanceof Anthropic.RateLimitError) return 'Rate limited by the API. Wait a moment and try again.'
  if (error instanceof Anthropic.BadRequestError) return `The API rejected the request: ${error.message}`
  if (error instanceof Anthropic.APIError) return `API error ${error.status ?? ''}: ${error.message}`
  return error instanceof Error ? error.message : 'Something went wrong.'
}
