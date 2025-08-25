"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SERVICES = [
  "Brand Campaigns",
  "Podcast Setup",
  "Documentaries",
  "Brand Films",
  "Ad Films",
  "Event Photography",
  "Campaign Shoots",
  "Product Photography",
  "Music Videos",
];

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-stone-900 w-full py-16 sm:py-24 overflow-hidden text-center px-6 text-stone-100">
      {/* Heading */}
      <motion.p
        initial={{ opacity: 0, y: isMobile ? 0 : 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-5xl font-light mb-8 sm:mb-14"
      >
        <span className="alt-font italic text-white">Services</span>{" "}
        we provide
      </motion.p>

      {/* Services List */}
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 0 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-base sm:text-lg md:text-2xl max-w-4xl mx-auto font-light leading-relaxed flex flex-wrap justify-center gap-x-2 gap-y-3 tracking-wide"
      >
        {SERVICES.map((service, i) => (
          <span
            key={i}
            className="inline-block whitespace-nowrap px-1 sm:px-2 text-stone-300 hover:text-white hover:font-medium transition-all duration-300"
          >
            {service}
            {i < SERVICES.length - 1 && (
              <span className="mx-1 sm:mx-2 text-stone-500">•</span>
            )}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
