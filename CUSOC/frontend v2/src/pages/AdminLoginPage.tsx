import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { loginAdmin } from '@/services/adminApi';
import { Button } from '@/components/ui/button';

interface AdminLoginPageProps {
  onLogin: () => void;
}

export default function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return setError('Please enter the admin password');
    setLoading(true);
    setError('');
    try {
      // Assuming username is 'admin' or handled by backend
      const { data } = await loginAdmin('admin', password.trim());
      localStorage.setItem('admin_token', data.token);
      onLogin();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-purple flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2">Admin Portal</h1>
          <p className="text-white/40">Secure access to CUSOC management</p>
        </div>

        <div className="glow-card p-8 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type={showPw ? 'text' : 'password'}
                  className="w-full pl-11 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white placeholder:text-white/10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="text-xs text-red-500 mt-2 flex items-center gap-1">⚠ {error}</p>}
            </div>

            <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl font-black">
              {loading ? <Loader2 className="animate-spin" /> : 'Enter Dashboard'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <a href="/" className="text-xs font-bold text-white/40 hover:text-white inline-flex items-center gap-2 transition-colors">
              <ArrowLeft size={14} /> Back to Event
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
