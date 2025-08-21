"use client";

import Contact from "@/components/Contact";
import FilmTicker from "@/components/FilmTicker";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

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
    },
    {
      title: "Brand Films",
      text: "Cinematic journeys that humanise and elevate essence.",
    },
    {
      title: "Brand Reels",
      text: "Brief bursts of story that thrive in the now.",
    },
    {
      title: "Campaigns",
      text: "Narratives across mediums, woven to inspire and connect.",
    },
    {
      title: "Documentaries",
      text: "Profound explorations of truth, crafted to stir reflection.",
    },
    {
      title: "Motion Graphics",
      text: "Design and movement fused into vibrant expression.",
    },
    {
      title: "Music Videos",
      text: "Rhythms translated into visuals — a dance of sound and story.",
    },
  ];

  return (
    <section className="relative w-full">
      {/* Intro (Dark) */}
      <div className="bg-stone-800 text-white min-h-screen flex items-center">
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
              className={`text-3xl md:text-5xl font-light leading-relaxed tracking-wide ${
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
      </div>

      {/* Mission + Vision (Unified Light) */}
      <div className="bg-white text-black min-h-screen flex items-center py-24">
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
              className="text-2xl md:text-4xl font-light leading-tight"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Approach (Dark) */}
      <div className="bg-stone-800 text-stone-50 py-24 lg:min-h-[80vh]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Listen",
                desc: "We begin by listening — to people, to brands, to unspoken truths.",
              },
              {
                title: "Shape",
                desc: "Ideas are nurtured, refined into visions with weight and purpose.",
              },
              {
                title: "Craft",
                desc: "Every frame is intentional — light, color, silence working together.",
              },
              {
                title: "Collaborate",
                desc: "Voices merge, shaping stories greater than one.",
              },
              {
                title: "Refine",
                desc: "We cut away the noise until only essence remains.",
              },
              {
                title: "Release",
                desc: "The film breathes — timeless, resonant, alive.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl md:text-2xl font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl font-light leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories (Light) */}
      <div className="bg-stone-100 text-black py-24">
        <div className="max-w-6xl px-6 lg:px-24">
          <h2 className="text-3xl md:text-5xl font-light mb-12 text-left">
            Our <span className="alt-font italic">Canvas</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h3 className="text-xl md:text-2xl font-medium">{cat.title}</h3>
                <p className="text-md md:text-lg font-light leading-relaxed">
                  {cat.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FilmTicker />
      <Contact />
    </section>
  );
};

export default About;
