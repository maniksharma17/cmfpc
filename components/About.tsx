'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const About = () => {
  const lines = [
    <>We are storytellers driven by a love for <span className="alt-font italic">cinema</span> and meaningful narratives.</>,
    <>Every project is crafted with <span className="alt-font italic">patience</span>, <span className="alt-font italic">depth</span>, and <span className="alt-font italic">precision</span> under one roof.</>,
    <>From brand films to documentaries, we create work that feels <span className="alt-font italic">real</span>.</>,
    <>We believe a great story should not just be seen — it should <span className="alt-font italic">linger</span>.</>,
  ];

  const scrollY = useMotionValue(0);
  const headingY = useTransform(scrollY, v => v * 0);
  const textY = useTransform(scrollY, v => v * 0.001);

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <section
      id="about"
      className="relative min-h-screen py-28 overflow-hidden bg-stone-800 text-white"
    >
      {/* Foreground text */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-4xl mx-auto px-6 lg:px-8 space-y-16"
      >
        {lines.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.3 }}
            viewport={{ once: false }}
            className="text-3xl md:text-5xl font-light leading-snug drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
