import { RotateCcw } from 'lucide-react'

import { Button } from '../ui/button'

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-white/20 bg-black/60 px-3 py-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-gold-300"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace('-', ' ')}
          </option>
        ))}
      </select>
    </label>
  )
}

function ColorSwatch({ label, hex, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
        isActive ? 'scale-110 border-gold-100 shadow-gold-glow ring-2 ring-gold-200/70' : 'border-white/15 hover:scale-105'
      }`}
      style={{ backgroundColor: hex }}
    >
      <span className="sr-only">{label}</span>
    </button>
  )
}

export function FilterPanel({
  activeCategory,
  filters,
  options,
  onFilterChange,
  onCategoryReset,
  onFilterReset,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Active Category</p>
          <h3 className="font-display mt-2 text-2xl uppercase tracking-[0.08em] text-white">
            {activeCategory === 'tshirt' ? 'T-Shirts' : 'Oversized T-Shirts'}
          </h3>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onCategoryReset}>
            Change Category
          </Button>
          <button
            type="button"
            onClick={onFilterReset}
            className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold-100 transition hover:border-gold-200 hover:bg-gold-300/10 hover:text-white"
          >
            <RotateCcw size={14} />
            Reset Filters
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <FilterSelect
          label="Style"
          value={filters.style}
          options={options.styles}
          onChange={(value) => onFilterChange('style', value)}
        />
        <FilterSelect
          label="Size"
          value={filters.size}
          options={options.sizes}
          onChange={(value) => onFilterChange('size', value)}
        />
        <FilterSelect
          label="Price"
          value={filters.price}
          options={options.priceBrackets}
          onChange={(value) => onFilterChange('price', value)}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Color</p>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Round swatches</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onFilterChange('color', 'all')}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
              filters.color === 'all'
                ? 'scale-110 border-gold-100 bg-gold-gradient shadow-gold-glow'
                : 'border-white/15 bg-[linear-gradient(135deg,#1b1b1b,#040404)] hover:scale-105'
            }`}
            title="All colors"
            aria-label="All colors"
          >
            <span className="h-3 w-3 rounded-full bg-white/90" />
          </button>
          {options.colors.map((color) => (
            <ColorSwatch
              key={color.name}
              label={color.name}
              hex={color.hex}
              isActive={filters.color === color.name.toLowerCase()}
              onClick={() => onFilterChange('color', color.name.toLowerCase())}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
