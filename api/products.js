import { ObjectId } from 'mongodb'

import { getMongoDatabase, isMongoConnectionError } from './_lib/mongodb.js'
import { normalizeProductDocument, normalizeProductInput } from './_lib/productNormalization.js'

const globalForProducts = globalThis

if (!globalForProducts.__luxeHavenFallbackProducts) {
  globalForProducts.__luxeHavenFallbackProducts = []
}

function getFallbackProducts() {
  return globalForProducts.__luxeHavenFallbackProducts
}

function createFallbackId() {
  return `fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function readRawId(request) {
  const queryId = request.query?.id
  const bodyId = request.body?.id
  return typeof queryId === 'string' ? queryId : typeof bodyId === 'string' ? bodyId : ''
}

function parseId(id) {
  if (typeof id !== 'string' || !id.trim()) {
    return null
  }

  try {
    return new ObjectId(id)
  } catch {
    return null
  }
}

function readId(request) {
  return parseId(readRawId(request))
}

function toFallbackProduct(document) {
  const normalized = normalizeProductInput(document)

  return {
    id: document.id || createFallbackId(),
    ...normalized,
    createdAt: document.createdAt || new Date(),
    updatedAt: document.updatedAt || new Date(),
  }
}

export default async function handler(request, response) {
  try {
    let db

    try {
      db = await getMongoDatabase()
    } catch (error) {
      if (isMongoConnectionError(error)) {
        const fallbackProducts = getFallbackProducts()

        if (request.method === 'GET') {
          response.status(200).json([...fallbackProducts].reverse())
          return
        }

        if (request.method === 'POST') {
          const created = toFallbackProduct(request.body ?? {})
          fallbackProducts.push(created)
          response.status(201).json(created)
          return
        }

        if (request.method === 'PATCH') {
          const rawId = readRawId(request)
          if (!rawId) {
            response.status(400).json({ error: 'A valid product id is required.' })
            return
          }

          const index = fallbackProducts.findIndex((product) => product.id === rawId)
          if (index === -1) {
            response.status(404).json({ error: 'Product not found.' })
            return
          }

          const nextProduct = toFallbackProduct({
            ...fallbackProducts[index],
            ...(request.body ?? {}),
            id: rawId,
            createdAt: fallbackProducts[index].createdAt,
            updatedAt: new Date(),
          })

          fallbackProducts[index] = nextProduct
          response.status(200).json(nextProduct)
          return
        }

        if (request.method === 'DELETE') {
          const rawId = readRawId(request)
          if (!rawId) {
            response.status(400).json({ error: 'A valid product id is required.' })
            return
          }

          const nextProducts = fallbackProducts.filter((product) => product.id !== rawId)
          if (nextProducts.length === fallbackProducts.length) {
            response.status(404).json({ error: 'Product not found.' })
            return
          }

          globalForProducts.__luxeHavenFallbackProducts = nextProducts
          response.status(200).json({ deleted: true })
          return
        }

        response.status(405).json({ error: 'Method not allowed' })
        return
      }

      throw error
    }

    const products = db.collection('products')

    if (request.method === 'GET') {
      const items = await products.find({}).sort({ createdAt: -1 }).toArray()
      response.status(200).json(items.map(normalizeProductDocument).filter(Boolean))
      return
    }

    if (request.method === 'POST') {
      const normalizedProduct = normalizeProductInput(request.body ?? {})
      const insertResult = await products.insertOne({
        ...normalizedProduct,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const inserted = await products.findOne({ _id: insertResult.insertedId })
      response.status(201).json(normalizeProductDocument(inserted))
      return
    }

    if (request.method === 'PATCH') {
      const objectId = readId(request)
      if (!objectId) {
        response.status(400).json({ error: 'A valid product id is required.' })
        return
      }

      const existing = await products.findOne({ _id: objectId })
      if (!existing) {
        response.status(404).json({ error: 'Product not found.' })
        return
      }

      const mergedProduct = normalizeProductInput({ ...existing, ...(request.body ?? {}) })
      await products.updateOne(
        { _id: objectId },
        {
          $set: {
            ...mergedProduct,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: existing.createdAt || new Date(),
          },
        },
      )

      const updated = await products.findOne({ _id: objectId })
      response.status(200).json(normalizeProductDocument(updated))
      return
    }

    if (request.method === 'DELETE') {
      const objectId = readId(request)
      if (!objectId) {
        response.status(400).json({ error: 'A valid product id is required.' })
        return
      }

      const deleted = await products.deleteOne({ _id: objectId })
      if (!deleted.deletedCount) {
        response.status(404).json({ error: 'Product not found.' })
        return
      }

      response.status(200).json({ deleted: true })
      return
    }

    response.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected product request failure.',
    })
  }
}
