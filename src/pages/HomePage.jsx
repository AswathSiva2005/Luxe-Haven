import { useState } from 'react'

import { ContactSection } from '../components/sections/ContactSection'
import { FabricSection } from '../components/sections/FabricSection'
import { HeroSection } from '../components/sections/HeroSection'
import { OurWorksSection } from '../components/sections/OurWorksSection'
import { PrintingSection } from '../components/sections/PrintingSection'
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
        {!isCategoryActive ? <HeroSection /> : null}
        <ProductsSection onCategoryActiveChange={handleCategoryStateChange} />
        {!isCategoryActive ? <FabricSection /> : null}
        {!isCategoryActive ? <PrintingSection /> : null}
        {!isCategoryActive ? <WholesaleSection /> : null}
        {!isCategoryActive ? <OurWorksSection /> : null}
      </main>
      {!isCategoryActive ? <ContactSection /> : null}
    </div>
  )
}
