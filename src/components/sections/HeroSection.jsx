import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

import { Button } from '../ui/button'
import heroVideo from '../../assets/background video/videoplayback.webm'
import brandLogo from '../../assets/company details/logo.png'

export function HeroSection() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const MotionParagraph = motion.p
  const MotionContainer = motion.div

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
      )
      gsap.fromTo(
        subtitleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
      >
        <source src={heroVideo} type="video/webm" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-black/50" />

      <div className="relative mx-auto grid min-h-[72svh] max-w-6xl items-center gap-8 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="text-left">
          <MotionParagraph
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="animate__animated animate__fadeInUp text-xs uppercase tracking-[0.5em] text-gold-300"
          >
          Custom Knitwear Manufacturer
          </MotionParagraph>

          <h1
            ref={titleRef}
            className="font-display mt-5 text-5xl uppercase tracking-[0.08em] text-white sm:text-7xl"
          >
            Luxe Haven
          </h1>

          <p
            ref={subtitleRef}
            className="font-display mt-6 max-w-2xl text-base tracking-[0.08em] text-white/85 sm:text-[1.1rem]"
          >
            220–300 GSM T-Shirts | Bulk Orders | Tiruppur
            <br />
            Get Quote on WhatsApp
          </p>

          <MotionContainer
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#products">
              <Button size="lg">Our Products</Button>
            </a>
            <a href="#wholesale">
              <Button variant="ghost" size="lg">
                Wholesale Inquiry
              </Button>
            </a>
          </MotionContainer>
        </div>

        <div className="logo-red-rotate-line mx-auto w-full max-w-lg rounded-3xl lg:max-w-xl">
          <img
            src={brandLogo}
            alt="Luxe Haven brand logo"
            className="relative z-[1] block h-auto w-full rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}
