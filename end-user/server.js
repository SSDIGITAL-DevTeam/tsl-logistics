// server.js — CJS entry for Passenger / Domainesia "Setup Node.js App"
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { loadEnvConfig } = require('@next/env')

const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(__dirname, dev)

const port = parseInt(process.env.port || process.env.PORT || '3000', 10)
const hostname = process.env.HOSTNAME || 'localhost'

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
