import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { PLAYFUL_NO_RESPONSES } from '../data/romanticContent';
import { romanticAudio } from '../utils/audioSynth';
import { proposalVoice } from '../utils/voicePlayer';

interface TheBigQuestionProps {
  proposerName: string;
  belovedName: string;
  onAccepted: () => void;
}

export default function TheBigQuestion({ proposerName, belovedName, onAccepted }: TheBigQuestionProps) {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentNoMessage, setCurrentNoMessage] = useState<string | null>(null);
  const [isRingOpen, setIsRingOpen] = useState(true);
  const yesButtonScale = Math.min(1 + noCount * 0.15, 2.2);

  const triggerFireworks = () => {
    // Canvas confetti fireworks celebration
    const count = 250;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#D0B6E1', '#8E51B8', '#FAF5FF', '#1D1326', '#E6D7F1', '#FFD700', '#FFFFFF'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.4,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleYes = () => {
    triggerFireworks();
    // Play voice note uploaded by the user
    proposalVoice.play();
    
    // Play celebratory bell flourish
    romanticAudio.playTone(523.25, 0.5, 'bell');
    setTimeout(() => romanticAudio.playTone(659.25, 0.5, 'bell'), 150);
    setTimeout(() => romanticAudio.playTone(783.99, 0.8, 'bell'), 300);
    setTimeout(() => romanticAudio.playTone(1046.5, 1.2, 'bell'), 450);

    onAccepted();
  };

  const handleNoInteraction = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // Pick random message
    const msg = PLAYFUL_NO_RESPONSES[nextCount % PLAYFUL_NO_RESPONSES.length];
    setCurrentNoMessage(msg);

    // Random displacement for dodging button
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 160;
    setNoPosition({ x: randomX, y: randomY });
  };

  return (
    <section id="the-proposal-moment" className="py-24 px-4 max-w-4xl mx-auto relative text-center">
      {/* Decorative ambient halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#D0B6E1]/35 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-soft" />

      {/* Main Glass Proposal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card-lilac rounded-3xl p-8 sm:p-14 border-2 border-[#D0B6E1] shadow-lilac-lg relative overflow-hidden"
      >
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1D1326] text-[#FAF5FF] border border-[#D0B6E1] text-xs sm:text-sm font-semibold tracking-wide shadow-md mb-8">
          <Sparkles className="w-4 h-4 text-[#D0B6E1] animate-spin" />
          <span>The Most Special Question</span>
          <Sparkles className="w-4 h-4 text-[#D0B6E1] animate-spin" />
        </div>

        {/* Ring Box Illustration */}
        <div className="relative my-8 flex justify-center items-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Sparkling Ring Graphic */}
            <motion.div
              animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-b from-[#1D1326] via-[#35194D] to-[#120D18] p-3 shadow-2xl flex flex-col items-center justify-center border-2 border-[#D0B6E1]"
            >
              {/* Velvet Cushion */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#0F0817] via-[#2A133D] to-[#0A0510] flex items-center justify-center relative shadow-inner border border-[#D0B6E1]/30">
                {/* Gold Diamond Ring */}
                <div className="relative flex flex-col items-center">
                  <div className="w-6 h-6 rotate-45 bg-gradient-to-tr from-[#FAF5FF] via-white to-[#D0B6E1] shadow-lg border border-[#D0B6E1] -mb-2 z-20 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-3 h-3 text-[#8E51B8]" />
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-amber-300 shadow-md flex items-center justify-center bg-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Big Question Text */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-script text-[#1D1326] mb-4 leading-tight">
          Dearest {belovedName},
        </h2>

        <p className="text-xl sm:text-3xl font-serif-luxury font-bold text-[#1D1326] max-w-2xl mx-auto mb-4 leading-snug">
          Will you make {proposerName} the happiest person in this world and be his forever?
        </p>

        <p className="font-urdu text-2xl sm:text-3xl text-[#1D1326] leading-loose mb-8" dir="rtl">
          کیا آپ میری ہم سفر بننا پسند کریں گی؟
        </p>

        {/* Playful warning message if user tried 'No' */}
        <AnimatePresence>
          {currentNoMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 border border-[#D0B6E1] text-[#2E1840] text-sm font-semibold shadow-sm"
            >
              <AlertCircle className="w-4 h-4 text-[#8E51B8] shrink-0" />
              <span>{currentNoMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Buttons Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[120px] relative">
          {/* The YES Button */}
          <motion.button
            id="proposal-yes-btn"
            style={{ transform: `scale(${yesButtonScale})` }}
            whileHover={{ scale: yesButtonScale * 1.05 }}
            whileTap={{ scale: yesButtonScale * 0.95 }}
            onClick={handleYes}
            className="px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#1D1326] via-[#5C2B80] to-[#1D1326] text-white font-bold text-lg sm:text-xl shadow-lilac-lg hover:shadow-2xl transition-all duration-200 flex items-center gap-3 cursor-pointer border-2 border-[#D0B6E1]"
          >
            <Heart className="w-6 h-6 fill-[#D0B6E1] text-[#D0B6E1] animate-bounce" />
            <span>YES! A Million Times Yes! 💍✨</span>
          </motion.button>

          {/* The NO Button (Playful Dodger) */}
          {noCount < 8 ? (
            <motion.button
              id="proposal-no-btn"
              animate={
                noPosition
                  ? { x: noPosition.x, y: noPosition.y }
                  : { x: 0, y: 0 }
              }
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onMouseEnter={handleNoInteraction}
              onClick={handleNoInteraction}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF5FF] text-[#2E1840] text-sm font-medium border border-[#D0B6E1] shadow-xs cursor-pointer transition-colors"
            >
              <span>{noCount === 0 ? 'No 🙈' : 'Still No? 🥺'}</span>
            </motion.button>
          ) : (
            // After many playful clicks, transforms into another YES button!
            <motion.button
              id="proposal-second-yes-btn"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handleYes}
              className="px-6 py-3 rounded-full bg-[#8E51B8] text-white text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer border border-[#D0B6E1]"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Okay fine, YES! 🥰</span>
            </motion.button>
          )}
        </div>

        <p className="text-xs text-[#5A406E] mt-10 font-sans">
          💜 Muhammad Fasih promises unconditional love, honesty & support for a lifetime 💜
        </p>
      </motion.div>
    </section>
  );
}
