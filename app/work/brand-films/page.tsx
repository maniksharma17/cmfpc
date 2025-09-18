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
  playbackId: string; // use playbackId with mux-player
  thumbnail?: string;
  title?: string;
  aspect?: string; // CSS aspect-ratio string like "16/9"
};

const BRAND_FILMS: FilmItem[] = [
  {
    playbackId: "NryXy6b52QonfHxiHp4pbQJXhlZBuIc8EmQiEoNg2ww",
    thumbnail:
      "https://image.mux.com/NryXy6b52QonfHxiHp4pbQJXhlZBuIc8EmQiEoNg2ww/animated.gif?width=320",
    title: "Saisha",
    aspect: "1231/540",
  },
  {
    playbackId: "VjPUTyeJCqLIhDm00ueyCTrejxfQoUwPiYt6dbIzCuvk",
    thumbnail:
      "https://image.mux.com/VjPUTyeJCqLIhDm00ueyCTrejxfQoUwPiYt6dbIzCuvk/animated.webp?width=214&height=121&time=67",
    title: "WFH - World Hemophilia Foundation",
    aspect: "16/9",
  },
  {
    playbackId: "jPU2KJyzqWTWXKEPNSGk1EJF02wOAwI8Mx02RbbZt3EXY",
    thumbnail:
      "https://image.mux.com/jPU2KJyzqWTWXKEPNSGk1EJF02wOAwI8Mx02RbbZt3EXY/animated.gif?width=320",
    title: "Kohler India",
    aspect: "16/9",
  },
  {
    playbackId: "el2OZIZLKzYtUehRYcFmca02iEpP1JYSOUOm6CdHGtbQ",
    thumbnail:
      "https://image.mux.com/el2OZIZLKzYtUehRYcFmca02iEpP1JYSOUOm6CdHGtbQ/animated.gif?width=320",
    title: "Adhayayan",
    aspect: "16/9",
  },
  {
    playbackId: "omMy0100qhYDEKoc1u4u1U1E1Z00rLI2CXgX1tlLJJGUz00",
    thumbnail:
      "https://image.mux.com/omMy0100qhYDEKoc1u4u1U1E1Z00rLI2CXgX1tlLJJGUz00/animated.gif?width=320",
    title: "House of 248",
    aspect: "16/7",
  },
  {
    playbackId: "agYZaoKSBOR9nEyidTumaL6tpMKmhqn02Cdiedo8LHLc",
    thumbnail:
      "https://image.mux.com/agYZaoKSBOR9nEyidTumaL6tpMKmhqn02Cdiedo8LHLc/animated.gif?width=320",
    title: "Bill & Milinda Gates Foundation",
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
        metadataVideoTitle={item.title}
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
export default function BrandFilmsPage() {
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
          Brand Films
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
          className="max-w-2xl text-stone-300 font-light text-base sm:text-lg leading-relaxed"
        >
          Our brand films go beyond <span className="text-white">storytelling</span> — they craft immersive visual journeys that connect audiences to the <span className="text-white">soul</span> of a brand.
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
          {BRAND_FILMS.map((item, i) => (
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