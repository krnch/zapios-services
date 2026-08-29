#!/usr/bin/env node
/**
 * Zapios AI Services — Landing Page
 * Port 8460
 */

const express = require('express')
const path = require('path')

const app = express()
const PORT = 8460

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log('Zapios AI Services running on http://localhost:' + PORT)
})
