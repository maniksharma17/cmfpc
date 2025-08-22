'use client';

import { useEffect, useRef, useState } from 'react';
import Contact from '@/components/Contact';
import FilmTicker from '@/components/FilmTicker';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Pause, Play, Maximize } from 'lucide-react';
import Link from 'next/link';
import { SocialMedia } from '@/components/SocialMedia';

// ------------------------------
// Data
// ------------------------------
const CATEGORIES = [
  'Advertisements',
  'Brand Films',
  'Brand Reels',
  'Campaigns',
  'Documentaries',
  'Motion Graphics',
  'Music Videos',
] as const;

const REELS = [
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Diplomind.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_7.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Swiggy%20Diwali%20Campaign.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/CIENNA.mp4',
];

const VIDEOS = [
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/ad-films/Tata%20Tea%20Agni.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/Bill%20%26%20Milinda%20Gates%20Foundation.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/Kohler%20India.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/World%20Hemophilia%20Foundation.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/campaigns/Delhi%20Green%20Campaign.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/music-videos/Dilli%20Ki%20Sardiyaan.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/motion-graphics/History%20Hunter.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/campaigns/Maggi%20X%20News18.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/campaigns/Colgate%20X%20News18.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/ad-films/Hero%20Splendor.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/music-videos/The%20Center%20Piece_1.mp4',
  'https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/campaigns/Silk%20X%20News18.mp4',
];

// Human title from URL
function titleFromSrc(src: string) {
  try {
    const file = decodeURIComponent(src.split('/').pop() || '').replace(/\.[^.]+$/, '');
    return file.replace(/[._-]+/g, ' ').trim();
  } catch {
    return 'Untitled';
  }
}

// Distribute reels between videos: pattern ~ 2 videos : 1 reel
function mixMedia(reels: string[], videos: string[]) {
  const r = [...reels];
  const v = [...videos];
  const out: { src: string; isReel: boolean }[] = [];

  // Ensure exactly 4 reels and 12 videos
  const reelsToUse = r.slice(0, 4);
  const videosToUse = v.slice(0, 12);

  // Arrange: 3 videos + 1 reel per row → 4 rows total
  for (let i = 0; i < 4; i++) {
    out.push(
      { src: videosToUse[i * 3], isReel: false },
      { src: videosToUse[i * 3 + 1], isReel: false },
      { src: reelsToUse[i], isReel: true },
      { src: videosToUse[i * 3 + 2], isReel: false }
    );
  }

  return out;
}


// ------------------------------
// Global video state (so only one plays at a time)
// ------------------------------
let globalCurrent: HTMLVideoElement | null = null;

// ------------------------------
// Video Tile
// ------------------------------
function VideoTile({
  src,
  index,
  isReel = false,
}: {
  src: string;
  index: number;
  isReel?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: '300px 0px 300px 0px', amount: 0.15 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // Lazy attach src
  useEffect(() => {
    if (inView && !videoSrc) setVideoSrc(src);
  }, [inView, videoSrc, src]);

  // Auto-pause out of view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!inView && !v.paused) {
      v.pause();
      setPlaying(false);
    }
  }, [inView]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (globalCurrent && globalCurrent !== v) {
        globalCurrent.pause();
      }
      v.muted = false;
      try {
        await v.play();
        setPlaying(true);
        globalCurrent = v;
      } catch {
        v.muted = true;
        try {
          await v.play();
          setPlaying(true);
          globalCurrent = v;
        } catch {}
      }
    } else {
      v.pause();
      setPlaying(false);
      if (globalCurrent === v) globalCurrent = null;
    }
  };

  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (v && v.requestFullscreen) v.requestFullscreen();
  };

  const padClass = isReel ? 'pt-[177.78%]' : 'pt-[56.25%]';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
      className="break-inside-avoid mb-4"
    >
      <div
        className={[
          'group relative w-full rounded-2xl overflow-hidden shadow-lg shadow-black/20 bg-stone-700/40',
          'transition-transform duration-300 hover:scale-[1.01]',
          isReel ? 'sm:[&>div]:max-h-[460px]' : '',
        ].join(' ')}
        onClick={togglePlay}
      >
        <div className={`relative ${padClass}`}>
          <video
            ref={videoRef}
            src={videoSrc ?? undefined}
            poster={videoSrc ?? undefined} 
            preload="metadata"
            playsInline
            autoPlay
            muted
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover select-none"
          />

          <div
            className={[
              'pointer-events-none absolute inset-0 transition-opacity duration-300',
              isReel
                ? 'bg-gradient-to-t from-black/30 via-black/10 to-transparent'
                : 'bg-gradient-to-t from-black/50 via-black/20 to-transparent',
            ].join(' ')}
          />

          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-col gap-1">
            <h3 className="text-base sm:text-lg font-medium leading-tight drop-shadow">
              {titleFromSrc(src)}
            </h3>
            {isReel && (
              <span className="inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide bg-white/80 text-stone-900 shadow">
                Reel
              </span>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 gap-3">
            <button
              type="button"
              aria-label={playing ? 'Pause' : 'Play'}
              className="grid place-items-center rounded-full h-14 w-14 sm:h-16 sm:w-16 backdrop-blur-sm bg-black/40 border border-white/20 text-white shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-[1px]" />}
            </button>
            <button
              type="button"
              aria-label="Fullscreen"
              className="lg:grid hidden place-items-center rounded-full h-12 w-12 sm:h-14 sm:w-14 backdrop-blur-sm bg-black/40 border border-white/20 text-white shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------
// Main Page
// ------------------------------
export default function Categories() {
  const MEDIA = mixMedia(REELS, VIDEOS);

  return (
    <main className="bg-stone-800 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] lg:min-h-[80vh] flex flex-col items-start justify-center lg:px-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl sm:text-3xl text-stone-400 font-light mb-6"
        >
          What do you want to explore?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 max-w-6xl"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/work/${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-stone-200 hover:bg-white/10 transition-all duration-200"
            >
              <span className="text-lg md:text-2xl font-light">{cat}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              <span className="pointer-events-none absolute -bottom-0.5 left-3 right-3 h-[2px] origin-left scale-x-0 bg-white/60 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-12 right-6 lg:bottom-24 sm:bottom-28 md:bottom-16 lg:right-20"
      >
        <div className="flex flex-col items-center text-white/80">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3">
            See a glimpse
          </span>
          <div className="w-8 sm:w-10 h-14 sm:h-20 rounded-full border border-white/20 backdrop-blur-md bg-white/5 flex items-start justify-center overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-shadow duration-500">
            <motion.div
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-b from-white to-white/60 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            />
          </div>
        </div>
      </motion.div>

      </section>

      {/* Section Header */}
      <section className="bg-stone-50 lg:py-24 py-12 px-6 lg:px-24">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-lg sm:text-xl text-stone-600 font-normal">Featured</h3>
          <span className="text-xs text-stone-600">{MEDIA.length} videos</span>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]">
          {MEDIA.map((item, i) => (
            <VideoTile key={item.src} src={item.src} index={i} isReel={item.isReel} />
          ))}
        </div>
      </section>

      <div>
        <SocialMedia />
        <FilmTicker />
        <Contact />
      </div>
    </main>
  );
}
