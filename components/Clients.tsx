"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CLIENT_LOGOS = [
  { src: "Bill_&_Melinda_Gates_Foundation_logo.svg.png", size: "big" },
  { src: "Centrepiece (Logo).png", size: "big" },
  { src: "Larsen & Toubro (L&T) Logo Vector.png", size: "big" },
  { src: "Daco_4338596.png", size: "small" },
  { src: "Discovery_Channel_-_Logo_2019.svg.png", size: "big" },
  { src: "Haven Fragrances.png", size: "big" },
  { src: "Add a heading (5) Ketan bhaiya copy.png", size: "big" },
  { src: "s.png", size: "big", invert: true },
  { src: "iics.webp", size: "small" },
  { src: "Jims Logo.png", size: "small" },
  { src: "Kohler_logo.svg.png", size: "small" },
  { src: "Hero_MotoCorp_Logo.svg.png", size: "small" },
  { src: "Saisha.png", size: "small" },
  { src: "Tata_Power_Logo.svg.png", size: "small" },
  { src: "Tata_Tea_Logo.svg.png", size: "small" },
  { src: "WFH-new-logo.jpg", size: "small" },
];

export default function ClientLogos() {
  // Desktop rows → [5, 6, 5]
  const rows = [
    CLIENT_LOGOS.slice(0, 5),
    CLIENT_LOGOS.slice(5, 11),
    CLIENT_LOGOS.slice(11, 16),
  ];

  return (
    <section className="light-grainy bg-white w-full py-12 sm:py-24 text-center px-3">
      {/* Heading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl text-center font-light mb-12"
      >
        Trusted By <span className="alt-font italic">Leading</span> Brands
      </motion.p>

      {/* Logos Grid */}
      {/* MOBILE: Single grid with no slicing */}
      <div className="grid grid-cols-2 items-center content-center sm:hidden flex-wrap justify-center gap-6">
        {CLIENT_LOGOS.map((logo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
            viewport={{ once: true }}
            className={`group flex items-center mx-auto justify-center w-24 h-14`}
          >
            <Image
              src={`/clients/${logo.src}`}
              alt={`Client logo ${i}`}
              width={200}
              height={100}
              loading={"eager"}
              className={`object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 ${
                logo.invert ? "invert" : ""
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* DESKTOP: Animate per row */}
      <div className="hidden sm:flex flex-col gap-8">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: rowIndex * 0.3, // stagger rows
            }}
            viewport={{ once: true }}
            className="flex justify-center gap-12 flex-wrap"
          >
            {row.map((logo, i) => (
              <div
                key={i}
                className={`group flex items-center justify-center
                  ${logo.size === "big"
                    ? "w-44 h-24"
                    : "w-32 h-16"}
                `}
              >
                <Image
                  src={`/clients/${logo.src}`}
                  alt={`Client logo ${i}`}
                  width={200}
                  height={100}
                  loading={"eager"}
                  className={`object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 ${
                    logo.invert ? "invert" : ""
                  }`}
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
