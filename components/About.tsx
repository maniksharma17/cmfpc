'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from "lucide-react";
import { useRouter } from 'next/navigation';

const About = () => {
  const lines = [
    <>We are storytellers driven by a love for <span className="alt-font italic">cinema</span> and meaningful narratives.</>,
    <>Every project is crafted with <span className="alt-font italic">patience</span>, <span className="alt-font italic">depth</span>, and <span className="alt-font italic">precision</span> under one roof.</>,
    <>From brand films to documentaries, we create work that feels <span className="alt-font italic">real</span>.</>,
    <>We believe a great story should not just be seen — it should <span className="alt-font italic">linger</span>.</>,
  ];

  const scrollY = useMotionValue(0);
  const textY = useTransform(scrollY, v => v * 0.001);

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);
  const router = useRouter();

  return (
    <section
      id="about"
      className="relative min-h-[60vh] md:min-h-[80vh] sm:min-h-screen py-20 md:py-28 px-6 md:pl-24 overflow-hidden bg-stone-800 text-white flex items-center"
    >
      {/* Foreground text */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-2xl space-y-8"
      >
        {lines.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]"
          >
            {text}
          </motion.p>
        ))}

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
          onClick={()=>{
            router.push(`/about`)
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full
          bg-white/10 backdrop-blur-lg text-white text-base sm:text-lg font-medium
          border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]
          hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
          transition-all duration-300"
        >
          <span>Read More About Us</span>

          {/* Animated arrow container */}
          <motion.div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md">
            <motion.div className="absolute w-full h-full rounded-full bg-white" />
            <ArrowUpRight className="relative z-10 text-black text-lg sm:text-xl" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default About;
