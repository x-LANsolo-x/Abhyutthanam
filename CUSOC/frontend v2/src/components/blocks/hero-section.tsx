import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mainPoster from '@/assets/Poster/achieversday.png';
import { BackgroundPaths } from '@/components/ui/background-paths';

export default function HeroSection({ onRegister }: { onRegister: () => void }) {
    const mainTitle = "ABHYUTTHANAM";
    const subTitle = "ACHIEVERS AWARDS";
    const session = "Nominations AY 2025/26";
    
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-white">
            {/* Background Paths - SECTION 1: STANDARD */}
            <BackgroundPaths invert={false} />

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* 1. Main Anchor: Luxury Title */}
                <div className="flex flex-col mb-12 lg:mb-16 items-center text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 w-fit mb-6 rounded-full border border-slate-200 bg-slate-50 text-brand-red text-[10px] font-black tracking-[0.3em] uppercase"
                    >
                        <Award size={12} className="animate-pulse" />
                        Chandigarh University Presents
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring", stiffness: 100 }}
                        style={{ 
                            fontFamily: "'Cinzel', serif",
                            letterSpacing: '0.05em',
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] font-black text-slate-900 tracking-tight leading-[0.85] select-none w-full"
                    >
                        {mainTitle}
                    </motion.h1>
                </div>

                {/* 2. Grid with Balanced Layout */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Text Content */}
                    <motion.div 
                        style={{ y: yParallax, opacity: opacityParallax }}
                        className="lg:col-span-7 flex flex-col gap-8 z-20 text-center lg:text-left"
                    >
                        <div className="flex flex-col gap-4">
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-red tracking-tight leading-none"
                            >
                                {subTitle}
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="inline-block px-4 py-2 rounded-lg bg-brand-blue text-white text-xs font-black w-fit mx-auto lg:mx-0 shadow-lg shadow-blue-500/20 uppercase tracking-[0.2em]"
                            >
                                {session}
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col gap-3 items-center lg:items-start"
                        >
                            <h2 className="text-xl md:text-2xl font-bold text-slate-700 italic tracking-tight leading-tight">
                                "The Ultimate Recognition of Excellence"
                            </h2>
                            <div className="h-1.5 w-20 bg-brand-red rounded-full" />
                        </motion.div>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-lg text-slate-500 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0"
                        >
                            Nominate yourself or your peers for the most distinguished awards honoring student leaders and achievers.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
                        >
                            <Button 
                                size="lg" 
                                onClick={onRegister}
                                className="h-16 px-10 rounded-2xl text-lg font-black bg-brand-red text-white hover:bg-red-700 shadow-2xl shadow-red-500/20 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                            >
                                Submit Nomination <ArrowRight className="ml-2" size={20} />
                            </Button>
                            <a href="https://drive.google.com/file/d/1zCEvEQ3MstfdEraIVn77VF06ogkKN4LY/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="h-16 px-10 rounded-2xl text-lg font-bold border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm w-full sm:w-auto"
                                >
                                    Guidelines
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Properly Positioned Poster */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        className="lg:col-span-5 relative z-10"
                    >
                        <div className="relative group p-2 rounded-[40px] bg-white border-4 border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden max-w-[650px] mx-auto lg:ml-auto">
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                src={mainPoster} 
                                alt="Achievers Awards Poster" 
                                className="w-full h-auto rounded-[32px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/5 via-transparent to-brand-blue/5 opacity-60 pointer-events-none" />
                        </div>

                        {/* Background Floating Elements */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-brand-blue/10 rounded-tr-[60px] -z-10" 
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
