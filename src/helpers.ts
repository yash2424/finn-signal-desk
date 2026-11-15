import type { Source } from './types'

export const formatDate = (value?: string | null) => {
  if (!value) return 'Date not supplied'
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}
export const prettyKind = (kind?: string) => kind === 'price_volume' ? 'Price & volume' : kind === 'filing' ? 'Filing' : kind?.replace(/_/g, ' ') ?? 'Signal'
export const priorityLabel = (priority?: string) => priority === 'high' ? 'High attention' : priority === 'medium' ? 'Worth a look' : 'Routine update'
export const sourceLabel = (source?: Source) => source?.sourceType === 'concall' || source?.sourceType === 'concall_transcript' || source?.sourceType === 'transcript' ? 'Earnings call' : source?.sourceType === 'annual_report' ? 'Annual report' : source?.sourceType === 'results_release' ? 'Results release' : source?.sourceType?.replace(/_/g, ' ') || 'Primary source'
export const sectionName = (source?: Source) => source?.pageOrSection || source?.sectionOrPage
export const tickerLabel = (ticker?: string) => ticker?.toUpperCase().replace(/\.NS$/, '') ?? ''
export const safeUrl = (url?: string) => url && /^https?:\/\//i.test(url) ? url : undefined
export const numberFrom = (record: Record<string, unknown> | undefined, keys: string[]) => {
  if (!record) return undefined
  for (const key of keys) {
    const value = record[key]
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string') {
      const match = value.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/)
      if (match) return Number(match[0])
    }
  }
  return undefined
}
/** Open a PDF at the first cited "PDF p. N" page; other URLs are returned unchanged. */
export const pageLinkedUrl = (url?: string, pageOrSection?: string) => {
  const safe = safeUrl(url)
  if (!safe || safe.includes('#') || !/\.pdf($|\?)/i.test(safe)) return safe
  const page = pageOrSection?.match(/PDF pp?\. (\d+)/i)?.[1]
  return page ? `${safe}#page=${page}` : safe
}
export const NSE_DIRECTORY_URL = 'https://www.nseindia.com/companies-listing/corporate-filings-directory'
