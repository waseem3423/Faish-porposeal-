import React from 'react';
import { motion } from 'motion/react';
import { Compass, Feather, Sparkles, Heart, CircleDot } from 'lucide-react';
import { ROMANTIC_MILESTONES } from '../data/romanticContent';
import { MilestoneItem } from '../types';

interface RomanticMomentsProps {
  proposerName: string;
  belovedName: string;
}

export default function RomanticMoments({ proposerName, belovedName }: RomanticMomentsProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Feather':
        return <Feather className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8E51B8] block mb-2">
          The Journey of Feelings
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#1D1326] tracking-tight mb-3">
          Our Chapters
        </h2>
        <p className="text-sm text-[#5A406E] font-light">
          How feelings bloomed into an everlasting dream of walking hand in hand.
        </p>
      </div>

      <div className="relative border-l-2 border-[#D0B6E1] ml-4 sm:ml-32 space-y-12 pb-6">
        {ROMANTIC_MILESTONES.map((item: MilestoneItem, index: number) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative pl-8 sm:pl-10"
            >
              {/* Timeline marker icon */}
              <div className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-gradient-to-tr from-[#1D1326] to-[#7B3FA6] text-white flex items-center justify-center shadow-md border-4 border-[#FAF7FD]">
                {getIcon(item.iconName)}
              </div>

              {/* Time / Chapter Tag in Desktop Margin */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
                <span className="text-xs font-bold text-[#1D1326] block">{item.chapter}</span>
                <span className="text-[11px] text-[#8E51B8] font-medium">{item.dateOrMoment}</span>
              </div>

              {/* Mobile Chapter Tag */}
              <div className="sm:hidden mb-2">
                <span className="text-xs font-bold text-[#1D1326]">{item.chapter}</span>
                <span className="text-xs text-[#8E51B8] ml-2">({item.dateOrMoment})</span>
              </div>

              {/* Content Card */}
              <div className="glass-card-lilac rounded-2xl p-6 sm:p-8 border border-[#D0B6E1] shadow-sm hover:shadow-lilac transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#1D1326] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#2D1B3E]/90 leading-relaxed font-light mb-4">
                  {item.story}
                </p>

                <div className="p-4 rounded-xl bg-white/90 border border-[#D0B6E1] flex items-start gap-3">
                  <Heart className="w-4 h-4 text-[#8E51B8] fill-[#D0B6E1] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-serif-luxury italic text-[#1D1326] leading-snug">
                    {item.quote}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
