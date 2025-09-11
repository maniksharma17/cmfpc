"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Contact = () => {
  const router = useRouter();

  return (
    <section
      id="contact"
      className="dark-grainy pt-8 relative min-h-screen text-white flex items-center"
    >
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-800 via-stone-900 to-black pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16">
        {/* Left Side - Branding & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo/cinemalt.png`}
              alt="Cinemalt Logo"
              width={120}
              height={40}
              className="h-10 w-auto sm:h-14"
            />
          </motion.div>

          {/* Heading */}
          <h2 className="font-cormorant text-2xl sm:text-5xl md:text-6xl text-white font-bold leading-tight">
            Let&apos;s Create
            <span className="block italic text-white font-bold md:text-7xl [text-shadow:_0_0_4px_rgba(255,255,255,0.3),_0_0_25px_rgba(255,255,255,0.4)]">
              Something Unforgettable
            </span>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-md sm:text-lg text-gray-200 max-w-lg leading-tight sm:leading-relaxed"
          >
            From breathtaking visuals to powerful narratives, we bring your
            vision to life. Whether it’s a cinematic commercial, an event film,
            or a brand story — our mission is to create moments that linger in
            memory.
          </motion.p>
        </motion.div>

        {/* Right Side - Contact Info & CTA */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-start space-y-12"
        >
          {/* Contact Info */}
          <div>
            <h4 className="font-cormorant text-xl font-bold mb-4 tracking-wide">
              Get In Touch
            </h4>
            <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              hello@cinemalt.com
            </p>
            <p className="text-gray-300">+1 (555) 123-4567</p>
            <p className="text-gray-400 mt-2 text-sm">
              Available Mon – Fri, 9AM – 6PM
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-cormorant text-xl font-bold mb-4 tracking-wide">
              Follow Our Journey
            </h4>
            <div className="flex space-x-8">
              {["Instagram", "YouTube", "Facebook", "Vimeo"].map(
                (platform, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="relative text-gray-300 hover:text-white transition-colors group"
                  >
                    {platform}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              router.push(`/contact`);
            }}
            className="flex items-center gap-4 px-8 py-3 rounded-full
    bg-white/10 backdrop-blur-lg text-white text-lg font-medium
    border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]
    hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
    transition-all duration-300"
          >
            <span>Reach out</span>

            {/* Animated arrow container */}
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md"
            >
              <motion.div className="absolute w-10 h-10 rounded-full bg-white" />
              <ArrowRight className="relative z-10 text-black text-xl" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <div className="sm:absolute sm:hidden bottom-0 w-full py-6 border-t border-white/10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-sm tracking-wide"
          >
            © 2024 CineMalt. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute max-sm:hidden bottom-0 w-full py-6 border-t border-white/10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-wide"
        >
          © 2024 CineMalt. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
