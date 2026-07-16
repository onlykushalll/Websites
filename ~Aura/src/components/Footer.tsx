import MagneticButton from './MagneticButton';
import { Globe, MessageCircle, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-ivory border-t border-charcoal/10">
      {/* Newsletter section */}
      <div className="w-full px-8 lg:px-16 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="block text-xs uppercase tracking-[0.3em] text-charcoal/50 font-medium mb-6">
            Stay Connected
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-[1.1] mb-8">
            Join the
            <span className="italic"> Inner Circle</span>
          </h2>
          <p className="text-base text-charcoal/60 leading-relaxed mb-10 max-w-lg mx-auto">
            Be the first to discover new collections, exclusive offers, and
            beauty insights from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-white border border-charcoal/10 rounded-full text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/30 transition-colors duration-300"
            />
            <MagneticButton
              className="px-8 py-4 bg-charcoal text-ivory rounded-full hover:bg-gold transition-colors duration-500"
              strength={0.3}
            >
              <span className="text-sm uppercase tracking-[0.15em] font-medium">
                Subscribe
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="w-full px-8 lg:px-16 py-16 border-t border-charcoal/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-serif text-3xl font-medium text-charcoal">
              AURA
            </span>
            <p className="text-sm text-charcoal/50 leading-relaxed mt-4 max-w-xs">
              The art of radiance. Luxury beauty crafted with intention, designed
              for the modern woman.
            </p>
            <div className="flex gap-4 mt-6">
              {[Globe, MessageCircle, Video].map((Icon, i) => (
                <MagneticButton
                  key={i}
                  className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-all duration-300"
                  strength={0.5}
                >
                  <Icon className="w-4 h-4" />
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-charcoal/50 font-medium mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {['All Products', 'Skincare', 'Makeup', 'Fragrance', 'Gift Sets'].map(
                (item) => (
                  <li key={item}>
                    <MagneticButton
                      className="text-sm text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                      strength={0.2}
                    >
                      {item}
                    </MagneticButton>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-charcoal/50 font-medium mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Sustainability', 'Careers', 'Press', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <MagneticButton
                      className="text-sm text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                      strength={0.2}
                    >
                      {item}
                    </MagneticButton>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-charcoal/50 font-medium mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {['FAQ', 'Shipping', 'Returns', 'Track Order', 'Store Locator'].map(
                (item) => (
                  <li key={item}>
                    <MagneticButton
                      className="text-sm text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                      strength={0.2}
                    >
                      {item}
                    </MagneticButton>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full px-8 lg:px-16 py-6 border-t border-charcoal/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal/40">
            &copy; 2024 AURA Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <MagneticButton
              className="text-xs text-charcoal/40 hover:text-charcoal transition-colors duration-300"
              strength={0.2}
            >
              Privacy Policy
            </MagneticButton>
            <MagneticButton
              className="text-xs text-charcoal/40 hover:text-charcoal transition-colors duration-300"
              strength={0.2}
            >
              Terms of Service
            </MagneticButton>
            <MagneticButton
              className="text-xs text-charcoal/40 hover:text-charcoal transition-colors duration-300"
              strength={0.2}
            >
              Cookies
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
