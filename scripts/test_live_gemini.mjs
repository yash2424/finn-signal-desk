/*
 * Manual end-to-end check of the live research flow (src/liveResearchApi.ts)
 * against the real Gemini API. Reads GEMINI_API_KEY from the environment or
 * from .env.local (git-ignored). Writes results to a temp folder; the key is
 * never written or printed.
 *
 *   node scripts/test_live_gemini.mjs [SYMBOL] ["follow-up question"]
 */
import { build } from 'esbuild'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const symbol = (process.argv[2] || 'TRENT').toUpperCase()
const question = process.argv[3] || 'How did operating margin change, and what did management say about it?'

let key = process.env.GEMINI_API_KEY
const envFile = path.join(root, '.env.local')
if (!key && fs.existsSync(envFile)) key = fs.readFileSync(envFile, 'utf8').match(/^\s*GEMINI_API_KEY\s*=\s*(\S+)/m)?.[1]
if (!key) { console.error('No GEMINI_API_KEY found in the environment or .env.local'); process.exit(2) }

const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'finn-gemini-test-'))
const bundle = path.join(outDir, 'liveResearchApi.mjs')
await build({ entryPoints: [path.join(root, 'src/liveResearchApi.ts')], bundle: true, format: 'esm', platform: 'neutral', outfile: bundle, logLevel: 'error' })

// Record every Gemini exchange (request prompt text + response body) for debugging. Headers are not logged.
const exchanges = []
const realFetch = globalThis.fetch
globalThis.fetch = async (url, init) => {
  const started = Date.now()
  const res = await realFetch(url, init)
  const body = await res.clone().text()
  const req = JSON.parse(init.body)
  exchanges.push({ url: String(url), status: res.status, ms: Date.now() - started, tools: req.tools, lastUserText: req.contents.at(-1).parts.map((p) => p.text).join('').slice(0, 600), response: body.slice(0, 20000) })
  fs.writeFileSync(path.join(outDir, 'exchanges.json'), JSON.stringify(exchanges, null, 2))
  console.log(`  [${res.status} in ${Math.round((Date.now() - started) / 1000)}s from ${String(url).split('/models/')[1]}]`)
  return res
}

const api = await import(pathToFileURL(bundle).href)
const log = (s) => console.log(`  … ${s}`)
const result = { symbol, model: api.LIVE_MODEL }
try {
  console.log(`Researching ${symbol} with ${api.LIVE_MODEL}`)
  let session = await api.startLiveResearch(key, symbol, log)
  result.docs = session.docs
  result.overview = session.turns[0]
  console.log(`  … asking: ${question}`)
  session = await api.askLiveResearch(key, session, question, log)
  result.followUp = session.turns.at(-1)
  result.sources = session.sources
  console.log('\nDOCUMENTS FOUND:', JSON.stringify(session.docs, null, 2))
  console.log('\nOVERVIEW:\n' + result.overview.text)
  console.log('\nOVERVIEW CITATIONS:', JSON.stringify(result.overview.citations, null, 2))
  console.log('\nFOLLOW-UP ANSWER:\n' + result.followUp.text)
  console.log('\nFOLLOW-UP CITATIONS:', JSON.stringify(result.followUp.citations, null, 2))
} catch (error) {
  result.error = { message: error.message, status: error.status, reason: error.reason, friendly: api.describeError(error) }
  console.error('\nFAILED:', result.error)
  process.exitCode = 1
} finally {
  fs.writeFileSync(path.join(outDir, 'result.json'), JSON.stringify(result, null, 2))
  fs.writeFileSync(path.join(outDir, 'exchanges.json'), JSON.stringify(exchanges, null, 2))
  console.log(`\n${exchanges.length} Gemini requests. Full log: ${outDir}`)
}
