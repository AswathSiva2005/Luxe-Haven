export async function uploadProductImage(file) {
  const cloudName = String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim()
  const uploadPreset = String(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim()

  // Skip Cloudinary network calls when credentials are not configured.
  if (!cloudName || !uploadPreset || cloudName.toLowerCase() === 'demo') {
    return readFileAsDataUrl(file)
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  const result = await response.json().catch(() => null)

  if (!response.ok) {
    return readFileAsDataUrl(file)
  }

  if (!result?.secure_url) {
    throw new Error('Image upload succeeded but no public URL was returned.')
  }

  return result.secure_url
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(typeof reader.result === 'string' ? reader.result : '')
    }

    reader.onerror = () => {
      reject(new Error('Could not read the selected image.'))
    }

    reader.readAsDataURL(file)
  })
}