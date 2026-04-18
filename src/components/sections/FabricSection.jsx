import { motion } from 'framer-motion'
import fabricGsmImage from '../../assets/company details/GSM.jpeg'

const FABRIC_OPTIONS = ['180 GSM', '200 GSM', '220 GSM', '240 GSM', '300 GSM']

export function FabricSection() {
  const MotionContainer = motion.div

  return (
    <section id="fabric" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <MotionContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9 lg:p-10"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Fabric Options</p>
            <h2 className="font-display mt-4 text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-5xl">
              GSM Options
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              We offer a wide range of premium knitted fabrics to suit different requirements:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80 sm:text-base">
              {FABRIC_OPTIONS.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
              High-quality fabrics ensuring comfort, durability, and long-lasting wear.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-[1.7rem] border border-gold-300/25 bg-black/45 p-3 shadow-gold-glow">
              <img
                src={fabricGsmImage}
                alt="Fabric GSM options"
                className="h-[360px] w-full rounded-2xl object-cover sm:h-[420px]"
              />
            </div>
          </div>
        </div>
      </MotionContainer>
    </section>
  )
}
