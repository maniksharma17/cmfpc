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

const AD_FILMS: FilmItem[] = [
  {
    playbackId: "SzPzjBPj5KcxA7psLPf8UuM0225zGrDvchJFsD8oTwh00",
    thumbnail:
      "https://image.mux.com/SzPzjBPj5KcxA7psLPf8UuM0225zGrDvchJFsD8oTwh00/animated.gif?width=320",
    title: "Hero Splendor",
    aspect: "512/269",
  },
  {
    playbackId: "lOPp01hxtlQvzieG9UtiBEWiWUkNiREnfhSUU00Hwbtjo",
    thumbnail:
      "https://image.mux.com/lOPp01hxtlQvzieG9UtiBEWiWUkNiREnfhSUU00Hwbtjo/animated.gif?width=320",
    title: "Tata Tea Agni",
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
export default function AdFilmsPage() {
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
          Advertisement Films
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
          className="max-w-2xl text-stone-300 font-light text-base sm:text-lg leading-relaxed"
        >
          More than just visuals — our films are narratives that blend creativity, strategy, and emotion to craft cinematic experiences that captivate audiences and build lasting connections.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 6 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.4 }}
          className="absolute bottom-8 right-8 text-stone-500"
        >
          <ArrowDown className="w-7 h-7" />
        </motion.div>
      </section>

      {/* Film Grid */}
      <section className="light-grainy bg-neutral-50 py-10">
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 px-4 sm:px-8 lg:px-12">
          {AD_FILMS.map((item, i) => (
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