import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage('You have been added to the waitlist.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to join waitlist.');
    }
  };

  return (
    <section className="py-40 px-6 bg-black text-white border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8"
        >
          Join the<br />Waitlist
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-12 uppercase font-bold tracking-widest text-white/50"
        >
          Coming Soon — 2026
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            required
            className="flex-1 bg-zinc-950/40 border-2 border-white/10 p-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-white focus:bg-zinc-900 transition-colors text-white"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-black px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {status === 'loading' ? 'Joining...' : 'Join Now'}
          </button>
        </motion.form>

        {message && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-6 text-sm font-bold uppercase tracking-widest ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}
          >
            {message}
          </motion.p>
        )}
        
        <p className="mt-8 text-[10px] uppercase tracking-widest text-white/30 max-w-md mx-auto">
          By joining, you agree to our privacy policy and to receive updates about SŌM.
        </p>
      </div>
    </section>
  );
};

export default Waitlist;
