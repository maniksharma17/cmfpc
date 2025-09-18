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

const DOCUMENTARIES: FilmItem[] = [
  {
    playbackId: "jF9014EAVjHqo02mgh6sAHlrBVyHX6fA00ZH5bGPv00es00M",
    thumbnail:
      "https://image.mux.com/jF9014EAVjHqo02mgh6sAHlrBVyHX6fA00ZH5bGPv00es00M/animated.gif?width=320",
    title: "Bojh",
    aspect: "640/293",
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
export default function Documentaries() {
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
          Documentaries
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl text-stone-300 font-light text-base sm:text-lg leading-relaxed"
        >
          Our documentaries capture real stories with authenticity and impact. Through thoughtful storytelling, cinematic visuals, and careful attention to detail, we shed light on subjects that matter.
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
      <section className="light-grainy bg-white px-0">
        <div className="flex flex-col p-4 gap-y-4 lg:gap-y-8 sm:p-12">
          {DOCUMENTARIES.map((item, i) => (
            <MediaTile key={item.playbackId} item={item} index={i} />
          ))}
        </div>
      </section>

      <FilmTicker />
      <Contact />
    </main>
  );
}