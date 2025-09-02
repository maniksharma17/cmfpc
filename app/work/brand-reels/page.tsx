"use client";

import { useEffect, useRef, useState } from "react";
import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion, useInView } from "framer-motion";
import { Pause, Play, ArrowDown } from "lucide-react";

// ------------------------------
// Data
// ------------------------------
const BRAND_REELS = [
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/CIENNA.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Diplomind.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_1.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_2.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_3.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_5.mp4",

  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_4.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_7.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Smart%20City_1.mp4",
    "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/House%20Of%20Weaving_6.mp4",

  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Smart%20City_2.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Smart%20City_3.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Swiggy%20Diwali%20Campaign.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-reels/Swiggy%20Taste%20Test.mp4",
];

// ------------------------------
// Utils
// ------------------------------
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

let globalCurrent: HTMLVideoElement | null = null;

// ------------------------------
// Video Tile (Reel Card)
// ------------------------------
function VideoTile({ src, index }: { src: string; index: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "200px", amount: 0.25 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [poster, setPoster] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Extract first frame as poster
useEffect(() => {
  const v = videoRef.current;
  if (!v) return;

  const handleMetadata = () => {
    v.currentTime = 0.5; // small offset avoids blank black frame
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


  useEffect(() => {
    if (inView && !videoSrc) setVideoSrc(src);

    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, [inView, videoSrc, src]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (globalCurrent && globalCurrent !== v) globalCurrent.pause();
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
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapper.requestFullscreen?.();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="mb-6 break-inside-avoid relative group overflow-hidden rounded-2xl shadow-lg bg-black"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
    >
      {/* 🔹 Fullscreen wrapper */}
      <div
        ref={wrapperRef}
        className={`relative w-full h-auto ${
          isFullscreen
            ? "w-screen h-screen flex items-center justify-center bg-black"
            : ""
        }`}
      >
        <video
          ref={videoRef}
          src={videoSrc ?? undefined}
          poster={poster ?? undefined}
          preload="metadata"
          playsInline
          muted
          disablePictureInPicture
          className={`w-full h-auto object-cover rounded-2xl ${
            isFullscreen ? "aspect-[9/16] max-h-screen mx-auto rounded-none" : ""
          }`}
        />
      </div>

      {/* Overlay gradient */}
      {!isFullscreen && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      )}

      {/* Badge + Title */}
      {!isFullscreen && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="bg-white text-gray-600 text-xs font-medium shadow-md px-2 py-1 rounded-full">
            Reel
          </span>
          <h3 className="text-lg sm:text-xl font-medium drop-shadow">{titleFromSrc(src)}</h3>
        </div>
      )}

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Play/Pause */}
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          className="grid place-items-center rounded-full h-14 w-14 sm:h-16 sm:w-16 backdrop-blur-sm bg-black/50 border border-white/20 text-white"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-[1px]" />}
        </button>

        
      </div>
    </motion.div>
  );
}


// ------------------------------
// Main Page
// ------------------------------
export default function BrandReelsPage() {
  return (
    <main className="bg-stone-800 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] lg:min-h-[70vh] flex flex-col items-start justify-center lg:px-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl alt-font italic sm:text-4xl text-stone-200 font-light mb-6"
        >
          Brand Reels
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl text-stone-300 text-md sm:text-xl leading-relaxed"
        >
          Our brand reels are designed to grab attention fast and leave a
          lasting impact. Short, sharp, and visually compelling, they showcase
          your brand’s personality and message in a format built for maximum
          reach across social platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.2,
          }}
          className="absolute bottom-6 right-6 text-stone-400"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Masonry Reel Carousel */}
      <section className="bg-stone-50 py-12">
        <div className="px-6 lg:px-24">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {BRAND_REELS.map((src, i) => (
              <VideoTile key={src} src={src} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FilmTicker />
      <Contact />
    </main>
  );
}
