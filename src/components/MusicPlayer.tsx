import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      romanticAudio.stop();
      setIsPlaying(false);
    } else {
      romanticAudio.start();
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      romanticAudio.setVolume(0.25);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="glass-card-lilac rounded-full p-1.5 shadow-lilac border border-[#D0B6E1] flex items-center gap-2 transition-all duration-300 hover:shadow-lilac-lg">
        <button
          id="music-toggle-btn"
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-[#1D1326] text-white shadow-md border border-[#D0B6E1]'
              : 'bg-white hover:bg-[#FAF5FF] text-[#2E1840] border border-[#D0B6E1]'
          }`}
          title={isPlaying ? 'Pause Melody' : 'Play Romantic Melody'}
        >
          {isPlaying ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0B6E1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D0B6E1]"></span>
              </span>
              <Music className="w-3.5 h-3.5 text-[#D0B6E1] animate-bounce" />
              <span>Romantic Melody Playing</span>
            </>
          ) : (
            <>
              <Heart className="w-3.5 h-3.5 text-[#8E51B8] fill-[#D0B6E1]" />
              <span>Play Melody</span>
            </>
          )}
        </button>

        {isPlaying && (
          <button
            id="music-mute-btn"
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white text-[#2E1840] transition cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#8E51B8]" /> : <Volume2 className="w-4 h-4 text-[#8E51B8]" />}
          </button>
        )}
      </div>
    </div>
  );
}
