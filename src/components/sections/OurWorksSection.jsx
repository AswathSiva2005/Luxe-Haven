import { motion } from 'framer-motion'

import beforeImage1 from '../../assets/company details/beforeimg 1.jpeg'
import beforeImage2 from '../../assets/company details/beforeimg 2.jpeg'
import beforeImage3 from '../../assets/company details/beforeimg 3.jpeg'
import afterImage1 from '../../assets/company details/afterimg 1.jpeg'
import afterImage2 from '../../assets/company details/afterimg 2.jpeg'
import afterImage3 from '../../assets/company details/afterimg 3.jpeg'

const WHY_CHOOSE_POINTS = [
  'Tiruppur-based manufacturing',
  'Premium GSM fabrics',
  'Custom design support',
  'Reliable production quality',
  'Fast delivery timelines',
]

const WORK_ROWS = [
  {
    id: 'row-1',
    before: beforeImage1,
    after: afterImage1,
  },
  {
    id: 'row-2',
    before: beforeImage2,
    after: afterImage2,
  },
  {
    id: 'row-3',
    before: beforeImage3,
    after: afterImage3,
  },
]

export function OurWorksSection() {
  const MotionContainer = motion.div

  return (
    <section id="our-work" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <MotionContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9 lg:p-10"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Why Choose Us</p>
        <h2 className="font-display mt-4 text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-5xl">
          Why Choose Luxe Haven
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-white/80 sm:text-base">
          {WHY_CHOOSE_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="mt-10 border-t border-white/10 pt-8">
          <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl">
            Our Work
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
            A glimpse of our products, fabric quality, and custom designs.
            <br/>
          </p>

          <div className="mt-7 space-y-4">
            {WORK_ROWS.map((row) => (
              <div key={row.id} className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gold-300/25 bg-black/45 p-3 shadow-gold-glow">
                  <img
                    src={row.before}
                    alt="Before mockup"
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                </div>
                <div className="rounded-2xl border border-gold-300/25 bg-black/45 p-3 shadow-gold-glow">
                  <img
                    src={row.after}
                    alt="After final design"
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionContainer>
    </section>
  )
}
