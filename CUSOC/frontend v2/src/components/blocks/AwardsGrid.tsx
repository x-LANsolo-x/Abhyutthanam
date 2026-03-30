import { motion } from 'framer-motion';
import { Award, Beaker, Briefcase, GraduationCap, Microscope, Rocket, Star, ChevronRight } from 'lucide-react';
import { BackgroundPaths } from '@/components/ui/background-paths';

const CATEGORIES = [
  { id: 'research', label: 'Research/Grant Projects', icon: Microscope, color: 'text-brand-red', bg: 'bg-red-50' },
  { id: 'innovation', label: 'Global Certification', icon: Beaker, color: 'text-brand-blue', bg: 'bg-blue-50' },
  { id: 'entrepreneurship', label: 'Innovation & Startup', icon: Rocket, color: 'text-brand-red', bg: 'bg-red-50' },
  { id: 'competitions', label: 'Hackathons/Competitions', icon: Award, color: 'text-brand-blue', bg: 'bg-blue-50' },
  { id: 'patents', label: 'Innovation & Patents', icon: Star, color: 'text-brand-red', bg: 'bg-red-50' },
  { id: 'certifications', label: 'Leadership', icon: GraduationCap, color: 'text-brand-blue', bg: 'bg-blue-50' },
  { id: 'other', label: 'Govt Exams/Other Awards', icon: Briefcase, color: 'text-slate-900', bg: 'bg-slate-50' },
];

export default function AwardsGrid({ onRegister }: { onRegister: () => void }) {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-16 bg-white relative overflow-hidden" id="awards">
             {/* Background Paths - STANDARD for this section */}
             <BackgroundPaths invert={false} />

             {/* Background Decoration - Subtle Brand Lines */}
             <div className="absolute top-0 left-0 w-full h-px bg-slate-100" />
             <div className="absolute bottom-0 left-0 w-full h-px bg-slate-100" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-px w-8 bg-brand-blue" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue">Prestigious Domains</span>
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontFamily: "'Cinzel', serif" }}
                            className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter"
                        >
                            Recognition <span className="text-brand-red">Categories</span>
                        </motion.h2>
                    </div>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium max-w-sm lg:mb-2"
                    >
                        Honoring student excellence across seven high-impact domains of achievement.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-10 rounded-[40px] bg-white/80 backdrop-blur-sm border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Decorative Corner Color */}
                                <div className={`absolute top-0 right-0 w-24 h-24 translate-x-12 -translate-y-12 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 ${cat.bg.replace('50', '200')}`} />
                                
                                <div className={`w-16 h-16 rounded-2xl mb-10 flex items-center justify-center ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform border border-transparent shadow-sm`}>
                                    <Icon size={32} />
                                </div>

                                <h3 className="text-xl md:text-2xl font-black mb-4 text-slate-900 group-hover:text-brand-red transition-colors tracking-tight leading-[1.1] uppercase break-words">{cat.label}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                    Official recognition for high-impact contributions in {cat.label.toLowerCase()} for the academic session.
                                </p>

                                <div className="mt-10 pt-8 border-t border-slate-50 flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${cat.color.replace('text', 'bg')}`} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Award Domain</span>
                                </div>
                            </motion.div>
                        );
                    })}
                    
                    {/* Bento Call to Action Item - Triggers Registration */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        onClick={onRegister}
                        className="lg:col-span-1 p-10 rounded-[40px] bg-brand-red border border-brand-red shadow-2xl flex flex-col justify-center items-start text-left relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
                    >
                        {/* Interactive Sparkle Effect */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" 
                        />
                        
                        <h3 className="text-3xl font-black mb-4 text-white tracking-tighter uppercase leading-[0.9]">Submit Your Nomination</h3>
                        <p className="text-white/70 text-sm mb-10 font-bold uppercase tracking-widest italic opacity-80">Recognition Awaits</p>
                        
                        <div className="w-14 h-14 rounded-2xl bg-white text-brand-red flex items-center justify-center font-black shadow-xl group-hover:scale-110 transition-transform">
                            <Rocket size={24} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
