/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COMPANY } from '../lib/constants';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-20 pb-10 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter text-brand-gold uppercase">DCOZI</h2>
            <p className="text-slate-800 text-sm leading-relaxed max-w-xs transition-colors">
              {COMPANY.tagline}. High-end manufacturing from the heart of Gurugram.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:border-brand-gold transition-all shadow-sm">
                  <Icon className="w-5 h-5 text-slate-400 hover:text-brand-gold transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-700 mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-800">
              {['Home', 'Company Profile', 'Products', 'Inquiry', 'Contact'].map(link => (
                <li key={link}><a href="#" className="hover:text-brand-gold transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-700 mb-8">Solutions</h4>
            <ul className="space-y-4 text-sm text-slate-800">
              {['Digital Standee', 'Digital Podium', 'Steel Locker', 'Digital Mobile Locker', 'Digital Signage Display'].map(link => (
                <li key={link}><a href="#" className="hover:text-brand-gold transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-700 mb-8">Newsletter</h4>
            <p className="text-xs text-slate-800 mb-6 font-mono leading-relaxed">Join our mailing list for industry insights and new product launches.</p>
            <div className="flex border border-slate-200 bg-white p-1 rounded-xl shadow-sm">
              <input 
                type="email" 
                placeholder="Enter corporate email"
                className="bg-transparent px-4 py-2 text-xs flex-grow focus:outline-none text-slate-900" 
              />
              <button className="px-4 py-2 bg-brand-gold text-white text-xs font-bold rounded-lg hover:bg-black transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] font-mono text-slate-700 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} {COMPANY.name}</p>
            <p>GST: {COMPANY.gst}</p>
            <p>Made in India</p>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-slate-700 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
