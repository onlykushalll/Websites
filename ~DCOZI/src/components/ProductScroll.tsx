/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PRODUCTS, Product } from '../lib/constants';

interface ProductItemProps {
  product: Product;
  index: number;
}

function ProductItem({ product, index }: ProductItemProps) {
  return (
    <div className="min-h-screen py-24 flex items-center justify-center bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={index % 2 === 0 ? "order-1" : "order-1 lg:order-2"}
        >
          <div className="relative group p-10 bg-slate-100 rounded-[48px] shadow-xl overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-brand-gold/10 blur-[100px] group-hover:bg-brand-gold/20 transition-colors duration-1000 opacity-20" />
            <img 
              src={product.image} 
              alt={product.name}
              referrerPolicy="no-referrer"
              className="relative z-10 w-full h-[450px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-1000"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`space-y-8 ${index % 2 === 0 ? "order-2" : "order-2 lg:order-1"}`}
        >
          <div className="space-y-3">
            <span className="text-brand-gold font-mono text-[10px] uppercase tracking-[0.6em] font-black opacity-80">
              0{index + 1} / {product.category}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              {product.name}
            </h2>
          </div>

          <p className="text-slate-800 text-lg md:text-xl leading-relaxed max-w-xl">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {product.features?.map((feature, i) => (
              <div key={i} className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <span className="block text-[8px] text-brand-gold uppercase tracking-[0.2em] mb-1 font-black">FEATURE</span>
                <span className="block text-sm font-black text-slate-800 tracking-tight">{feature}</span>
              </div>
            ))}
            {product.specifications && Object.entries(product.specifications).map(([key, value], i) => (
              <div key={key} className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <span className="block text-[8px] text-brand-gold uppercase tracking-[0.2em] mb-1 font-black">{key}</span>
                <span className="block text-sm font-black text-slate-800 tracking-tight">{String(value)}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-12 pt-10">
            <div className="space-y-1">
              <span className="block text-[10px] text-brand-gold uppercase tracking-[0.4em] font-black">Indicative Pricing</span>
              <span className="block text-4xl font-black text-slate-900 tracking-tighter">{product.price}</span>
            </div>
            <button className="h-16 px-10 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-brand-gold hover:text-white transition-all shadow-2xl active:scale-95 group relative overflow-hidden">
              <span className="relative z-10">Inquire Now</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProductScroll() {
  return (
    <section className="relative z-20 bg-white">
      <div className="container mx-auto px-6 pt-40 pb-20 border-b border-slate-50 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-[12vw] font-black uppercase tracking-tighter text-slate-400 absolute left-1/2 -top-10 -translate-x-1/2 whitespace-nowrap pointer-events-none select-none"
        >
          ENGINEERING
        </motion.h2>
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="relative z-10"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-gold mb-6 block">Elite Industrial Lineup</span>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">State-of-the-Art Systems</h3>
        </motion.div>
      </div>
      
      <div className="divide-y divide-slate-50">
        {PRODUCTS.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Verified Partner Section */}
      <div className="bg-slate-50 py-32 flex flex-col items-center justify-center text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="p-12 rounded-[48px] bg-white border border-slate-100 shadow-2xl max-w-2xl w-full"
        >
          <div className="inline-block px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 border border-brand-gold/20">
            Verified & Trusted
          </div>
          <h3 className="text-4xl font-black mb-6 text-slate-900 uppercase tracking-tighter">Certified Excellence</h3>
          <p className="text-slate-800 mb-12 leading-relaxed px-4">
            Dcozi Enterprises is a verified Trusted Seller on TradeIndia and a verified supplier on IndiaMART. We adhere to the highest standards of manufacturing and ethical business practices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://www.tradeindia.com/truststamp-member/Dcozi-Enteprises-47850329/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 hover:border-brand-gold hover:text-brand-gold transition-all"
            >
              🏆 TradeIndia Trusted Seller
            </a>
            <a 
              href="https://www.indiamart.com/dcozi-enterprises/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 hover:border-brand-gold hover:text-brand-gold transition-all"
            >
              ✅ IndiaMART Verified Profile
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
