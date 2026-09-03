# Zapios AI Services

Marketplace landing page for done-for-you AI automation gigs (LinkedIn outreach, competitor analysis, job-application automation, YouTube analysis, lead scraping).

## MVP Status (2026-09-03)
**LIVE + working order capture.** Runs on port 8460.

- `serve.js` — Express server: landing page + **order-intake API** (`POST /api/order`, `GET /api/orders`). Leads persist to `data/orders.json` — no lead lost to mailto anymore.
- `public/index.html` — landing page with 5 gigs + a real **Request a Service form** (name/email/gig/message) that submits to the API.
- `deliverables/lead_scraper.js` — real, runnable fulfillment artifact for Gig 5 (Lead Generation Scraper): outputs a scored leads CSV. Swap the SAMPLE source for a live niche fetch per client.
- `data/fiverr_gigs.md` — full gig copy + pricing ($149–$399).

### Run
```
npm install && node serve.js   # http://localhost:8460
node deliverables/lead_scraper.js > leads.csv   # sample deliverable
```
Verified e2e: form POST → order stored → visible at `/api/orders`.

## Next step to first revenue
Publish these 5 gigs on Fiverr under Karan's seller account (needs Karan's identity/payment) — copy is ready in `data/fiverr_gigs.md`. The scraper deliverable proves Gig 5 is fulfillable today. Incoming leads captured on our own page in parallel.
