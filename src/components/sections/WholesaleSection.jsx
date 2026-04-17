import { motion } from 'framer-motion'

import { Button } from '../ui/button'

export function WholesaleSection() {
  const MotionContainer = motion.div

  return (
    <section id="wholesale" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <MotionContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative overflow-hidden rounded-3xl border border-gold-300/25 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-8"
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(243,223,159,0.42)_0%,rgba(212,175,55,0.22)_32%,rgba(0,0,0,0)_70%)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-8 top-8 h-24 w-24 rounded-full border border-gold-300/25 bg-gold-gradient opacity-20 blur-[1px]"
        />

        <p className="text-xs uppercase tracking-[0.35em] text-gold-300">
          Wholesale and Jersey Program
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl">
          Bulk-ready premium jersey-style t-shirts for teams and resellers
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-white/75">
          Luxe Haven supports wholesale batches with custom sizing curves,
          streamlined production windows, and private-label finishing.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg">Request Wholesale Catalog</Button>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-gold-300 hover:text-gold-200"
          >
            Book a Call
          </a>
        </div>
      </MotionContainer>
    </section>
  )
}
