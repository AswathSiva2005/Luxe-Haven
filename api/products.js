import { ObjectId } from 'mongodb'

import { getMongoDatabase } from './_lib/mongodb.js'
import { normalizeProductDocument, normalizeProductInput } from './_lib/productNormalization.js'

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
  const queryId = request.query?.id
  const bodyId = request.body?.id
  return parseId(typeof queryId === 'string' ? queryId : typeof bodyId === 'string' ? bodyId : '')
}

export default async function handler(request, response) {
  try {
    const db = await getMongoDatabase()
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
