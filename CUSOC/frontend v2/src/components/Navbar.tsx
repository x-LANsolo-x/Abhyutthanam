import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import cuLogo from '@/assets/logos/cu-logo.png';
import oaaLogo from '@/assets/logos/oaa-logo.png';
import cuIntranetLogo from '@/assets/logos/cu-intranet-logo.png';

export default function Navbar({ onRegister }: { onRegister: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                scrolled ? 'py-3 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl' : 'py-6 bg-transparent'
            }`}
        >
            {/* Edge-to-edge container using w-full and responsive padding */}
            <div className="w-full px-4 sm:px-8 md:px-12 flex items-center justify-between">
                
                {/* Brand Logos Cluster */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 sm:gap-6 md:gap-8 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <img src={cuLogo} alt="CU Logo" className="h-8 md:h-12 w-auto object-contain" />
                    <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                    <img src={oaaLogo} alt="OAA Logo" className="h-8 md:h-10 w-auto object-contain opacity-90" />
                    <div className="h-8 w-px bg-slate-200 hidden lg:block" />
                    <img src={cuIntranetLogo} alt="CU Intranet" className="h-8 md:h-10 w-auto object-contain hidden lg:block opacity-80" />
                </motion.div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 sm:gap-8 md:gap-10">
                    <nav className="hidden sm:flex items-center gap-6 md:gap-8 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                        <a href="#about" className="hover:text-brand-red transition-colors">About</a>
                        <a href="#awards" className="hover:text-brand-blue transition-colors">Awards</a>
                    </nav>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onRegister}
                        className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-brand-red text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-red-500/20 hover:bg-red-700 transition-all"
                    >
                        Join Now
                    </motion.button>

                    <button 
                        className="sm:hidden p-2 text-slate-600 hover:text-brand-red"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="sm:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-8 flex flex-col gap-6 shadow-2xl"
                    >
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 uppercase">About</a>
                        <a href="#awards" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 uppercase">Awards</a>
                        <button onClick={() => { onRegister(); setMobileMenuOpen(false); }} className="w-full py-4 rounded-2xl bg-brand-red text-white font-black uppercase tracking-widest">Register Now</button>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Top Multi-color Strip */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-brand-red via-brand-blue to-brand-red" />
        </header>
    );
}
