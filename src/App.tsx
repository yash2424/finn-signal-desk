import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { Activity, ChevronRight, CircleHelp, FileText, Search, ShieldCheck } from 'lucide-react'
import rawData from '../app/data/finn-demo.json'
import type { FinnData, Signal, Source } from './types'
import { formatDate, numberFrom, tickerLabel } from './helpers'
import PushPage from './PushPage'
import PullPage from './PullPage'
import SourceModal from './SourceModal'
import './styles.css'

const data = rawData as FinnData
const portfolio = data.portfolio ?? []
const briefs = data.briefs ?? []
const filingSignals = data.signals ?? []
const quoteSignals: Signal[] = (data.quotes ?? []).map((quote) => {
  const change = quote.changePct ?? 0
  const volumeMultiple = quote.volumeMultiple ?? 0
  const priority = Math.abs(change) >= 5 && volumeMultiple >= 2 ? 'high' : Math.abs(change) >= 3 && volumeMultiple >= 1.5 ? 'medium' : 'routine'
  const sign = change > 0 ? '+' : ''
  const close = quote.closeINR === undefined ? 'not supplied' : `₹${quote.closeINR.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
    const volume = quote.volumeShares === undefined ? 'not supplied' : `${quote.volumeShares.toLocaleString('en-IN')} shares`
  return {
    id: `eod-${quote.ticker}-${quote.asOf}`,
    kind: 'price_volume',
    ticker: quote.ticker,
    title: `${tickerLabel(quote.ticker)} closed at ${close} (${sign}${change.toFixed(2)}%)`,
    priority,
    summary: `End-of-day close vs. prior NSE session; ${volume} traded, ${volumeMultiple.toFixed(2)}× its 20-session average.`,
    whyItMatters: 'A move alongside unusually high turnover can be worth reviewing, but this market observation does not explain its cause.',
    whatToVerify: 'Confirm the session close and 20-session volume baseline, then inspect dated issuer disclosures before drawing a conclusion.',
    publishedAt: quote.asOf,
    source: { title: quote.sourceTitle || quote.source?.title || 'NSE CM-UDiFF EOD', url: quote.sourceUrl || quote.source?.url, sourceType: 'market_data', publishedAt: quote.asOf, dateLabel: quote.source?.date, issuer: portfolio.find((company) => tickerLabel(company.ticker) === tickerLabel(quote.ticker))?.name, ticker: quote.ticker },
    metrics: { priceMovePct: change, volumeVsAverage: volumeMultiple, closeINR: quote.closeINR, prevCloseINR: quote.prevCloseINR, volumeShares: quote.volumeShares, average20SessionVolume: quote.avg20VolumeShares, period: '20-session average' },
  }
})

export default function App() {
  const [page, setPage] = useState<'push' | 'pull'>('push')
  const [activeTicker, setActiveTicker] = useState('')
  const [tickerInput, setTickerInput] = useState('')
  const [tickerError, setTickerError] = useState('')
  const [query, setQuery] = useState('')
  const [queryDraft, setQueryDraft] = useState('')
  const [kindFilter, setKindFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [watchFilter, setWatchFilter] = useState('all')
  const [minMove, setMinMove] = useState(() => Number(localStorage.getItem('finn-min-move') || data.meta?.defaultThresholds?.priceMovePct || 2))
  const [minVolume, setMinVolume] = useState(() => Number(localStorage.getItem('finn-min-volume') || data.meta?.defaultThresholds?.volumeMultiple || 2))
  const [rulesOpen, setRulesOpen] = useState(false)
  const [windowFilter, setWindowFilter] = useState('all')
  const [sourceDrawer, setSourceDrawer] = useState<Source | null>(null)
  useEffect(() => { localStorage.setItem('finn-min-move', String(minMove)) }, [minMove])
  useEffect(() => { localStorage.setItem('finn-min-volume', String(minVolume)) }, [minVolume])

  const briefByTicker = useMemo(() => new Map(briefs.map((brief) => [tickerLabel(brief.ticker), brief])), [])
  const companyByTicker = useMemo(() => new Map(portfolio.map((company) => [tickerLabel(company.ticker), company])), [])
  const activeBrief = activeTicker ? briefByTicker.get(tickerLabel(activeTicker)) : undefined
  const activeCompany = activeTicker ? companyByTicker.get(tickerLabel(activeTicker)) : undefined
  const allSignals = useMemo(() => [...filingSignals, ...quoteSignals], [])
  const queryMatches = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter((token) => token.length > 1)
    if (!tokens.length || !activeBrief) return []
    const allowed = (activeBrief.sources ?? []).filter((source) => source.sourceType === 'annual_report' || source.sourceType === 'concall_transcript' || source.sourceType === 'concall' || source.sourceType === 'transcript')
    const sourceById = new Map(allowed.map((source) => [source.id, source]))
    const hits: { source: Source; score: number; snippet: string; resultType: 'excerpt' | 'paraphrase' | 'topic' | 'figure' }[] = []
    const scoreText = (value: string) => tokens.reduce((sum, token) => sum + (value.toLowerCase().includes(token) ? 1 : 0), 0)
    allowed.forEach((source) => {
      if (source.excerpt && !activeBrief.evidence?.length) { const score = scoreText(`${source.title} ${source.excerpt}`); if (score) hits.push({ source, score: score + 4, snippet: source.excerpt, resultType: source.excerptType === 'verbatim' ? 'excerpt' : 'paraphrase' }) }
      ;(source.supports ?? []).forEach((topic) => { const score = scoreText(topic); if (score) hits.push({ source, score, snippet: topic, resultType: 'topic' }) })
    })
    ;(activeBrief.evidence ?? []).forEach((evidence) => {
      const source = evidence.sourceId ? sourceById.get(evidence.sourceId) : undefined
      const snippet = evidence.excerpt || evidence.text || evidence.claim || ''
      const score = scoreText(`${snippet} ${evidence.claim ?? ''}`)
      if (source && snippet && score) hits.push({ source, score: score + (evidence.excerpt ? 4 : 1), snippet, resultType: evidence.excerptType === 'verbatim' ? 'excerpt' : 'paraphrase' })
    })
    ;(activeBrief.metrics ?? []).forEach((metric) => {
      const source = metric.sourceId ? sourceById.get(metric.sourceId) : undefined
      const snippet = `Reported figure: ${metric.label ?? 'Metric'} ${typeof metric.value === 'number' ? metric.value.toLocaleString('en-IN') : metric.value ?? ''} ${metric.unit ?? ''} · ${metric.period ?? 'period not supplied'}${metric.changeYoYPct === undefined ? '' : ` · ${metric.changeYoYPct > 0 ? '+' : ''}${metric.changeYoYPct}% YoY`}`
      const score = scoreText(`${snippet} ${metric.label ?? ''} ${source?.supports?.join(' ') ?? ''}`)
      if (source && score) hits.push({ source, score: score + 2, snippet, resultType: 'figure' })
    })
    return hits.sort((a, b) => b.score - a.score).slice(0, 5)
  }, [activeBrief, query])
  const visibleSignals = useMemo(() => allSignals.filter((signal) => {
    if (kindFilter !== 'all' && signal.kind !== kindFilter) return false
    if (priorityFilter !== 'all' && signal.priority !== priorityFilter) return false
    if (watchFilter !== 'all' && signal.ticker?.toUpperCase() !== watchFilter) return false
    if (windowFilter !== 'all' && signal.publishedAt) {
      const days = Number(windowFilter)
      const snapshot = new Date(`${data.meta?.asOf || '1970-01-01'}T23:59:59`).valueOf()
      const published = new Date(signal.publishedAt).valueOf()
      if (Number.isFinite(published) && Number.isFinite(snapshot) && published < snapshot - days * 86_400_000) return false
    }
    if (signal.kind === 'price_volume') {
      const metrics = Array.isArray(signal.metrics) ? undefined : signal.metrics
      const move = numberFrom(metrics, ['priceMovePct', 'price_move_pct', 'movePct', 'priceChangePct'])
      const volume = numberFrom(metrics, ['volumeVsAverage', 'volume_vs_average', 'volumeRatio', 'relativeVolume'])
      if (move !== undefined && Math.abs(move) < minMove) return false
      if (volume !== undefined && volume < minVolume) return false
    }
    return true
  }).sort((a, b) => {
    const rank = (value?: string) => value === 'high' ? 0 : value === 'medium' ? 1 : 2
    return rank(a.priority) - rank(b.priority) || (Date.parse(b.publishedAt ?? '') || 0) - (Date.parse(a.publishedAt ?? '') || 0)
  }), [allSignals, kindFilter, priorityFilter, watchFilter, windowFilter, minMove, minVolume])
  const selectTicker = (ticker: string) => {
    const normalized = tickerLabel(ticker.trim())
    if (!normalized) return
    if (!/^[A-Z0-9&.-]{1,20}$/.test(normalized)) {
      setTickerError('Use an NSE ticker symbol, such as INFY or M&M.')
      return
    }
    setTickerError('')
    const canonical = briefs.find((brief) => tickerLabel(brief.ticker) === normalized)?.ticker || portfolio.find((company) => tickerLabel(company.ticker) === normalized)?.ticker || normalized
    setActiveTicker(canonical)
    setTickerInput(normalized)
    setPage('pull')
  }
  const submitTicker = (event: FormEvent) => { event.preventDefault(); selectTicker(tickerInput) }
  const submitQuery = (event: FormEvent) => { event.preventDefault(); setQuery(queryDraft.trim()) }
  const openSource = useCallback((source: Source) => {
    const ticker = source.ticker || activeTicker
    setSourceDrawer({ ...source, issuer: source.issuer || briefs.find((brief) => tickerLabel(brief.ticker) === tickerLabel(ticker))?.name || portfolio.find((company) => tickerLabel(company.ticker) === tickerLabel(ticker))?.name || ticker || undefined })
  }, [activeTicker])
  const closeSource = useCallback(() => setSourceDrawer(null), [])
  const beginPull = (ticker?: string) => {
    setPage('pull')
    if (ticker) { setTickerInput(ticker); selectTicker(ticker) }
  }
  const headerLabel = page === 'push' ? 'Push desk' : 'Pull research'

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand-lockup"><div className="brand-mark"><span>f</span><i /></div><div><div className="brand-name">FINN<span className="brand-dot">.</span></div><div className="brand-caption">INVESTMENT RESEARCH</div></div></div>
      <div className="sidebar-kicker">WORKSPACE</div>
      <nav className="primary-nav" aria-label="Main navigation"><button className={`nav-item ${page === 'push' ? 'selected' : ''}`} onClick={() => setPage('push')}><span className="nav-icon"><Activity size={17}/></span><span><b>Push</b><small>Signals & filings</small></span><ChevronRight className="nav-chevron" size={15}/></button><button className={`nav-item ${page === 'pull' ? 'selected' : ''}`} onClick={() => beginPull()}><span className="nav-icon"><Search size={17}/></span><span><b>Pull</b><small>Ask the evidence</small></span><ChevronRight className="nav-chevron" size={15}/></button></nav>
      <div className="sidebar-divider"/><div className="universe-heading"><span>RESEARCH UNIVERSE</span><span className="count-pill">{portfolio.length || '—'}</span></div>
      <div className="universe-list">{portfolio.map((company) => <button key={company.ticker} className={`universe-row ${tickerLabel(activeTicker) === tickerLabel(company.ticker) ? 'active' : ''}`} onClick={() => beginPull(company.ticker)}><span className="ticker-avatar">{tickerLabel(company.ticker).slice(0, 1)}</span><span className="universe-ticker">{tickerLabel(company.ticker)}</span><span className="universe-name">{company.name}</span></button>)}</div>
      <div className="sidebar-spacer"/><div className="sidebar-footer"><div className="coverage-icon"><ShieldCheck size={17}/></div><div><strong>Evidence first</strong><span>Annual reports + concalls</span></div></div><div className="sidebar-footnote">FINN RESEARCH DESK <i>•</i> ENAM</div>
    </aside>
    <main className="main-area">
      <header className="topbar"><span className="mobile-brand">FINN<span>.</span></span><div className="breadcrumb"><span>Research</span><ChevronRight size={14}/><b>{headerLabel}</b></div><div className="topbar-right"><div className="snapshot-status"><span className="status-dot"/><span className="snapshot-long">{data.meta?.snapshotLabel || 'Dated research snapshot'}</span><span className="snapshot-short">Snapshot · {formatDate(data.meta?.asOf)}</span></div><button className="help-button" aria-label="Research methodology" onClick={() => setSourceDrawer({ title: 'FINN research boundaries', sourceType: 'Method' })}><CircleHelp size={17}/></button></div></header>
      <div className="content-wrap">{page === 'push' ? <PushPage signals={visibleSignals} portfolio={portfolio} kindFilter={kindFilter} setKindFilter={setKindFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} watchFilter={watchFilter} setWatchFilter={setWatchFilter} windowFilter={windowFilter} setWindowFilter={setWindowFilter} minMove={minMove} setMinMove={setMinMove} minVolume={minVolume} setMinVolume={setMinVolume} defaultMinMove={data.meta?.defaultThresholds?.priceMovePct ?? 2} defaultMinVolume={data.meta?.defaultThresholds?.volumeMultiple ?? 2} rulesOpen={rulesOpen} setRulesOpen={setRulesOpen} asOf={data.meta?.asOf} onOpenSource={openSource} onPull={beginPull}/> : <PullPage briefs={briefs} portfolio={portfolio} activeTicker={activeTicker} activeBrief={activeBrief} activeCompany={activeCompany} tickerInput={tickerInput} setTickerInput={setTickerInput} tickerError={tickerError} submitTicker={submitTicker} queryDraft={queryDraft} setQueryDraft={setQueryDraft} submitQuery={submitQuery} query={query} matches={queryMatches} onSelectTicker={selectTicker} onOpenSource={openSource}/>}</div>
      <footer className="site-footer"><span>FINN is an evidence research workflow, not a buy/sell recommendation.</span><span>Snapshot as of {formatDate(data.meta?.asOf)}</span></footer>
      <nav className="mobile-tabbar" aria-label="Mobile navigation"><button className={page === 'push' ? 'mobile-tab-active' : ''} onClick={() => setPage('push')}><Activity size={17}/><span>Push</span></button><button className={page === 'pull' ? 'mobile-tab-active' : ''} onClick={() => beginPull()}><Search size={17}/><span>Pull</span></button><span className="mobile-tabbar-note"><FileText size={13}/> Dated snapshot</span></nav>
    </main>
    {sourceDrawer && <SourceModal source={sourceDrawer} onClose={closeSource}/>}
  </div>
}
