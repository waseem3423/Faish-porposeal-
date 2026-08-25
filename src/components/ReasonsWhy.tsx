import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, HeartHandshake, Music, Crown, Heart, Smile, CheckCircle, Gift } from 'lucide-react';
import { ROMANTIC_REASONS } from '../data/romanticContent';
import { ReasonItem } from '../types';

interface ReasonsWhyProps {
  belovedName: string;
}

export default function ReasonsWhy({ belovedName }: ReasonsWhyProps) {
  const [likedReasons, setLikedReasons] = useState<Record<string, boolean>>({});
  const [activeReason, setActiveReason] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Music':
        return <Music className="w-5 h-5" />;
      case 'Crown':
        return <Crown className="w-5 h-5" />;
      case 'Smile':
        return <Smile className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  const toggleHeart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedReasons(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalHearts = Object.values(likedReasons).filter(Boolean).length;

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D0B6E1] text-[#2E1840] text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
          <Gift className="w-3.5 h-3.5 text-[#8E51B8]" />
          <span>Treasured Qualities</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#1D1326] tracking-tight mb-4">
          Why {belovedName} Has Fasih’s Entire Heart
        </h2>

        <p className="text-[#5A406E] text-sm sm:text-base font-light">
          Just a few of the countless little and big reasons that make you completely unforgettable.
        </p>

        {/* Interactive Liked Counter Pill */}
        {totalHearts > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D1326] text-white text-xs font-medium shadow-md border border-[#D0B6E1]"
          >
            <Heart className="w-3.5 h-3.5 fill-[#D0B6E1] text-[#D0B6E1]" />
            <span>Komal liked {totalHearts} of {ROMANTIC_REASONS.length} reasons 💜</span>
          </motion.div>
        )}
      </div>

      {/* Grid of Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {ROMANTIC_REASONS.map((item: ReasonItem, idx: number) => {
          const isLiked = !!likedReasons[item.id];
          const isExpanded = activeReason === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setActiveReason(isExpanded ? null : item.id)}
              className={`rounded-2xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between ${
                isLiked
                  ? 'border-[#B78FD4] bg-[#FAF6FD] shadow-lilac'
                  : 'border-[#D0B6E1]/70 bg-white/85 hover:border-[#B78FD4] hover:shadow-lilac'
              }`}
            >
              <div>
                {/* Top Badge & Heart Like Button */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#FAF5FF] text-[#2E1840] border border-[#D0B6E1]">
                    {item.tag}
                  </span>

                  <button
                    id={`like-reason-${item.id}`}
                    onClick={(e) => toggleHeart(item.id, e)}
                    className="p-2 rounded-full hover:bg-[#FAF5FF] transition-transform active:scale-90"
                    title="Like this reason"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isLiked
                          ? 'text-[#8E51B8] fill-[#D0B6E1] scale-110'
                          : 'text-[#C49FD9] hover:text-[#8E51B8]'
                      }`}
                    />
                  </button>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1D1326] to-[#5C2B80] text-white flex items-center justify-center shadow-sm border border-[#D0B6E1]/40">
                    {getIcon(item.iconName)}
                  </div>
                  <h3 className="text-lg font-serif-luxury font-bold text-[#1D1326] group-hover:text-[#5C2B80] transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Urdu Subtitle */}
                {item.urduSubtitle && (
                  <p className="font-urdu text-sm text-[#4A246B] mb-3" dir="rtl">
                    {item.urduSubtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-[#2D1B3E]/90 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Tap to highlight hint */}
              <div className="mt-4 pt-3 border-t border-[#D0B6E1]/40 flex items-center justify-between text-xs text-[#8E51B8]">
                <span className="font-script text-base text-[#1D1326]">Pure Love</span>
                <span className="text-[11px] font-medium text-[#5A406E]">
                  {isLiked ? 'Loved 💜' : 'Tap heart to save'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
