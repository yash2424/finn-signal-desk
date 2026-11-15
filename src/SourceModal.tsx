import { useEffect, useRef } from 'react'
import { ExternalLink, FileText, Info, ShieldCheck, X } from 'lucide-react'
import type { Source } from './types'
import { formatDate, safeUrl, sectionName, sourceLabel } from './helpers'
import './styles.css'

export default function SourceModal({ source, onClose }: { source: Source; onClose: () => void }) {
  const panelRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const focusable = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])') ?? [])
    focusable()[0]?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return }
      if (event.key === 'Tab') {
        const elements = focusable()
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [onClose])
  const isMethod = source.sourceType === 'Method'
  const isMarketData = source.sourceType === 'market_data'
  const detail = source.matchedSnippet ?? source.excerpt
  const detailType = source.matchedType ?? (source.excerptType === 'verbatim' ? 'excerpt' : source.excerpt ? 'paraphrase' : undefined)
  const sourceNote = isMarketData
    ? 'This is the official NSE CM-UDiFF full-market session file used for the observation. It contains many securities and is not a ticker-specific document link.'
    : detailType === 'topic'
      ? 'This matched topic is an index label associated with the cited source, not text quoted from the document.'
      : detailType === 'figure'
        ? 'This is a reported figure from the cited source. The displayed basis and period are part of the match; confirm the original document for full context.'
        : detailType === 'paraphrase'
          ? 'This is a research paraphrase, not a direct quote. Confirm its context in the original document.'
          : detailType === 'excerpt'
            ? 'This is a captured source excerpt. Confirm its context in the original document before relying on it.'
            : 'This view links to the original issuer source; it does not claim a matching passage was captured.'
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section ref={panelRef} className="source-modal" role="dialog" aria-modal="true" aria-labelledby="source-modal-title" tabIndex={-1}>
    <div className="modal-topline"><span>{isMethod ? 'RESEARCH METHOD' : 'SOURCE DETAIL'}</span><button className="icon-button" onClick={onClose} aria-label="Close source details"><X size={17} /></button></div>
    <div className="modal-doc-icon">{isMethod ? <ShieldCheck size={20} /> : <FileText size={20} />}</div><div className="modal-type">{isMethod ? 'HOW FINN WORKS' : sourceLabel(source)}</div><h2 id="source-modal-title">{isMethod ? 'Evidence before interpretation.' : source.title || 'Primary source'}</h2>
    {isMethod ? <>
      <p className="modal-description">FINN Pull runs a deterministic local lookup over notes, reported figures, and topic labels included in this dated snapshot. Results link to their source and distinguish paraphrases, figures, and index topics from verbatim excerpts. It does not generate answers or look up new material.</p>
      <div className="method-list"><div><span>01</span><p><strong>Ground each claim</strong>Thesis points, figures, and signals link back to primary company disclosures.</p></div><div><span>02</span><p><strong>Show coverage gaps</strong>Unknown tickers and unmatched queries are marked unavailable instead of filled with guesses.</p></div><div><span>03</span><p><strong>Keep the scope clear</strong>Market observations are dated snapshots. The app has no live exchange connection or buy/sell recommendations.</p></div></div>
    </> : <>
      {isMarketData ? <div className="modal-issuer">Observation row · {source.ticker || 'ticker not supplied'}</div> : source.issuer && <div className="modal-issuer">{source.issuer}{source.ticker && <span> · {source.ticker}</span>}</div>}
      <div className="modal-source-meta"><span>{formatDate(source.publishedAt) === 'Date not supplied' ? source.dateLabel || 'Date not supplied' : formatDate(source.publishedAt)}</span>{sectionName(source) && <><i>·</i><span>{sectionName(source)}</span></>}</div>
      {detail && (detailType === 'excerpt' ? <blockquote className="modal-excerpt">“{detail}”</blockquote> : <div className="modal-paraphrase"><span>{detailType === 'topic' ? 'SOURCE-INDEX TOPIC · NOT DOCUMENT TEXT' : detailType === 'figure' ? 'REPORTED FIGURE' : 'RESEARCH PARAPHRASE · NOT A DIRECT QUOTE'}</span><p>{detail}</p></div>)}
      <div className="modal-source-note"><Info size={14} />{sourceNote}</div>
      {safeUrl(source.url) ? <a className="primary-button modal-open-link" href={safeUrl(source.url)} target="_blank" rel="noreferrer">Open original source <ExternalLink size={14} /></a> : <div className="source-unavailable">A direct source URL wasn’t provided in this snapshot.</div>}
    </>}
    <div className="modal-footer"><span><ShieldCheck size={14} />PRIMARY-SOURCE GROUNDING</span><button onClick={onClose}>Close</button></div>
  </section></div>
}
