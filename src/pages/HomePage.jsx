import { AboutSection } from '../components/sections/AboutSection'
import { ContactSection } from '../components/sections/ContactSection'
import { HeroSection } from '../components/sections/HeroSection'
import { ProductsSection } from '../components/sections/ProductsSection'
import { WholesaleSection } from '../components/sections/WholesaleSection'
import { Navbar } from '../components/layout/Navbar'
import { TopLoadingBar } from '../components/layout/TopLoadingBar'

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopLoadingBar />
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <div className="-mt-10 sm:-mt-14">
          <AboutSection />
        </div>
        <ProductsSection />
        <WholesaleSection />
      </main>
      <ContactSection />
    </div>
  )
}
