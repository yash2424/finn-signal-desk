import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, ExternalLink, KeyRound, Loader2, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { askLiveResearch, describeError, LIVE_MODEL, startLiveResearch, type LiveCitation, type LiveSession } from './liveResearchApi'

const KEY_STORE = 'finn-anthropic-key'
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
    <div className="live-head"><span className="live-icon"><Sparkles size={16} /></span><div><div className="section-kicker">LIVE RESEARCH · OPTIONAL</div><h3>Research {symbol} from its filings</h3><p>Claude searches BSE and NSE filings for this company, reads its latest annual report and earnings call, and writes a cited overview. You can then ask follow-up questions.</p></div></div>
    {!session && <form className="live-key-form" onSubmit={begin}>
      <label htmlFor="live-key"><KeyRound size={13} /> Your Anthropic API key</label>
      <div className="live-key-row"><input id="live-key" type="password" autoComplete="off" spellCheck={false} placeholder="sk-ant-…" value={apiKey} onChange={(e) => setApiKey(e.target.value)} /><button className="primary-button" type="submit" disabled={busy || !apiKey.trim()}>{busy ? <Loader2 size={15} className="spin" /> : <Search size={15} />}<span>Research {symbol}</span></button></div>
      <small>The key stays in this browser tab (session storage) and is sent only to api.anthropic.com. Each run uses {LIVE_MODEL} with web search and costs API credit.</small>
    </form>}
    {busy && <div className="live-status"><Loader2 size={14} className="spin" />{status}</div>}
    {error && <div className="input-error">{error}</div>}
    {session && <div className="live-thread">
      {session.turns.map((turn, i) => turn.role === 'user'
        ? <div key={i} className="live-question"><span>YOU ASKED</span><p>{turn.text}</p></div>
        : <article key={i} className="live-answer"><Prose text={turn.text} /><Citations items={turn.citations} /></article>)}
      {!!session.sources.length && <div className="live-sources"><ShieldCheck size={13} /><span>Documents read: {session.sources.map((s, i) => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{i ? ', ' : ''}{s.title}</a>)}</span></div>}
      <form className="evidence-query live-ask" onSubmit={ask}><Search size={17} /><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={`Ask about ${symbol}, e.g. “How did margins change?”`} aria-label={`Ask about ${symbol}`} disabled={busy} /><button className="query-button" type="submit" disabled={busy || !question.trim()}>Ask <ArrowUpRight size={14} /></button></form>
    </div>}
    <div className="live-note">Live answers are generated by an AI model from the filings it finds and can contain mistakes. Open the cited documents to confirm figures. Not a buy or sell recommendation.</div>
  </section>
}
