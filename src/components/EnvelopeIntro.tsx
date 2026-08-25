import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, Lock } from 'lucide-react';

interface EnvelopeIntroProps {
  onOpen: () => void;
  proposerName: string;
  belovedName: string;
}

export default function EnvelopeIntro({ onOpen, proposerName, belovedName }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 py-12">
      {/* Decorative ambient glowing circles */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#D0B6E1]/35 rounded-full blur-3xl -top-10 -left-10 pointer-events-none" />
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#D0B6E1]/25 rounded-full blur-3xl -bottom-10 -right-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-xl mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D0B6E1] text-[#2E1840] text-xs sm:text-sm font-semibold tracking-wide shadow-sm mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8E51B8]" />
          <span>Special Delivery For Komal Fatima</span>
          <Sparkles className="w-3.5 h-3.5 text-[#8E51B8]" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#1D1326] tracking-tight mb-2">
          A Message From The Heart
        </h1>
        <p className="text-[#5A406E] text-sm sm:text-base font-light">
          Written with utmost love, respect, and sincerity
        </p>
      </motion.div>

      {/* The Romantic Envelope Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="w-full max-w-md cursor-pointer relative"
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative glass-card-lilac rounded-3xl p-8 sm:p-10 shadow-lilac-lg border-2 border-[#D0B6E1] overflow-hidden text-center transition-all duration-500 hover:shadow-2xl hover:border-[#B78FD4] transform hover:-translate-y-1">
          
          {/* Lavender signature ribbon accent */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#D0B6E1] via-[#8E51B8] to-[#D0B6E1]" />

          {/* Stamp & Airmail styling */}
          <div className="flex justify-between items-start mb-6">
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#8E51B8] font-bold block">
                Sender
              </span>
              <span className="text-base sm:text-lg font-serif-luxury font-bold text-[#1D1326]">
                {proposerName}
              </span>
            </div>

            {/* Postage Stamp */}
            <div className="border-2 border-dashed border-[#D0B6E1] p-2 rounded-lg bg-white/90 rotate-3 flex flex-col items-center justify-center shadow-xs">
              <Heart className="w-5 h-5 text-[#8E51B8] fill-[#D0B6E1]" />
              <span className="text-[9px] text-[#2E1840] font-black tracking-tighter">LOVE 100%</span>
            </div>
          </div>

          {/* Letter Recipient Badge */}
          <div className="my-8 py-6 px-4 bg-white/90 rounded-2xl border border-[#D0B6E1] shadow-sm">
            <span className="text-xs uppercase tracking-widest text-[#8E51B8] font-semibold block mb-1">
              To My Beloved
            </span>
            <div className="text-3xl sm:text-4xl font-script text-[#1D1326] py-1">
              {belovedName}
            </div>
            <div className="text-xs text-[#5A406E] font-urdu mt-1" dir="rtl">
              سب سے پیاری اور خاص
            </div>
          </div>

          {/* Wax Seal Button */}
          <div className="flex flex-col items-center justify-center mt-6">
            <motion.button
              id="open-envelope-btn"
              animate={isHovered ? { scale: 1.1 } : { scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 ${
                isOpening
                  ? 'bg-[#1D1326] scale-95'
                  : 'bg-gradient-to-tr from-[#1D1326] via-[#4A246B] to-[#8E51B8] text-white border-2 border-[#D0B6E1]'
              }`}
            >
              <Heart className="w-8 h-8 fill-[#D0B6E1] text-white drop-shadow" />
              <span className="text-[10px] uppercase font-bold tracking-widest mt-1 text-[#FAF5FF]">OPEN</span>
            </motion.button>

            <span className="text-xs font-semibold text-[#3D2054] mt-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8E51B8]" />
              Click the seal to read Fasih’s message
            </span>
          </div>

          {/* Floating animated sparkles on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none bg-[#D0B6E1]/15 backdrop-blur-[1px] flex items-center justify-center"
              >
                <div className="text-xs font-bold text-[#1D1326] bg-white/95 border border-[#D0B6E1] px-4 py-2 rounded-full shadow-lg">
                  ✨ Tap to Reveal ✨
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Sweet Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-[#5A406E] mt-6 text-center font-serif-luxury italic"
      >
        “Tum mere dil ki sab se khoobsurat dua ho...”
      </motion.p>
    </div>
  );
}
