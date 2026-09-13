/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COMPANY } from '../lib/constants';
import { Send, Phone, MapPin, Mail } from 'lucide-react';

export default function ContactForm() {
  return (
    <section className="py-24 px-6 industrial-gradient">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Let's Discuss Your <span className="text-brand-gold">Infrastructure</span></h2>
          <p className="text-gray-800 mb-12 text-lg">Our experts are ready to help you plan your space and digital presence with tailor-made solutions.</p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Corporate Headquarters</h4>
                <p className="text-slate-800 text-sm leading-relaxed">{COMPANY.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Direct Line</h4>
                <p className="text-slate-800 text-sm">{COMPANY.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Electronic Mail</h4>
                <p className="text-slate-800 text-sm">{COMPANY.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden group backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[80px] group-hover:bg-brand-gold/10 transition-all duration-500" />
          
          <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enterprise Lead"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-gold focus:outline-none transition-all placeholder:text-slate-500 text-sm text-slate-900" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 ml-1">Business Email</label>
                <input 
                  type="email" 
                  placeholder="Enter corporate email"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-gold focus:outline-none transition-all placeholder:text-slate-500 text-sm text-slate-900" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 ml-1">Inquiry Type</label>
              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-gold focus:outline-none transition-all appearance-none text-slate-800 text-sm">
                <option value="">Select Product</option>
                <option>Digital Standee</option>
                <option>Digital Podium</option>
                <option>Steel Locker (Multi-Door)</option>
                <option>Digital Mobile Locker</option>
                <option>Digital Signage Display</option>
                <option>Other / Custom Inquiry</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 ml-1">Professional Message</label>
              <textarea 
                rows={4}
                placeholder="Briefly describe your requirements..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-gold focus:outline-none transition-all placeholder:text-slate-500 resize-none text-sm text-slate-900" 
              />
            </div>

            <button className="w-full py-5 bg-brand-gold text-black font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all group active:scale-[0.98] text-[12px] uppercase tracking-widest shadow-xl shadow-brand-gold/20">
              Submit Inquiry
              <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[9px] text-center text-gray-600 uppercase tracking-[0.3em] pt-4">© Dcozi Enterprises • Industrial Futures</p>
          </form>
        </div>
      </div>
    </section>
  );
}
