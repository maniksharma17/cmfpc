"use client";

import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import {
  Ear,
  Shapes,
  Hammer,
  Users,
  Scissors,
  Rocket,
  Megaphone,
  Film,
  PlayCircle,
  Layers,
  BookOpen,
  PenTool,
  Music,
} from "lucide-react";

const steps = [
    {
      title: "Listen",
      desc: "We begin by listening — to people, to brands, to unspoken truths.",
      icon: Ear,
    },
    {
      title: "Shape",
      desc: "Ideas are nurtured, refined into visions with weight and purpose.",
      icon: Shapes,
    },
    {
      title: "Craft",
      desc: "Every frame is intentional — light, color, silence working together.",
      icon: Hammer,
    },
    {
      title: "Collaborate",
      desc: "Voices merge, shaping stories greater than one.",
      icon: Users,
    },
    {
      title: "Refine",
      desc: "We cut away the noise until only essence remains.",
      icon: Scissors,
    },
    {
      title: "Release",
      desc: "The film breathes — timeless, resonant, alive.",
      icon: Rocket,
    },
  ];


const About = () => {
  const missionLines = [
    <>
      To create stories that <span className="alt-font italic">linger</span>.
    </>,
    <>Work that stirs long after the frame has gone.</>,
    <>
      Every detail deliberate, every tale a mark of{" "}
      <span className="alt-font italic">permanence</span>.
    </>,
  ];

  const visionLines = [
    <>
      A world where every brand carries a{" "}
      <span className="alt-font italic">cinematic voice</span>.
    </>,
    <>Where stories connect deeply, truthfully, endlessly.</>,
    <>
      Our vision is not scale — but meaning that{" "}
      <span className="alt-font italic">endures</span>.
    </>,
    <>For tomorrow is shaped by the stories we tell today.</>,
  ];

  const values = [
    {
      title: "Authenticity",
      desc: "Stories told with honesty, not noise — truth before spectacle.",
    },
    {
      title: "Craft",
      desc: "Every frame measured, every cut chosen with care and intention.",
    },
    {
      title: "Collaboration",
      desc: "We create with people, not just for them.",
    },
    {
      title: "Endurance",
      desc: "Stories built to outlive the moment — to echo long after silence.",
    },
  ];

  const approach = [
    "We merge artistry with strategy, vision with voice.",
    "Cinema with brand clarity, emotion with resonance.",
    "We begin with listening, move with craft, and end only when a story feels timeless.",
  ];

  const CLIENT_LOGOS = [
    { src: "Bill_&_Melinda_Gates_Foundation_logo.svg.png", size: "big" },
    { src: "Centrepiece (Logo).png", size: "small" },
    { src: "Larsen & Toubro (L&T) Logo Vector.png", size: "big" },
    { src: "Daco_4338596.png", size: "small" },
    { src: "Discovery_Channel_-_Logo_2019.svg.png", size: "big" },
    { src: "Haven Fragrances.png", size: "big" },
    { src: "Add a heading (5) Ketan bhaiya copy.png", size: "big" },
    { src: "Hero_MotoCorp_Logo.svg.png", size: "small" },
    { src: "iics.webp", size: "small" },
    { src: "Jims Logo.png", size: "small" },
    { src: "Kohler_logo.svg.png", size: "small" },
    { src: "s.png", size: "big", invert: true },
    { src: "Saisha.png", size: "small" },
    { src: "Tata_Power_Logo.svg.png", size: "small" },
    { src: "Tata_Tea_Logo.svg.png", size: "small" },
    { src: "WFH-new-logo.jpg", size: "small" },
  ];

  const CLIENT_NAMES = [
    "Bill&Melinda Gates Foundation",
    "Swiggy",
    "Larson&Toubro",
    "Hero",
    "Discovery Channel",
    "Tata Power",
    "Tata Tea",
    "DiploMind",
    "World Federation of Homophilia",
    "Saisha",
    "Indian Institute of Creative Skills",
    "Haven Fragrances",

    "Showman Artist",
    "Kohler",
    "JIMS",
    "JAAL The Band",
    "The Centre Piece",
  ];

  const categories = [
  {
    title: "Advertisements",
    text: "Sharp, striking narratives that etch brands into memory.",
    icon: Megaphone,
  },
  {
    title: "Brand Films",
    text: "Cinematic journeys that humanise and elevate essence.",
    icon: Film,
  },
  {
    title: "Brand Reels",
    text: "Brief bursts of story that thrive in the now.",
    icon: PlayCircle,
  },
  {
    title: "Campaigns",
    text: "Narratives across mediums, woven to inspire and connect.",
    icon: Layers,
  },
  {
    title: "Documentaries",
    text: "Profound explorations of truth, crafted to stir reflection.",
    icon: BookOpen,
  },
  {
    title: "Motion Graphics",
    text: "Design and movement fused into vibrant expression.",
    icon: PenTool,
  },
  {
    title: "Music Videos",
    text: "Rhythms translated into visuals — a dance of sound and story.",
    icon: Music,
  },
];

  return (
    <section className="relative w-full">
      {/* Intro (Dark) */}
      <div className="relative bg-stone-800 text-white min-h-screen flex items-center">
        <div className="max-w-7xl px-6 lg:px-24 text-left">
          {[
            "Where vision becomes memory,",
            "where light and shadow weave *emotions* into *time*.",
            "We do not just create *films* — we shape *echoes*,",
            "*moments* that linger long after the reel ends.",
            "*CineMalt* crafts not frames, but *legacies*.",
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.25 }}
              viewport={{ once: true }}
              className={`text-2xl md:text-5xl font-light leading-tight tracking-tight sm:leading-relaxed sm:tracking-wide ${
                i === 4 ? "lg:mt-12" : ""
              }`}
              dangerouslySetInnerHTML={{
                __html: line.replace(
                  /\*(.*?)\*/g,
                  `<span class="alt-font italic">$1</span>`
                ),
              }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-24 sm:bottom-28 md:bottom-16 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-white/80">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3">
              Scroll
            </span>
            <div className="w-8 sm:w-10 h-14 sm:h-20 rounded-full border border-white/20 backdrop-blur-md bg-white/5 flex items-start justify-center overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-shadow duration-500">
              <motion.div
                animate={{ y: [0, 40, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-b from-white to-white/60 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mission + Vision (Unified Light) */}
      <div className="bg-white text-black sm:min-h-screen flex items-center py-24">
        <div className="max-w-7xl px-6 lg:px-24 space-y-2">
          {[
            <>
              Stories that <span className="alt-font italic">linger</span>.
              Frames that <span className="alt-font italic">stay</span>.
            </>,
            <>
              Work that <span className="alt-font italic">stirs</span>, visions
              that <span className="alt-font italic">endure</span>.
            </>,
            <>
              Every <span className="alt-font italic">detail</span> a mark of{" "}
              <span className="alt-font italic">permanence</span>.
            </>,
            <>
              Not <span className="alt-font italic">noise</span>, but{" "}
              <span className="alt-font italic">essence</span>.
            </>,
            <>
              Not <span className="alt-font italic">spectacle</span>, but{" "}
              <span className="alt-font italic">memory</span>.
            </>,
            <>
              Our <span className="alt-font italic">purpose</span>: Lasting{" "}
              <span className="alt-font italic">echoes</span>.
            </>,
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-light leading-tight tracking-tight"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Approach (Dark) */}
      <div className="bg-stone-800 text-stone-50 py-24 h-auto lg:min-h-[80vh]">
      <div className="max-w-6xl px-6 lg:px-24 space-y-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-light"
        >
          How we <span className="alt-font italic">create</span> films
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-700 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-stone-100" strokeWidth={1.2} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>

      {/* Categories (Light) */}
      <div className="bg-stone-100 text-black py-24">
      <div className="max-w-6xl px-6 lg:px-24">
        <h2 className="text-3xl md:text-5xl font-light mb-12 text-left">
          Our <span className="alt-font italic">Canvas</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-stone-800" strokeWidth={1.2}/>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-medium">{cat.title}</h3>
                  <p className="text-md md:text-lg font-light leading-tighter sm:leading-relaxed">
                    {cat.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>

      <FilmTicker />
      <Contact />
    </section>
  );
};

export default About;
