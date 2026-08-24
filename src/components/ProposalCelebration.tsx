import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Award, Download, Share2, Check, Printer, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProposalCelebrationProps {
  proposerName: string;
  belovedName: string;
}

export default function ProposalCelebration({ proposerName, belovedName }: ProposalCelebrationProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ seconds: 0, minutes: 0, hours: 0 });

  useEffect(() => {
    // Continuous light celebratory burst
    const timer = setInterval(() => {
      confetti({
        particleCount: 20,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#FB7185', '#F472B6', '#FDE047'],
      });
    }, 4000);

    const clockTimer = setInterval(() => {
      setTimeTogether(prev => {
        const nextSec = prev.seconds + 1;
        if (nextSec >= 60) {
          return { ...prev, seconds: 0, minutes: prev.minutes + 1 };
        }
        return { ...prev, seconds: nextSec };
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(clockTimer);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto relative z-10">
      {/* Top Banner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-lg mb-4 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>SHE SAID YES! 💕 FOREVER BEGINS TODAY</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-script text-[#6C172E] mb-2">
          Muhammad Fasih & Komal Fatima
        </h1>
        <p className="text-base sm:text-lg font-serif-luxury text-rose-800 italic">
          Two souls, one heart, and a lifetime of beautiful moments.
        </p>

        {/* Live Together Timer */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-800 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5 text-rose-600" />
          <span>Our Story Officially: {timeTogether.minutes}m {timeTogether.seconds}s of pure happiness</span>
        </div>
      </motion.div>

      {/* Printable / Savable Love Certificate */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        ref={certificateRef}
        className="bg-white/95 rounded-3xl p-8 sm:p-14 border-8 border-double border-rose-200 shadow-2xl relative overflow-hidden text-center my-8"
      >
        {/* Corner floral watermarks */}
        <div className="absolute top-4 left-4 text-rose-200 pointer-events-none">
          <Heart className="w-10 h-10 fill-rose-100" />
        </div>
        <div className="absolute top-4 right-4 text-rose-200 pointer-events-none">
          <Heart className="w-10 h-10 fill-rose-100" />
        </div>
        <div className="absolute bottom-4 left-4 text-rose-200 pointer-events-none">
          <Heart className="w-10 h-10 fill-rose-100" />
        </div>
        <div className="absolute bottom-4 right-4 text-rose-200 pointer-events-none">
          <Heart className="w-10 h-10 fill-rose-100" />
        </div>

        {/* Certificate Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-md mb-3">
            <Award className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold">
            Official Keepsake
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#551625] tracking-wide mt-1">
            Certificate of Eternal Love & Promise
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-rose-600 font-serif-luxury italic mb-8 max-w-md mx-auto">
          This certified token celebrates the joyful union and lifelong commitment between
        </p>

        {/* Proposer & Beloved Names */}
        <div className="my-6 py-6 px-4 bg-rose-50/70 rounded-2xl border border-rose-200/80 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-rose-400 font-semibold block">Groom at Heart</span>
            <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#67172A]">{proposerName}</span>
          </div>

          <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow">
            <Heart className="w-5 h-5 fill-white" />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-rose-400 font-semibold block">Beloved Queen</span>
            <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#67172A]">{belovedName}</span>
          </div>
        </div>

        {/* The Sacred Promises */}
        <div className="my-8 text-left max-w-lg mx-auto space-y-3 font-serif-luxury text-sm text-[#481E27]">
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-rose-600 shrink-0" />
            <span>To cherish, respect, and support each other through every step of life.</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-rose-600 shrink-0" />
            <span>To share endless laughter, warm conversations, and unshakeable loyalty.</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-rose-600 shrink-0" />
            <span>To always choose each other, today, tomorrow, and for all of eternity.</span>
          </div>
        </div>

        {/* Urdu Verse */}
        <p className="font-urdu text-xl text-rose-900 leading-loose my-6" dir="rtl">
          ”ہم نے تو بس تمہیں مانگا ہے رب سے، اب تم ساتھ رہنا زندگی بھر کے لیے۔“
        </p>

        {/* Date and Seal */}
        <div className="mt-10 pt-6 border-t border-rose-200 flex flex-col sm:flex-row justify-between items-center gap-6 max-w-xl mx-auto">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block">Date of Proposal</span>
            <span className="text-sm font-semibold text-rose-900">{todayFormatted}</span>
          </div>

          {/* Golden Rose Seal */}
          <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-200 to-yellow-100 flex flex-col items-center justify-center shadow-inner text-amber-900">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <span className="text-[8px] font-black tracking-tighter uppercase">FOREVER</span>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block">Status</span>
            <span className="text-sm font-bold text-rose-600">Locked in Hearts 💕</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          id="print-certificate-btn"
          onClick={handlePrint}
          className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md flex items-center gap-2 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Keepsake</span>
        </button>

        <button
          id="share-link-btn"
          onClick={handleShare}
          className="px-6 py-3 rounded-full bg-white/90 hover:bg-rose-50 text-rose-800 text-sm font-semibold border border-rose-200 shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Link Copied to Clipboard!' : 'Share Love Story'}</span>
        </button>
      </div>
    </div>
  );
}
