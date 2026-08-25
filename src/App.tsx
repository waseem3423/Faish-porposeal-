import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, ArrowDown, ChevronRight, RotateCcw } from 'lucide-react';
import FloatingPetals from './components/FloatingPetals';
import EnvelopeIntro from './components/EnvelopeIntro';
import LoveLetter from './components/LoveLetter';
import ReasonsWhy from './components/ReasonsWhy';
import RomanticMoments from './components/RomanticMoments';
import RomanticShayari from './components/RomanticShayari';
import TheBigQuestion from './components/TheBigQuestion';
import ProposalCelebration from './components/ProposalCelebration';
import MusicPlayer from './components/MusicPlayer';
import { DEFAULT_PROPOSER, DEFAULT_BELOVED } from './data/romanticContent';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const proposerName = DEFAULT_PROPOSER;
  const belovedName = DEFAULT_BELOVED;

  const scrollToProposal = () => {
    const el = document.getElementById('the-proposal-moment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#1D1326] relative selection:bg-[#D0B6E1] selection:text-[#1D1326]">
      {/* Background Floating Petals and Light Particles */}
      <FloatingPetals />

      {/* Floating Ambient Music Controller */}
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {!hasOpened ? (
          /* Step 1: Initial Romantic Wax Sealed Envelope */
          <motion.div
            key="envelope-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <EnvelopeIntro
              onOpen={() => setHasOpened(true)}
              proposerName={proposerName}
              belovedName={belovedName}
            />
          </motion.div>
        ) : (
          /* Step 2: The Full Romantic Journey & Proposal */
          <motion.main
            key="proposal-journey"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Top Navigation Pill */}
            <header className="sticky top-4 z-40 max-w-xl mx-auto px-4">
              <div className="glass-card-lilac rounded-full px-5 py-2.5 shadow-lilac border border-[#D0B6E1] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#8E51B8] fill-[#D0B6E1] animate-pulse" />
                  <span className="text-xs sm:text-sm font-serif-luxury font-bold text-[#1D1326]">
                    {proposerName} & {belovedName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!hasAccepted && (
                    <button
                      id="nav-proposal-jump-btn"
                      onClick={scrollToProposal}
                      className="px-3.5 py-1.5 rounded-full bg-[#1D1326] text-white text-xs font-semibold shadow-sm hover:bg-[#2F1E40] transition flex items-center gap-1 cursor-pointer border border-[#D0B6E1]"
                    >
                      <span>The Big Question</span>
                      <Sparkles className="w-3 h-3 text-[#D0B6E1]" />
                    </button>
                  )}
                  {hasAccepted && (
                    <span className="px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#D0B6E1] text-[#1D1326] text-xs font-bold flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-[#D0B6E1] text-[#8E51B8]" />
                      <span>Forever 💜</span>
                    </span>
                  )}
                </div>
              </div>
            </header>

            {/* Header Hero Title */}
            <section className="pt-12 pb-6 px-4 text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D0B6E1] text-[#2E1840] text-xs font-semibold mb-4 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#8E51B8]" />
                  <span>A Dedicated Love Letter & Journey</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#8E51B8]" />
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-script text-[#1D1326] mb-3">
                  For My Beloved {belovedName}
                </h1>

                <p className="text-base sm:text-xl font-serif-luxury text-[#5A406E] italic max-w-2xl mx-auto">
                  “Dil ki har ek dharkan pe tera hi naam likha hai...”
                </p>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      const letterEl = document.querySelector('section');
                      letterEl?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8E51B8] hover:text-[#1D1326] font-semibold cursor-pointer animate-bounce"
                  >
                    <span>Scroll to read</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </section>

            {/* 1. Love Letter from Fasih to Komal */}
            <LoveLetter proposerName={proposerName} belovedName={belovedName} />

            {/* 2. Reasons Why Komal is the One */}
            <ReasonsWhy belovedName={belovedName} />

            {/* 3. Romantic Story Chapters */}
            <RomanticMoments proposerName={proposerName} belovedName={belovedName} />

            {/* 4. Urdu & Roman Urdu Shayari and Flower Compliments */}
            <RomanticShayari />

            {/* 5. The Proposal Moment or Celebration */}
            {!hasAccepted ? (
              <TheBigQuestion
                proposerName={proposerName}
                belovedName={belovedName}
                onAccepted={() => setHasAccepted(true)}
              />
            ) : (
              <ProposalCelebration
                proposerName={proposerName}
                belovedName={belovedName}
              />
            )}

            {/* Footer */}
            <footer className="py-12 px-4 text-center border-t border-[#D0B6E1]/50 mt-16">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2 text-[#8E51B8]">
                  <Heart className="w-4 h-4 fill-[#D0B6E1] text-[#8E51B8]" />
                  <span className="font-script text-2xl text-[#1D1326]">
                    {proposerName} & {belovedName}
                  </span>
                  <Heart className="w-4 h-4 fill-[#D0B6E1] text-[#8E51B8]" />
                </div>
                <p className="text-xs text-[#5A406E] font-serif-luxury italic">
                  Crafted with eternal affection, respect & sincere prayers for Komal Fatima
                </p>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
