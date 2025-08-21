'use client';

import Contact from '@/components/Contact';
import FilmTicker from '@/components/FilmTicker';
import { motion } from 'framer-motion';

const About = () => {
  const fadeUp = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: i * 0.15 },
    viewport: { once: true },
  });

  return (
    <section className="relative w-full">

      {/* Mission */}
      <div className="bg-stone-800 text-white min-h-screen flex items-center relative">
        <div className="relative max-w-5xl mx-auto px-8 lg:px-20 text-left space-y-8">
          <motion.h2
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-light"
          >
            Our <span className="alt-font italic">Mission</span>
          </motion.h2>

          <div className="space-y-4">
            {[
              <>To create stories that <span className="alt-font italic">linger</span>.</>,
              <>Work that moves people long after the frame fades.</>,
              <>We merge cinematic artistry with strategy — every detail <span className="alt-font italic">deliberate</span>.</>,
              <>Each project is treated as a legacy piece, never disposable.</>,
            ].map((line, i) => (
              <motion.p
                key={i}
                {...fadeUp(i + 1)}
                className="text-2xl md:text-4xl font-light leading-tight"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-stone-50 text-black min-h-screen flex items-center relative">
        <div className="relative max-w-5xl mx-auto px-8 lg:px-20 text-left space-y-8">
          <motion.h2
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-light"
          >
            Our <span className="alt-font italic">Vision</span>
          </motion.h2>

          <div className="space-y-4">
            {[
              <>A world where every brand has a <span className="alt-font italic">cinematic voice</span>.</>,
              <>Where storytelling connects deeply, authentically, and lastingly.</>,
              <>Not growth for the sake of it — but meaning that <span className="alt-font italic">endures</span>.</>,
              <>The future is shaped by the stories we choose today.</>,
            ].map((line, i) => (
              <motion.p
                key={i}
                {...fadeUp(i + 1)}
                className="text-2xl md:text-4xl font-light leading-tight"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-stone-100 text-black min-h-screen flex items-center relative">
        <div className="relative max-w-5xl mx-auto px-8 lg:px-20 text-left space-y-10">
          <motion.h2
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-light"
          >
            Core <span className="alt-font italic">Values</span>
          </motion.h2>

          <ol className="space-y-6 text-2xl md:text-3xl font-light">
            {[
              <>Authenticity over trends.</>,
              <>Craft that respects detail.</>,
              <>Collaboration as a driving force.</>,
              <>Stories with lasting cultural impact.</>,
            ].map((line, i) => (
              <motion.li
                key={i}
                {...fadeUp(i + 1)}
                className="flex items-start gap-4 leading-snug"
              >
                <span className="text-3xl font-semibold alt-font">{i + 1}.</span>
                <span>{line}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* Approach */}
      <div className="bg-stone-900 text-white min-h-screen flex items-center relative">
        <div className="relative max-w-5xl mx-auto px-8 lg:px-20 text-left space-y-10">
          <motion.h2
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-light"
          >
            Our <span className="alt-font italic">Approach</span>
          </motion.h2>

          <ol className="space-y-6 text-2xl md:text-3xl font-light">
            {[
              <>Listen deeply before we create.</>,
              <>Design stories around human emotion.</>,
              <>Balance cinematic beauty with strategic clarity.</>,
              <>Deliver with care, precision, and intent.</>,
            ].map((line, i) => (
              <motion.li
                key={i}
                {...fadeUp(i + 1)}
                className="flex items-start gap-4 leading-snug"
              >
                <span className="text-3xl font-semibold alt-font">{i + 1}.</span>
                <span>{line}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <FilmTicker />
      <Contact />
    </section>
  );
};

export default About;
