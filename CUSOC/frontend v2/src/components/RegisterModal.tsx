import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ShieldCheck, FileText, CheckCircle2, Lock } from 'lucide-react';
import OTPVerification from './OTPVerification';
import RegistrationForm from './RegistrationForm';
import SuccessPage from './SuccessPage';

export default function RegisterModal({ isOpen, onClose, eventTitle, isFull }: { isOpen: boolean, onClose: () => void, eventTitle: string, isFull: boolean }) {
    const [step, setStep] = useState('otp');
    const [verifiedEmail, setVerifiedEmail] = useState('');
    const [verifiedOtp, setVerifiedOtp] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStep('otp');
            setVerifiedEmail('');
            setVerifiedOtp('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOTPVerified = (email: string, otp: string) => {
        setVerifiedEmail(email);
        setVerifiedOtp(otp);
        setStep('form');
    };

    const steps = [
        { id: 'otp', label: 'Identity Verification', icon: ShieldCheck },
        { id: 'form', label: 'Nomination Form', icon: FileText },
        { id: 'success', label: 'Submission Complete', icon: CheckCircle2 }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6 lg:p-12">
                {/* Backdrop - Standard professional dark overlay */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />

                {/* Modal Container - Structured and Authoritative */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    className="relative w-full max-w-6xl max-h-screen md:max-h-[90vh] bg-white border border-slate-200 md:rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Official Header */}
                    <div className="bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center justify-between px-8 md:px-12 py-8">
                            <div className="flex items-center gap-8">
                                {step === 'form' && (
                                    <button 
                                        onClick={() => setStep('otp')}
                                        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors text-xs uppercase tracking-widest"
                                    >
                                        <ArrowLeft size={16} /> Back
                                    </button>
                                )}
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Official Nomination Portal</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Academic Session 2025 - 2026</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-400">
                                    <Lock size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-3 text-slate-400 hover:text-brand-red hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Formal Step Indicator */}
                        <div className="px-12 pb-8 flex items-center gap-8">
                            {steps.map((s, idx) => {
                                const isActive = s.id === step;
                                const isCompleted = steps.findIndex(x => x.id === step) > idx;
                                return (
                                    <div key={s.id} className="flex items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all border ${
                                                isActive ? 'bg-brand-red border-brand-red text-white shadow-lg' : 
                                                isCompleted ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-300'
                                            }`}>
                                                {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                                                {s.label}
                                            </span>
                                        </div>
                                        {idx < steps.length - 1 && <div className="w-12 h-px bg-slate-200" />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Form Scroll Area - Formal spacing and typography */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 lg:p-20">
                        {isFull && step !== 'success' ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
                                <div className="w-20 h-20 bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-red rounded-[24px]">
                                    <X size={40} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-slate-900 uppercase">Registration Capacity Full</h3>
                                    <p className="text-slate-500 max-w-md mx-auto font-medium">
                                        The maximum limit for nominations has been reached for this academic cycle. No further entries are being accepted at this time.
                                    </p>
                                </div>
                                <button className="px-12 py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all" onClick={onClose}>
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {step === 'otp' && <OTPVerification onVerified={handleOTPVerified} />}
                                    {step === 'form' && (
                                        <RegistrationForm 
                                            email={verifiedEmail} 
                                            otp={verifiedOtp} 
                                            onSuccess={() => setStep('success')} 
                                        />
                                    )}
                                    {step === 'success' && (
                                        <SuccessPage 
                                            email={verifiedEmail} 
                                            eventTitle={eventTitle} 
                                            onClose={onClose} 
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                    
                    {/* Official Footer Accent */}
                    <div className="h-1.5 w-full flex">
                        <div className="h-full w-1/3 bg-brand-red" />
                        <div className="h-full w-1/3 bg-brand-blue" />
                        <div className="h-full w-1/3 bg-slate-900" />
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
