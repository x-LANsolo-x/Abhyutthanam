import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Download, RefreshCw, LogOut, CheckCircle, 
  XCircle, Clock, Search, Filter, ShieldCheck, 
  ChevronRight, Database, ExternalLink 
} from 'lucide-react';
import { fetchRegistrations, updateBookingStatus, exportToExcel } from '@/services/adminApi';
import { Button } from '@/components/ui/button';

interface AdminPageProps {
  onLogout: () => void;
}

export default function AdminPage({ onLogout }: AdminPageProps) {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('admin_token') || '';
      const { data } = await fetchRegistrations(token);
      setRegistrations(data.registrations);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load registrations');
      if (err.response?.status === 401) onLogout();
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('admin_token') || '';
      const { data } = await exportToExcel(token);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CUSOC_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Export failed');
    }
  };

  const filtered = registrations.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-brand-purple flex flex-col">
      {/* Admin Header */}
      <nav className="border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black leading-tight">Admin Dashboard</h1>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">CUSOC Performance Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </Button>
            <Button variant="default" size="sm" className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-red-500/20" onClick={onLogout}>
              <LogOut size={14} className="mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-12">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glow-card p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Total Applicants</span>
            </div>
            <h2 className="text-4xl font-black">{registrations.length}</h2>
          </div>
          <div className="glow-card p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
              <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Approved</span>
            </div>
            <h2 className="text-4xl font-black">{registrations.filter(r => r.status === 'Approved').length}</h2>
          </div>
          <div className="glow-card p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Clock size={24} />
              </div>
              <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Pending Review</span>
            </div>
            <h2 className="text-4xl font-black">{registrations.filter(r => r.status === 'Pending').length}</h2>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-center justify-between">
          <div className="flex w-full lg:w-auto gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search name, UID or email..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:border-primary outline-none transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-sm"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <Button size="lg" className="rounded-2xl gap-2 font-bold px-8" onClick={handleExport}>
            <Download size={18} /> Export Data
          </Button>
        </div>

        {/* Table */}
        <div className="glow-card rounded-[32px] overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Student</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Details</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Nominations</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                <AnimatePresence>
                  {filtered.map((r, i) => (
                    <motion.tr 
                      key={r._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/[0.01] transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="font-bold text-white">{r.name}</div>
                        <div className="text-xs text-white/40">{r.email}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm">{r.uid}</div>
                        <div className="text-[10px] uppercase text-secondary/60 tracking-wider">{r.department}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          {r.categories?.map((c: any) => (
                            <span key={c.type} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-tighter">
                              {c.type}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl">
                            <ExternalLink size={14} />
                          </Button>
                          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white">
                            <CheckCircle size={14} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
