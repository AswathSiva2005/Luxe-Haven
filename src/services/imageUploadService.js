export async function uploadProductImage(file) {
  const imageData = await readFileAsDataUrl(file)

  const response = await fetch('/api/upload-product-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageData,
      fileName: file.name,
      mimeType: file.type,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Image upload failed.')
  }

  const result = await response.json()
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