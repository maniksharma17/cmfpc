"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function ClientLogos() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-white w-full py-12 sm:py-20 overflow-hidden text-center px-3">
      {/* Heading */}
      {isMobile ? (
        <p className="text-xl sm:text-2xl md:text-5xl font-normal mb-4 sm:mb-12">
          Trusted by <span className="alt-font italic">leading</span> brands
        </p>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl sm:text-2xl md:text-5xl font-normal mb-4 sm:mb-12"
        >
          Trusted by <span className="alt-font italic">leading</span> brands
        </motion.p>
      )}

      {/* Clients List */}
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      viewport={{ once: true }}
      className="text-md sm:text-lg md:text-3xl max-w-5xl mx-auto font-normal mb-8 sm:mb-14 leading-relaxed flex flex-wrap justify-center gap-x-2 gap-y-1 sm:gap-y-4">
        {CLIENT_NAMES.map((client, i) => (
          <span
            key={i}
            className="inline-block whitespace-nowrap transition-all duration-300 px-1 sm:px-2"
          >
            {client}
            {i < CLIENT_NAMES.length - 1 && (
              <span className="mx-1 sm:mx-2 text-stone-400">•</span>
            )}
          </span>
        ))}
      </motion.div>

      {/* Marquee Logos */}
      <div className="relative flex items-center py-6 sm:py-12">
        <div className="flex gap-6 sm:gap-14 items-center animate-marquee">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.02 }}
              className={`
                group
                ${logo.size === "big"
                  ? "w-24 h-14 sm:w-44 sm:h-24"
                  : "w-16 h-10 sm:w-32 sm:h-16"}
                flex items-center justify-center shrink-0
              `}
            >
              <Image
                src={`/clients/${logo.src}`}
                alt={`Client logo ${i}`}
                width={200}
                height={100}
                className={`object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 ${
                  logo.invert ? "invert" : ""
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
