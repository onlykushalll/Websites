import React from 'react';

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <div className="text-3xl font-black tracking-tighter mb-4">SŌM</div>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
              © 2024 SŌM BEVERAGES. ALL RIGHTS RESERVED.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white/60 transition-colors">Instagram</a>
            <a href="#" className="hover:text-white/60 transition-colors">TikTok</a>
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
          
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Contact</div>
            <a href="mailto:hello@drinksom.eu" className="text-sm font-bold hover:underline">hello@drinksom.eu</a>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-[8px] uppercase tracking-[0.4em] text-white/20">
          <div>Edison Consult B.V.</div>
          <div>Designed by .RAW</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
