export function ContactSection() {
  return (
    <footer id="contact" className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-10 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.16em] text-gold-300">
            Luxe Haven
          </p>
          <p className="mt-2">luxehaven.brand@studio.com</p>
        </div>

        <div className="space-y-1 text-xs uppercase tracking-[0.18em]">
          <p>Mon-Sat: 10:00 AM - 8:00 PM</p>
          <p>Wholesale dispatch support available</p>
        </div>
      </div>
    </footer>
  )
}
