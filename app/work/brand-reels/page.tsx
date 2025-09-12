"use client";

import { useEffect, useRef, useState } from "react";
import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion, useInView } from "framer-motion";
import { Pause, Play, ArrowDown } from "lucide-react";

// ------------------------------
// Data
// ------------------------------
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const reelFiles = [
  "Cienna.mp4",
  "Diplomind.mp4",
  "House Of Weaving 1.mp4",
  "House Of Weaving 2.mp4",
  "House Of Weaving 3.mp4",
  "House Of Weaving 5.mp4",
  "House Of Weaving 4.mp4",
  "House Of Weaving 7.mp4",
  "Smart City 1.mp4",
  "House Of Weaving 6.mp4",
  "Smart City 2.mp4",
  "Smart City 3.mp4",
  "Swiggy Diwali Campaign.mp4",
  "Swiggy Taste Test.mp4",
];

const BRAND_REELS = reelFiles.map(
  (file) => `${BASE_URL}/cinemalt-content/brand-reels/${encodeURIComponent(file)}`
);



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
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
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
      className="mb-6 z-50 break-inside-avoid relative group overflow-hidden rounded-2xl shadow-lg bg-black"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
    >
      {/* 🔹 Fullscreen wrapper */}
      <div
        ref={wrapperRef}
        className={`z-50 relative w-full h-auto ${
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
          className={`z-50 w-full h-auto object-cover rounded-2xl ${
            isFullscreen
              ? "aspect-[9/16] max-h-screen mx-auto rounded-none"
              : ""
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
          <h3 className="text-lg sm:text-xl font-medium drop-shadow">
            {titleFromSrc(src)}
          </h3>
        </div>
      )}

      {/* Controls */}
      <div className="z-[999] absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
          {playing ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 translate-x-[1px]" />
          )}
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
    <main className="bg-stone-900 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="dark-grainy relative min-h-[50vh] lg:min-h-[60vh] flex flex-col items-start justify-end lg:px-24 px-6 lg:pb-24 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-5xl text-white font-light tracking-tight alt-font italic mb-6"
        >
          Brand Reels
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl text-stone-300 font-light text-base sm:text-lg leading-relaxed"
        >
          Short, sharp, and visually compelling — our brand reels grab attention
          fast and showcase your identity with cinematic flair. Designed for
          social reach, built to leave a lasting impression.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 6 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.4,
          }}
          className="absolute bottom-6 right-6 text-stone-500"
        >
          <ArrowDown className="w-7 h-7" />
        </motion.div>
      </section>

      {/* Reel Gallery */}
      <section className="light-grainy bg-stone-100 py-16">
        <div className="px-6 lg:px-24">
          <h3 className="text-xl font-medium text-stone-700 mb-8">
            Featured Reels
          </h3>
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
