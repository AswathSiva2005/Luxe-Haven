import { motion } from 'framer-motion'
import ceoProfile from '../../assets/company details/profile.jpeg'

export function AboutSection() {
  const MotionContainer = motion.div

  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <MotionContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9 lg:p-10"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-300">About CEO</p>
            <h2 className="font-display mt-4 text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-5xl">
              Harishwa
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Harishwa leads Luxe Haven with a clear vision of modern luxury menswear
              rooted in confidence, clean tailoring, and premium quality.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              His approach blends strong design direction with practical delivery,
              ensuring each drop keeps the brand identity sharp while staying wearable
              for everyday style.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-[1.7rem] border border-gold-300/25 bg-black/45 p-3 shadow-gold-glow">
              <img
                src={ceoProfile}
                alt="Harishwa CEO profile"
                className="h-[360px] w-full rounded-2xl object-cover sm:h-[420px]"
              />
            </div>
          </div>
        </div>
      </MotionContainer>
    </section>
  )
}
