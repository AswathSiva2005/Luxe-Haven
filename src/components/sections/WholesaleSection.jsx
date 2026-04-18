import { motion } from 'framer-motion'

import { Button } from '../ui/button'
import wholesaleImage from '../../assets/company details/wholesale.PNG'

export function WholesaleSection() {
  const MotionContainer = motion.div
  const phoneNumber = '+91 82200 49559'
  const dialNumber = '+918220049559'
  const whatsappNumber = '918220049559'

  const handleBookCall = (event) => {
    event.preventDefault()

    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches
    const isMobileAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

    if (isMobileViewport || isMobileAgent) {
      window.location.href = `tel:${dialNumber}`
      return
    }

    window.open(
      `https://wa.me/${whatsappNumber}?text=Hi%20Luxe%20Haven%2C%20I%20would%20like%20to%20book%20a%20call.`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <section id="wholesale" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <MotionContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative overflow-hidden rounded-3xl border border-gold-300/25 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-4 sm:p-6"
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(243,223,159,0.42)_0%,rgba(212,175,55,0.22)_32%,rgba(0,0,0,0)_70%)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-8 top-8 h-24 w-24 rounded-full border border-gold-300/25 bg-gold-gradient opacity-20 blur-[1px]"
        />

        <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_0.95fr] lg:gap-6">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-7">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-300">
              Production and Jersey Program
            </p>
            <p className="mt-4 max-w-2xl text-sm text-white/75">
              Luxe Haven supports wholesale batches with custom sizing curves,
              streamlined production windows, and private-label finishing.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
              <li>MOQ: 25 Pieces</li>
              <li>Production Capacity: 300-1000 pieces per month</li>
              <li>Production Time: 5-7 days</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%20Luxe%20Haven%2C%20Please%20share%20the%20wholesale%20catalog.`}
                target="_blank"
                rel="noreferrer"
              >
                <Button size="lg">Request Production Catalog</Button>
              </a>
              <a
                href={`tel:${dialNumber}`}
                onClick={handleBookCall}
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-gold-300 hover:text-gold-200"
              >
                Book a Call
              </a>
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-white/55">
              Direct contact: {phoneNumber}
            </p>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <img
              src={wholesaleImage}
              alt="Luxe Haven production"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </div>
      </MotionContainer>
    </section>
  )
}
