"use client";

import React from "react";
import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "@mux/mux-player";

// ------------------------------
// Data / Config
// ------------------------------
type FilmItem = {
  playbackId: string;
  thumbnail?: string;
  title?: string;
  aspect?: string;
};

const MOTION_GRAPHICS: FilmItem[] = [
  {
    playbackId: "QeZVe9wuAtM2rPsJnkesQ55ioEF3CF1FtYio4PhUN1g",
    thumbnail:
      "https://image.mux.com/QeZVe9wuAtM2rPsJnkesQ55ioEF3CF1FtYio4PhUN1g/animated.gif?width=320",
    title: "Map Animation",
    aspect: "16/9",
  },
  {
    playbackId: "4p700TQ0024CH01sZCmEtaX4nS4uoGFnmaaCkfiuHkOm3o",
    thumbnail:
      "https://image.mux.com/4p700TQ0024CH01sZCmEtaX4nS4uoGFnmaaCkfiuHkOm3o/animated.gif?width=320",
    title: "Doordarshan Sundarbans",
    aspect: "16/9",
  },
  {
    playbackId: "X00OenMA2s02BQbgE8sHCNOH6v5lt1H9Js339lwQw9kQs",
    thumbnail:
      "https://image.mux.com/X00OenMA2s02BQbgE8sHCNOH6v5lt1H9Js339lwQw9kQs/animated.gif?width=320",
    title: "History Hunter",
    aspect: "16/9",
  },
];

// ------------------------------
// Media Tile (mux-player)
// ------------------------------
function MediaTile({ item, index }: { item: FilmItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.8, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
      className="relative w-full z-[999] shadow-intense rounded-2xl overflow-hidden"
      style={{ aspectRatio: item.aspect ?? "16/9" }}
    >
      <mux-player
        stream-type="on-demand"
        playback-id={item.playbackId}
        poster={item.thumbnail}
        metadata-video-title={item.title}
        primary-color="#ffffff"
        secondary-color="#"
        style={{ width: "100%", height: "100%" }}
      ></mux-player>

      <div className="absolute bottom-2 left-4 text-white drop-shadow-md">
        <h3 className="font-normal tracking-wide text-lg">{item.title}</h3>
      </div>
    </motion.div>
  );
}

// ------------------------------
// Main Page
// ------------------------------
export default function MotionGraphicsPage() {
  return (
    <main className="bg-stone-800 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="dark-grainy relative min-h-[50vh] lg:min-h-[60vh] flex flex-col items-start justify-end lg:px-24 px-6 lg:pb-24 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-5xl text-white font-light tracking-tight alt-font italic mb-6"
        >
          Motion Graphics
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl text-stone-300 font-light text-base sm:text-lg leading-relaxed"
        >
          Our motion graphics turn complex ideas into captivating visuals. With dynamic design, fluid animation, and a keen eye for detail, we bring brands, products, and stories to life. Every frame is crafted to engage, explain, and leave a memorable impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
          className="absolute bottom-6 right-6 text-stone-400"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Film Grid */}
      <section className="light-grainy bg-white pt-10">
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 px-4 sm:px-8 lg:px-12">
          {MOTION_GRAPHICS.slice(0, 2).map((item, i) => (
            <div key={item.playbackId} className="mb-4 lg:mb-6 break-inside-avoid transition">
              <MediaTile item={item} index={i} />
            </div>
          ))}
        </div>
        <div className="columns-1 px-4 sm:px-8 lg:px-12">
          {MOTION_GRAPHICS.slice(-1).map((item, i) => (
            <div key={item.playbackId} className="mb-4 break-inside-avoid transition">
              <MediaTile item={item} index={i} />
            </div>
          ))}
        </div>
      </section>

      <FilmTicker />
      <Contact />
    </main>
  );
}