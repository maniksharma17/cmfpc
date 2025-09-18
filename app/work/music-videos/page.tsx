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

const MUSIC_VIDEOS: FilmItem[] = [
  {
    playbackId: "amP9csYh5A3QeIpcJE8SfUHMgu5XVB902Bi4UhuAtOiI",
    thumbnail:
      "https://image.mux.com/amP9csYh5A3QeIpcJE8SfUHMgu5XVB902Bi4UhuAtOiI/animated.gif?width=320",
    title: "Dilli Ki Sardiyaan",
    aspect: "77/30",
  },
   {
    playbackId: "NjVwx00TUrrt6Dnp85Iqslslg02ikMI02LzCYU6Bnhv02yo",
    thumbnail:
      "https://image.mux.com/NjVwx00TUrrt6Dnp85Iqslslg02ikMI02LzCYU6Bnhv02yo/animated.gif?width=320",
    title: "The Center Piece 2",
    aspect: "517/360",
  },
  {
    playbackId: "mCGceVpllCUSailLstmYTVO1CqQsC008g8ww3rzyFHCM",
    thumbnail:
      "https://image.mux.com/mCGceVpllCUSailLstmYTVO1CqQsC008g8ww3rzyFHCM/animated.gif?width=320",
    title: "The Center Piece 1",
    aspect: "371/180",
  },
 
  {
    playbackId: "n5FiJ9k7NU7dFGYkt02vRiSs6v102xucKR1iqXeaDTElU",
    thumbnail:
      "https://image.mux.com/n5FiJ9k7NU7dFGYkt02vRiSs6v102xucKR1iqXeaDTElU/animated.gif?width=320",
    title: "The Center Piece 3",
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
        secondary-color="#999999"
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
export default function MusicVideosPage() {
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
          Music Videos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl text-stone-300 font-light text-base sm:text-lg leading-relaxed"
        >
          Our music videos fuse sound and visuals to create unforgettable experiences. From concept development to the final cut, we craft cinematic stories that amplify the emotion of every beat, helping artists connect deeply with their audience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
          className="absolute bottom-8 right-8 text-stone-500"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Film Grid */}
      <section className="light-grainy bg-white py-10">
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 px-4 sm:px-8 lg:px-12">
          {MUSIC_VIDEOS.map((item, i) => (
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