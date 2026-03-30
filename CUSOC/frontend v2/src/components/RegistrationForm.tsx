import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown, ArrowRight, Upload, X, Check, AlertCircle, Trash2, Info, Sparkles, Loader2, FileCheck, Award, Briefcase } from 'lucide-react';
import { registerUser } from '../services/api';

const CLUSTERS = ['Engineering', 'Management', 'Liberal Arts and Humanities', 'Science'];
const DEPARTMENTS = [
    'Chemistry', 'Mathematics', 'Physics', 'Bio-Technology', 'Bio-Sciences', 'Agriculture', 
    'Computer Science & Engineering', 'Civil Engineering', 'Mechanical Engineering', 'AIT — CSE', 'UIC — BCA', 'UIC — MCA', 'UIMS', 'UIPS', 'Architecture'
];

const AWARD_CATEGORIES = [
    { id: 'research', label: 'Research/Grant Projects', emoji: '🔬', icon: FileCheck },
    { id: 'innovation', label: 'Global Certification', emoji: '🎖️', icon: Award },
    { id: 'entrepreneurship', label: 'Innovation & Startup', emoji: '🚀', icon: Briefcase },
    { id: 'competitions', label: 'Hackathons/Competitions', emoji: '🏆', icon: Sparkles },
    { id: 'patents', label: 'Innovation & Patents', emoji: '📜', icon: FileCheck },
    { id: 'certifications', label: 'Leadership', emoji: '🎓', icon: User },
    { id: 'other', label: 'Govt Exams/Other Awards', emoji: '✨', icon: Award },
];

const MENTOR_BLANK = () => ({ mentored_by: false, faculty_name: '', faculty_ecode: '' });
const CATEGORY_BLANK: any = {
    research: () => ({ project_type: '', research_name: '', level: '', fund_amount: '', org_name: '', ...MENTOR_BLANK() }),
    innovation: () => ({ cert_title: '', description: '', ...MENTOR_BLANK() }),
    entrepreneurship: () => ({ startup_name: '', reg_status: '', reg_number: '', trl_stage: '', ...MENTOR_BLANK() }),
    competitions: () => ({ comp_name: '', level: '', rank: '', event_date: '', org_body: '', org_name: '', prize_money: '', participation_count: '', role: '', description: '', website: '', ...MENTOR_BLANK() }),
    patents: () => ({ patent_title: '', app_number: '', status: 'Granted', grant_date: '', patent_office: '', applicant_role: '', ...MENTOR_BLANK() }),
    certifications: () => ({ club_name: '', position: '', tenure: '2025-26', members_converted: '', awareness_sessions: '', achievements: '', ...MENTOR_BLANK() }),
    other: () => ({ category_type: '', award_name: '', society: '', ...MENTOR_BLANK() }),
};

export default function RegistrationForm({ email, otp, onSuccess }: { email: string, otp: string, onSuccess: () => void }) {
    const [common, setCommon] = useState({ name: '', uid: '', cluster: '', department: '', selectedCats: [] as string[] });
    const [catData, setCatData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    const toggleCategory = (id: string) => {
        setCommon(p => {
            const selected = p.selectedCats.includes(id);
            const next = selected ? p.selectedCats.filter(c => c !== id) : [...p.selectedCats, id];
            if (!selected) setCatData((cd: any) => ({ ...cd, [id]: CATEGORY_BLANK[id]() }));
            return { ...p, selectedCats: next };
        });
    };

    const handleCatField = (catId: string, field: string, value: any) => {
        setCatData((p: any) => ({ ...p, [catId]: { ...p[catId], [field]: value } }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser({ ...common, email, otp, categories: common.selectedCats.map(c => ({ type: c, data: catData[c] })) });
            onSuccess();
        } catch (err: any) {
            alert(err.message || 'Transmission Error: Registration could not be processed.');
        } finally {
            setLoading(false);
            setUploadProgress('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-24 max-w-5xl mx-auto">
            
            {/* Step 1: Formal Identity Section */}
            <div className="space-y-12">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-slate-900 rounded-full" />
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">I. Applicant Credentials</h3>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-6">Primary academic identification records</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 px-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Legal Full Name</label>
                        <input className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 text-lg placeholder:text-slate-200" placeholder="AS PER OFFICIAL RECORDS" value={common.name} onChange={(e: any) => setCommon({...common, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">University UID / EID</label>
                        <input className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 text-lg uppercase placeholder:text-slate-200" placeholder="E.G. 21BCS1000" value={common.uid} onChange={(e: any) => setCommon({...common, uid: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Academic Cluster</label>
                        <select className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 cursor-pointer" value={common.cluster} onChange={(e: any) => setCommon({...common, cluster: e.target.value})} required>
                            <option value="">SELECT CLUSTER</option>
                            {CLUSTERS.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Assigned Department</label>
                        <select className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 cursor-pointer" value={common.department} onChange={(e: any) => setCommon({...common, department: e.target.value})} required>
                            <option value="">SELECT DEPARTMENT</option>
                            {DEPARTMENTS.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Step 2: Formal Category Selection */}
            <div className="space-y-12">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-brand-red rounded-full" />
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">II. Domain Selection</h3>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-6">Specify the categories for achievement recognition</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
                    {AWARD_CATEGORIES.map(cat => {
                        const isSelected = common.selectedCats.includes(cat.id);
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => toggleCategory(cat.id)}
                                className={`group p-6 border-2 transition-all flex items-center gap-5 text-left relative ${
                                    isSelected ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-300'}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <span className={`text-[10px] font-black uppercase tracking-widest leading-none block mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>{cat.label}</span>
                                    <span className="text-[8px] font-bold uppercase tracking-tighter opacity-60">Authorized Stream</span>
                                </div>
                                {isSelected && <Check size={16} className="text-white" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Step 3: Formal Evidence Placeholder */}
            {common.selectedCats.length > 0 && (
                <div className="space-y-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-8 bg-brand-blue rounded-full" />
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">III. Validation Evidence</h3>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-6">Detailed substantiation for each selected domain</p>
                    </div>

                    <div className="space-y-6 px-6">
                        {common.selectedCats.map((catId) => (
                            <div key={catId} className="p-8 border border-slate-200 bg-slate-50 flex justify-between items-center group hover:bg-white transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm">
                                        <FileCheck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{AWARD_CATEGORIES.find(c => c.id === catId)?.label}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Status: Information Required</p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => toggleCategory(catId)} className="p-2 text-slate-300 hover:text-brand-red transition-colors uppercase text-[10px] font-black tracking-widest flex items-center gap-2">
                                    <Trash2 size={14} /> Remove Entry
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Final Formal Action */}
            <div className="pt-16 border-t-4 border-slate-900 flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-3 text-center">
                    <p className="text-xl font-bold text-slate-900 uppercase tracking-[0.2em]">Official Declaration</p>
                    <p className="text-[10px] font-medium text-slate-400 max-w-lg leading-relaxed uppercase tracking-tighter px-10">
                        By proceeding, I hereby certify that the information provided is accurate and all supporting documentation is authentic. Misrepresentation will result in immediate disqualification.
                    </p>
                </div>

                <button 
                    disabled={loading || common.selectedCats.length === 0}
                    className="w-full py-8 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-6 transition-all disabled:opacity-20 hover:bg-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]"
                >
                    {loading ? (
                        <span className="flex items-center gap-4"><Loader2 className="animate-spin" size={20} /> Transmitting Documentation...</span>
                    ) : (
                        <>Finalize & Submit Nomination <ArrowRight size={20} /></>
                    )}
                </button>
                
                <div className="flex items-center gap-10 opacity-20">
                    <span className="text-[8px] font-black uppercase tracking-[0.5em]">Chandigarh University</span>
                    <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                    <span className="text-[8px] font-black uppercase tracking-[0.5em]">Office of Alumni Affairs</span>
                </div>
            </div>
        </form>
    );
}
