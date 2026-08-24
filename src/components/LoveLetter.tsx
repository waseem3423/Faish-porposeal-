import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Quote, Feather } from 'lucide-react';

interface LoveLetterProps {
  proposerName: string;
  belovedName: string;
}

export default function LoveLetter({ proposerName, belovedName }: LoveLetterProps) {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-rose-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="glass-card-rose rounded-3xl p-8 sm:p-14 border border-rose-200/90 shadow-rose-lg relative overflow-hidden"
      >
        {/* Top floral ornament decoration */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-rose-300" />
          <div className="flex items-center gap-1.5 text-rose-500">
            <Feather className="w-5 h-5" />
            <Heart className="w-4 h-4 fill-rose-400" />
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-rose-300" />
        </div>

        {/* Letter Salutation */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-semibold block mb-1">
            A Letter Written From The Heart
          </span>
          <h2 className="text-3xl sm:text-5xl font-script text-[#6E1C32]">
            Dearest {belovedName},
          </h2>
        </div>

        {/* Letter Body */}
        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#4A202A] font-serif-luxury">
          <p className="first-letter:text-5xl first-letter:font-script first-letter:text-[#A02848] first-letter:mr-2 first-letter:float-left">
            I don’t know at what exact second you became the most precious thought in my mind, but I do know that my world has never looked as gentle, bright, and meaningful as it does ever since you entered it.
          </p>

          <p>
            Whenever I see you, or hear you speak, there is an unspoken calm that surrounds me. In a world that is always in a hurry, you are the peace my heart always searches for. Your kindness, your laughter, and the pure grace with which you carry yourself have made a permanent home in my prayers.
          </p>

          {/* Featured Romantic Urdu Quote */}
          <div className="my-8 p-6 rounded-2xl bg-white/80 border-l-4 border-rose-400 shadow-sm relative">
            <Quote className="w-8 h-8 text-rose-200 absolute top-3 right-4 -z-0 opacity-60" />
            <p className="font-urdu text-xl sm:text-2xl text-rose-900 leading-loose text-center mb-2" dir="rtl">
              ”تیرے ہونے سے ہی مکمل ہیں میرے سارے خواب،<br />
              تم جو ساتھ ہو تو ہر موسم بہار جیسا ہے۔“
            </p>
            <p className="text-xs text-center text-rose-600/90 font-sans tracking-wide italic">
              — Your presence completes all my dreams; with you by my side, every season feels like spring.
            </p>
          </div>

          <p>
            I want you to know that this isn’t just an ordinary affection — it is a promise of utmost respect, unwavering loyalty, laughter on the hardest days, and a hand that will never let go of yours through all of life’s highs and lows.
          </p>

          <p>
            I wanted to create something truly special for you, to speak the feelings that words sometimes fail to hold.
          </p>
        </div>

        {/* Letter Sign-off */}
        <div className="mt-12 pt-8 border-t border-rose-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs text-rose-500 font-semibold uppercase tracking-wider block">
              Forever Yours,
            </span>
            <span className="text-2xl sm:text-3xl font-script text-[#7A1F36]">
              {proposerName}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Dedicated with Infinite Love</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
