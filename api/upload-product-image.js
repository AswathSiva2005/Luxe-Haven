import crypto from 'node:crypto'

function createCloudinaryAuthHeader(apiKey, apiSecret) {
  const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
  return `Basic ${token}`
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    response.status(500).json({
      error:
        'Missing Cloudinary server environment variables. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
    })
    return
  }

  const { imageData, fileName, mimeType } = request.body ?? {}

  if (typeof imageData !== 'string' || !imageData.startsWith('data:image/')) {
    response.status(400).json({ error: 'A valid image data URL is required.' })
    return
  }

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const publicId = `luxe-haven-${crypto.randomBytes(8).toString('hex')}`
  const params = new URLSearchParams({
    timestamp,
    public_id: publicId,
    folder: 'luxe-haven/products',
    file: imageData,
  })

  const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    headers: {
      Authorization: createCloudinaryAuthHeader(apiKey, apiSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  const uploadResult = await uploadResponse.json().catch(() => null)

  if (!uploadResponse.ok) {
    const errorMessage = uploadResult?.error?.message || 'Cloudinary upload failed.'
    response.status(uploadResponse.status).json({ error: errorMessage })
    return
  }

  response.status(200).json({
    secure_url: uploadResult?.secure_url,
    url: uploadResult?.url,
    public_id: uploadResult?.public_id,
    original_filename: fileName,
    mime_type: mimeType,
  })
}