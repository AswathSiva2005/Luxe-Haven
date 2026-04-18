import { motion } from 'framer-motion'
import printingImageOne from '../../assets/company details/printing 1.jpeg'
import printingImageTwo from '../../assets/company details/printing 2.jpeg'

const PRINTING_OPTIONS = [
  'Screen Printing',
  'Puff Print',
  'Sublimation',
  'Chest & Back Print',
]

export function PrintingSection() {
  const MotionContainer = motion.div

  return (
    <section id="printing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <MotionContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9 lg:p-10"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Printing Section</p>
            <h2 className="font-display mt-4 text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-5xl">
              Customization & Printing
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              We provide multiple printing options to match your brand requirements:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80 sm:text-base">
              {PRINTING_OPTIONS.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
              Custom designs and branding options available.
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            <div className="rounded-[1.4rem] border border-gold-300/25 bg-black/45 p-3 shadow-gold-glow">
              <img
                src={printingImageOne}
                alt="Screen printed fabric sample"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>
            <div className="rounded-[1.4rem] border border-gold-300/25 bg-black/45 p-3 shadow-gold-glow">
              <img
                src={printingImageTwo}
                alt="Custom print branding sample"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </MotionContainer>
    </section>
  )
}
