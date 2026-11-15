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
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section ref={panelRef} className="source-modal" role="dialog" aria-modal="true" aria-labelledby="source-modal-title" tabIndex={-1}>
    <div className="modal-topline"><span>{isMethod ? 'RESEARCH METHOD' : 'SOURCE DETAIL'}</span><button className="icon-button" onClick={onClose} aria-label="Close source details"><X size={17} /></button></div>
    <div className="modal-doc-icon">{isMethod ? <ShieldCheck size={20} /> : <FileText size={20} />}</div><div className="modal-type">{isMethod ? 'HOW FINN WORKS' : sourceLabel(source)}</div><h2 id="source-modal-title">{isMethod ? 'Evidence before interpretation.' : source.title || 'Primary source'}</h2>
    {isMethod ? <>
      <p className="modal-description">FINN Pull searches only the indexed annual report and earnings call transcript excerpts in this dated snapshot. It returns matching passages and their source locations; it does not invent answers where the index has no evidence.</p>
      <div className="method-list"><div><span>01</span><p><strong>Ground each claim</strong>Thesis points, figures, and signals link back to primary company disclosures.</p></div><div><span>02</span><p><strong>Show coverage gaps</strong>Unknown tickers and unmatched queries are marked unavailable instead of filled with guesses.</p></div><div><span>03</span><p><strong>Keep the scope clear</strong>Market observations are dated snapshots. The app has no live exchange connection or buy/sell recommendations.</p></div></div>
    </> : <>
      {source.issuer && <div className="modal-issuer">{source.issuer}{source.ticker && <span> · {source.ticker}</span>}</div>}
      <div className="modal-source-meta"><span>{formatDate(source.publishedAt) === 'Date not supplied' ? source.dateLabel || 'Date not supplied' : formatDate(source.publishedAt)}</span>{sectionName(source) && <><i>·</i><span>{sectionName(source)}</span></>}</div>
      {source.excerpt && (source.excerptType === 'verbatim' ? <blockquote className="modal-excerpt">“{source.excerpt}”</blockquote> : <div className="modal-paraphrase"><span>RESEARCH PARAPHRASE · NOT A DIRECT QUOTE</span><p>{source.excerpt}</p></div>)}
      <div className="modal-source-note"><Info size={14} />FINN surfaces the source passage for your review. Confirm context in the original document before relying on a claim.</div>
      {safeUrl(source.url) ? <a className="primary-button modal-open-link" href={safeUrl(source.url)} target="_blank" rel="noreferrer">Open original source <ExternalLink size={14} /></a> : <div className="source-unavailable">A direct source URL wasn’t provided in this snapshot.</div>}
    </>}
    <div className="modal-footer"><span><ShieldCheck size={14} />PRIMARY-SOURCE GROUNDING</span><button onClick={onClose}>Close</button></div>
  </section></div>
}
