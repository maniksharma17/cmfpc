"use client";

import { motion } from "framer-motion";

const SERVICES = [
  "Film Production",
  "Ad Films",
  "Documentaries",
  "Music Videos",
  "Branded Content",
  "Post Production",
  "Photography",
  "Script Development",
  "Creative Direction",
  "Casting",
  "Location Scouting",
];

export default function Services() {
  return (
    <section className="bg-stone-900 w-full py-16 sm:py-24 overflow-hidden text-center px-4 text-stone-100">
      {/* Heading */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-xl sm:text-2xl md:text-5xl font-light mb-6 sm:mb-12"
      >
        <span className="alt-font italic">Services</span> we provide
      </motion.p>

      {/* Services List (Text only, inline like brands) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-sm sm:text-lg md:text-2xl max-w-4xl mx-auto font-light leading-relaxed flex flex-wrap justify-center gap-x-2 gap-y-2"
      >
        {SERVICES.map((service, i) => (
          <span
            key={i}
            className="inline-block whitespace-nowrap hover:font-medium hover:text-white transition-all duration-300 px-1 sm:px-2"
          >
            {service}
            {i < SERVICES.length - 1 && (
              <span className="mx-1 sm:mx-2 text-stone-400">•</span>
            )}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
