import { motion } from 'framer-motion'

import { useProductFilters } from '../../hooks/useProductFilters'
import { CategoryCards } from '../product/CategoryCards'
import { FilterPanel } from '../product/FilterPanel'
import { ProductGrid } from '../product/ProductGrid'

export function ProductsSection() {
  const MotionContainer = motion.div

  const {
    selectedCategory,
    filters,
    filterOptions,
    filteredProducts,
    selectCategory,
    clearCategory,
    setFilter,
    resetFilters,
  } = useProductFilters()

  return (
    <section id="products" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <MotionContainer
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Products</p>
        <h2 className="font-display mt-4 text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl">
          Curated Apparel Selection
        </h2>

      </MotionContainer>

      <div id="categories" className="mt-10 space-y-7">
        {!selectedCategory ? (
          <CategoryCards onSelect={selectCategory} />
        ) : (
          <>
            <FilterPanel
              activeCategory={selectedCategory}
              filters={filters}
              options={filterOptions}
              onFilterChange={setFilter}
              onCategoryReset={clearCategory}
              onFilterReset={resetFilters}
            />
            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
    </section>
  )
}
