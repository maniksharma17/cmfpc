"use client";

import React from "react";
import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SocialMedia } from "@/components/SocialMedia";
import "@mux/mux-player";

// ------------------------------
// Data
// ------------------------------
const CATEGORIES = [
  { title: "Advertisements", slug: "advertisements" },
  { title: "Brand Films", slug: "brand-films" },
  { title: "Brand Reels", slug: "brand-reels" },
  { title: "Campaigns", slug: "campaigns" },
  { title: "Documentaries", slug: "documentaries" },
  { title: "Motion Graphics", slug: "motion-graphics" },
  { title: "Music Videos", slug: "music-videos" },
] as const;


type MediaItem = {
  playbackId: string;
  thumbnail?: string;
  title: string;
  aspect?: string;
  slug: string;
  category: string;
  isReel?: boolean;
};

const MEDIA: MediaItem[] = [
  {
    playbackId: "lOPp01hxtlQvzieG9UtiBEWiWUkNiREnfhSUU00Hwbtjo",
    thumbnail:
      "https://image.mux.com/lOPp01hxtlQvzieG9UtiBEWiWUkNiREnfhSUU00Hwbtjo/animated.gif?width=320",
    title: "Tata Tea Agni",
    aspect: "16/9",
    slug: "advertisements",
    category: "Advertisement",
  },
  {
    playbackId: "VjPUTyeJCqLIhDm00ueyCTrejxfQoUwPiYt6dbIzCuvk",
    thumbnail:
      "https://image.mux.com/VjPUTyeJCqLIhDm00ueyCTrejxfQoUwPiYt6dbIzCuvk/animated.webp?width=214&height=121&time=67",
    title: "WFH - World Hemophilia Foundation",
    aspect: "16/9",
    slug: "brand-films",
    category: "Brand Film",
  },
  {
    playbackId: "X00OenMA2s02BQbgE8sHCNOH6v5lt1H9Js339lwQw9kQs",
    thumbnail:
      "https://image.mux.com/X00OenMA2s02BQbgE8sHCNOH6v5lt1H9Js339lwQw9kQs/animated.gif?width=320",
    title: "History Hunter",
    aspect: "16/9",
    slug: "motion-graphics",
    category: "Motion Graphic",
  },
  {
    playbackId: "SzPzjBPj5KcxA7psLPf8UuM0225zGrDvchJFsD8oTwh00",
    thumbnail:
      "https://image.mux.com/SzPzjBPj5KcxA7psLPf8UuM0225zGrDvchJFsD8oTwh00/animated.gif?width=320",
    title: "Hero Splendor",
    aspect: "512/269",
    slug: "advertisements",
    category: "Advertisement",
  },
  {
    playbackId: "cgAoqjTep7SxJexrgt9SyyZKETDqnN2mwxSQn1lzhF8",
    thumbnail:
      "https://image.mux.com/cgAoqjTep7SxJexrgt9SyyZKETDqnN2mwxSQn1lzhF8/animated.gif?width=320",
    title: "Smart City 3",
    aspect: "5/9",
    slug: "brand-reels",
    category: "Brand Reels",
  },
  {
    playbackId: "Ydrw3nH8GvK4GSYnEzSy00xFGp2DuWpAw7QzTD5Gl00Qk",
    thumbnail:
      "https://image.mux.com/Ydrw3nH8GvK4GSYnEzSy00xFGp2DuWpAw7QzTD5Gl00Qk/animated.gif?width=320",
    title: "Diplomind",
    aspect: "76/135",
    slug: "brand-reels",
    category: "Brand Reels",
  },
  {
    playbackId: "hcyI41IcNxrPcTHXGgcfBMsVfkXtQWXXMDB01ovPNHiY",
    thumbnail:
      "https://image.mux.com/hcyI41IcNxrPcTHXGgcfBMsVfkXtQWXXMDB01ovPNHiY/animated.gif?width=320",
    title: "Maggi X News18",
    aspect: "16/9",
    slug: "campaigns",
    category: "Campaigns",
  },
  {
    playbackId: "jPU2KJyzqWTWXKEPNSGk1EJF02wOAwI8Mx02RbbZt3EXY",
    thumbnail:
      "https://image.mux.com/jPU2KJyzqWTWXKEPNSGk1EJF02wOAwI8Mx02RbbZt3EXY/animated.gif?width=320",
    title: "Kohler India",
    aspect: "16/9",
    slug: "brand-films",
    category: "Brand Films",
  },
  {
    playbackId: "agYZaoKSBOR9nEyidTumaL6tpMKmhqn02Cdiedo8LHLc",
    thumbnail:
      "https://image.mux.com/agYZaoKSBOR9nEyidTumaL6tpMKmhqn02Cdiedo8LHLc/animated.gif?width=320",
    title: "Bill & Milinda Gates Foundation",
    aspect: "16/9",
    slug: "brand-films",
    category: "Brand Films",
  },
  {
    playbackId: "amP9csYh5A3QeIpcJE8SfUHMgu5XVB902Bi4UhuAtOiI",
    thumbnail:
      "https://image.mux.com/amP9csYh5A3QeIpcJE8SfUHMgu5XVB902Bi4UhuAtOiI/animated.gif?width=320",
    title: "Dilli Ki Sardiyaan",
    aspect: "77/30",
    slug: "music-videos",
    category: "Music Videos",
  },
  
  {
    playbackId: "jF9014EAVjHqo02mgh6sAHlrBVyHX6fA00ZH5bGPv00es00M",
    thumbnail:
      "https://image.mux.com/jF9014EAVjHqo02mgh6sAHlrBVyHX6fA00ZH5bGPv00es00M/animated.gif?width=320",
    title: "Bojh",
    aspect: "640/293",
    slug: "documentaries",
    category: "Documentaries",
  },
  {
    playbackId: "eRxCHtiOe6HWsFkbkG31JPSPDlSe6KSvvdi00Lhry3i00",
    thumbnail:
      "https://image.mux.com/eRxCHtiOe6HWsFkbkG31JPSPDlSe6KSvvdi00Lhry3i00/animated.gif?width=320",
    title: "Coke Studio X News18",
    aspect: "16/9",
    slug: "campaigns",
    category: "Campaigns",
  },
  {
    playbackId: "g6Ki3zxEunLmEPuvcpDTxmla3brdG5mVNzmBBG9dB900",
    thumbnail:
      "https://image.mux.com/g6Ki3zxEunLmEPuvcpDTxmla3brdG5mVNzmBBG9dB900/animated.gif?width=320",
    title: "Delhi Green Campaign",
    aspect: "16/9",
    slug: "campaigns",
    category: "Campaigns",
  },
  {
    playbackId: "YbneMaJ2i5lg83vLEZCC0172Fve9fv501klPKvTkKf9800",
    thumbnail:
      "https://image.mux.com/YbneMaJ2i5lg83vLEZCC0172Fve9fv501klPKvTkKf9800/animated.gif?width=320",
    title: "House Of Weaving 7",
    aspect: "76/135",
    slug: "brand-reels",
    category: "Brand Reels",
  },
  
  {
    playbackId: "00Bf4pZ5SYId401lk14IxNQ1fTEUhttSuws026005kQJRE00",
    thumbnail:
      "https://image.mux.com/00Bf4pZ5SYId401lk14IxNQ1fTEUhttSuws026005kQJRE00/animated.gif?width=320",
    title: "Silk X News18",
    aspect: "16/9",
    slug: "campaigns",
    category: "Campaigns",
  },
  {
    playbackId: "N3aCrec8L3l9I201n00lh8vven3zLe7BQmVJY73Lb01D5k",
    thumbnail:
      "https://image.mux.com/N3aCrec8L3l9I201n00lh8vven3zLe7BQmVJY73Lb01D5k/animated.gif?width=320",
    title: "Swiggy Diwali Campaign",
    aspect: "76/135",
    slug: "brand-reels",
    category: "Brand Reels",
  },
  {
    playbackId: "mCGceVpllCUSailLstmYTVO1CqQsC008g8ww3rzyFHCM",
    thumbnail:
      "https://image.mux.com/mCGceVpllCUSailLstmYTVO1CqQsC008g8ww3rzyFHCM/animated.gif?width=320",
    title: "The Center Piece 1",
    aspect: "371/180",
    slug: "music-videos",
    category: "Music Videos",
  },
   {
    playbackId: "4p700TQ0024CH01sZCmEtaX4nS4uoGFnmaaCkfiuHkOm3o",
    thumbnail:
      "https://image.mux.com/4p700TQ0024CH01sZCmEtaX4nS4uoGFnmaaCkfiuHkOm3o/animated.gif?width=320",
    title: "Doordarshan Sundarbans",
    aspect: "16/9",
    slug: "motion-graphics",
    category: "Motion Graphic",
  },
  {
    playbackId: "n5FiJ9k7NU7dFGYkt02vRiSs6v102xucKR1iqXeaDTElU",
    thumbnail:
      "https://image.mux.com/n5FiJ9k7NU7dFGYkt02vRiSs6v102xucKR1iqXeaDTElU/animated.gif?width=320",
    title: "The Center Piece 3",
    aspect: "16/9",
    slug: "music-videos",
    category: "Music Videos",
  },
  {
    playbackId: "NryXy6b52QonfHxiHp4pbQJXhlZBuIc8EmQiEoNg2ww",
    thumbnail:
      "https://image.mux.com/NryXy6b52QonfHxiHp4pbQJXhlZBuIc8EmQiEoNg2ww/animated.gif?width=320",
    title: "Saisha",
    aspect: "1231/540",
    slug: "brand-films",
    category: "Brand Films",
  },
  
];

// ------------------------------
// Media Tile (mux-player)
// ------------------------------
function MediaTile({ item, index }: { item: MediaItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.8, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
      className="z-[999] relative break-inside-avoid mb-4 rounded-2xl overflow-hidden shadow-lg"
      style={{ aspectRatio: item.aspect ?? (item.isReel ? "9/16" : "16/9") }}
    >
      <mux-player
        stream-type="on-demand"
        playback-id={item.playbackId}
        poster={item.thumbnail}
        metadata-video-title={item.title}
        primary-color="#ffffff"
        secondary-color="#"
        style={{ width: "100%", height: "100%", zIndex: 999 }}
        controls={false}
        noHotKeys={false}
      ></mux-player>

      {/* Category chip */}
      <div className="absolute top-3 left-3 z-10">
        <Link
          href={`/work/${item.slug}`}
          className="bg-white text-black text-xs font-light px-2 py-0.5 rounded-full hover:bg-stone-200 transition"
        >
          {item.category}
        </Link>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-2 left-4 right-4 z-10 text-white drop-shadow-md">
        <h3 className="font-light tracking-wide text-base">{item.title}</h3>
      </div>
    </motion.div>
  );
}

// ------------------------------
// Main Page
// ------------------------------
export default function CategoriesPage() {
  return (
    <main className="bg-stone-800 text-stone-100 w-full min-h-screen">
      {/* Hero */}
      <section className="dark-grainy relative min-h-[50vh] lg:min-h-[60vh] max-w-full mx-auto flex flex-col items-start justify-end lg:px-24 px-6 pb-16 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-tight mb-8"
        >
          Dive into our <span className="alt-font italic font-normal">Work</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative flex flex-wrap items-center gap-3 sm:gap-4 max-w-4xl"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={`/work/${cat.slug}`}
              className="group relative inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 
                   backdrop-blur-md bg-white/10 border border-white/20 text-stone-200
                   hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <span className="text-base sm:text-lg md:text-xl font-light">
                {cat.title}
              </span>
              <ArrowUpRight
                className="w-4 h-4 sm:w-5 sm:h-5 text-stone-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="light-grainy bg-white lg:py-16 py-12 px-6 lg:px-24 border-b border-b-gray-400">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-lg sm:text-xl text-stone-600 font-normal">
            Featured
          </h3>
          <span className="text-xs text-stone-600">{MEDIA.length} videos</span>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]">
          {MEDIA.map((item, i) => (
            <MediaTile key={item.playbackId} item={item} index={i} />
          ))}
        </div>
      </section>

      <SocialMedia />
      <FilmTicker />
      <Contact />
    </main>
  );
}
