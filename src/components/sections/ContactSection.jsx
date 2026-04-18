export function ContactSection() {
  return (
    <footer id="contact" className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9">
          <p className="text-3xl uppercase tracking-[0.35em] text-gold-300">Contact Us</p>

          <div className="mt-6 space-y-2 text-sm leading-relaxed text-white/80 sm:text-base">
            <p>Founder : Harishwa</p>
            <p>Brand : Luxe Haven</p>
            <p>
              Phone / WhatsApp:{' '}
              <a
                href="https://wa.me/918220049559"
                target="_blank"
                rel="noreferrer"
                className="text-gold-200 hover:text-gold-100"
              >
                8220049559
              </a>
            </p>
            <p>
              Instagram:{' '}
              <a
                href="https://instagram.com/luxe_haven_2024"
                target="_blank"
                rel="noreferrer"
                className="text-gold-200 hover:text-gold-100"
              >
                luxe_haven_2024
              </a>
            </p>
            <p>Location: Tiruppur / Coimbatore</p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/70">
            <p className="font-display text-xl uppercase tracking-[0.16em] text-gold-300">
              Luxe Haven
            </p>
            <p className="mt-2 uppercase tracking-[0.16em] text-white/80">
              Custom Knitwear Manufacturer
            </p>
            <p className="mt-2 text-white/70">
              Bulk Orders | Custom Designs | Tiruppur
            </p>
            <p className="mt-2">Wholesale dispatch support available</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
