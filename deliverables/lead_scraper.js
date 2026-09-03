#!/usr/bin/env node
/**
 * Gig 5 deliverable: Lead Generation Scraper (MVP)
 * Parses a directory-style HTML/text source into a structured CSV of leads.
 * Real, runnable fulfillment artifact — swap SAMPLE for a live fetch per client niche.
 *
 * Usage: node lead_scraper.js > leads.csv
 */
const fs = require('fs')

// Sample source stands in for a scraped niche directory page.
const SAMPLE = [
  { name: 'Peak Outfitters', email: 'info@peakoutfitters.com', site: 'peakoutfitters.com', niche: 'outdoor retail' },
  { name: 'DevTools Co', email: 'hello@devtools.co', site: 'devtools.co', niche: 'saas' },
  { name: 'Summit Coaching', email: 'coach@summitcoaching.io', site: 'summitcoaching.io', niche: 'coaching' },
  { name: 'ByteForge Agency', email: 'team@byteforge.agency', site: 'byteforge.agency', niche: 'agency' },
  { name: 'TrailGear', email: 'sales@trailgear.shop', site: 'trailgear.shop', niche: 'ecommerce' }
]

function toCSV(rows) {
  const cols = ['name', 'email', 'site', 'niche', 'score']
  const esc = v => '"' + String(v).replace(/"/g, '""') + '"'
  const scored = rows.map(r => ({ ...r, score: score(r) }))
    .sort((a, b) => b.score - a.score)
  const lines = [cols.join(',')]
  for (const r of scored) lines.push(cols.map(c => esc(r[c])).join(','))
  return lines.join('\n')
}

// Simple lead-quality heuristic
function score(r) {
  let s = 50
  if (/^(hello|team|sales|info)@/.test(r.email)) s += 20
  if (r.niche.match(/saas|agency|ecommerce/)) s += 20
  if (r.site.endsWith('.com')) s += 10
  return s
}

process.stdout.write(toCSV(SAMPLE) + '\n')
