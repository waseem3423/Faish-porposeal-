import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, Lock } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

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
    // Start ambient music smoothly on user gesture
    romanticAudio.start();
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 py-12">
      {/* Decorative ambient glowing circles */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-rose-200/40 rounded-full blur-3xl -top-10 -left-10 pointer-events-none" />
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-pink-300/30 rounded-full blur-3xl -bottom-10 -right-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-xl mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium tracking-wide shadow-sm mb-4">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Special Delivery Just For You</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-semibold text-[#5A1C2C] tracking-tight mb-2">
          A Message From The Heart
        </h1>
        <p className="text-rose-700/80 text-sm sm:text-base font-light">
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
        <div className="relative glass-card-rose rounded-3xl p-8 sm:p-10 shadow-rose-lg border-2 border-rose-200/80 overflow-hidden text-center transition-all duration-500 hover:shadow-2xl hover:border-rose-300 transform hover:-translate-y-1">
          
          {/* Subtle rose gold ribbon accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />

          {/* Stamp & Airmail styling */}
          <div className="flex justify-between items-start mb-6">
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider text-rose-500 font-semibold block">
                Sender
              </span>
              <span className="text-base sm:text-lg font-serif-luxury font-bold text-[#6D2034]">
                {proposerName}
              </span>
            </div>

            {/* Postage Stamp */}
            <div className="border-2 border-dashed border-rose-300 p-2 rounded-lg bg-rose-50/80 rotate-3 flex flex-col items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-400" />
              <span className="text-[9px] text-rose-700 font-bold tracking-tighter">LOVE 100%</span>
            </div>
          </div>

          {/* Letter Recipient Badge */}
          <div className="my-8 py-6 px-4 bg-white/70 rounded-2xl border border-rose-200/60 shadow-inner">
            <span className="text-xs uppercase tracking-widest text-rose-500 font-medium block mb-1">
              To My Beloved
            </span>
            <div className="text-3xl sm:text-4xl font-script text-[#7A1F36] py-1">
              {belovedName}
            </div>
            <div className="text-xs text-rose-600/80 font-urdu mt-1" dir="rtl">
              سب سے پیاری اور خاص
            </div>
          </div>

          {/* Wax Seal Button */}
          <div className="flex flex-col items-center justify-center mt-6">
            <motion.button
              id="open-envelope-btn"
              animate={isHovered ? { scale: 1.1 } : { scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${
                isOpening
                  ? 'bg-rose-700 scale-95'
                  : 'bg-gradient-to-tr from-[#A52A4A] via-[#C84166] to-[#E56387] text-white border-2 border-rose-100'
              }`}
            >
              <Heart className="w-8 h-8 fill-white text-white drop-shadow" />
              <span className="text-[10px] uppercase font-bold tracking-widest mt-1">OPEN</span>
            </motion.button>

            <span className="text-xs font-medium text-rose-700 mt-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              Click the wax seal to read Fasih’s message
            </span>
          </div>

          {/* Floating animated sparkles on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none bg-rose-400/5 backdrop-blur-[1px] flex items-center justify-center"
              >
                <div className="text-xs font-semibold text-rose-800 bg-white/90 px-4 py-2 rounded-full shadow-md">
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
        className="text-xs text-rose-700/70 mt-6 text-center font-serif-luxury italic"
      >
        “Tum mere dil ki sab se khoobsurat dua ho...”
      </motion.p>
    </div>
  );
}
