import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather, Heart, Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import { ROMANTIC_SHAYARI } from '../data/romanticContent';
import { ShayariItem } from '../types';

const SWEET_COMPLIMENTS = [
  "You make the simple moments feel unforgettable.",
  "Your smile has the power to fix any bad day.",
  "There is a grace in your silence and magic in your voice.",
  "Fasih admires your kindness more than words can express.",
  "You are the answer to countless quiet prayers.",
  "Everything feels complete and peaceful when you are around.",
  "The world becomes softer and prettier when thinking of you."
];

export default function RomanticShayari() {
  const [activeTab, setActiveTab] = useState<'all' | 'urdu' | 'roman'>('all');
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [pluckedPetals, setPluckedPetals] = useState<number[]>([]);

  const handleNextCompliment = () => {
    setComplimentIndex((prev) => (prev + 1) % SWEET_COMPLIMENTS.length);
  };

  const handlePetalClick = (index: number) => {
    if (!pluckedPetals.includes(index)) {
      setPluckedPetals(prev => [...prev, index]);
      setComplimentIndex(index % SWEET_COMPLIMENTS.length);
    }
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-rose-500" />
          <span>Shayari & Jazbaat</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#551928] tracking-tight mb-4">
          Words Whispered By The Heart
        </h2>
        <p className="text-sm text-rose-700/80 font-light">
          Romantic Urdu poetry that echoes the depths of love and devotion.
        </p>
      </div>

      {/* Interactive Rose Petal Plucking Compliment Box */}
      <div className="glass-card-rose rounded-3xl p-6 sm:p-10 border border-pink-200 shadow-rose mb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-pink-600 font-bold block mb-2">
          🌸 Interactive Love Petals 🌸
        </span>
        <h3 className="text-xl sm:text-2xl font-serif-luxury font-semibold text-[#5A1C2C] mb-4">
          Pick a Petal to Reveal a Sweet Truth
        </h3>

        {/* Petal Buttons Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const isPlucked = pluckedPetals.includes(i);
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePetalClick(i)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isPlucked
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-white/90 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isPlucked ? 'fill-white' : 'fill-rose-300'}`} />
                <span>Petal {i + 1}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Revealed compliment display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={complimentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl bg-white/90 border border-rose-200 max-w-xl mx-auto shadow-inner"
          >
            <p className="text-base sm:text-lg font-serif-luxury text-[#601A2C] italic">
              “{SWEET_COMPLIMENTS[complimentIndex]}”
            </p>
            <span className="text-xs text-rose-500 font-script text-lg block mt-2">
              — Muhammad Fasih
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Shayari Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {ROMANTIC_SHAYARI.map((shayari: ShayariItem, index: number) => {
          return (
            <motion.div
              key={shayari.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-rose-200/80 shadow-sm hover:shadow-rose hover:border-pink-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-800">
                    {shayari.theme}
                  </span>
                  <Feather className="w-4 h-4 text-rose-400" />
                </div>

                {/* Urdu Nastaliq Style Text */}
                <div className="my-4 py-3 border-y border-rose-100/70">
                  <p
                    className="font-urdu text-xl sm:text-2xl text-right leading-loose text-[#651A2C]"
                    dir="rtl"
                  >
                    {shayari.urduText}
                  </p>
                </div>

                {/* Roman Urdu */}
                <p className="text-sm font-medium text-rose-900/90 italic mb-2">
                  “{shayari.romanUrdu}”
                </p>

                {/* English Translation */}
                <p className="text-xs text-[#4A202A]/75 font-light leading-relaxed">
                  {shayari.englishMeaning}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-rose-100 flex justify-between items-center text-xs text-rose-400">
                <span className="font-script text-base text-rose-600">Ishq & Ihtiram</span>
                <span className="text-rose-500 font-medium">🌸 {shayari.poet}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
