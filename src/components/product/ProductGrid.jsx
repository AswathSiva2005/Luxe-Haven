import { useEffect, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Card } from '../ui/card'
import ceoProfile from '../../assets/company details/profile.jpeg'

export function ProductGrid({ products }) {
  const MotionItem = motion.div
  const contactName = 'Harishwa'
  const contactNumber = '+91 82200 49559'
  const contactDialNumber = '+918220049559'
  const [parent, enable] = useAutoAnimate()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    enable(true)
  }, [enable])

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 px-6 py-10 text-center text-sm text-white/60">
        No products match this combination. Try a different filter selection.
      </div>
    )
  }

  const getProductImages = (product) => {
    const rawImages = Array.isArray(product.images) ? product.images.filter(Boolean) : []
    const fallbackImage = product.image && !rawImages.length ? [product.image] : []
    return [...rawImages, ...fallbackImage].slice(0, 5)
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setActiveImageIndex(0)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
    setActiveImageIndex(0)
  }

  const showPreviousImage = () => {
    if (!selectedProduct) return
    const images = getProductImages(selectedProduct)
    if (images.length <= 1) return
    setActiveImageIndex((current) => (current - 1 + images.length) % images.length)
  }

  const showNextImage = () => {
    if (!selectedProduct) return
    const images = getProductImages(selectedProduct)
    if (images.length <= 1) return
    setActiveImageIndex((current) => (current + 1) % images.length)
  }

  return (
    <div ref={parent} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {products.map((product, index) => (
        <MotionItem
          key={product.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className="animate__animated animate__fadeIn w-full"
        >
          <button
            type="button"
            onClick={() => openProductModal(product)}
            className="block h-full w-full text-left"
          >
            <Card className="h-full overflow-hidden border-white/15 bg-black/50 p-0 transition duration-300 hover:border-gold-300/40">
              <div className="relative aspect-[4/5] overflow-hidden border-b border-white/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between p-3">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                    MRP
                  </span>
                  <span className="text-xs text-white/55 line-through">₹{product.mrp}</span>
                  <span className="mt-1 text-[1.35rem] font-semibold leading-none text-white">
                    Pay ₹{product.salePrice}
                  </span>
                </div>
                <span className="rounded-full border border-gold-300/30 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-gold-200">
                  Best Price
                </span>
              </div>
            </Card>
          </button>
        </MotionItem>
      ))}

      <AnimatePresence>
        {selectedProduct ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
            onClick={closeProductModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 16 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#111318] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeProductModal}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-gold-300/40 hover:text-gold-100"
                aria-label="Close product gallery"
              >
                <X size={16} />
              </button>

              {(() => {
                const images = getProductImages(selectedProduct)
                const hasMultiple = images.length > 1

                return (
                  <>
                    <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:p-6">
                      <div>
                        <div className="relative h-[300px] overflow-hidden rounded-xl border border-white/10 bg-black sm:h-[400px]">
                          <img
                            src={images[activeImageIndex]}
                            alt={`${selectedProduct.name} view ${activeImageIndex + 1}`}
                            className="h-full w-full object-contain p-3"
                          />

                          {hasMultiple ? (
                            <>
                              <button
                                type="button"
                                onClick={showPreviousImage}
                                className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition hover:border-gold-300/40 hover:text-gold-100"
                                aria-label="Previous image"
                              >
                                <ChevronLeft size={18} />
                              </button>
                              <button
                                type="button"
                                onClick={showNextImage}
                                className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition hover:border-gold-300/40 hover:text-gold-100"
                                aria-label="Next image"
                              >
                                <ChevronRight size={18} />
                              </button>
                            </>
                          ) : null}
                        </div>

                        {hasMultiple ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {images.map((image, imageIndex) => (
                              <button
                                key={`${selectedProduct.id}-thumb-${imageIndex}`}
                                type="button"
                                onClick={() => setActiveImageIndex(imageIndex)}
                                className={`h-12 w-12 overflow-hidden rounded-lg border transition ${
                                  imageIndex === activeImageIndex
                                    ? 'border-gold-300/70'
                                    : 'border-white/15 hover:border-gold-300/40'
                                }`}
                                aria-label={`View image ${imageIndex + 1}`}
                              >
                                <img src={image} alt={`${selectedProduct.name} thumbnail ${imageIndex + 1}`} className="h-full w-full object-cover" />
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/35 p-4 sm:p-5">
                        <p className="text-xs uppercase tracking-[0.28em] text-gold-300">
                          {selectedProduct.style}
                        </p>
                        <h4 className="font-display mt-3 text-2xl uppercase tracking-[0.08em] text-white">
                          {selectedProduct.name}
                        </h4>
                        <p className="mt-3 text-sm text-white/70">
                          Sizes: {selectedProduct.sizes.join(', ')}
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                          <span
                            className="h-4 w-4 rounded-full border border-white/15"
                            style={{ backgroundColor: selectedProduct.colorHex }}
                          />
                          <span className="text-xs uppercase tracking-[0.18em] text-white/60">
                            {selectedProduct.colorName}
                          </span>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="flex flex-col">
                            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                              MRP
                            </span>
                            <span className="text-sm text-white/55 line-through">₹{selectedProduct.mrp}</span>
                            <span className="mt-1 text-base font-semibold text-white">
                              Pay ₹{selectedProduct.salePrice}
                            </span>
                          </div>
                          <span className="rounded-full border border-gold-300/30 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-gold-200">
                            Best Price
                          </span>
                        </div>

                        {selectedProduct.description ? (
                          <p className="mt-4 text-sm leading-relaxed text-white/60">
                            {selectedProduct.description}
                          </p>
                        ) : null}

                        <div className="mt-5 rounded-xl border border-gold-300/25 bg-black/45 p-3">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-gold-300">
                            Contact for Order
                          </p>
                          <div className="mt-3 flex items-center gap-3">
                            <img
                              src={ceoProfile}
                              alt={`${contactName} profile`}
                              className="h-12 w-12 rounded-full border border-gold-300/45 object-cover"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-white">{contactName}</span>
                              <a
                                href={`tel:${contactDialNumber}`}
                                className="text-sm text-gold-200 underline-offset-4 hover:underline"
                              >
                                {contactNumber}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
