import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  fetchProducts,
  getFilterOptions,
  isInPriceBracket,
} from '../services/productsService'
import { PRODUCTS_CHANGED_EVENT } from '../lib/storage'

const baseFilters = {
  style: 'all',
  size: 'all',
  price: 'all',
  color: 'all',
}

export function useProductFilters() {
  const [allProducts, setAllProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [filters, setFilters] = useState(baseFilters)

  useEffect(() => {
    let isActive = true

    const loadProducts = () => {
      fetchProducts().then((products) => {
        if (isActive) {
          setAllProducts(products)
        }
      })
    }

    loadProducts()

    const handleProductsChanged = () => {
      loadProducts()
    }

    window.addEventListener('storage', handleProductsChanged)
    window.addEventListener(PRODUCTS_CHANGED_EVENT, handleProductsChanged)

    return () => {
      isActive = false
      window.removeEventListener('storage', handleProductsChanged)
      window.removeEventListener(PRODUCTS_CHANGED_EVENT, handleProductsChanged)
    }
  }, [])

  const filterOptions = useMemo(() => {
    if (!selectedCategory) {
      return { styles: [], sizes: [], priceBrackets: [], availability: [] }
    }
    return getFilterOptions(allProducts, selectedCategory)
  }, [allProducts, selectedCategory])

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return []

    return allProducts
      .filter((product) => product.category === selectedCategory)
      .filter((product) =>
        filters.style === 'all' ? true : product.style === filters.style,
      )
      .filter((product) =>
        filters.size === 'all' ? true : product.sizes.includes(filters.size),
      )
      .filter((product) => isInPriceBracket(product.price, filters.price))
      .filter((product) =>
        filters.color === 'all'
          ? true
          : product.colorName?.toLowerCase() === filters.color,
      )
  }, [allProducts, selectedCategory, filters])

  const selectCategory = useCallback((category) => {
    setSelectedCategory(category)
    setFilters(baseFilters)
  }, [])

  const clearCategory = useCallback(() => {
    setSelectedCategory(null)
    setFilters(baseFilters)
  }, [])

  const setFilter = useCallback((key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => setFilters(baseFilters), [])

  return {
    selectedCategory,
    filters,
    filterOptions,
    filteredProducts,
    selectCategory,
    clearCategory,
    setFilter,
    resetFilters,
  }
}
