#!/usr/bin/env node
/**
 * Zapios AI Services — Landing Page + Order Intake API
 * Port 8460
 */

const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 8460
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Order/lead intake — captures interest so no lead is lost
app.post('/api/order', (req, res) => {
  const { name, email, gig, message } = req.body || {}
  if (!email || !gig) {
    return res.status(400).json({ ok: false, error: 'email and gig are required' })
  }
  const order = {
    id: 'ord_' + Date.now().toString(36),
    name: name || '',
    email,
    gig,
    message: message || '',
    status: 'new',
    createdAt: new Date().toISOString()
  }
  let orders = []
  try { orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')) } catch (e) {}
  orders.push(order)
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
  res.json({ ok: true, id: order.id, message: 'Order received — we will reply within 24h.' })
})

// Manager view of captured orders
app.get('/api/orders', (req, res) => {
  let orders = []
  try { orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')) } catch (e) {}
  res.json({ ok: true, count: orders.length, orders })
})

app.listen(PORT, () => {
  console.log('Zapios AI Services running on http://localhost:' + PORT)
})
