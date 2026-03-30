import { CheckCircle2, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SuccessPageProps {
  email: string;
  eventTitle: string;
  onClose: () => void;
}

export default function SuccessPage({ email, eventTitle, onClose }: SuccessPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-secondary/10 text-secondary rounded-[32px] flex items-center justify-center mb-8 border border-secondary/10 shadow-lg shadow-secondary/5"
      >
        <CheckCircle2 size={48} />
      </motion.div>

      <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Nomination Received!</h3>
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8">{eventTitle}</p>
      
      <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 mb-10 w-full max-w-md">
        <p className="text-slate-500 font-medium mb-2">We've sent a confirmation to</p>
        <p className="text-slate-900 font-black text-lg">{email}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary hover:bg-red-700 font-black text-lg shadow-xl shadow-primary/20" onClick={onClose}>
          Close Portal
        </Button>
        <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
          <Download className="mr-2 w-5 h-5" />
          Receipt
        </Button>
      </div>

      <p className="mt-12 text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
        <Share2 size={12} />
        Share your achievement with #Abhyutthanam2026
      </p>
    </div>
  );
}
