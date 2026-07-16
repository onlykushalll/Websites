import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: "MENTAL FOCUS",
    description: "Sharpen your cognitive edge with our proprietary blend of nootropics.",
    image: "/images/benefit-1.jpg"
  },
  {
    title: "STAMINA",
    description: "Sustained energy without the crash. Pure performance, zero compromise.",
    image: "/images/benefit-2.jpg"
  },
  {
    title: "STRENGTH",
    description: "Fuel your physical potential with essential electrolytes and minerals.",
    image: "/images/benefit-3.jpg"
  }
];

const Benefits = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="aspect-[4/5] bg-zinc-900 overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src={benefit.image} 
                  alt={benefit.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">{benefit.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed uppercase tracking-wide">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
