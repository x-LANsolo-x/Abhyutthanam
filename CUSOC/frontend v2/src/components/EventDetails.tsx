import { Calendar, Clock, MapPin, FileText, ShieldCheck, Users, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { BackgroundPaths } from '@/components/ui/background-paths';

interface EventDetailsProps {
  event: any
  bookedSeats: number
  totalSeats: number
}

const ACHIEVERS_CONTENT = [
  {
    title: "Submission Guidelines",
    items: [
      "Submit only official co-curricular achievement records.",
      "Each submission must be supported with valid documentation.",
      "Incomplete applications will be automatically disqualified."
    ],
    color: "brand-red"
  },
  {
    title: "Proof Requirements",
    items: [
      "Certificates must be renamed: NAME_Competition-NAME_POSITION",
      "Mandatory team photograph for group achievements.",
      "High-resolution scans only (PDF or JPEG format)."
    ],
    color: "brand-blue"
  },
  {
    title: "Eligibility Criteria",
    items: [
        "Other Universities (National and International)",
        "Government or Non-Government Organizations",
        "Student or Faculty Award Platforms",
        "Professional Bodies and Societies"
    ],
    color: "slate-900"
  },
  {
    title: "Official Note",
    items: [
        "Internal CU competitions will not be considered.",
        "Departmental or club-level events are excluded.",
        "Peer-to-peer awards are not eligible."
    ],
    color: "brand-red"
  }
];

const ACHIEVERS_ABOUT = `Achievers Day 2026 is a prestigious initiative to recognize and celebrate the outstanding accomplishments of students in the co-curricular domain. This platform aims to honor individuals who have excelled beyond the classroom and brought recognition through their achievements at various esteemed platforms.

Celebrate excellence and innovation at Abhyutthanam, the prestigious annual recognition ceremony honoring outstanding student achievements across research, entrepreneurship, leadership, and global certifications.`;

export default function EventDetails({ event, bookedSeats, totalSeats }: EventDetailsProps) {
  if (!event) return null;
  const { date, venue, time } = event

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Dynamic Background Paths */}
      <BackgroundPaths invert={true} />

      <div className="container px-6 md:px-12 lg:px-16 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* Narrative Content */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
                <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red"
                >
                    The Legacy of Achievers
                </motion.p>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: "'Cinzel', serif" }}
                    className="text-4xl md:text-6xl font-black text-slate-900 uppercase leading-none"
                >
                  About the Event
                </motion.h2>
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 96 }}
                    viewport={{ once: true }}
                    className="h-1.5 bg-brand-blue" 
                />
            </div>

            <div className="space-y-6">
                {ACHIEVERS_ABOUT.split('\n\n').map((para: string, idx: number) => (
                <motion.p 
                    key={idx} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="text-lg text-slate-600 leading-relaxed font-medium"
                >
                    {para}
                </motion.p>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ACHIEVERS_CONTENT.map((sec, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 border border-slate-100 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm"
                    >
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">{sec.title}</h3>
                        <ul className="space-y-4">
                            {sec.items.map((item, j) => (
                                <li key={j} className="flex gap-3 text-sm font-medium text-slate-500">
                                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-brand-red" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Sidebar Logistics - REDESIGNED EVENT DETAILS BOX */}
          <div className="lg:col-span-5">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="sticky top-32 bg-white border-2 border-slate-50 p-10 md:p-14 rounded-[48px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden"
            >
              {/* Subtle top brand accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red via-brand-blue to-brand-red" />
              
              <h3 className="text-2xl font-black mb-12 uppercase tracking-[0.2em] text-slate-900 text-center">Nomination Intel</h3>
              
              <div className="space-y-12">
                <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-brand-red shadow-sm group-hover:scale-110 transition-transform">
                    <Calendar size={28} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Scheduled Date</p>
                    <p className="text-xl font-black text-slate-900">{date ? formatDate(date) : "Sunday, Oct 24, 2026"}</p>
                  </div>
                </div>

                <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-brand-blue shadow-sm group-hover:scale-110 transition-transform">
                    <Clock size={28} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Session Window</p>
                    <p className="text-xl font-black text-slate-900">{time || "10:00 AM - 04:00 PM"}</p>
                  </div>
                </div>

                <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin size={28} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Official Venue</p>
                    <p className="text-xl font-black text-slate-900">{venue || "B-Block Auditorium, CU"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-slate-100">
                <div className="flex justify-between items-end mb-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Live Status</p>
                        <p className="text-4xl font-black text-slate-900 tracking-tighter">
                            {bookedSeats} <span className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Entries</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-black text-brand-red uppercase">Capacity</span>
                        <span className="text-xs font-bold text-slate-400">{totalSeats} Max</span>
                    </div>
                </div>
                
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(bookedSeats / totalSeats) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full rounded-full bg-linear-to-r from-brand-red via-brand-blue to-brand-red shadow-[0_0_15px_rgba(227,30,36,0.3)]"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-6 text-center font-bold uppercase tracking-[0.2em]">Application portal active</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
