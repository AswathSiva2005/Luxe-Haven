import { productCatalog } from '../data/products'
import { createProductArtwork } from '../lib/placeholders'
import {
  appendStoredProduct,
  loadStoredProducts,
  removeStoredProduct,
  saveStoredProducts,
  updateStoredProduct,
} from '../lib/storage'

const priceBrackets = {
  budget: [0, 1000],
  premium: [1001, 1500],
  elite: [1501, Infinity],
}

export async function fetchProducts() {
  const storedProducts = loadStoredProducts()
  const normalizedStored = storedProducts.map(normalizeProduct)
  const mergedStored = mergeDuplicateProducts(normalizedStored)

  if (mergedStored.length !== normalizedStored.length) {
    saveStoredProducts(mergedStored)
  }

  return Promise.resolve([...productCatalog, ...mergedStored].map(normalizeProduct))
}

export async function fetchAdminProducts() {
  const normalizedStored = loadStoredProducts().map(normalizeProduct)
  const mergedStored = mergeDuplicateProducts(normalizedStored)

  if (mergedStored.length !== normalizedStored.length) {
    saveStoredProducts(mergedStored)
  }

  return Promise.resolve(mergedStored)
}

function buildMergeKey(product) {
  const sizes = Array.isArray(product.sizes) ? [...product.sizes].sort().join('|') : ''

  return [
    product.name?.trim().toLowerCase(),
    product.category,
    product.style,
    sizes,
    Number(product.mrp ?? 0),
    Number(product.salePrice ?? product.price ?? 0),
    product.colorName?.trim().toLowerCase(),
    product.colorHex?.trim().toLowerCase(),
    product.description?.trim().toLowerCase(),
    product.source,
  ].join('::')
}

function mergeDuplicateProducts(products) {
  const mergedByKey = new Map()

  for (const product of products) {
    const key = buildMergeKey(product)
    const existing = mergedByKey.get(key)

    if (!existing) {
      mergedByKey.set(key, product)
      continue
    }

    const combinedImages = Array.from(
      new Set([...(existing.images || []), existing.image, ...(product.images || []), product.image].filter(Boolean)),
    ).slice(0, 5)

    mergedByKey.set(key, {
      ...existing,
      image: combinedImages[0] || existing.image,
      images: combinedImages.length ? combinedImages : [existing.image].filter(Boolean),
    })
  }

  return Array.from(mergedByKey.values())
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
