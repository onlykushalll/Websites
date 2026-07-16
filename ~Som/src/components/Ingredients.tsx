import React from 'react';
import { motion } from 'framer-motion';

const ingredients = [
  {
    name: "L-THEANINE",
    benefits: "Calm Focus & Clarity",
    description: "An amino acid commonly found in tea leaves that promotes relaxation without drowsiness, synergistic with natural active compounds."
  },
  {
    name: "ASHWAGANDHA",
    benefits: "Stress Resilience",
    description: "A powerful adaptogen that helps the body manage stress, lowers cortisol levels, and supports cognitive endurance."
  },
  {
    name: "GABA",
    benefits: "Mental Balance",
    description: "A naturally occurring neurotransmitter that inhibits nervous system activity, helping to quiet mind chatter."
  },
  {
    name: "GINKGO BILOBA",
    benefits: "Memory & Cognition",
    description: "Supports healthy blood circulation to the brain, enhancing focus, memory retention, and mental processing speed."
  }
];

const Ingredients = () => {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-white/40 block mb-3 font-semibold">The Formula</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              INGREDIENTS &<br />SCIENCE
            </h2>
          </div>
          <p className="max-w-md text-white/50 text-sm leading-relaxed uppercase tracking-wider">
            Every can of SŌM is a masterfully balanced neuro-synergistic blend, engineered to elevate your cognitive baseline without jitters or crashes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-zinc-950/40 border border-white/5 hover:border-white/20 p-8 rounded-2xl backdrop-blur-md transition-colors duration-500 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 block mb-6">0{index + 1}</span>
                <h3 className="text-xl font-bold tracking-tight mb-2">{item.name}</h3>
                <span className="text-xs font-semibold tracking-wider text-white/60 uppercase block mb-4">{item.benefits}</span>
              </div>
              <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wide">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
