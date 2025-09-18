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

const BRAND_REELS: FilmItem[] = [
  {
    playbackId: "Ydrw3nH8GvK4GSYnEzSy00xFGp2DuWpAw7QzTD5Gl00Qk",
    thumbnail:
      "https://image.mux.com/Ydrw3nH8GvK4GSYnEzSy00xFGp2DuWpAw7QzTD5Gl00Qk/animated.gif?width=320",
    title: "Diplomind",
    aspect: "76/135",
  },
  {
    playbackId: "vP2KoDHVppM9C7mx6GCl5Tl9xxlJ8vegW9UavrjPJpk",
    thumbnail:
      "https://image.mux.com/vP2KoDHVppM9C7mx6GCl5Tl9xxlJ8vegW9UavrjPJpk/animated.gif?width=320",
    title: "Cienna",
    aspect: "76/135",
  },
  {
    playbackId: "enAUZwSGAiM02O003e26h114v5YoV23ORnuPxkVQKFBPM",
    thumbnail:
      "https://image.mux.com/enAUZwSGAiM02O003e26h114v5YoV23ORnuPxkVQKFBPM/thumbnail.png?width=214&height=121&time=7",
    title: "Smart City 1",
    aspect: "5/9",
  },
  {
    playbackId: "u7IvPqOR2DnMPQEcqkQ2aesBGOZjsfk2UNUE5jRA4zo",
    thumbnail:
      "https://image.mux.com/u7IvPqOR2DnMPQEcqkQ2aesBGOZjsfk2UNUE5jRA4zo/animated.gif?width=320",
    title: "Smart City 2",
    aspect: "5/9",
  },
  {
    playbackId: "cgAoqjTep7SxJexrgt9SyyZKETDqnN2mwxSQn1lzhF8",
    thumbnail:
      "https://image.mux.com/cgAoqjTep7SxJexrgt9SyyZKETDqnN2mwxSQn1lzhF8/animated.gif?width=320",
    title: "Smart City 3",
    aspect: "5/9",
  },
  
  {
    playbackId: "Sth02oUBoCBKBu6GCVMC01eaOjchOFGb2YrCCO01SzVhtk",
    thumbnail:
      "https://image.mux.com/Sth02oUBoCBKBu6GCVMC01eaOjchOFGb2YrCCO01SzVhtk/animated.gif?width=320",
    title: "House Of Weaving 1",
    aspect: "76/135",
  },
  {
    playbackId: "koVfi7iDftl1J2NMdCm3jTJ01rV00KwuPHirv1TpgVcX00",
    thumbnail:
      "https://image.mux.com/koVfi7iDftl1J2NMdCm3jTJ01rV00KwuPHirv1TpgVcX00/animated.gif?width=320",
    title: "House Of Weaving 2",
    aspect: "76/135",
  },
  {
    playbackId: "LQIsviAT5wmEPwRMlxcqDsLakxfLKygnNEOUpAcpux4",
    thumbnail:
      "https://image.mux.com/LQIsviAT5wmEPwRMlxcqDsLakxfLKygnNEOUpAcpux4/animated.gif?width=320",
    title: "House Of Weaving 3",
    aspect: "76/135",
  },
  {
    playbackId: "N4fy01xTA8lTnfxD6zkpA286sjvS4S01jCZo02aCUYxwN8",
    thumbnail:
      "https://image.mux.com/N4fy01xTA8lTnfxD6zkpA286sjvS4S01jCZo02aCUYxwN8/animated.gif?width=320",
    title: "House Of Weaving 6",
    aspect: "16/7",
  },
  {
    playbackId: "A6llwpFOWqS32gn1ScZP00ca94le00Y72EG7cryDxx02kw",
    thumbnail:
      "https://image.mux.com/A6llwpFOWqS32gn1ScZP00ca94le00Y72EG7cryDxx02kw/animated.gif?width=320",
    title: "House Of Weaving 4",
    aspect: "76/135",
  },
  {
    playbackId: "Qevr2zC1hcGCIwX6SFTfNpw6z01dvRHTSB700LbDKiLd4",
    thumbnail:
      "https://image.mux.com/Qevr2zC1hcGCIwX6SFTfNpw6z01dvRHTSB700LbDKiLd4/animated.gif?width=320",
    title: "House Of Weaving 5",
    aspect: "16/7",
  },
  
  {
    playbackId: "YbneMaJ2i5lg83vLEZCC0172Fve9fv501klPKvTkKf9800",
    thumbnail:
      "https://image.mux.com/YbneMaJ2i5lg83vLEZCC0172Fve9fv501klPKvTkKf9800/animated.gif?width=320",
    title: "House Of Weaving 7",
    aspect: "76/135",
  },
  {
    playbackId: "Favua100P01tc6u8fMaZuNwuMAnSV8CYDX0138wuoMYVFs",
    thumbnail:
      "https://image.mux.com/Favua100P01tc6u8fMaZuNwuMAnSV8CYDX0138wuoMYVFs/animated.gif?width=320",
    title: "Swiggy Taste Test",
    aspect: "101/180",
  },
  {
    playbackId: "N3aCrec8L3l9I201n00lh8vven3zLe7BQmVJY73Lb01D5k",
    thumbnail:
      "https://image.mux.com/N3aCrec8L3l9I201n00lh8vven3zLe7BQmVJY73Lb01D5k/animated.gif?width=320",
    title: "Swiggy Diwali Campaign",
    aspect: "76/135",
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
      className="relative w-full z-[999] shadow-intense rounded-2xl overflow-hidden mb-6"
      style={{ aspectRatio: item.aspect ?? "9/16" }}
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
        <h3 className="font-normal tracking-wide text-sm sm:text-base">
          {item.title}
        </h3>
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
            {BRAND_REELS.map((item, i) => (
              <MediaTile key={item.playbackId} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FilmTicker />
      <Contact />
    </main>
  );
}
