import gdgLogo from '@/assets/partners/GDG.png';
import cSquareLogo from '@/assets/partners/C_Square_Black_1-removebg-preview.png';
import { motion } from 'framer-motion';

const STATIC_PARTNERS = [
    { id: 1, name: 'GDG', logo: gdgLogo },
    { id: 3, name: 'C Square', logo: cSquareLogo },
];

export default function Partners({ partners }: { partners?: any[] }) {
    const LOCAL_LOGO_MAP: any = { GDG: gdgLogo, 'C Square': cSquareLogo };
    const data = Array.isArray(partners) && partners.length > 0
        ? partners.map((p) => ({ ...p, logo: p.logo_url || LOCAL_LOGO_MAP[p.name] || null }))
        : STATIC_PARTNERS;

    // Double for ticker
    const tickerItems = [...data, ...data, ...data, ...data];

    return (
        <section className="py-20 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-6 mb-12 flex items-center gap-6"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 whitespace-nowrap">Collaborative Ecosystem</span>
                <div className="h-px w-full bg-white/5" />
            </motion.div>

            <div className="flex overflow-hidden group">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-20 whitespace-nowrap px-10"
                >
                    {tickerItems.map((partner, idx) => (
                        <div key={idx} className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                             {partner.logo ? (
                                <img src={partner.logo} alt={partner.name} className="h-10 w-auto object-contain" />
                            ) : (
                                <span className="text-xl font-black text-white/40">{partner.name}</span>
                            )}
                        </div>
                    ))}
                </motion.div>
                
                {/* Secondary track for seamless loop */}
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-20 whitespace-nowrap px-10"
                >
                    {tickerItems.map((partner, idx) => (
                        <div key={`dup-${idx}`} className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                             {partner.logo ? (
                                <img src={partner.logo} alt={partner.name} className="h-10 w-auto object-contain" />
                            ) : (
                                <span className="text-xl font-black text-white/40">{partner.name}</span>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
