import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  // { label: 'Categories', href: '#categories' },
  { label: 'Products', href: '#products' },
  { label: 'Wholesale', href: '#wholesale' },
  { label: 'Contact', href: '#contact' },
]

const navButtonBase =
  'inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300'

export function Navbar({ onNavigate }) {
  const [active, setActive] = useState('#home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0.2 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (event, href) => {
    const handledByParent = onNavigate?.(href)
    if (handledByParent) {
      event.preventDefault()
    }
    setActive(href)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#home" className="font-display text-sm tracking-[0.2em] text-gold-300 sm:text-lg sm:tracking-[0.26em]">
          LUXE HAVEN
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className={`${navButtonBase} ${
                active === item.href
                  ? 'border-transparent bg-gold-gradient text-black shadow-gold'
                  : 'border-gold-300/25 bg-white/5 text-white/80 hover:border-gold-200 hover:bg-gold-300/10 hover:text-gold-100'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-300/25 bg-white/5 text-gold-100 transition hover:border-gold-200 hover:bg-gold-300/10 md:hidden"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isMobileMenuOpen ? (
        <div className="border-t border-white/10 bg-black/95 px-4 py-3 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={`mobile-${item.href}`}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`${navButtonBase} w-full ${
                  active === item.href
                    ? 'border-transparent bg-gold-gradient text-black shadow-gold'
                    : 'border-gold-300/25 bg-white/5 text-white/80 hover:border-gold-200 hover:bg-gold-300/10 hover:text-gold-100'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
