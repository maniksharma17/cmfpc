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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Utility: derive a nice display name from file name
const deriveName = (file: any) => {
  const base = file
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");
  return base
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (cha: any) => cha.toUpperCase());
};

const REELS = [
  {
    file: "brand-reels/Diplomind.mp4",
    slug: "brand-reels",
    category: "Brand Reel",
  },
  {
    file: "brand-reels/House Of Weaving 7.mp4",
    slug: "brand-reels",
    category: "Brand Reel",
  },
  {
    file: "brand-reels/Swiggy Diwali Campaign.mp4",
    slug: "brand-reels",
    category: "Brand Reel",
  },
  {
    file: "brand-reels/Cienna.mp4",
    slug: "brand-reels",
    category: "Brand Reel",
  },
].map((reel) => ({
  ...reel,
  name: deriveName(reel.file),
  src: `${BASE_URL}/cinemalt-content/${encodeURIComponent(reel.file)}`,
}));

const VIDEOS = [
  {
    file: "ad-films/Tata Tea Agni.mp4",
    thumbnailFile: "Tata Tea Agni.webp",
    category: "Advertisement",
    slug: "ad-films",
  },
  {
    file: "brand-films/Bill & Milinda Gates Foundation.mp4",
    thumbnailFile: "Bill & Milinda Gates.webp",
    slug: "brand-films",
    category: "Brand Film",
  },
  {
    file: "brand-films/Kohler India.mp4",
    thumbnailFile: "Kohler.webp",
    slug: "brand-films",
    category: "Brand Film",
  },
  {
    file: "brand-films/WFH - World Hemophilia Foundation.mp4",
    thumbnailFile: "World Hemophilia Federation.webp",
    category: "Brand Film",
    slug: "brand-films",
  },
  {
    file: "campaigns/Delhi Green Campaign.mp4",
    thumbnailFile: "Delhi Green.webp",
    category: "Campaign",
    slug: "campaigns",
  },
  {
    file: "music-videos/Dilli Ki Sardiyaan.mp4",
    thumbnailFile: "music1.webp",
    slug: "music-videos",
    category: "Music Video",
  },
  {
    file: "motion-graphics/History Hunter.mp4",
    thumbnailFile: "History Hunter.webp",
    slug: "motion-graphics",
    category: "Motion Graphic",
  },
  {
    file: "campaigns/Maggi X News18.mp4",
    thumbnailFile: "MaggiXNews18.webp",
    category: "Campaign",
    slug: "campaigns",
  },
  {
    file: "campaigns/Colgate X News18.mp4",
    thumbnailFile: "Colgate X News18.webp",
    category: "Campaign",
    slug: "campaigns",
  },
  {
    file: "ad-films/Hero Splendor.mp4",
    thumbnailFile: "Hero Splendor.webp",
    category: "Advertisement",
    slug: "advertisements",
  },
  {
    file: "music-videos/The Center Piece 1.mp4",
    thumbnailFile: "The CenterPiece_1.webp",
    slug: "music-videos",
    category: "Music Video",
  },
  {
    file: "campaigns/Silk X News18.mp4",
    thumbnailFile: "Silk X News18.webp",
    category: "Campaign",
    slug: "campaigns",
  },
].map((video) => ({
  ...video,
  name: deriveName(video.file),
  src: `${BASE_URL}/cinemalt-content/${encodeURIComponent(video.file)}`,
  thumbnail: `${BASE_URL}/cover/${encodeURIComponent(video.thumbnailFile)}`,
}));

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
    thumbnail?: string;
    name: string;
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
  thumbnail,
  tileName,
}: {
  src: string;
  index: number;
  slug: string;
  category: string;
  isReel?: boolean;
  thumbnail?: string;
  tileName?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [poster, setPoster] = useState<string | null>(null);

  // Extract first frame as poster
  useEffect(() => {
    if (!isReel) return;
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
  }, [videoSrc, isReel]);

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
      className="break-inside-avoid mb-4 z-50 shadow-lg rounded-2xl shadow-gray-200"
    >
      <div
        className="group z-50 shadow-lg rounded-2xl relative w-full overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
        onClick={handleContainerClick}
      >
        <div className={`relative ${padClass}`}>
          <video
            ref={videoRef}
            src={videoSrc ?? undefined}
            poster={(thumbnail && thumbnail) ?? poster ?? undefined}
            preload="metadata"
            playsInline
            muted
            disablePictureInPicture
            className="z-50 shadow-lg rounded-2xl absolute inset-0 w-full h-full object-cover select-none"
          />

          {/* Overlay */}
          <div className="z-[90] shadow-lg rounded-2xl pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Category (clickable) */}
          <div className="z-[99] pointer-events-auto absolute top-3 left-3">
            <Link
              href={`/work/${slug}`}
              className=" bg-white text-black text-xs font-light px-2 py-0.5 rounded-full hover:bg-stone-200 transition cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {category}
            </Link>
          </div>

          {/* Title */}
          <div className="z-[99] pointer-events-none absolute inset-x-3 bottom-2">
            <h3 className="text-base sm:text-md font-light leading-tight tracking-tight drop-shadow">
              {tileName}
            </h3>
          </div>

          {/* Controls */}
          {showControls && (
            <div className="z-50 absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-200">
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
    <main className=" bg-stone-800 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="dark-grainy relative min-h-[50vh] lg:min-h-[60vh] max-w-full mx-auto flex flex-col items-start justify-end lg:px-24 px-6 pb-16 lg:pb-24">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-tight mb-8"
        >
          Dive into our{" "}
          <span className="alt-font italic font-normal">Work</span>
        </motion.h2>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative flex flex-wrap items-center gap-3 sm:gap-4 max-w-4xl"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/work/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 
                   backdrop-blur-md bg-white/10 border border-white/20 text-stone-200
                   hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <span className="text-base sm:text-lg md:text-xl font-light">
                {cat}
              </span>
              <ArrowUpRight
                className="w-4 h-4 sm:w-5 sm:h-5 text-stone-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          ))}
        </motion.div>

        
      </section>

      {/* Section Header */}
      <section className="light-grainy border-b border-b-gray-400 light-grainy bg-white lg:py-16 py-12 px-6 lg:px-24">
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
              thumbnail={item.thumbnail}
              tileName={item.name}
            />
          ))}
        </div>
      </section>

      <div className="">
        <SocialMedia />
        <FilmTicker />
        <Contact />
      </div>
    </main>
  );
}
