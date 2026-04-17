import { useState } from 'react'

import { AboutSection } from '../components/sections/AboutSection'
import { ContactSection } from '../components/sections/ContactSection'
import { HeroSection } from '../components/sections/HeroSection'
import { ProductsSection } from '../components/sections/ProductsSection'
import { WholesaleSection } from '../components/sections/WholesaleSection'
import { Navbar } from '../components/layout/Navbar'
import { TopLoadingBar } from '../components/layout/TopLoadingBar'

export function HomePage() {
  const [isCategoryActive, setIsCategoryActive] = useState(false)
  const [resetCategoryView, setResetCategoryView] = useState(() => () => {})

  const handleCategoryStateChange = (isActive, clearCategory) => {
    setIsCategoryActive(isActive)
    if (clearCategory) {
      setResetCategoryView(() => clearCategory)
    }
  }

  const handleNavbarNavigate = (href) => {
    if (!isCategoryActive || href === '#products') {
      return false
    }

    resetCategoryView()

    requestAnimationFrame(() => {
      const section = document.querySelector(href)
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return true
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <TopLoadingBar />
      <Navbar onNavigate={handleNavbarNavigate} />
      <main className="overflow-hidden">
        {!isCategoryActive ? (
          <>
            <HeroSection />
            <div className="-mt-10 sm:-mt-14">
              <AboutSection />
            </div>
          </>
        ) : null}
        <ProductsSection onCategoryActiveChange={handleCategoryStateChange} />
        {!isCategoryActive ? <WholesaleSection /> : null}
      </main>
      {!isCategoryActive ? <ContactSection /> : null}
    </div>
  )
}
