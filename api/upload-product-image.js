import crypto from 'node:crypto'

function createCloudinaryAuthHeader(apiKey, apiSecret) {
  const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
  return `Basic ${token}`
}

export default async function handler(request, response) {
  try {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' })
      return
    }

    const { imageData, fileName, mimeType } = request.body ?? {}

    if (typeof imageData !== 'string' || !imageData.startsWith('data:image/')) {
      response.status(400).json({ error: 'A valid image data URL is required.' })
      return
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo'
    const apiKey = process.env.CLOUDINARY_API_KEY || ''
    const apiSecret = process.env.CLOUDINARY_API_SECRET || ''
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'docs_upload_example_us_preset'
    const isConfigured = Boolean(process.env.CLOUDINARY_CLOUD_NAME && apiKey && apiSecret)

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    const formData = new FormData()

    formData.append('file', imageData)

    if (isConfigured) {
      formData.append('folder', 'luxe-haven/products')
      formData.append('public_id', `luxe-haven-${crypto.randomBytes(8).toString('hex')}`)
    } else {
      formData.append('upload_preset', uploadPreset)
    }

    const headers = isConfigured
      ? {
          Authorization: createCloudinaryAuthHeader(apiKey, apiSecret),
        }
      : {}

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers,
      body: formData,
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
      provider: isConfigured ? 'cloudinary' : 'cloudinary-demo',
    })
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected upload failure.',
    })
  }
}