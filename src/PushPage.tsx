import { Activity, ArrowDownRight, ArrowUpRight, ChevronDown, ChevronRight, ExternalLink, FileText, Filter, Info, Landmark, Settings2, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import type { PortfolioCompany, Signal, Source } from './types'
import { formatDate, numberFrom, prettyKind, priorityLabel, sourceLabel, safeUrl, tickerLabel } from './helpers'
import './styles.css'

type Props = {
  signals: Signal[]; portfolio: PortfolioCompany[]; kindFilter: string; setKindFilter: (value: string) => void
  priorityFilter: string; setPriorityFilter: (value: string) => void; watchFilter: string; setWatchFilter: (value: string) => void
  minMove: number; setMinMove: (value: number) => void; minVolume: number; setMinVolume: (value: number) => void
  rulesOpen: boolean; setRulesOpen: (value: boolean) => void; asOf?: string; windowFilter: string; setWindowFilter: (value: string) => void
  defaultMinMove: number; defaultMinVolume: number
  onOpenSource: (source: Source) => void; onPull: (ticker?: string) => void
}
const kinds = ['all', 'filing', 'price_volume']
const moveKeys = ['priceMovePct', 'price_move_pct', 'movePct', 'priceChangePct']
const volumeKeys = ['volumeVsAverage', 'volume_vs_average', 'volumeRatio', 'relativeVolume']

export default function PushPage(props: Props) {
  const { signals, portfolio, kindFilter, setKindFilter, priorityFilter, setPriorityFilter, watchFilter, setWatchFilter, minMove, setMinMove, minVolume, setMinVolume, rulesOpen, setRulesOpen, asOf, windowFilter, setWindowFilter, defaultMinMove, defaultMinVolume, onOpenSource, onPull } = props
  const highCount = signals.filter((item) => item.priority === 'high').length
  const filingCount = signals.filter((item) => item.kind === 'filing').length
  const priceCount = signals.filter((item) => item.kind === 'price_volume').length
  const names = new Map(portfolio.map((company) => [company.ticker.toUpperCase(), company.name]))
  return <div className="page-enter">
    <section className="page-intro">
      <div className="eyebrow"><span className="eyebrow-line" /> DAILY RESEARCH DIGEST</div>
      <div className="intro-row"><div><h1>Push<span className="heading-period">.</span></h1><p className="intro-copy">A concise view of what changed across your research universe.</p></div>
        <div className="date-stamp"><span className="snapshot-mark" /><span>Snapshot window <b>{formatDate(asOf)}</b></span></div>
      </div>
    </section>
    <section className="digest-summary" aria-label="Digest summary">
      <div className="summary-cell"><span className="summary-label">IN THIS VIEW</span><strong>{signals.length.toString().padStart(2, '0')}</strong><span className="summary-note">dated signals collected</span></div>
      <div className="summary-cell"><span className="summary-label">HIGH ATTENTION</span><strong className="summary-highlight">{highCount.toString().padStart(2, '0')}</strong><span className="summary-note">ranked from source evidence</span></div>
      <div className="summary-cell"><span className="summary-label">FILINGS</span><strong>{filingCount.toString().padStart(2, '0')}</strong><span className="summary-note">company disclosures</span></div>
      <div className="summary-cell"><span className="summary-label">PRICE / VOLUME</span><strong>{priceCount.toString().padStart(2, '0')}</strong><span className="summary-note">dated observations</span></div>
    </section>
    <section className="digest-section">
      <div className="section-heading"><div><div className="section-kicker">WHAT DESERVES A LOOK</div><h2>Signals <span className="light-count">{signals.length}</span></h2></div><button className={`text-button ${rulesOpen ? 'pressed' : ''}`} onClick={() => setRulesOpen(!rulesOpen)}><SlidersHorizontal size={15} /> Digest rules <span className="settings-dot" /></button></div>
      {rulesOpen && <div className="rules-panel">
        <div className="rules-intro"><div className="rules-icon"><Settings2 size={17} /></div><div><strong>Set your attention thresholds</strong><p>Saved on this device. Filters apply to dated price and volume observations in this snapshot.</p></div></div>
        <div className="rule-control"><label htmlFor="move-range">Minimum price move <b>{minMove}%</b></label><input id="move-range" type="range" min="1" max="10" step="1" value={minMove} onChange={(event) => setMinMove(Number(event.target.value))} /><div className="range-ends"><span>1%</span><span>10%</span></div></div>
        <div className="rule-control"><label htmlFor="volume-range">Minimum volume vs. average <b>{minVolume.toFixed(1)}×</b></label><input id="volume-range" type="range" min="1" max="5" step="0.5" value={minVolume} onChange={(event) => setMinVolume(Number(event.target.value))} /><div className="range-ends"><span>1×</span><span>5×</span></div></div>
        <div className="rule-note"><Info size={14} /> % move = NSE close vs prior session. Volume multiple = session volume ÷ prior 20-session mean. These local filters do not create background alerts.</div>
      </div>}
      <div className="archive-note"><Info size={13}/><span>Filing examples keep their original FY25 dates. Price and volume observations use the 13 Nov 2026 NSE session; all windows below are anchored to that snapshot date.</span></div>
      <div className="filter-row"><div className="filter-tabs" role="group" aria-label="Signal type filter">{kinds.map((kind) => <button key={kind} className={kindFilter === kind ? 'filter-active' : ''} onClick={() => setKindFilter(kind)}>{kind === 'all' ? 'All signals' : prettyKind(kind)}</button>)}</div>
        <div className="filter-selects"><label className="select-wrap"><Filter size={13} /><select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} aria-label="Filter by attention"><option value="all">Any attention</option><option value="high">High attention</option><option value="medium">Worth a look</option><option value="routine">Routine update</option></select><ChevronDown size={13} /></label>
          <label className="select-wrap"><Landmark size={13} /><select value={watchFilter} onChange={(event) => setWatchFilter(event.target.value)} aria-label="Filter by company"><option value="all">All companies</option>{portfolio.map((company) => <option key={company.ticker} value={company.ticker}>{company.ticker.replace(/\.NS$/, '')}</option>)}</select><ChevronDown size={13} /></label></div>
        <label className="select-wrap window-select"><select value={windowFilter} onChange={(event) => setWindowFilter(event.target.value)} aria-label="Filter by snapshot window"><option value="all">All snapshot dates</option><option value="1">24h before snapshot</option><option value="7">7d before snapshot</option><option value="30">30d before snapshot</option></select><ChevronDown size={13} /></label>
      </div>
      <div className="signal-list">{signals.length ? signals.map((signal, index) => <SignalCard key={signal.id ?? `${signal.ticker}-${index}`} signal={signal} index={index} companyName={signal.ticker ? names.get(signal.ticker.toUpperCase()) : undefined} onOpenSource={onOpenSource} onPull={onPull} />) : <div className="empty-state"><div className="empty-icon"><Filter size={19} /></div><strong>No signals match these filters</strong><span>Try another attention level, company, or snapshot window.</span><button onClick={() => { setKindFilter('all'); setPriorityFilter('all'); setWatchFilter('all'); setWindowFilter('all'); setMinMove(defaultMinMove); setMinVolume(defaultMinVolume) }}>Reset filters</button></div>}</div>
      <div className="digest-footnote"><ShieldCheck size={15} /><span>Each item links to a dated company filing or market observation. Priority is an attention cue, not a forecast.</span></div>
    </section>
  </div>
}

function SignalCard({ signal, index, companyName, onOpenSource, onPull }: { signal: Signal; index: number; companyName?: string; onOpenSource: (source: Source) => void; onPull: (ticker?: string) => void }) {
  const source = signal.source ?? {}
  const kind = signal.kind ?? 'filing'
  const metrics = Array.isArray(signal.metrics) ? undefined : signal.metrics
  const movement = numberFrom(metrics, moveKeys)
  const volume = numberFrom(metrics, volumeKeys)
  const changeText = signal.whatChanged || signal.summary
  const metricsPeriod = typeof metrics?.period === 'string' ? metrics.period : undefined
  return <article className="signal-card" style={{ animationDelay: `${Math.min(index * 45, 280)}ms` }}>
    <div className="signal-marker"><span className={`marker-dot ${signal.priority === 'high' ? 'marker-hot' : ''}`} /></div><div className="signal-main">
      <div className="signal-meta"><span className={`signal-type type-${kind}`}><i>{kind === 'filing' ? <FileText size={12} /> : <Activity size={12} />}</i>{prettyKind(kind)}</span><span className={`priority-tag priority-${signal.priority ?? 'routine'}`}>{priorityLabel(signal.priority)}</span><span className="signal-date">{formatDate(signal.publishedAt)}</span></div>
      <button className="signal-title-button" onClick={() => onPull(signal.ticker)}><h3>{signal.title || `${signal.ticker ?? 'Company'} disclosure update`}</h3><ChevronRight size={17} /></button>
      {signal.ticker && <button className="signal-company" onClick={() => onPull(signal.ticker)}><span className="company-symbol">{tickerLabel(signal.ticker)}</span><span>{companyName || 'NSE listed company'}</span></button>}
      {changeText && <p className="signal-summary">{changeText}</p>}
      {(signal.whyItMatters || signal.whatToVerify) && <div className="signal-prompts">{signal.whyItMatters && <p><b>Why it matters</b>{signal.whyItMatters}</p>}{signal.whatToVerify && <p><b>What to verify</b>{signal.whatToVerify}</p>}</div>}
      <div className="signal-bottom"><div className="signal-metrics">{movement !== undefined && <span className={movement < 0 ? 'metric-negative' : 'metric-positive'}>{movement > 0 ? <ArrowUpRight size={13} /> : movement < 0 ? <ArrowDownRight size={13} /> : null}{movement > 0 ? '+' : movement < 0 ? '−' : ''}{Math.abs(movement).toFixed(2)}% move</span>}{volume !== undefined && <span><Activity size={12} />{volume.toFixed(2)}× 20-session avg.</span>}{metricsPeriod && <span>{metricsPeriod}</span>}</div></div>
      {source.title && <div className="source-inline"><span>{sourceLabel(source)}</span><button onClick={() => onOpenSource({ ...source, ticker: signal.ticker, issuer: source.issuer || companyName || signal.ticker })}>{source.title}<ChevronRight size={12}/></button><time>{formatDate(source.publishedAt) === 'Date not supplied' ? source.dateLabel || 'Date not supplied' : formatDate(source.publishedAt)}</time>{safeUrl(source.url) && <a href={safeUrl(source.url)} target="_blank" rel="noreferrer">Open source <ExternalLink size={11} /></a>}</div>}
    </div>
  </article>
}
