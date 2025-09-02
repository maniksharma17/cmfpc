"use client";

import { useEffect, useRef, useState } from "react";
import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight, Pause, Play, Maximize } from "lucide-react";
import Link from "next/link";
import { SocialMedia } from "@/components/SocialMedia";

// ------------------------------
// Data
// ------------------------------
const CATEGORIES = [
  "Advertisements",
  "Brand Films",
  "Brand Reels",
  "Campaigns",
  "Documentaries",
  "Motion Graphics",
  "Music Videos",
] as const;

const REELS = [
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Diplomind.mp4",
    slug: "brand-reels",
    category: "Brand Reel",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_7.mp4",
    slug: "brand-reels",
    category: "Brand Reel",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Swiggy%20Diwali%20Campaign.mp4",
    slug: "brand-reels",
    category: "Brand Reel",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/CIENNA.mp4",
    slug: "brand-reels",
    category: "Brand Reel",
  },
];

const VIDEOS = [
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/ad-films/Tata%20Tea%20Agni.mp4",
    category: "Advertisement",
    slug: "ad-films",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/Bill%20%26%20Milinda%20Gates%20Foundation.mp4",
    slug: "brand-films",
    category: "Brand Film",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/Kohler%20India.mp4",
    slug: "brand-films",
    category: "Brand Film",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/World%20Hemophilia%20Foundation.mp4",
    category: "Brand Film",
    slug: "brand-films",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/campaigns/Delhi%20Green%20Campaign.mp4",
    category: "Campaign",
    slug: "campaigns",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/music-videos/Dilli%20Ki%20Sardiyaan.mp4",
    slug: "music-videos",
    category: "Music Video",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/motion-graphics/History%20Hunter.mp4",
    slug: "motion-graphics",
    category: "Motion Graphic",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/campaigns/Maggi%20X%20News18.mp4",
    category: "Campaign",
    slug: "campaigns",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/campaigns/Colgate%20X%20News18.mp4",
    category: "Campaign",
    slug: "campaigns",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/ad-films/Hero%20Splendor.mp4",
    category: "Advertisement",
    slug: "advertisements",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/music-videos/The%20Center%20Piece_1.mp4",
    slug: "music-videos",
    category: "Music Video",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/campaigns/Silk%20X%20News18.mp4",
    category: "Campaign",
    slug: "campaigns",
  },
];

// Human title from URL
function titleFromSrc(src: string) {
  try {
    const file = decodeURIComponent(src.split("/").pop() || "").replace(
      /\.[^.]+$/,
      ""
    );
    return file.replace(/[._-]+/g, " ").trim();
  } catch {
    return "Untitled";
  }
}

// Distribute reels between videos: pattern ~ 2 videos : 1 reel
function mixMedia(reels: typeof REELS, videos: typeof VIDEOS) {
  const r = [...reels];
  const v = [...videos];
  const out: {
    src: string;
    isReel: boolean;
    slug: string;
    category: string;
  }[] = [];

  const reelsToUse = r.slice(0, 4);
  const videosToUse = v.slice(0, 12);

  for (let i = 0; i < 4; i++) {
    out.push(
      { ...videosToUse[i * 3], isReel: false },
      { ...videosToUse[i * 3 + 1], isReel: false },
      { ...reelsToUse[i], isReel: true, category: "Brand Reel" },
      { ...videosToUse[i * 3 + 2], isReel: false }
    );
  }

  return out;
}

// ------------------------------
// Video Tile
// ------------------------------
let globalCurrent: HTMLVideoElement | null = null;

function VideoTile({
  src,
  index,
  slug,
  category,
  isReel = false,
}: {
  src: string;
  index: number;
  slug: string;
  category: string;
  isReel?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [poster, setPoster] = useState<string | null>(null);

  // Extract first frame as poster
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handleMetadata = () => {
      v.currentTime = 1;
    };
    const handleSeeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = v.videoWidth;
        canvas.height = v.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
          setPoster(canvas.toDataURL("image/jpeg", 0.7));
        }
      } catch {}
    };
    v.addEventListener("loadedmetadata", handleMetadata, { once: true });
    v.addEventListener("seeked", handleSeeked, { once: true });
    return () => {
      v.removeEventListener("loadedmetadata", handleMetadata);
      v.removeEventListener("seeked", handleSeeked);
    };
  }, [videoSrc]);

  // Lazy load when in view
  const inView = useInView(containerRef, { margin: "300px 0px", amount: 0.15 });
  useEffect(() => {
    if (inView && !videoSrc) setVideoSrc(src);
  }, [inView, videoSrc, src]);

  // Pause when out of view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!inView && !v.paused) {
      v.pause();
      setPlaying(false);
      setShowControls(true);
    }
  }, [inView]);

  // Pause all others
  const pauseOthers = (current: HTMLVideoElement) => {
    document.querySelectorAll("video").forEach((vid) => {
      if (vid !== current) {
        vid.pause();
      }
    });
  };

  // Toggle play/pause
  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      pauseOthers(v);
      v.muted = false;
      try {
        await v.play();
        setPlaying(true);
        globalCurrent = v;
        setShowControls(false);
      } catch {
        v.muted = true;
        try {
          await v.play();
          setPlaying(true);
          globalCurrent = v;
          setShowControls(false);
        } catch {}
      }
    } else {
      v.pause();
      setPlaying(false);
      setShowControls(true);
      if (globalCurrent === v) globalCurrent = null;
    }
  };

  // Fullscreen (disabled on reels)
  const toggleFullscreen = async () => {
    if (isReel) return; // 🚫 no fullscreen on reels
    const v = videoRef.current;
    if (!v) return;

    pauseOthers(v);
    v.currentTime = 0;

    if (
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      return;
    }

    if (v.requestFullscreen) {
      await v.requestFullscreen();
    } else if ((v as any).webkitEnterFullscreen) {
      (v as any).webkitEnterFullscreen();
    } else if ((v as any).webkitRequestFullscreen) {
      (v as any).webkitRequestFullscreen();
    } else if ((v as any).mozRequestFullScreen) {
      (v as any).mozRequestFullScreen();
    } else if ((v as any).msRequestFullscreen) {
      (v as any).msRequestFullscreen();
    }

    if (screen.orientation && (screen.orientation as any).lock) {
      try {
        await (screen.orientation as any).lock("landscape");
      } catch {}
    }
  };

  // Click handler: toggle controls or play
  const handleContainerClick = () => {
    if (playing) {
      setShowControls((prev) => !prev);
    } else {
      togglePlay();
    }
  };

  // Reel vs. video aspect ratio
  const padClass = isReel ? "pt-[177.78%]" : "pt-[56.25%]";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0.8, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
      className="break-inside-avoid mb-4 z-50"
    >
      <div
        className="group z-50 relative w-full overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
        onClick={handleContainerClick}
      >
        <div className={`relative ${padClass}`}>
          <video
            ref={videoRef}
            src={videoSrc ?? undefined}
            poster={poster ?? undefined}
            preload="metadata"
            playsInline
            muted
            disablePictureInPicture
            className="z-50 rounded-2xl absolute inset-0 w-full h-full object-cover select-none"
          />

          {/* Overlay */}
          <div className="rounded-2xl pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

          {/* Category (clickable) */}
          <div className="pointer-events-auto absolute top-3 left-3 z-20">
            <Link
              href={`/work/${slug}`}
              className="bg-white text-black text-xs font-light px-2 py-0.5 rounded-full hover:bg-stone-200 transition cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {category}
            </Link>
          </div>

          {/* Title */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3">
            <h3 className="text-base sm:text-lg font-medium leading-tight drop-shadow">
              {titleFromSrc(src)}
            </h3>
          </div>

          {/* Controls */}
          {showControls && (
            <div className="absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-200">
              <button
                type="button"
                aria-label={playing ? "Pause" : "Play"}
                className="grid place-items-center rounded-full h-14 w-14 sm:h-16 sm:w-16 backdrop-blur-sm bg-black/40 border border-white/20 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 translate-x-[1px]" />
                )}
              </button>

              {!isReel && (
                <button
                  type="button"
                  aria-label="Fullscreen"
                  className="grid place-items-center rounded-full h-12 w-12 sm:h-14 sm:w-14 backdrop-blur-sm bg-black/40 border border-white/20 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                >
                  <Maximize className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
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
    <main className="dark-grainy bg-stone-800 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] lg:min-h-[60vh] max-w-7xl flex flex-col items-start justify-center sm:justify-end lg:pb-24 lg:px-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl sm:text-3xl text-white font-light mb-6"
        >
          Dive into our <span className="alt-font italic">Work</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 max-w-5xl"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/work/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-stone-200 hover:bg-white/10 transition-all duration-200"
            >
              <span className="text-lg md:text-2xl font-light">{cat}</span>
              <ArrowUpRight
                className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
              <span className="pointer-events-none absolute -bottom-0.5 left-3 right-3 h-[2px] origin-left scale-x-0 bg-white/60 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-sm:hidden sm:absolute bottom-12 right-6 lg:bottom-24 sm:bottom-28 md:bottom-16 lg:right-20"
        >
          <div className="flex flex-col items-center text-white/80">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3">
              See a glimpse
            </span>
            <div className="w-8 sm:w-10 h-14 sm:h-20 rounded-full border border-white/20 backdrop-blur-md bg-white/5 flex items-start justify-center overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-shadow duration-500">
              <motion.div
                animate={{ y: [0, 40, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-b from-white to-white/60 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section Header */}
      <section className="border-b border-b-gray-400 light-grainy bg-white lg:py-16 py-12 px-6 lg:px-24">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-lg sm:text-xl text-stone-600 font-normal">
            Featured
          </h3>
          <span className="text-xs text-stone-600">{MEDIA.length} videos</span>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]">
          {MEDIA.map((item, i) => (
            <VideoTile
              key={item.src}
              src={item.src}
              slug={item.slug}
              category={item.category}
              index={i}
              isReel={item.isReel}
            />
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
