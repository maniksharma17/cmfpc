'use client';

import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black text-white flex items-center grainy-background"
    >
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16">
        
        {/* Left Side - Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <h2 className="font-cormorant text-5xl md:text-7xl font-bold leading-tight">
            Let&apos;s Create  
            <span className="block italic text-gray-300">Something Unforgettable</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-gray-400 max-w-lg"
          >
            Your story deserves to be told with elegance, intention, and impact.  
            Let&apos;s craft experiences that don&apos;t just speak — they resonate.
          </motion.p>
        </motion.div>

        {/* Right Side - Contact Info & Links */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-10"
        >
          {/* Contact Info */}
          <div>
            <h4 className="font-cormorant text-xl font-bold mb-4">Get In Touch</h4>
            <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              hello@cinemalt.com
            </p>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-cormorant text-xl font-bold mb-4">Follow Our Journey</h4>
            <div className="flex space-x-8">
              {['Instagram', 'YouTube', 'FaceBook'].map((platform, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="relative text-gray-300 hover:text-white transition-colors group"
                >
                  {platform}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="border border-white px-8 py-3 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full py-6 border-t border-white/10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-sm"
        >
          © 2024 CineMalt. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
