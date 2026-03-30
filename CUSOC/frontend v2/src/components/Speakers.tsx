import { Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Speakers({ speakers }: { speakers?: any[] }) {
    const data = Array.isArray(speakers) && speakers.length > 0 ? speakers : [];
    if (data.length === 0) return null;

    return (
        <section className="py-24 px-6 md:px-12 lg:px-16 bg-white" id="speakers">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-4">Industry Presence</p>
                        <h2 
                            style={{ fontFamily: "'Cinzel', serif" }}
                            className="text-4xl md:text-6xl font-black text-slate-900 uppercase"
                        >
                            Distinguished Guests
                        </h2>
                    </div>
                    <div className="h-px bg-slate-200 flex-1 hidden md:block mb-4 ml-10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.map((speaker, idx) => (
                        <div
                            key={speaker.id || idx}
                            className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
                        >
                            <div className="aspect-[4/5] relative bg-slate-200">
                                {speaker.photo_url ? (
                                    <img 
                                        src={speaker.photo_url} 
                                        alt={speaker.name} 
                                        className="w-full h-full object-cover"
                                        onError={(e: any) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-black text-slate-300">
                                        {speaker.initials || speaker.name?.charAt(0)}
                                    </div>
                                )}
                                
                                {speaker.linkedin && (
                                    <a 
                                        href={speaker.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 right-4 p-2 bg-brand-red text-white rounded shadow-lg"
                                    >
                                        <Linkedin size={16} fill="currentColor" />
                                    </a>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-black text-slate-900 mb-1">{speaker.name}</h3>
                                <p className="text-brand-red text-[10px] font-bold uppercase tracking-widest mb-4">{speaker.role}</p>
                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                                    {speaker.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
