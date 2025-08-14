"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const ref = useRef(null);

  // Parallax progress scoped to the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const paragraphY = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden hero-grainy"
    >
      {/* Parallax Video Background (CSS handles mobile vs desktop, no JS, no hydration issues) */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 w-full h-full">
        {/* Mobile video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover"
        >
          <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        </video>

        {/* Desktop video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
        >
          <source src="/videos/hero3.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 text-white">
        <motion.h1
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight tracking-tighter"
        >
          Stories That
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block font-bold italic"
          >
            Linger
          </motion.span>
        </motion.h1>

        <motion.p
          style={{ y: paragraphY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl max-w-xl mx-auto mb-8 font-light leading-relaxed"
        >
          We distill stories and deliver cinematic production that turns ideas
          into iconic brands
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.96 }}
          className="font-transition font-normal uppercase px-8 py-3 tracking-wide text-lg
             rounded-full border-2 border-transparent bg-white text-black
             shadow-lg shadow-white/10
             hover:bg-transparent hover:text-white hover:border-white hover:shadow-white/30
             transition-all duration-300 ease-out"
        >
          Explore Our Work
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/80">
          <span className="text-xs tracking-[0.3em] uppercase mb-3">Scroll</span>
          <div className="w-10 h-20 rounded-full border border-white/20 backdrop-blur-md bg-white/5 flex items-start justify-center overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-shadow duration-500">
            <motion.div
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-white/60 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
