import { Buffer } from 'node:buffer'

import { ObjectId } from 'mongodb'

import { getMongoDatabase, isMongoConnectionError } from './_lib/mongodb.js'

function parseDataUrl(imageData) {
  const match = /^data:([^;]+);base64,(.+)$/.exec(imageData)

  if (!match) {
    return null
  }

  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], 'base64'),
  }
}

async function streamStoredImage(request, response) {
  const { id } = request.query ?? {}

  if (typeof id !== 'string' || !id.trim()) {
    response.status(400).json({ error: 'Image id is required.' })
    return
  }

  let objectId

  try {
    objectId = new ObjectId(id)
  } catch {
    response.status(400).json({ error: 'Invalid image id.' })
    return
  }

  let db

  try {
    db = await getMongoDatabase()
  } catch (error) {
    if (isMongoConnectionError(error)) {
      response.status(404).json({ error: 'Image is not available while MongoDB is offline.' })
      return
    }

    throw error
  }

  const storedImage = await db.collection('product_images').findOne({ _id: objectId })

  if (!storedImage) {
    response.status(404).json({ error: 'Image not found.' })
    return
  }

  const parsedImage = parseDataUrl(storedImage.imageData)

  if (!parsedImage) {
    response.status(500).json({ error: 'Stored image data is invalid.' })
    return
  }

  response.setHeader('Content-Type', storedImage.mimeType || parsedImage.mimeType || 'application/octet-stream')
  response.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  response.status(200).send(parsedImage.buffer)
}

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      await streamStoredImage(request, response)
      return
    }

    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' })
      return
    }

    const { imageData, fileName, mimeType } = request.body ?? {}

    if (typeof imageData !== 'string' || !imageData.startsWith('data:image/')) {
      response.status(400).json({ error: 'A valid image data URL is required.' })
      return
    }

    const parsedImage = parseDataUrl(imageData)

    if (!parsedImage) {
      response.status(400).json({ error: 'A valid base64 image data URL is required.' })
      return
    }

    let imageUrl
    let provider
    let publicId

    try {
      const db = await getMongoDatabase()
      const uploadResult = await db.collection('product_images').insertOne({
        imageData,
        fileName: typeof fileName === 'string' ? fileName : '',
        mimeType: typeof mimeType === 'string' && mimeType ? mimeType : parsedImage.mimeType,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      imageUrl = `/api/upload-product-image?id=${uploadResult.insertedId.toString()}`
      provider = 'mongodb-atlas'
      publicId = uploadResult.insertedId.toString()
    } catch (error) {
      if (!isMongoConnectionError(error)) {
        throw error
      }

      // Fallback to direct data URL when MongoDB is unreachable.
      imageUrl = imageData
      provider = 'inline-fallback'
      publicId = `inline-${Date.now()}`
    }

    response.status(200).json({
      secure_url: imageUrl,
      url: imageUrl,
      public_id: publicId,
      original_filename: fileName,
      mime_type: mimeType,
      provider,
    })
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected upload failure.',
    })
  }
}