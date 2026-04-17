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
    name: 'Classic Black Tee',
    category: 'tshirt',
    style: 'classic',
    sizes: ['S', 'M', 'L', 'XL'],
    mrp: 1299,
    salePrice: 999,
    colorName: 'Black',
    colorHex: '#111111',
    description: 'Everyday premium cotton tee with clean structure and smooth hand feel.',
    image: tshirtImageOne,
    images: [tshirtImageOne, tshirtImageTwo],
  },
  {
    id: 'cat-tshirt-002',
    name: 'Urban White Tee',
    category: 'tshirt',
    style: 'classic',
    sizes: ['M', 'L', 'XL'],
    mrp: 1399,
    salePrice: 1099,
    colorName: 'White',
    colorHex: '#f4f4f4',
    description: 'Soft-touch white t-shirt designed for a refined minimal look.',
    image: tshirtImageTwo,
    images: [tshirtImageTwo, tshirtImageThree],
  },
  {
    id: 'cat-tshirt-003',
    name: 'Sky Blue Signature Tee',
    category: 'tshirt',
    style: 'polo',
    sizes: ['S', 'M', 'L'],
    mrp: 1499,
    salePrice: 1199,
    colorName: 'Sky Blue',
    colorHex: '#88bfff',
    description: 'Fresh sky blue drop with premium stitching and breathable fabric.',
    image: tshirtImageThree,
    images: [tshirtImageThree, tshirtImageFour],
  },
  {
    id: 'cat-over-001',
    name: 'Oversized Street Black',
    category: 'oversized',
    style: 'street',
    sizes: ['M', 'L', 'XL', 'XXL'],
    mrp: 1599,
    salePrice: 1299,
    colorName: 'Black',
    colorHex: '#0d0d0d',
    description: 'Relaxed silhouette oversized tee built for everyday street styling.',
    image: oversizedImageOne,
    images: [oversizedImageOne, oversizedImageTwo],
  },
  {
    id: 'cat-over-002',
    name: 'Oversized Chalk White',
    category: 'oversized',
    style: 'street',
    sizes: ['S', 'M', 'L', 'XL'],
    mrp: 1699,
    salePrice: 1399,
    colorName: 'Off White',
    colorHex: '#f0ece2',
    description: 'Heavyweight oversized tee with premium drape and modern edge.',
    image: oversizedImageThree,
    images: [oversizedImageThree, oversizedImageFour],
  },
  {
    id: 'cat-over-003',
    name: 'Oversized Gold Edition',
    category: 'oversized',
    style: 'graphic',
    sizes: ['M', 'L', 'XL'],
    mrp: 1799,
    salePrice: 1499,
    colorName: 'Gold',
    colorHex: '#c59c41',
    description: 'Statement oversized piece inspired by Luxe Haven signature palette.',
    image: oversizedImageTwo,
    images: [oversizedImageTwo, tshirtImageOne],
  },
]
