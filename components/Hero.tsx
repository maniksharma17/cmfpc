"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen flex items-center justify-start overflow-hidden hero-grainy"
    >
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full">
        {/* Mobile */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover"
        >
          <source src="https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/hero-mobile.mp4" type="video/mp4" />
        </video>
        {/* Desktop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
        >
          <source src="https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/hero3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center sm:text-left max-w-4xl px-4 sm:px-6 md:pl-24 text-white translate-y-[-8%] md:translate-y-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cormorant text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-8 font-light leading-tight"
        >
          We distill stories and deliver cinematic production that turns ideas
          into iconic brands
        </motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex max-sm:mx-auto items-center gap-3 sm:gap-4 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full
            bg-white/10 backdrop-blur-lg text-white text-base sm:text-lg font-medium
            border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]
            hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
            transition-all duration-300"
        >
          <span>See What&apos;s Possible</span>

          {/* Animated arrow */}
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md"
          >
            <motion.div className="absolute w-full h-full rounded-full bg-white" />
            <ArrowRight className="relative z-10 text-black text-lg sm:text-xl" />
          </motion.div>
        </motion.button>
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
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-b from-white to-white/60 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
