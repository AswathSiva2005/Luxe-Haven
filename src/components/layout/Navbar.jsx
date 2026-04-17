import { useEffect, useState } from 'react'

import { Button } from '../ui/button'

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

export function Navbar() {
  const [active, setActive] = useState('#home')

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="font-display text-lg tracking-[0.26em] text-gold-300">
          LUXE HAVEN
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
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

        {/* <a href="#products" className="hidden md:block">
          <Button size="sm">Explore</Button>
        </a> */}
      </nav>
    </header>
  )
}
