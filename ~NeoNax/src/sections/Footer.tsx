export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-transparent pt-20 pb-10 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <div className="font-display font-bold text-white text-base tracking-[0.2em] mb-4">
              NEONAX
            </div>
            <p className="font-body font-light text-sm text-[rgba(234,234,234,0.4)] leading-[1.7]">
              Crystallized energy for the brave.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Origin', id: 'origin' },
                { label: 'Flavors', id: 'transmutation' },
                { label: 'Molecules', id: 'molecules' },
                { label: 'Collection', id: 'collection' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="interactive text-left font-body text-sm text-[rgba(234,234,234,0.5)] hover:text-cyan transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="flex flex-col gap-3">
              {['Shipping', 'Returns', 'FAQ', 'Contact'].map((item) => (
                <span
                  key={item}
                  className="font-body text-sm text-[rgba(234,234,234,0.5)] hover:text-cyan transition-colors duration-300 cursor-pointer interactive"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex items-start gap-4">
            {[
              {
                name: 'Instagram',
                path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
              },
              {
                name: 'Twitter',
                path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
              },
              {
                name: 'Discord',
                path: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z',
              },
            ].map((icon) => (
              <button
                key={icon.name}
                className="interactive text-[rgba(234,234,234,0.4)] hover:text-cyan hover:scale-110 transition-all duration-300"
                aria-label={icon.name}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d={icon.path} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-[rgba(234,234,234,0.3)]">
            © 2026 NEONAX. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="font-mono text-[11px] text-[rgba(234,234,234,0.3)] hover:text-cyan transition-colors duration-300 cursor-pointer interactive">
              Terms
            </span>
            <span className="font-mono text-[11px] text-[rgba(234,234,234,0.3)] hover:text-cyan transition-colors duration-300 cursor-pointer interactive">
              Privacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
