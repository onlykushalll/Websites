'use client'

const FOOTER_LINKS = {
  PRODUCT: ['Features', 'Pricing', 'Docs', 'Changelog'],
  COMPANY: ['About', 'Blog', 'Careers', 'Contact'],
  LEGAL: ['Privacy', 'Terms', 'Security'],
}

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#FAFAF8] mt-auto">
      {/* Top separator with gradient */}
      <div className="separator" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          {/* Brand — 5 cols */}
          <div className="col-span-12 sm:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#5CB8FC] flex items-center justify-center shadow-lg shadow-[#7C5CFC]/15">
                <span className="text-white font-bold text-xs">K</span>
              </div>
              <span className="text-base font-semibold tracking-tight text-[#0F0F12]">
                Kairos AI
              </span>
            </div>
            <p className="type-body text-sm leading-relaxed max-w-xs mb-5 text-[#71717A]">
              Autonomous intelligence that thinks, adapts, and executes —
              transforming operations with intelligence that acts on its own.
            </p>
            <div className="type-label text-[10px] text-[#A1A1AA]">
              Built with intelligence. Powered by autonomy.
            </div>
          </div>

          {/* Product — 2 cols */}
          <div className="col-span-6 sm:col-span-2">
            <div className="type-label mb-4">PRODUCT</div>
            <ul className="space-y-3">
              {FOOTER_LINKS.PRODUCT.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="type-body text-sm text-[#71717A] hover:text-[#0F0F12] transition-colors duration-300"
                    data-cursor-hover
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company — 2 cols */}
          <div className="col-span-6 sm:col-span-2">
            <div className="type-label mb-4">COMPANY</div>
            <ul className="space-y-3">
              {FOOTER_LINKS.COMPANY.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="type-body text-sm text-[#71717A] hover:text-[#0F0F12] transition-colors duration-300"
                    data-cursor-hover
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal — 2 cols */}
          <div className="col-span-6 sm:col-span-2">
            <div className="type-label mb-4">LEGAL</div>
            <ul className="space-y-3">
              {FOOTER_LINKS.LEGAL.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="type-body text-sm text-[#71717A] hover:text-[#0F0F12] transition-colors duration-300"
                    data-cursor-hover
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status — 1 col */}
          <div className="col-span-6 sm:col-span-1">
            <div className="type-label mb-4">STATUS</div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
          <div className="type-label text-[10px] text-[#A1A1AA]">
            © 2025 Kairos AI
          </div>
          <div className="type-label text-[10px] text-[#A1A1AA]">
            V2.1.0 — System Active
          </div>
        </div>
      </div>

      {/* Credit Section — Crafted entirely by Kushal */}
      <div className="border-t border-[rgba(0,0,0,0.04)] bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-center gap-3">
          <span className="type-label text-[9px] text-[#A1A1AA] tracking-[0.3em]">
            DESIGN · DEVELOP · DEPLOY
          </span>
          <span className="w-1 h-1 rounded-full bg-[#7C5CFC]/40" />
          <span className="text-[11px] font-medium text-[#7C5CFC]/70" style={{ fontFamily: 'var(--font-display), "Outfit", sans-serif' }}>
            Crafted entirely by Kushal
          </span>
        </div>
      </div>
    </footer>
  )
}
