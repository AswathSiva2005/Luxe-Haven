const PRODUCTS_KEY = 'luxe-haven-products'
const DELETED_PRODUCTS_KEY = 'luxe-haven-deleted-products'
const ADMIN_SESSION_KEY = 'luxe-haven-admin-session'
const PRODUCTS_CHANGED_EVENT = 'luxe-haven-products-changed'
const PRODUCTS_SYNC_KEY = 'luxe-haven-products-sync'

function readJson(key, fallback) {
  if (typeof window === 'undefined') return fallback

  try {
    const rawValue = window.localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function emitProductsChanged() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(PRODUCTS_SYNC_KEY, String(Date.now()))
  window.dispatchEvent(new Event(PRODUCTS_CHANGED_EVENT))
}

export function loadStoredProducts() {
  return readJson(PRODUCTS_KEY, [])
}

export function saveStoredProducts(products) {
  writeJson(PRODUCTS_KEY, products)
  emitProductsChanged()
}

export function appendStoredProduct(product) {
  const currentProducts = loadStoredProducts()
  const nextProducts = [...currentProducts, product]
  saveStoredProducts(nextProducts)
  return nextProducts
}

export function updateStoredProduct(productId, updates) {
  const currentProducts = loadStoredProducts()
  const nextProducts = currentProducts.map((product) =>
    product.id === productId ? { ...product, ...updates } : product,
  )
  saveStoredProducts(nextProducts)
  return nextProducts
}

export function removeStoredProduct(productId) {
  const currentProducts = loadStoredProducts()
  const nextProducts = currentProducts.filter((product) => product.id !== productId)
  saveStoredProducts(nextProducts)
  return nextProducts
}

export function loadDeletedProducts() {
  return readJson(DELETED_PRODUCTS_KEY, [])
}

export function saveDeletedProducts(productIds) {
  writeJson(DELETED_PRODUCTS_KEY, productIds)
  emitProductsChanged()
}

export function markProductDeleted(productId) {
  const currentDeletedProducts = loadDeletedProducts()
  const nextDeletedProducts = currentDeletedProducts.includes(productId)
    ? currentDeletedProducts
    : [...currentDeletedProducts, productId]

  saveDeletedProducts(nextDeletedProducts)
  return nextDeletedProducts
}

export function restoreDeletedProduct(productId) {
  const currentDeletedProducts = loadDeletedProducts()
  const nextDeletedProducts = currentDeletedProducts.filter((deletedProductId) => deletedProductId !== productId)

  if (nextDeletedProducts.length !== currentDeletedProducts.length) {
    saveDeletedProducts(nextDeletedProducts)
  }

  return nextDeletedProducts
}

export function isProductDeleted(productId) {
  return loadDeletedProducts().includes(productId)
}

export function loadAdminSession() {
  return readJson(ADMIN_SESSION_KEY, null)
}

export function saveAdminSession(session) {
  writeJson(ADMIN_SESSION_KEY, session)
}

export function clearAdminSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(ADMIN_SESSION_KEY)
}

export { PRODUCTS_CHANGED_EVENT }

export function notifyProductsChanged() {
  emitProductsChanged()
}
