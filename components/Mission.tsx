'use client';

import { motion } from 'framer-motion';

const Mission = () => {
  const missionLines = [
    <>Our mission is to create stories that <span className="alt-font italic">linger</span>.</>,
    <>Work that moves people long after the final frame fades.</>,
    <>We merge cinematic artistry with strategy — every detail <span className="alt-font italic">deliberate</span>.</>,
    <>Every project is treated as a legacy piece, not a throwaway deliverable.</>,
  ];

  const visionLines = [
    <>A world where every brand has a <span className="alt-font italic">cinematic voice</span>.</>,
    <>Where storytelling connects deeply, authentically, and lastingly.</>,
    <>Our vision is not growth for the sake of it, but meaning that <span className="alt-font italic">endures</span>.</>,
    <>The future is shaped by the stories we choose to tell today.</>,
  ];

  return (
    <section className="relative w-full">

      {/* Mission */}
      <div className="bg-stone-800 text-white py-28 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-left">
          
          <div className="space-y-1">
            {missionLines.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.18 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-light leading-tight"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-stone-50 text-black py-28 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-left">
          
          <div className="space-y-1">
            {visionLines.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.18 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-light leading-tight"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Mission;
