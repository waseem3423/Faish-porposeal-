import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Award, Download, Share2, Check, Printer, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { proposalVoice } from '../utils/voicePlayer';

interface ProposalCelebrationProps {
  proposerName: string;
  belovedName: string;
}

export default function ProposalCelebration({ proposerName, belovedName }: ProposalCelebrationProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ seconds: 0, minutes: 0, hours: 0 });

  useEffect(() => {
    // Ensure voice is playing smoothly in background
    proposalVoice.resume();

    // Continuous light celebratory burst
    const timer = setInterval(() => {
      confetti({
        particleCount: 20,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D0B6E1', '#8E51B8', '#FAF5FF', '#1D1326', '#FFD700'],
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
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#1D1326] text-white font-bold text-sm shadow-xl mb-4 animate-bounce border border-[#D0B6E1]">
          <Sparkles className="w-4 h-4 text-[#D0B6E1]" />
          <span>SHE SAID YES! 💍 KOMAL & FASIH FOREVER</span>
          <Sparkles className="w-4 h-4 text-[#D0B6E1]" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-script text-[#1D1326] mb-2">
          Muhammad Fasih & Komal Fatima
        </h1>
        <p className="text-base sm:text-lg font-serif-luxury text-[#5A406E] italic">
          Two souls, one heart, and a lifetime of beautiful moments.
        </p>

        {/* Live Together Timer */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D0B6E1] text-[#2E1840] text-xs font-semibold shadow-xs">
          <Clock className="w-3.5 h-3.5 text-[#8E51B8]" />
          <span>Our Story Officially: {timeTogether.minutes}m {timeTogether.seconds}s of pure happiness</span>
        </div>
      </motion.div>

      {/* Printable / Savable Love Certificate */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        ref={certificateRef}
        className="bg-white rounded-3xl p-8 sm:p-14 border-8 border-double border-[#D0B6E1] shadow-2xl relative overflow-hidden text-center my-8"
      >
        {/* Corner floral watermarks */}
        <div className="absolute top-4 left-4 text-[#D0B6E1]/40 pointer-events-none">
          <Heart className="w-10 h-10 fill-[#D0B6E1]/30" />
        </div>
        <div className="absolute top-4 right-4 text-[#D0B6E1]/40 pointer-events-none">
          <Heart className="w-10 h-10 fill-[#D0B6E1]/30" />
        </div>
        <div className="absolute bottom-4 left-4 text-[#D0B6E1]/40 pointer-events-none">
          <Heart className="w-10 h-10 fill-[#D0B6E1]/30" />
        </div>
        <div className="absolute bottom-4 right-4 text-[#D0B6E1]/40 pointer-events-none">
          <Heart className="w-10 h-10 fill-[#D0B6E1]/30" />
        </div>

        {/* Certificate Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1D1326] via-[#5C2B80] to-[#8E51B8] text-white flex items-center justify-center shadow-md mb-3 border border-[#D0B6E1]">
            <Award className="w-8 h-8 text-[#FAF5FF]" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#8E51B8] font-bold">
            Official Keepsake
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#1D1326] tracking-wide mt-1">
            Certificate of Eternal Love & Promise
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#5A406E] font-serif-luxury italic mb-8 max-w-md mx-auto">
          This certified token celebrates the joyful union and lifelong commitment between
        </p>

        {/* Proposer & Beloved Names */}
        <div className="my-6 py-6 px-4 bg-[#FAF7FD] rounded-2xl border border-[#D0B6E1] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#8E51B8] font-bold block">Groom at Heart</span>
            <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1D1326]">{proposerName}</span>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#1D1326] text-white flex items-center justify-center shadow border border-[#D0B6E1]">
            <Heart className="w-5 h-5 fill-[#D0B6E1] text-[#D0B6E1]" />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#8E51B8] font-bold block">Beloved Queen</span>
            <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1D1326]">{belovedName}</span>
          </div>
        </div>

        {/* The Sacred Promises */}
        <div className="my-8 text-left max-w-lg mx-auto space-y-3 font-serif-luxury text-sm text-[#2D1B3E]">
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-[#8E51B8] shrink-0" />
            <span>To cherish, respect, and support each other through every step of life.</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-[#8E51B8] shrink-0" />
            <span>To share endless laughter, warm conversations, and unshakeable loyalty.</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-[#8E51B8] shrink-0" />
            <span>To always choose each other, today, tomorrow, and for all of eternity.</span>
          </div>
        </div>

        {/* Urdu Verse */}
        <p className="font-urdu text-xl text-[#1D1326] leading-loose my-6" dir="rtl">
          ”ہم نے تو بس تمہیں مانگا ہے رب سے، اب تم ساتھ رہنا زندگی بھر کے لیے۔“
        </p>

        {/* Date and Seal */}
        <div className="mt-10 pt-6 border-t border-[#D0B6E1] flex flex-col sm:flex-row justify-between items-center gap-6 max-w-xl mx-auto">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-[#8E51B8] tracking-wider block">Date of Proposal</span>
            <span className="text-sm font-semibold text-[#1D1326]">{todayFormatted}</span>
          </div>

          {/* Golden Rose Seal */}
          <div className="w-16 h-16 rounded-full border-2 border-[#D0B6E1] bg-gradient-to-tr from-[#1D1326] to-[#4A246B] flex flex-col items-center justify-center shadow-inner text-[#FAF5FF]">
            <Heart className="w-5 h-5 fill-[#D0B6E1] text-[#D0B6E1]" />
            <span className="text-[8px] font-black tracking-tighter uppercase text-[#FAF5FF]">FOREVER</span>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-[10px] uppercase font-bold text-[#8E51B8] tracking-wider block">Status</span>
            <span className="text-sm font-bold text-[#1D1326]">Locked in Hearts 💜</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          id="print-certificate-btn"
          onClick={handlePrint}
          className="px-6 py-3 rounded-full bg-[#1D1326] hover:bg-[#2A1B38] text-white text-sm font-semibold shadow-md flex items-center gap-2 transition cursor-pointer border border-[#D0B6E1]"
        >
          <Printer className="w-4 h-4 text-[#D0B6E1]" />
          <span>Print / Save Keepsake</span>
        </button>

        <button
          id="share-link-btn"
          onClick={handleShare}
          className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF7FD] text-[#1D1326] text-sm font-semibold border border-[#D0B6E1] shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4 text-[#8E51B8]" />}
          <span>{copied ? 'Link Copied to Clipboard!' : 'Share Love Story'}</span>
        </button>
      </div>
    </div>
  );
}
