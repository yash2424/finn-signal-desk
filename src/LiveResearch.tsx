import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, ExternalLink, KeyRound, Loader2, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { askLiveResearch, describeError, LIVE_MODEL, startLiveResearch, type LiveCitation, type LiveSession } from './liveResearchApi'

const KEY_STORE = 'finn-gemini-key'
const readKey = () => { try { return sessionStorage.getItem(KEY_STORE) ?? '' } catch { return '' } }
const saveKey = (value: string) => { try { if (value) sessionStorage.setItem(KEY_STORE, value); else sessionStorage.removeItem(KEY_STORE) } catch { /* storage unavailable */ } }

function Prose({ text }: { text: string }) {
  const blocks: ReactNode[] = []
  let list: string[] = []
  const flush = () => { if (list.length) { blocks.push(<ul key={`l${blocks.length}`}>{list.map((item, i) => <li key={i}>{item}</li>)}</ul>); list = [] } }
  text.split('\n').forEach((raw) => {
    const line = raw.trim().replace(/\*\*/g, '')
    if (!line) { flush(); return }
    if (line.startsWith('- ') || line.startsWith('* ')) { list.push(line.slice(2)); return }
    flush()
    if (line.startsWith('#')) blocks.push(<h4 key={blocks.length}>{line.replace(/^#+\s*/, '')}</h4>)
    else blocks.push(<p key={blocks.length}>{line}</p>)
  })
  flush()
  return <div className="live-prose">{blocks}</div>
}

function Citations({ items }: { items: LiveCitation[] }) {
  if (!items.length) return null
  return <div className="live-citations"><span>CITED IN THIS ANSWER</span>{items.map((item, i) => <a key={item.url} href={item.url} target="_blank" rel="noreferrer"><b>{i + 1}</b><span>{item.title}{item.page ? ` · PDF p. ${item.page}` : ''}</span><ExternalLink size={12} /></a>)}</div>
}

export default function LiveResearch({ symbol }: { symbol: string }) {
  const [apiKey, setApiKey] = useState(readKey)
  const [session, setSession] = useState<LiveSession | null>(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [question, setQuestion] = useState('')
  const busy = !!status
  useEffect(() => { setSession(null); setError(''); setQuestion('') }, [symbol])

  const begin = async (event: FormEvent) => {
    event.preventDefault()
    if (!apiKey.trim() || busy) return
    saveKey(apiKey.trim()); setError(''); setStatus('Starting research…')
    try { setSession(await startLiveResearch(apiKey.trim(), symbol, setStatus)) } catch (err) { setError(describeError(err)) } finally { setStatus('') }
  }
  const ask = async (event: FormEvent) => {
    event.preventDefault()
    if (!session || !question.trim() || busy) return
    setError(''); setStatus('Starting research…')
    try { setSession(await askLiveResearch(apiKey.trim(), session, question.trim(), setStatus)); setQuestion('') } catch (err) { setError(describeError(err)) } finally { setStatus('') }
  }

  return <section className="live-research">
    <div className="live-head"><span className="live-icon"><Sparkles size={16} /></span><div><div className="section-kicker">LIVE RESEARCH · OPTIONAL</div><h3>Research {symbol} from its filings</h3><p>Google Gemini writes a short overview and answers follow-up questions. With a free key it reads the company’s Screener page, which compiles figures from its filings. With a billing-enabled key it also finds and reads the latest annual report and call transcript, and each figure links to its page in the PDF.</p></div></div>
    {!session && <form className="live-key-form" onSubmit={begin}>
      <label htmlFor="live-key"><KeyRound size={13} /> Your Google Gemini API key <a className="live-key-help" href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">Get a free key <ExternalLink size={11} /></a></label>
      <div className="live-key-row"><input id="live-key" type="password" autoComplete="off" spellCheck={false} placeholder="AIza…" value={apiKey} onChange={(e) => setApiKey(e.target.value)} /><button className="primary-button" type="submit" disabled={busy || !apiKey.trim()}>{busy ? <Loader2 size={15} className="spin" /> : <Search size={15} />}<span>Research {symbol}</span></button></div>
      <small>The key stays in this browser tab (session storage) and is sent only to generativelanguage.googleapis.com. Each run makes 2–3 requests to {LIVE_MODEL}; a free-tier key works. On the free tier Google may use requests to improve its products.</small>
    </form>}
    {busy && <div className="live-status"><Loader2 size={14} className="spin" />{status}</div>}
    {error && <div className="input-error">{error}</div>}
    {session && <div className="live-thread">
      {session.docs.basis === 'screener' && <div className="live-basis-warning">This answer is based on Screener’s company page (figures compiled from the company’s filings), because finding the filing PDFs needs Google Search, which free Gemini keys can’t use. Check figures against the filings before relying on them.</div>}
      {session.turns.map((turn, i) => turn.role === 'user'
        ? <div key={i} className="live-question"><span>YOU ASKED</span><p>{turn.text}</p></div>
        : <article key={i} className="live-answer"><Prose text={turn.text} /><Citations items={turn.citations} /></article>)}
      {!!session.sources.length && <div className="live-sources"><ShieldCheck size={13} /><span>Documents read: {session.sources.map((s, i) => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{i ? ', ' : ''}{s.title}</a>)}</span></div>}
      <form className="evidence-query live-ask" onSubmit={ask}><Search size={17} /><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={`Ask about ${symbol}, e.g. “How did margins change?”`} aria-label={`Ask about ${symbol}`} disabled={busy} /><button className="query-button" type="submit" disabled={busy || !question.trim()}>Ask <ArrowUpRight size={14} /></button></form>
    </div>}
    <div className="live-note">Live answers are generated by an AI model from the filings it finds and can contain mistakes. Open the cited documents to confirm figures. Not a buy or sell recommendation.</div>
  </section>
}
