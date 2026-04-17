import { productCatalog } from '../data/products'
import { createProductArtwork } from '../lib/placeholders'
import { appendStoredProduct, loadStoredProducts, removeStoredProduct, updateStoredProduct } from '../lib/storage'

const priceBrackets = {
  budget: [0, 1000],
  premium: [1001, 1500],
  elite: [1501, Infinity],
}

export async function fetchProducts() {
  const storedProducts = loadStoredProducts()
  return Promise.resolve([...productCatalog, ...storedProducts].map(normalizeProduct))
}

export async function fetchAdminProducts() {
  return Promise.resolve(loadStoredProducts().map(normalizeProduct))
}

export function getFilterOptions(products, category) {
  const scoped = products.filter((item) => item.category === category)

  const colors = Array.from(
    new Map(
      scoped.map((item) => [
        item.colorName?.toLowerCase(),
        { name: item.colorName, hex: item.colorHex },
      ]),
    ).values(),
  ).filter((item) => item.name && item.hex)

  return {
    styles: Array.from(new Set(scoped.map((item) => item.style))),
    sizes: Array.from(new Set(scoped.flatMap((item) => item.sizes))),
    priceBrackets: Object.keys(priceBrackets),
    colors,
  }
}

export function isInPriceBracket(price, bracket) {
  if (bracket === 'all') return true
  const [min, max] = priceBrackets[bracket] ?? [0, Infinity]
  return price >= min && price <= max
}

export function normalizeProduct(product) {
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

  const fallbackImage =
    createProductArtwork({ title: normalizedName, colorHex: normalizedColorHex })

  const primaryImage = normalizedImages[0] || fallbackImage

  return {
    id: product.id || `product-${Date.now()}`,
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
    source: product.source || 'catalog',
  }
}

export function saveAdminProduct(product) {
  const normalizedProduct = normalizeProduct(product)
  appendStoredProduct(normalizedProduct)
  return normalizedProduct
}

export function editAdminProduct(productId, updates) {
  const nextProduct = normalizeProduct({ id: productId, ...updates })
  updateStoredProduct(productId, nextProduct)
  return nextProduct
}

export function deleteAdminProduct(productId) {
  removeStoredProduct(productId)
}
