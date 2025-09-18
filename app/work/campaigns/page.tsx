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

const CAMPAIGNS: FilmItem[] = [
  {
    playbackId: "g6Ki3zxEunLmEPuvcpDTxmla3brdG5mVNzmBBG9dB900",
    thumbnail:
      "https://image.mux.com/g6Ki3zxEunLmEPuvcpDTxmla3brdG5mVNzmBBG9dB900/animated.gif?width=320",
    title: "Delhi Green Campaign",
    aspect: "16/9",
  },
  {
    playbackId: "5kfSkBSzbK33na00STqBt4tw5KIavtvK02g98T68QCbXU",
    thumbnail:
      "https://image.mux.com/5kfSkBSzbK33na00STqBt4tw5KIavtvK02g98T68QCbXU/animated.gif?width=320",
    title: "Tira X News18",
    aspect: "16/9",
  },
  {
    playbackId: "00Bf4pZ5SYId401lk14IxNQ1fTEUhttSuws026005kQJRE00",
    thumbnail:
      "https://image.mux.com/00Bf4pZ5SYId401lk14IxNQ1fTEUhttSuws026005kQJRE00/animated.gif?width=320",
    title: "Silk X News18",
    aspect: "16/9",
  },
  {
    playbackId: "hcyI41IcNxrPcTHXGgcfBMsVfkXtQWXXMDB01ovPNHiY",
    thumbnail:
      "https://image.mux.com/hcyI41IcNxrPcTHXGgcfBMsVfkXtQWXXMDB01ovPNHiY/animated.gif?width=320",
    title: "Maggi X News18",
    aspect: "16/9",
  },
  {
    playbackId: "eRxCHtiOe6HWsFkbkG31JPSPDlSe6KSvvdi00Lhry3i00",
    thumbnail:
      "https://image.mux.com/eRxCHtiOe6HWsFkbkG31JPSPDlSe6KSvvdi00Lhry3i00/animated.gif?width=320",
    title: "Coke Studio X News18",
    aspect: "16/9",
  },
  {
    playbackId: "FHfBWNS01S5H5cZrWC7PzFi7n6cyYi00Xu6P5e8BrxQao",
    thumbnail:
      "https://image.mux.com/FHfBWNS01S5H5cZrWC7PzFi7n6cyYi00Xu6P5e8BrxQao/animated.gif?width=320",
    title: "Colgate X News18",
    aspect: "16/9",
  },
  {
    playbackId: "JV55zAnOXP38eiVW6AnQ8i33aiwrSV01IR2lCtcFaTAg",
    thumbnail:
      "https://image.mux.com/JV55zAnOXP38eiVW6AnQ8i33aiwrSV01IR2lCtcFaTAg/animated.gif?width=320",
    title: "Giva X News18",
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
export default function CampaignsPage() {
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
          Campaigns
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl text-stone-300 font-light text-base sm:text-lg leading-relaxed"
        >
          Our campaigns are built to spark action and create impact. We blend strategy, creativity, and innovation to deliver ideas that resonate with audiences across platforms.
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
      <section className="light-grainy bg-white py-10">
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 px-4 sm:px-8 lg:px-12">
          {CAMPAIGNS.map((item, i) => (
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