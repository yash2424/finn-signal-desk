export type Source = {
  id?: string
  issuer?: string
  ticker?: string
  title?: string
  url?: string
  sourceType?: string
  publishedAt?: string | null
  dateLabel?: string
  pageOrSection?: string
  sectionOrPage?: string
  excerpt?: string
  excerptType?: 'verbatim' | 'paraphrase' | string
  supports?: string[]
  reportingPeriod?: string
  basis?: string
}
export type Metric = { label?: string; value?: string | number; unit?: string; period?: string; sourceId?: string; changeYoYPct?: number; basis?: string }
export type Claim = { claim?: string; sourceId?: string }
export type Brief = {
  ticker: string
  name?: string
  asOf?: string
  period?: string
  thesis?: string
  metrics?: Metric[]
  bull?: string | Claim | Claim[]
  bear?: string | Claim | Claim[]
  sources?: Source[]
  adHoc?: boolean
  businessSnapshot?: string
  narrativeVsNumbers?: string
  cashQuality?: string | null
  watchItems?: string[]
  evidence?: { text?: string; claim?: string; excerpt?: string; excerptType?: 'verbatim' | 'paraphrase' | string; sourceId?: string; sectionOrPage?: string; pageOrSection?: string }[]
}
export type PortfolioCompany = { ticker: string; name?: string; exchange?: string; sector?: string }
export type Signal = {
  id?: string
  kind?: string
  ticker?: string
  title?: string
  priority?: string
  summary?: string
  whatChanged?: string
  whyItMatters?: string
  whatToVerify?: string
  publishedAt?: string
  source?: Source
  metrics?: Record<string, unknown> | Metric[]
  evidence?: string | { excerpt?: string; pageOrSection?: string }
}
export type Quote = {
  ticker: string
  asOf?: string
  closeINR?: number
  prevCloseINR?: number
  changePct?: number
  volumeShares?: number
  avg20VolumeShares?: number
  volumeMultiple?: number
  sourceTitle?: string
  sourceUrl?: string
  provider?: string
  source?: { title?: string; url?: string; date?: string; provider?: string }
}
export type FinnData = {
  meta?: { asOf?: string; snapshotLabel?: string; coverage?: string; defaultThresholds?: { priceMovePct?: number; volumeMultiple?: number }; marketMethod?: string }
  portfolio?: PortfolioCompany[]
  signals?: Signal[]
  briefs?: Brief[]
  quotes?: Quote[]
}
