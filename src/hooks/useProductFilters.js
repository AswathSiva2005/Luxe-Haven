import { useEffect, useMemo, useState } from 'react'

import {
  fetchProducts,
  getFilterOptions,
  isInPriceBracket,
} from '../services/productsService'

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
    fetchProducts().then(setAllProducts)
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

  const selectCategory = (category) => {
    setSelectedCategory(category)
    setFilters(baseFilters)
  }

  const clearCategory = () => {
    setSelectedCategory(null)
    setFilters(baseFilters)
  }

  const setFilter = (key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }))
  }

  return {
    selectedCategory,
    filters,
    filterOptions,
    filteredProducts,
    selectCategory,
    clearCategory,
    setFilter,
    resetFilters: () => setFilters(baseFilters),
  }
}
