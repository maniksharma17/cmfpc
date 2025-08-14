"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect screen size
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // If mobile → no parallax (just "0%")
  const videoY = useSpring(
    useTransform(scrollYProgress, [0, 1], isDesktop ? ["0%", "50%"] : ["0%", "0%"]),
    { stiffness: 50, damping: 20 }
  );
  const headingY = useSpring(
    useTransform(scrollYProgress, [0, 1], isDesktop ? ["0%", "-30%"] : ["0%", "0%"]),
    { stiffness: 50, damping: 20 }
  );
  const paragraphY = useSpring(
    useTransform(scrollYProgress, [0, 1], isDesktop ? ["0%", "-40%"] : ["0%", "0%"]),
    { stiffness: 50, damping: 20 }
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden hero-grainy"
    >
      {/* Background video */}
      <motion.div
        style={{ y: videoY, willChange: "transform" }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Mobile */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover"
        >
          <source
            src="https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/hero-mobile.mp4"
            type="video/mp4"
          />
        </video>
        {/* Desktop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
        >
          <source
            src="https://pub-01b195b4f45d4731908d3e577c63b40e.r2.dev/hero3.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </motion.div>

      {/* Content */}
      <div
        className="
          relative z-10 text-center max-w-4xl mx-auto px-4 text-white
          md:translate-y-0 translate-y-[-10%]
        "
      >
        <motion.h1
          style={{ y: headingY, willChange: "transform" }}
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
          style={{ y: paragraphY, willChange: "transform" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl max-w-xl mx-auto mb-8 font-light leading-relaxed"
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
          className="flex items-center mx-auto gap-4 px-8 py-3 rounded-full
    bg-white/10 backdrop-blur-lg text-white text-lg font-medium
    border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]
    hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
    transition-all duration-300"
        >
          <span>See What&apos;s Possible</span>
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md"
          >
            <motion.div className="absolute w-10 h-10 rounded-full bg-white" />
            <ArrowRight className="relative z-10 text-black text-xl" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
