import { useEffect, useMemo, useState } from 'react'
import { PencilLine, ShieldCheck, LogOut, Plus, Trash2, X } from 'lucide-react'

import { Button } from '../ui/button'
import {
  clearAdminSession,
  loadAdminSession,
  saveAdminSession,
} from '../../lib/storage'
import {
  deleteAdminProduct,
  editAdminProduct,
  fetchAdminProducts,
  normalizeProduct,
  saveAdminProduct,
} from '../../services/productsService'

const demoCredentials = {
  username: 'admin',
  password: 'luxe123',
}

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

const styleOptions = ['classic', 'crew', 'polo', 'jersey', 'drop-shoulder', 'boxy', 'heavyweight']

const colorPresets = [
  { name: 'Gold', hex: '#d4af37' },
  { name: 'Black', hex: '#101010' },
  { name: 'White', hex: '#f2f2f2' },
  { name: 'Charcoal', hex: '#3b3b3b' },
  { name: 'Sand', hex: '#d7c3a2' },
  { name: 'Midnight', hex: '#1f2a44' },
]

const MAX_PRODUCT_IMAGES = 5

const initialFormState = {
  id: '',
  name: '',
  image: '',
  images: [],
  mrp: '',
  salePrice: '',
  category: 'tshirt',
  style: 'classic',
  sizes: ['S', 'M', 'L', 'XL'],
  colorName: 'Gold',
  colorHex: '#d4af37',
  description: '',
}

export function AdminPanel() {
  const [auth, setAuth] = useState(() => loadAdminSession())
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [form, setForm] = useState(initialFormState)
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchAdminProducts().then(setProducts)
  }, [])

  const totalProducts = useMemo(() => products.length, [products])

  const handleLogin = (event) => {
    event.preventDefault()

    if (
      credentials.username.trim() === demoCredentials.username &&
      credentials.password.trim() === demoCredentials.password
    ) {
      const session = { username: credentials.username.trim() }
      setAuth(session)
      setMessage('Admin access granted.')
      saveAdminSession(session)
      return
    }

    setMessage('Invalid admin credentials. Use admin / luxe123 for this demo.')
  }

  const handleLogout = () => {
    clearAdminSession()
    setAuth(null)
    setMessage('Logged out.')
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) {
      return
    }

    const availableSlots = Math.max(MAX_PRODUCT_IMAGES - form.images.length, 0)
    const filesToRead = files.slice(0, availableSlots)

    Promise.all(
      filesToRead.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve(typeof reader.result === 'string' ? reader.result : '')
            }
            reader.readAsDataURL(file)
          }),
      ),
    ).then((uploadedImages) => {
      setForm((current) => {
        const mergedImages = [...current.images, ...uploadedImages.filter(Boolean)].filter(Boolean)
        const uniqueOrderedImages = []

        for (const image of mergedImages) {
          if (!uniqueOrderedImages.includes(image)) {
            uniqueOrderedImages.push(image)
          }
          if (uniqueOrderedImages.length >= MAX_PRODUCT_IMAGES) {
            break
          }
        }

        return {
          ...current,
          images: uniqueOrderedImages,
          image: uniqueOrderedImages[0] || current.image,
        }
      })
    })

    event.target.value = ''
  }

  const handleRemoveImage = (imageToRemove) => {
    setForm((current) => {
      const remainingImages = current.images.filter((image) => image !== imageToRemove)
      return {
        ...current,
        images: remainingImages,
        image: remainingImages[0] || '',
      }
    })
  }

  const handleSizeToggle = (size) => {
    setForm((current) => {
      const nextSizes = current.sizes.includes(size)
        ? current.sizes.filter((item) => item !== size)
        : [...current.sizes, size]

      return { ...current, sizes: nextSizes }
    })
  }

  const selectColorPreset = (preset) => {
    setForm((current) => ({
      ...current,
      colorName: preset.name,
      colorHex: preset.hex,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const normalizedDraft = normalizeProduct({
      ...form,
      image: form.images[0] || form.image,
      images: form.images,
      mrp: Number(form.mrp),
      salePrice: Number(form.salePrice),
      source: 'admin',
    })

    const nextProduct = editingId
      ? editAdminProduct(editingId, normalizedDraft)
      : saveAdminProduct(normalizedDraft)

    fetchAdminProducts().then(setProducts)
    setForm(initialFormState)
    setEditingId('')
    setMessage(editingId ? `Updated ${nextProduct.name}.` : 'Product saved locally. It now appears on the public products page.')
  }

  const handleEditProduct = (product) => {
    setEditingId(product.id)
    setForm({
      id: product.id,
      name: product.name,
      image: product.image,
      images: (() => {
        const ordered = [...(product.images || []), product.image].filter(Boolean)
        const uniqueOrdered = []

        for (const image of ordered) {
          if (!uniqueOrdered.includes(image)) {
            uniqueOrdered.push(image)
          }
          if (uniqueOrdered.length >= MAX_PRODUCT_IMAGES) {
            break
          }
        }

        return uniqueOrdered
      })(),
      mrp: String(product.mrp ?? product.price ?? ''),
      salePrice: String(product.salePrice ?? product.price ?? ''),
      category: product.category,
      style: product.style,
      sizes: product.sizes || [],
      colorName: product.colorName,
      colorHex: product.colorHex,
      description: product.description || '',
    })
    setMessage(`Editing ${product.name}.`)
  }

  const handleCancelEdit = () => {
    setEditingId('')
    setForm(initialFormState)
    setMessage('Edit cancelled.')
  }

  const handleDeleteProduct = (productId) => {
    deleteAdminProduct(productId)
    fetchAdminProducts().then(setProducts)
    if (editingId === productId) {
      handleCancelEdit()
    }
    setMessage('Product deleted.')
  }

  if (!auth) {
    return (
      <section className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-gold-gradient p-3 text-black shadow-gold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Admin Panel</p>
              <h1 className="font-display text-3xl uppercase tracking-[0.08em] text-white">
                Luxe Haven Login
              </h1>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm text-white/80">
              Username
              <input
                value={credentials.username}
                onChange={(event) => setCredentials((current) => ({ ...current, username: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                placeholder="admin"
              />
            </label>
            <label className="block text-sm text-white/80">
              Password
              <input
                type="password"
                value={credentials.password}
                onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                placeholder="luxe123"
              />
            </label>
            <Button className="w-full" size="lg" type="submit">
              Login to Admin
            </Button>
          </form>

          <p className="mt-4 text-sm text-white/60">
            Demo access only. Use <span className="text-gold-200">admin / luxe123</span>.
          </p>
          {message ? <p className="mt-3 text-sm text-gold-200">{message}</p> : null}
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Logged in</p>
            <h1 className="font-display mt-2 text-3xl uppercase tracking-[0.08em] text-white">
              Luxe Haven Admin
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {totalProducts} products available in local storage.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={14} />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gold-gradient p-3 text-black shadow-gold">
                <Plus size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Add Product</p>
                <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-white">
                  {editingId ? 'Edit Product' : 'Manual Entry'}
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-white/80 sm:col-span-2">
                Product Name
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                  placeholder="Monarch Essential Tee"
                />
              </label>
              <label className="block text-sm text-white/80 sm:col-span-2">
                Upload Product Images (up to 5)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                />
                <div className="mt-3 flex items-center gap-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    {form.images.length}/{MAX_PRODUCT_IMAGES} images selected.
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.images.map((image, index) => (
                    <div key={`form-image-${index}`} className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/15 bg-black/70">
                      <img src={image} alt={`Selected preview ${index + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image)}
                        className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 transition hover:border-red-400/60 hover:text-red-200"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </label>
              <label className="block text-sm text-white/80">
                Example MRP ₹999
                <input
                  required
                  type="number"
                  value={form.mrp}
                  onChange={(event) => setForm((current) => ({ ...current, mrp: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                  placeholder="999"
                />
              </label>
              <label className="block text-sm text-white/80">
                Example Sale Price ₹699
                <input
                  required
                  type="number"
                  value={form.salePrice}
                  onChange={(event) => setForm((current) => ({ ...current, salePrice: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                  placeholder="699"
                />
              </label>
              <label className="block text-sm text-white/80">
                Category
                <select
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                >
                  <option value="tshirt">T-Shirts</option>
                  <option value="oversized">Oversized T-Shirts</option>
                </select>
              </label>
              <label className="block text-sm text-white/80">
                Style
                <select
                  value={form.style}
                  onChange={(event) => setForm((current) => ({ ...current, style: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                >
                  {styleOptions.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </label>
              <div className="block text-sm text-white/80 sm:col-span-2">
                <p className="uppercase tracking-[0.18em] text-white/80">Sizes</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                        form.sizes.includes(size)
                          ? 'border-transparent bg-gold-gradient text-black shadow-gold'
                          : 'border-white/15 bg-black/60 text-white/70 hover:border-gold-300 hover:text-gold-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <label className="block text-sm text-white/80">
                Color Name
                <input
                  required
                  value={form.colorName}
                  onChange={(event) => setForm((current) => ({ ...current, colorName: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                  placeholder="Gold"
                />
              </label>
              <label className="block text-sm text-white/80">
                Select Color
                <input
                  type="color"
                  required
                  value={form.colorHex}
                  onChange={(event) => setForm((current) => ({ ...current, colorHex: event.target.value }))}
                  className="mt-2 h-12 w-full cursor-pointer rounded-xl border border-white/15 bg-black/70 px-2 py-2 outline-none transition focus:border-gold-300"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => selectColorPreset(preset)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.16em] transition ${
                        form.colorHex === preset.hex
                          ? 'border-gold-200 bg-gold-300/10 text-gold-100'
                          : 'border-white/15 bg-white/5 text-white/70 hover:border-gold-300 hover:text-gold-100'
                      }`}
                    >
                      <span className="h-4 w-4 rounded-full border border-white/15" style={{ backgroundColor: preset.hex }} />
                      {preset.name}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block text-sm text-white/80 sm:col-span-2">
                Description
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="mt-2 min-h-28 w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 outline-none transition focus:border-gold-300"
                  placeholder="Optional product description"
                />
              </label>
            </div>

            <Button className="w-full" size="lg" type="submit">
              {editingId ? 'Update Product' : 'Save Product'}
            </Button>
            {editingId ? (
              <Button variant="ghost" className="w-full" size="lg" type="button" onClick={handleCancelEdit}>
                <X size={14} />
                Cancel Edit
              </Button>
            ) : null}
            {message ? <p className="text-sm text-gold-200">{message}</p> : null}
          </form>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Instructions</p>
            <h2 className="font-display mt-2 text-2xl uppercase tracking-[0.08em] text-white">
              Simple manual workflow
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>1. Log in on /admin using the demo credentials.</li>
              <li>2. Fill the product form with name, image upload, MRP, sale price, color, and sizes.</li>
              <li>3. Use Edit on any saved item to load it back into the form and update it.</li>
              <li>4. Save the product, then open /#products to see it on the public site.</li>
              <li>5. Logout when finished.</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-gold-300/20 bg-black/40 p-4 text-sm text-white/70">
              Public site route: <span className="text-gold-200">http://localhost:5173/#products</span>
              <br />
              Admin route: <span className="text-gold-200">http://localhost:5173/admin</span>
            </div>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Saved Products</p>
              <h2 className="font-display mt-2 text-2xl uppercase tracking-[0.08em] text-white">
                Editable admin items
              </h2>
            </div>
            <p className="text-sm text-white/60">Only products created in /admin are shown here.</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.length ? products.map((product) => (
              <article key={product.id} className="rounded-2xl border border-white/10 bg-black/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-gold-300">{product.category}</p>
                    <h3 className="font-display mt-2 text-xl uppercase tracking-[0.08em] text-white">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditProduct(product)}
                      className="inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold-100 transition hover:border-gold-200 hover:bg-gold-300/10"
                    >
                      <PencilLine size={12} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/70 transition hover:border-red-400/50 hover:text-red-200"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[...(product.images || []), product.image]
                    .filter(Boolean)
                    .filter((image, imageIndex, array) => array.indexOf(image) === imageIndex)
                    .slice(0, MAX_PRODUCT_IMAGES)
                    .map((image, imageIndex) => (
                    <div key={`${product.id}-saved-image-${imageIndex}`} className="h-12 w-12 overflow-hidden rounded-lg border border-white/15 bg-black/70">
                      <img src={image} alt={`${product.name} ${imageIndex + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full border border-white/15" style={{ backgroundColor: product.colorHex }} />
                  <span className="text-xs uppercase tracking-[0.18em] text-white/60">{product.colorName}</span>
                </div>
                <p className="mt-3 text-sm text-white/60">Sizes: {product.sizes.join(', ')}</p>
                <p className="mt-2 text-sm text-white/60 line-through">MRP ₹{product.mrp}</p>
                <p className="mt-1 text-sm text-gold-100">Pay ₹{product.salePrice}</p>
              </article>
            )) : (
              <div className="rounded-2xl border border-dashed border-white/15 px-6 py-10 text-sm text-white/60">
                No custom products added yet. Save one from the form above.
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}
