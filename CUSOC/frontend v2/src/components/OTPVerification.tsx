import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, ArrowRight, Loader2, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { sendOTP, verifyOTP } from '../services/api';

export default function OTPVerification({ onVerified }: { onVerified: (email: string, otp: string) => void }) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('email'); // email, code
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        const domain = email.split('@')[1];
        if (domain !== 'cuchd.in') {
            setError('ACCESS DENIED: Please provide an authorized university email address (@cuchd.in).');
            return;
        }

        setLoading(true);
        try {
            await sendOTP(email);
            setStep('code');
            setTimer(60);
        } catch (err: any) {
            setError(err.response?.data?.error || 'System Error: Failed to transmit verification code.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await verifyOTP(email, otp);
            onVerified(email, otp);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Validation Failure: The provided code is incorrect.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="flex flex-col md:flex-row gap-12 items-start">
                
                {/* Left: Formal Sidebar Instructions */}
                <div className="w-full md:w-1/3 space-y-8">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-xl">
                        {step === 'email' ? <Mail size={32} /> : <ShieldCheck size={32} />}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none">
                            {step === 'email' ? 'Identification' : 'Authorization'}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">
                            {step === 'email' 
                                ? 'Applicants are required to validate their identity using their official Chandigarh University domain credentials.' 
                                : `A secure authentication code has been dispatched to ${email}. Please check your inbox.`}
                        </p>
                    </div>
                    <div className="pt-6 border-t border-slate-100">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <CheckCircle2 size={12} className="text-brand-blue" /> Authorized Domain
                            </li>
                            <li className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <CheckCircle2 size={12} className="text-brand-blue" /> Single Submission
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right: Formal Form Fields */}
                <div className="w-full md:w-2/3">
                    <form onSubmit={step === 'email' ? handleSendOTP : handleVerify} className="space-y-8">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-5 bg-red-50 border-l-4 border-brand-red text-brand-red text-xs font-bold leading-relaxed"
                            >
                                {error}
                            </motion.div>
                        )}

                        {step === 'email' ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">University Email Address</label>
                                    <input 
                                        type="email"
                                        required
                                        placeholder="uid@cuchd.in"
                                        className="w-full px-6 py-5 bg-white border-2 border-slate-100 focus:border-slate-900 transition-all outline-none text-lg font-bold text-slate-900 placeholder:text-slate-200"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">* Must end with @cuchd.in domain</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 text-center block">Secure Authentication Code</label>
                                    <input 
                                        type="text"
                                        required
                                        maxLength={6}
                                        placeholder="· · · · · ·"
                                        className="w-full px-6 py-6 bg-white border-2 border-slate-100 focus:border-brand-blue text-center tracking-[1.2em] text-4xl font-black outline-none transition-all text-slate-900"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-100">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resend Window</span>
                                    {timer > 0 ? (
                                        <span className="text-xs font-bold text-slate-900">{timer} Seconds</span>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={handleSendOTP}
                                            className="text-[10px] font-black text-brand-blue hover:text-brand-red uppercase tracking-widest flex items-center gap-2 transition-colors"
                                        >
                                            <RefreshCw size={12} /> Request New Transmission
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all disabled:opacity-50 hover:bg-black shadow-xl active:scale-[0.98]"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    {step === 'email' ? 'Initialize Verification' : 'Authorize Application'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
