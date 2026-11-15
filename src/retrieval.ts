import type { Brief, Source } from './types'

export type EvidenceHit = {
  source: Source
  score: number
  snippet: string
  resultType: 'excerpt' | 'paraphrase' | 'topic' | 'figure'
}

const stopWords = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'i', 'in', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'was', 'what', 'when', 'where', 'which', 'who', 'why', 'with'])
const tokensOf = (value: string) => (value.toLowerCase().match(/[a-z0-9]+/g) ?? [])

/** Deterministic whole-word lookup over only the records bundled in a brief. */
export function searchBriefEvidence(brief: Brief | undefined, query: string): EvidenceHit[] {
  const tokens = Array.from(new Set(tokensOf(query).filter((token) => token.length > 1 && !stopWords.has(token))))
  if (!tokens.length || !brief) return []

  const allowed = (brief.sources ?? []).filter((source) => ['annual_report', 'concall_transcript', 'concall', 'transcript'].includes(source.sourceType ?? ''))
  const sourceById = new Map(allowed.map((source) => [source.id, source]))
  const hits: EvidenceHit[] = []
  const scoreText = (value: string) => {
    const words = new Set(tokensOf(value))
    return tokens.reduce((sum, token) => sum + (words.has(token) ? 1 : 0), 0)
  }

  allowed.forEach((source) => {
    if (source.excerpt && !brief.evidence?.length) {
      const score = scoreText(`${source.title} ${source.excerpt}`)
      if (score) hits.push({ source, score: score + 4, snippet: source.excerpt, resultType: source.excerptType === 'verbatim' ? 'excerpt' : 'paraphrase' })
    }
    ;(source.supports ?? []).forEach((topic) => {
      const score = scoreText(topic)
      if (score) hits.push({ source: { ...source, matchedSnippet: topic, matchedType: 'topic' }, score, snippet: topic, resultType: 'topic' })
    })
  })

  ;(brief.evidence ?? []).forEach((evidence) => {
    const source = evidence.sourceId ? sourceById.get(evidence.sourceId) : undefined
    const snippet = evidence.excerpt || evidence.text || evidence.claim || ''
    const score = scoreText(`${snippet} ${evidence.claim ?? ''}`)
    if (!source || !snippet || !score) return
    const resultType = evidence.excerptType === 'verbatim' ? 'excerpt' : 'paraphrase'
    const matchedSource: Source = {
      ...source,
      pageOrSection: evidence.pageOrSection || evidence.sectionOrPage || source.pageOrSection || source.sectionOrPage,
      matchedSnippet: snippet,
      matchedType: resultType,
    }
    hits.push({ source: matchedSource, score: score + (evidence.excerpt ? 4 : 1), snippet, resultType })
  })

  ;(brief.metrics ?? []).forEach((metric) => {
    const source = metric.sourceId ? sourceById.get(metric.sourceId) : undefined
    const snippet = `Reported figure: ${metric.label ?? 'Metric'} ${typeof metric.value === 'number' ? metric.value.toLocaleString('en-IN') : metric.value ?? ''} ${metric.unit ?? ''} · ${metric.period ?? 'period not supplied'}${metric.changeYoYPct === undefined ? '' : ` · ${metric.changeYoYPct > 0 ? '+' : ''}${metric.changeYoYPct}% YoY`}${metric.basis ? ` · Basis: ${metric.basis}` : ''}`
    const searchableMetric = `${snippet} ${metric.label ?? ''} ${(metric.searchTerms ?? []).join(' ')}`
    const score = scoreText(searchableMetric)
    if (source && score) hits.push({ source: { ...source, pageOrSection: metric.pageOrSection || source.pageOrSection || source.sectionOrPage, matchedSnippet: snippet, matchedType: 'figure' }, score: score + 2, snippet, resultType: 'figure' })
  })

  return hits.sort((a, b) => b.score - a.score).slice(0, 5)
}
