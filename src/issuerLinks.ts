export type IssuerLink = { url: string; label: string }

// Direct issuer IR pages, checked against the company's own domain. These are
// landing pages for filings/results, not claims that a specific document exists.
export const issuerLinks: Record<string, IssuerLink> = {
  RELIANCE: { url: 'https://www.ril.com/investors/investor-relations', label: 'Investor relations & filings' },
  HDFCBANK: { url: 'https://www.hdfc.bank.in/about-us/investor-relations', label: 'Investor relations' },
  ICICIBANK: { url: 'https://www.icici.bank.in/about-us/invest-relations', label: 'Investor relations' },
  SBIN: { url: 'https://sbi.bank.in/web/investor-relations/investor-relations', label: 'Investor relations' },
  TCS: { url: 'https://www.tcs.com/investor-relations', label: 'Investor relations' },
  INFY: { url: 'https://www.infosys.com/Investors/', label: 'Investor relations' },
  WIPRO: { url: 'https://www.wipro.com/investors/', label: 'Investor relations' },
  BHARTIARTL: { url: 'https://www.airtel.in/about-bharti/equity/results/annual-results', label: 'Annual results' },
  LT: { url: 'https://investors.larsentoubro.com/', label: 'Investor relations' },
  ITC: { url: 'https://itcportal.com/investors.html', label: 'Investor relations' },
  HINDUNILVR: { url: 'https://www.hul.co.in/investors/annual-reports-and-performance-highlights/', label: 'Annual reports & performance' },
  'BAJAJ-AUTO': { url: 'https://www.bajajauto.com/investors/financial-and-operational-performance', label: 'Financial & operating performance' },
  MARUTI: { url: 'https://www.marutisuzuki.com/corporate/investors/company-reports', label: 'Company reports' },
  SUNPHARMA: { url: 'https://sunpharma.com/investors/', label: 'Investor relations' },
  NTPC: { url: 'https://ntpc.co.in/investors/financial-performance/annual-reports', label: 'Annual reports' },
  TATAPOWER: { url: 'https://www.tatapower.com/investor-resource-center', label: 'Investor resource center' },
  ASIANPAINT: { url: 'https://www.asianpaints.com/more/investors/investors-landing-page.html', label: 'Investor relations, results & reports' },
  HINDALCO: { url: 'https://www.hindalco.com/investors', label: 'Investor relations' },
}
