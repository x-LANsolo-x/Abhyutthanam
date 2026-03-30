import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/blocks/hero-section';
import EventDetails from '@/components/EventDetails';
import AwardsGrid from '@/components/blocks/AwardsGrid';
import RegisterModal from '@/components/RegisterModal';
import { fetchEvent } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { BackgroundPaths } from '@/components/ui/background-paths';

const DEFAULT_EVENT = {
    title: "ABHYUTTHANAM 2024",
    date: "2024-10-24",
    time: "10:00 AM - 04:00 PM",
    venue: "B-Block Auditorium, CU",
    about_text: "Abhyutthanam 2024 is a prestigious initiative to recognize and celebrate the outstanding accomplishments of students in the co-curricular domain. This platform aims to honor individuals who have excelled beyond the classroom and brought recognition through their achievements at various esteemed platforms.",
    booked_seats: 540,
    total_seats: 600
};

export default function EventPage() {
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const res = await fetchEvent();
                setEvent(res.data?.event || res.data || DEFAULT_EVENT);
            } catch (err) {
                console.error("Failed to fetch event:", err);
                setEvent(DEFAULT_EVENT);
            } finally {
                // Slower, more deliberate progress for formal feel
                let interval = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 100) {
                            clearInterval(interval);
                            setTimeout(() => setLoading(false), 800);
                            return 100;
                        }
                        return prev + 1; // Slower increment
                    });
                }, 20);
            }
        };
        loadEvent();
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div 
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                    className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-12"
                >
                    <div className="w-full max-w-sm flex flex-col items-center space-y-16">
                        
                        {/* Formal Header Logo / Icon */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="w-px h-12 bg-slate-200" />
                            <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-2xl font-black text-slate-900 uppercase tracking-[0.4em] text-center">
                                Abhyutthanam
                            </h2>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={14} className="text-brand-red" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Official Portal</span>
                            </div>
                        </motion.div>
                        
                        {/* High-End Formal Progress Indicator */}
                        <div className="w-full space-y-6">
                            <div className="relative h-px w-full bg-slate-100 overflow-hidden">
                                <motion.div 
                                    className="absolute inset-y-0 left-0 bg-brand-red shadow-[0_0_10px_rgba(227,30,36,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "easeInOut" }}
                                />
                            </div>
                            
                            <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                                <motion.span
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Authenticating Academic Session
                                </motion.span>
                                <span className="text-slate-900 font-black">{progress}%</span>
                            </div>
                        </div>

                        {/* Attribution */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.5em]">Chandigarh University</p>
                            <p className="text-[8px] font-bold text-slate-200 uppercase tracking-[0.3em]">Office of Alumni Affairs</p>
                        </motion.div>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-brand-red selection:text-white"
                >
                    <Navbar onRegister={() => setModalOpen(true)} />
                    
                    <main>
                        {/* Hero Section */}
                        <section className="reveal">
                            <HeroSection onRegister={() => setModalOpen(true)} />
                        </section>
                        
                        {/* Event Details Section */}
                        <motion.section 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <EventDetails 
                                event={event} 
                                bookedSeats={event?.booked_seats || 540} 
                                totalSeats={event?.total_seats || 600} 
                            />
                        </motion.section>

                        {/* Recognition Categories Section */}
                        <motion.section 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <AwardsGrid onRegister={() => setModalOpen(true)} />
                        </motion.section>

                        {/* FINAL CTA */}
                        <motion.section 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="py-32 relative bg-slate-50/50 overflow-hidden border-y border-slate-100"
                        >
                            <BackgroundPaths invert={false} />
                            
                            <div className="container px-6 md:px-12 lg:px-16 mx-auto relative z-10 text-center">
                                <div className="max-w-4xl mx-auto">
                                    <div className="w-16 h-16 rounded-2xl bg-white text-brand-red flex items-center justify-center mx-auto mb-10 shadow-sm border border-slate-100">
                                        <Trophy size={32} />
                                    </div>

                                    <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8">
                                        Ready to Join the <span className="text-brand-red">Achievers Legacy?</span>
                                    </h2>

                                    <p className="text-lg md:text-xl text-slate-500 mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
                                        Secure your place among Chandigarh University's most distinguished student leaders and innovators. Submit your nomination today.
                                    </p>

                                    <div>
                                        <button 
                                            onClick={() => setModalOpen(true)}
                                            className="h-16 px-12 rounded-2xl text-lg font-black bg-brand-red text-white shadow-xl shadow-red-500/20 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto group"
                                        >
                                            Register Now
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    </main>

                    {/* Footer */}
                    <footer className="py-20 border-t border-slate-100 bg-white relative z-10 text-center">
                        <div className="container px-6 md:px-12 lg:px-16 mx-auto flex flex-col items-center gap-6">
                            <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase">
                                {event?.title || "ABHYUTTHANAM"}
                            </div>
                            <div className="h-px w-12 bg-brand-red opacity-30" />
                            <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
                                Chandigarh University
                            </p>
                            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mt-4">
                                © {new Date().getFullYear()} All rights reserved.
                            </p>
                            <div className="mt-6 opacity-5 hover:opacity-20 transition-opacity">
                                <a href="/admin" className="text-[8px] text-slate-900 uppercase tracking-[0.5em] font-black">Admin Console</a>
                            </div>
                        </div>
                    </footer>

                    <RegisterModal 
                        isOpen={modalOpen} 
                        onClose={() => {
                            setModalOpen(false);
                            fetchEvent().then(res => setEvent(res.data?.event || res.data || DEFAULT_EVENT));
                        }} 
                        eventTitle={event?.title || "Achievers Awards"}
                        isFull={event?.booked_seats >= event?.total_seats}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
