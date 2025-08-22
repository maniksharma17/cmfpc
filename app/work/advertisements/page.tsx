"use client";

import { useEffect, useRef, useState } from "react";
import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion, useInView } from "framer-motion";
import { Pause, Play, Maximize, ArrowDown } from "lucide-react";

// ------------------------------
// Data
// ------------------------------
const AD_FILMS = [
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/ad-films/Hero%20Splendor.mp4",
  "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/ad-films/Tata%20Tea%20Agni.mp4",
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

// ------------------------------
// Global video state
// ------------------------------
let globalCurrent: HTMLVideoElement | null = null;

// ------------------------------
// Video Tile
// ------------------------------
function VideoTile({ src, index }: { src: string; index: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "300px 0px", amount: 0.15 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [poster, setPoster] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // Lazy load
  useEffect(() => {
    if (inView && !videoSrc) setVideoSrc(src);
  }, [inView, videoSrc, src]);

  // Extract first frame as poster
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handleLoaded = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = v.videoWidth;
        canvas.height = v.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
          setPoster(canvas.toDataURL("image/jpeg"));
        }
      } catch {}
    };
    v.addEventListener("loadeddata", handleLoaded, { once: true });
    return () => v.removeEventListener("loadeddata", handleLoaded);
  }, [videoSrc]);

  // Pause out of view
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
    const v = videoRef.current;
    if (v && v.requestFullscreen) v.requestFullscreen();
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
      className="w-full border-t border-t-stone-400"
    >
      <div
        className="group relative w-full overflow-hidden bg-black"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={videoSrc ?? undefined}
          poster={poster ?? undefined}
          preload="metadata"
          playsInline
          muted
          disablePictureInPicture
          className="w-full h-auto object-cover select-none"
        />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Title */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4">
          <h3 className="text-lg sm:text-xl font-medium leading-tight drop-shadow">
            {titleFromSrc(src)}
          </h3>
        </div>

        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 gap-3">
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
          <button
            type="button"
            aria-label="Fullscreen"
            className="lg:grid hidden place-items-center rounded-full h-12 w-12 sm:h-14 sm:w-14 backdrop-blur-sm bg-black/40 border border-white/20 text-white"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------
// Main Page
// ------------------------------
export default function AdFilmsPage() {
  return (
    <main className="bg-stone-800 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-start justify-center lg:px-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl alt-font italic sm:text-6xl text-stone-200 font-light mb-6"
        >
          Advertisement Films
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl text-stone-300 text-sm sm:text-2xl leading-relaxed"
        >
          Our advertisement films are more than just visuals — they are powerful
          narratives that bring brands to life. We blend creativity, strategy,
          and emotion to craft cinematic experiences that captivate audiences
          and build lasting connections. From ideation to execution, every frame
          is designed to inspire, engage, and leave a memorable impact.{" "}
        </motion.p>

        {/* Animated Arrow */}
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

      {/* Section */}
      <section className="bg-stone-50 px-0">
        <div className="flex flex-col">
          {AD_FILMS.map((src, i) => (
            <VideoTile key={src} src={src} index={i} />
          ))}
        </div>
      </section>

      <FilmTicker />
      <Contact />
    </main>
  );
}
