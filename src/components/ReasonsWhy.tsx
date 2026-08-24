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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 border border-rose-200 text-rose-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          <span>Treasured Qualities</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#551928] tracking-tight mb-4">
          Why {belovedName} Has Fasih’s Entire Heart
        </h2>

        <p className="text-rose-700/80 text-sm sm:text-base font-light">
          Just a few of the countless little and big reasons that make you completely unforgettable.
        </p>

        {/* Interactive Liked Counter Pill */}
        {totalHearts > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500 text-white text-xs font-medium shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Komal liked {totalHearts} of {ROMANTIC_REASONS.length} reasons 💕</span>
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
              className={`glass-card rounded-2xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between ${
                isLiked
                  ? 'border-pink-300 bg-pink-50/70 shadow-rose'
                  : 'border-rose-200/70 hover:border-pink-300 hover:shadow-rose'
              }`}
            >
              <div>
                {/* Top Badge & Heart Like Button */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-rose-100/90 text-rose-800 border border-rose-200">
                    {item.tag}
                  </span>

                  <button
                    id={`like-reason-${item.id}`}
                    onClick={(e) => toggleHeart(item.id, e)}
                    className="p-2 rounded-full hover:bg-rose-100 transition-transform active:scale-90"
                    title="Like this reason"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isLiked
                          ? 'text-pink-600 fill-pink-500 scale-110'
                          : 'text-rose-300 hover:text-rose-500'
                      }`}
                    />
                  </button>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-sm">
                    {getIcon(item.iconName)}
                  </div>
                  <h3 className="text-lg font-serif-luxury font-bold text-[#5C1A2B] group-hover:text-rose-700 transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Urdu Subtitle */}
                {item.urduSubtitle && (
                  <p className="font-urdu text-sm text-rose-800/80 mb-3" dir="rtl">
                    {item.urduSubtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-[#4A202A]/85 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Tap to highlight hint */}
              <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-rose-400">
                <span className="font-script text-base text-rose-600">Pure Love</span>
                <span className="text-[11px] text-rose-500">
                  {isLiked ? 'Loved ❤️' : 'Tap heart to save'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
