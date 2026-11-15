/*
 * Browser regression audit for FINN source links and evidence retrieval.
 * Prerequisites: serve the app at http://127.0.0.1:5173, install Playwright
 * in an external QA environment, then set FINN_QA_URL and optionally
 * FINN_BROWSER_PATH. No app dependencies or data are modified by this script.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'app/data/finn-demo.json'), 'utf8'));
const mappingText = fs.readFileSync(path.join(root, 'src/issuerLinks.ts'), 'utf8');
const issuerLinks = Object.fromEntries([...mappingText.matchAll(/^\s*(?:'([A-Z0-9&.-]+)'|([A-Z0-9&.-]+)): \{ url: '([^']+)', label: '([^']+)' \},?$/gm)]
  .map((match) => [match[1] || match[2], { url: match[3], label: match[4] }]));
const nseDirectory = 'https://www.nseindia.com/companies-listing/corporate-filings-directory';
const baseUrl = process.env.FINN_QA_URL || 'http://127.0.0.1:5173/';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.FINN_BROWSER_PATH ? { executablePath: process.env.FINN_BROWSER_PATH } : {}),
  });
  try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.locator('.signal-card').first().waitFor();

  const observed = { baseUrl, coverage: [], sources: [], claimCitations: [], queries: {}, pageErrors };
  await page.getByRole('button', { name: /Pull/ }).first().click();
  const tickerInput = page.locator('input[aria-label="NSE ticker"]');
  const openButton = page.locator('.ticker-search button[type="submit"]');
  for (const company of data.portfolio || []) {
    const ticker = company.ticker.replace(/\.NS$/i, '').toUpperCase();
    await tickerInput.fill(ticker);
    await openButton.click();
    await page.locator('.unknown-coverage').waitFor();
    const links = await page.locator('.unknown-coverage a[href]').evaluateAll((items) => items.map((a) => ({
      text: a.innerText.trim(), href: a.href,
    })));
    assert.equal(links.length, 2, `${ticker}: expected the generic NSE directory and one issuer link`);
    assert.equal(links[0].href, nseDirectory, `${ticker}: NSE directory target`);
    assert(!/google\.|bing\.com|search\?q=/i.test(links.map((x) => x.href).join(' ')), `${ticker}: search-engine link found`);
    assert(issuerLinks[ticker], `${ticker}: missing issuer link mapping`);
    assert.equal(links[1].href, issuerLinks[ticker].url, `${ticker}: issuer destination mismatch`);
    observed.coverage.push({ ticker, links });
  }

  await tickerInput.fill('FINNUNKNOWNTEST');
  await openButton.click();
  await page.locator('.unknown-coverage').waitFor();
  const unknownLinks = await page.locator('.unknown-coverage a[href]').evaluateAll((items) => items.map((a) => ({
    text: a.innerText.trim(), href: a.href,
  })));
  assert.equal(unknownLinks.length, 1, 'Unknown symbol should only receive the generic NSE directory');
  assert.equal(unknownLinks[0].href, nseDirectory);
  observed.coverage.push({ ticker: 'FINNUNKNOWNTEST', links: unknownLinks });

  await page.getByRole('button', { name: /Push/ }).first().click();
  for (const signal of data.signals || []) {
    const sourceButton = page.locator('.signal-card .source-inline button').filter({ hasText: signal.source.title });
    await sourceButton.click();
    const modalHref = await page.locator('.modal-open-link').getAttribute('href');
    assert.equal(modalHref, signal.source.url, `${signal.id}: direct filing href mismatch`);
    observed.sources.push({ id: signal.source.id, title: signal.source.title, href: modalHref });
    await page.getByRole('button', { name: 'Close source details' }).click();
  }

  for (const brief of data.briefs || []) {
    await page.getByRole('button', { name: /Pull/ }).first().click();
    await tickerInput.fill(brief.ticker.replace(/\.NS$/i, ''));
    await openButton.click();
    for (const source of brief.sources || []) {
      const sourceRow = page.locator('.source-row').filter({ hasText: source.title });
      await sourceRow.click();
      const modalHref = await page.locator('.modal-open-link').getAttribute('href');
      assert.equal(modalHref, source.url, `${brief.ticker}/${source.id}: source href mismatch`);
      observed.sources.push({ id: source.id, ticker: brief.ticker, title: source.title, href: modalHref });
      await page.getByRole('button', { name: 'Close source details' }).click();
    }
    const sourceById = new Map((brief.sources || []).map((source) => [source.id, source]));
    const claimList = (value) => Array.isArray(value) ? value : value && typeof value === 'object' ? [value] : [];
    for (const side of ['bull', 'bear']) {
      for (const claim of claimList(brief[side])) {
        if (!claim.sourceId || !claim.claim) continue;
        const expectedSource = sourceById.get(claim.sourceId);
        assert(expectedSource, brief.ticker + '/' + side + ': invalid source id ' + claim.sourceId);
        const row = page.locator('.balance-card li').filter({ hasText: claim.claim }).first();
        await row.locator('.claim-cite').click();
        const href = await page.locator('.modal-open-link').getAttribute('href');
        assert.equal(href, expectedSource.url, brief.ticker + '/' + side + ': source mismatch for claim ' + claim.claim);
        observed.claimCitations.push({ ticker: brief.ticker, side, claim: claim.claim, sourceId: claim.sourceId, href });
        await page.getByRole('button', { name: 'Close source details' }).click();
      }
    }
  }
  assert.equal(observed.sources.length, 9, 'Expected all 3 filing sources and 6 Pull documents');

  await page.getByRole('button', { name: /Pull/ }).first().click();
  await tickerInput.fill('BAJFINANCE');
  await openButton.click();
  const queryInput = page.locator('input[aria-label="Search company evidence"]');
  const runQuery = async (query) => {
    await queryInput.fill(query);
    await page.getByRole('button', { name: /Find evidence/ }).click();
    return page.locator('.evidence-result').evaluateAll((items) => items.map((item) => ({
      kind: item.querySelector('.result-kind')?.textContent?.trim() || '',
      text: item.querySelector('p')?.textContent?.trim() || '',
    })));
  };
  const aumResults = await runQuery('AUM');
  assert(aumResults.some(({ text }) => /assets under management|\bAUM\b/i.test(text)), 'AUM should find its own indexed evidence');
  const aumFigures = aumResults.filter(({ kind }) => kind === 'REPORTED FIGURE').map(({ text }) => text);
  assert(!aumFigures.some((text) => /Net total income|Pre-impairment operating profit|Profit after tax/i.test(text)), 'AUM should not return unrelated reported metrics');
  observed.queries.AUM = aumResults;
  const topicResult = page.locator('.evidence-result').filter({ hasText: 'SUPPORTED TOPIC · SOURCE INDEX' }).first();
  await topicResult.click();
  const topicModal = await page.locator('.source-modal').innerText();
  assert.match(topicModal, /not text quoted from the document/i, 'Topic modal should label index topic as non-document text');
  observed.topicModal = topicModal;
  await page.getByRole('button', { name: 'Close source details' }).click();
  const provisionResults = await runQuery('loan loss');
  const provisionFigure = page.locator('.evidence-result').filter({ hasText: 'REPORTED FIGURE' }).filter({ hasText: 'Loan-loss provisions' }).first();
  assert(await provisionFigure.count(), 'Loan-loss query should return its cited provision figure');
  await provisionFigure.click();
  const figureModal = await page.locator('.source-modal').innerText();
  assert.match(figureModal, /Reported figure from the cited source/i, 'Figure modal should describe the figure provenance');
  assert.match(figureModal, /Loan-loss provisions/i, 'Figure modal should preserve the matched metric');
  observed.queries.loanLoss = provisionResults;
  observed.figureModal = figureModal;
  await page.getByRole('button', { name: 'Close source details' }).click();
  const questionResults = await runQuery('What is AUM?');
  assert(questionResults.some(({ text }) => /assets under management|\bAUM\b/i.test(text)), 'Question wording should find AUM evidence');
  const questionFigures = questionResults.filter(({ kind }) => kind === 'REPORTED FIGURE').map(({ text }) => text);
  assert(!questionFigures.some((text) => /Net total income|Pre-impairment operating profit|Profit after tax/i.test(text)), 'Question wording should not return unrelated metrics');
  observed.queries.aumQuestion = questionResults;
  const stopWordResults = await runQuery('what is the');
  assert.equal(stopWordResults.length, 0, 'Stop-word-only query should return no evidence');
  observed.queries.stopWordsOnly = stopWordResults;
  const unsupportedResults = await runQuery('what is the weather on Mars');
  assert.equal(unsupportedResults.length, 0, 'Unsupported natural-language query should return no evidence');
  observed.queries.unsupported = unsupportedResults;

  await page.getByRole('button', { name: /Pull/ }).first().click();
  await tickerInput.fill('DRREDDY');
  await openButton.click();
  const drQuery = page.locator('input[aria-label="Search company evidence"]');
  await drQuery.fill('operating cash flow');
  await page.getByRole('button', { name: /Find evidence/ }).click();
  const cashflowResult = page.locator('.evidence-result').filter({ hasText: 'The consolidated Ind AS cash-flow statement reports' });
  await cashflowResult.click();
  const modalText = await page.locator('.source-modal').innerText();
  assert.match(modalText, /Consolidated Ind AS Statement of Cash Flows, printed p\. 351 \(PDF p\. 177\)/i, 'Dr Reddy cash-flow citation should retain exact printed/PDF page references');
  assert.match(modalText, /₹46,428 million \(₹4,642\.8 crore\).*₹45,433 million \(₹4,543\.3 crore\)/i, 'Dr Reddy cash-flow evidence should match the consolidated statement values');
  assert.match(modalText, /Ind AS/i, 'Dr Reddy cash-flow basis should use the Ind AS consolidated statement');
  observed.drReddyCashflow = modalText;
  await page.getByRole('button', { name: 'Close source details' }).click();

  const drBrief = data.briefs.find((brief) => brief.ticker === 'DRREDDY.NS');
  const cashMetrics = drBrief.metrics.filter((metric) => metric.label === 'Net cash flows from operating activities');
  assert.deepEqual(cashMetrics.map((metric) => [metric.period, metric.value]), [['FY25', 4642.8], ['FY24', 4543.3]], 'Dr Reddy consolidated OCF metrics');

  await page.getByRole('button', { name: /Pull/ }).first().click();
  await tickerInput.fill('BAJFINANCE');
  await openButton.click();
  const creditCostResults = await runQuery('credit cost');
  assert(creditCostResults.some(({ text }) => /Additional ECL model provision.*359|359.*Additional ECL model provision/i.test(text)), 'Credit-cost query should map to the source-backed additional ECL provision');
  assert(!creditCostResults.some(({ text }) => /Tax expense reduction/i.test(text)), 'Credit-cost query should not return the separate tax adjustment');
  observed.queries.creditCost = creditCostResults;

  await page.getByRole('button', { name: /Push/ }).first().click();
  const marketSource = page.locator('.source-inline button').filter({ hasText: 'NSE CM-UDiFF full-market EOD Bhavcopy' }).first();
  await marketSource.click();
  const marketModal = await page.locator('.source-modal').innerText();
  assert.match(marketModal, /full-market session file/i, 'Bhavcopy modal should identify the full-market archive');
  assert.match(marketModal, /not a ticker-specific document link/i, 'Bhavcopy modal should explain the shared full-market target');
  assert.equal(await page.locator('.modal-open-link').getAttribute('href'), data.quotes[0].sourceUrl, 'Bhavcopy href');
  observed.marketDataModal = marketModal;
  await page.getByRole('button', { name: 'Close source details' }).click();

  assert.deepEqual(pageErrors, [], 'Browser page errors');
  const reportPath = path.join(root, 'submission/QA/link-retrieval-audit.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  const auditTrail = [{
    issue: 'An earlier snapshot labeled the FY25/FY24 standalone operating cash flow values (₹4,225 crore/₹3,449.7 crore) as consolidated.',
    correction: 'Rechecked the official FY2024-25 annual report consolidated Ind AS cash-flow statement: the operating cash flow row is on printed p. 351 (PDF p. 177), ₹46,428 million/₹45,433 million, converted to ₹4,642.8 crore/₹4,543.3 crore by dividing by 10.',
  }, {
    note: 'The KPI summary on PDF p. 6 reports PBT of ₹76,784 million; the separate consolidated Ind AS Board Report table at printed pp. 92-93 reports ₹76,795 million. These are distinct source presentations, so QA records the app’s chosen metric and citation basis rather than treating one figure as universally incorrect.',
  }];
  fs.writeFileSync(reportPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), auditTrail, ...observed }, null, 2)}\n`);
  console.log(`PASS: ${observed.coverage.length} coverage states, ${observed.sources.length} source modals, AUM relevance, unsupported query, Dr Reddy page citation. Report: ${path.relative(root, reportPath)}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
