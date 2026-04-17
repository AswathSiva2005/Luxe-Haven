const PRODUCTS_KEY = 'luxe-haven-products'
const ADMIN_SESSION_KEY = 'luxe-haven-admin-session'

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

export function loadStoredProducts() {
  return readJson(PRODUCTS_KEY, [])
}

export function saveStoredProducts(products) {
  writeJson(PRODUCTS_KEY, products)
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
