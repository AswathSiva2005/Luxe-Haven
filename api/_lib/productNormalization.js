import { createProductArtwork } from '../../src/lib/placeholders.js'

export const priceBrackets = {
  budget: [0, 1000],
  premium: [1001, 1500],
  elite: [1501, Infinity],
}

export function normalizeProductInput(product = {}) {
  const normalizedName = product.name?.trim() || 'Untitled Product'
  const normalizedColorName = product.colorName?.trim() || 'Gold'
  const normalizedColorHex = product.colorHex?.trim() || '#d4af37'
  const normalizedMrp = Number(product.mrp ?? product.price ?? 0) || 0
  const normalizedSalePrice = Number(product.salePrice ?? product.price ?? normalizedMrp) || 0
  const normalizedImages = Array.from(
    new Set(
      [
        ...(Array.isArray(product.images) ? product.images : []),
        product.image,
      ].filter((item) => typeof item === 'string' && item.trim()),
    ),
  ).slice(0, 5)

  const fallbackImage = createProductArtwork({ title: normalizedName, colorHex: normalizedColorHex })
  const primaryImage = normalizedImages[0] || fallbackImage

  return {
    name: normalizedName,
    category: product.category || 'tshirt',
    style: product.style || 'classic',
    sizes: Array.isArray(product.sizes)
      ? product.sizes
      : String(product.sizes || 'S,M,L,XL')
          .split(',')
          .map((size) => size.trim())
          .filter(Boolean),
    mrp: normalizedMrp,
    salePrice: normalizedSalePrice,
    price: normalizedSalePrice,
    colorName: normalizedColorName,
    colorHex: normalizedColorHex,
    description: product.description || '',
    image: primaryImage,
    images: normalizedImages.length ? normalizedImages : [primaryImage],
    source: product.source || 'admin',
  }
}

export function normalizeProductDocument(document) {
  if (!document) return null

  return {
    id: String(document._id),
    name: document.name,
    category: document.category,
    style: document.style,
    sizes: Array.isArray(document.sizes) ? document.sizes : [],
    mrp: Number(document.mrp ?? document.price ?? 0) || 0,
    salePrice: Number(document.salePrice ?? document.price ?? 0) || 0,
    price: Number(document.price ?? document.salePrice ?? 0) || 0,
    colorName: document.colorName,
    colorHex: document.colorHex,
    description: document.description || '',
    image: document.image,
    images: Array.isArray(document.images) ? document.images : [document.image].filter(Boolean),
    source: document.source || 'admin',
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  }
}
