"use client";

import { useEffect, useRef, useState } from "react";
import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion, useInView } from "framer-motion";
import { Pause, Play, Maximize, ArrowDown } from "lucide-react";

// ------------------------------
// Data
// ------------------------------

const BRAND_FILMS = [
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/Adhayayan.mp4",
    thumbnail:
      "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/Thumbnails/Adhayayan.png",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/Bill%20%26%20Milinda%20Gates%20Foundation.mp4",
    thumbnail:
      "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/Thumbnails/Bill%20%26%20Milinda%20Gates.png",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/House%20Of%20248.mp4",
    thumbnail:
      "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/Thumbnails/House%20of%20248.png",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/Kohler%20India.mp4",
    thumbnail:
      "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/Thumbnails/Kohler.png",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/cinemalt-content/brand-films/Saisha.mp4",
    thumbnail:
      "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/Thumbnails/Saisha.png",
  },
  {
    src: "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/World%20Hemophilia%20Foundation.mp4",
    thumbnail:
      "https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/Thumbnails/World%20Hemophilia%20Federation.png",
  },
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
// Video Tile
// ------------------------------

// Keep track of currently playing video globally
let globalCurrent: HTMLVideoElement | null = null;

function VideoTile({
  src,
  index,
  poster,
}: {
  src: string;
  index: number;
  poster: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

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
    }
  }, [inView]);

  // Pause all videos except one
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

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    const v = videoRef.current;
    if (!v) return;

    // Always pause others before fullscreen
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
      (v as any).webkitEnterFullscreen(); // iOS Safari
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

  // Show controls again if user taps video while playing
  const handleContainerClick = () => {
    if (playing) {
      setShowControls((prev) => !prev);
    } else {
      togglePlay();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0.8, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
      className="w-full z-50 rounded-3xl shadow-intense"
    >
      <div
        className="group z-50 relative w-full overflow-hidden bg-transparent rounded-3xl"
        onClick={handleContainerClick}
      >
        <video
          ref={videoRef}
          src={videoSrc ?? undefined}
          poster={poster ?? undefined}
          preload="metadata"
          playsInline
          muted
          disablePictureInPicture
          className="z-50 w-full h-auto object-contain select-none rounded-3xl"
        />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-3xl" />

        {/* Title */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4">
          <h3 className="text-lg sm:text-xl font-medium leading-tight drop-shadow">
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
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ------------------------------
// Main Page
// ------------------------------
export default function BrandFilmsPage() {
  return (
    <main className="dark-grainy bg-stone-800 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] lg:min-h-[70vh] flex flex-col items-start justify-center lg:px-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl alt-font italic sm:text-4xl text-stone-200 font-light mb-6"
        >
          Brand Films
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl text-stone-300 text-md sm:text-xl leading-relaxed"
        >
          Our brand films go beyond storytelling — they craft immersive visual
          journeys that connect audiences to the soul of a brand. From concept
          to screen, each film is designed to inspire, engage, and leave a
          lasting impression.
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
      <section className="light-grainy bg-white py-10">
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 px-4 sm:px-8 lg:px-12">
          {BRAND_FILMS.map((item, i) => (
            <div key={item.src} className="mb-4 break-inside-avoid transition">
              <VideoTile src={item.src} index={i} poster={item.thumbnail} />
            </div>
          ))}
        </div>
      </section>

      <FilmTicker />
      <Contact />
    </main>
  );
}
