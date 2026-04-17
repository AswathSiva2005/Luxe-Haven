import { createCategoryArtwork } from '../lib/placeholders'
import tshirtImageOne from '../assets/product images/t1.webp'
import tshirtImageTwo from '../assets/product images/t2.webp'
import tshirtImageThree from '../assets/product images/t3.webp'
import tshirtImageFour from '../assets/product images/t4.webp'
import oversizedImageOne from '../assets/product images/o1.png'
import oversizedImageTwo from '../assets/product images/o2.png'
import oversizedImageThree from '../assets/product images/o3.png'
import oversizedImageFour from '../assets/product images/o4.png'

export const categoryArtwork = {
  tshirt: createCategoryArtwork({
    title: 'T-Shirts',
    subtitle: 'Core Collection',
    accent: '#d4af37',
  }),
  oversized: createCategoryArtwork({
    title: 'Oversized',
    subtitle: 'Street Edit',
    accent: '#f3df9f',
  }),
}

export const productCatalog = [
  {
    id: 'cat-tshirt-001',
    name: 'Classic Polo Tee',
    category: 'tshirt',
    style: 'classic',
    sizes: ['S', 'M', 'L', 'XL'],
    mrp: 1299,
    salePrice: 999,
    colorName: 'Forest Green',
    colorHex: '#11463d',
    description: 'Premium polo t-shirt with clean structure and multiple gallery views.',
    image: tshirtImageOne,
    images: [tshirtImageOne, tshirtImageTwo, tshirtImageThree, tshirtImageFour],
  },
  {
    id: 'cat-over-001',
    name: 'Oversized Essential Tee',
    category: 'oversized',
    style: 'street',
    sizes: ['M', 'L', 'XL', 'XXL'],
    mrp: 1599,
    salePrice: 1299,
    colorName: 'Black',
    colorHex: '#0d0d0d',
    description: 'Relaxed oversized silhouette with full gallery images in one product card.',
    image: oversizedImageOne,
    images: [oversizedImageOne, oversizedImageTwo, oversizedImageThree, oversizedImageFour],
  },
]
