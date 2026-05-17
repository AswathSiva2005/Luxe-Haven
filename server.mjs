import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createServer as createViteServer } from 'vite'

import adminLoginHandler from './api/admin-login.js'
import productsHandler from './api/products.js'
import uploadProductImageHandler from './api/upload-product-image.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

loadLocalEnv(path.join(__dirname, '.env.local'))

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'spa',
})

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', 'http://localhost:5173')

  if (requestUrl.pathname.startsWith('/api/')) {
    console.log(`[api] ${request.method} ${requestUrl.pathname}${requestUrl.search}`)
    const body = await readRequestBody(request)
    const parsedBody = parseRequestBody(body, request.headers['content-type'])
    const routeRequest = {
      method: request.method || 'GET',
      body: parsedBody,
      query: Object.fromEntries(requestUrl.searchParams.entries()),
    }

    const routeResponse = createResponseAdapter(response)

    if (requestUrl.pathname === '/api/products') {
      await productsHandler(routeRequest, routeResponse)
      return
    }

    if (requestUrl.pathname === '/api/upload-product-image') {
      await uploadProductImageHandler(routeRequest, routeResponse)
      return
    }

    if (requestUrl.pathname === '/api/admin-login') {
      await adminLoginHandler(routeRequest, routeResponse)
      return
    }

    response.statusCode = 404
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  vite.middlewares(request, response, () => {})
})

server.listen(5173, () => {
  console.log('Dev server running at http://localhost:5173')
})

function loadLocalEnv(filePath) {
  if (!fs.existsSync(filePath)) return

  const content = fs.readFileSync(filePath, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const equalsIndex = trimmed.indexOf('=')
    if (equalsIndex === -1) continue

    const key = trimmed.slice(0, equalsIndex).trim()
    let value = trimmed.slice(equalsIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    process.env[key] = value
  }
}

async function readRequestBody(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString('utf8')
}

function parseRequestBody(body, contentType) {
  if (!body) return {}

  if (typeof contentType === 'string' && contentType.includes('application/json')) {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }

  return { rawBody: body }
}

function createResponseAdapter(response) {
  let statusCode = 200

  return {
    status(code) {
      statusCode = code
      response.statusCode = code
      return this
    },
    setHeader(name, value) {
      response.setHeader(name, value)
      return this
    },
    json(payload) {
      response.statusCode = statusCode
      response.setHeader('Content-Type', 'application/json')
      response.end(JSON.stringify(payload))
    },
    send(payload) {
      response.statusCode = statusCode
      if (Buffer.isBuffer(payload)) {
        response.end(payload)
        return
      }

      if (typeof payload === 'string') {
        response.end(payload)
        return
      }

      response.end(String(payload ?? ''))
    },
  }
}