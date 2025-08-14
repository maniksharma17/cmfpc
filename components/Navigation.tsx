'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import Image from 'next/image';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCompact, setShowCompact] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
        setShowCompact(true);
      } else {
        setIsVisible(true);
        if (window.scrollY < 100) setShowCompact(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      {/* Full Navbar */}
      <AnimatePresence>
        {isVisible && !showCompact && (
          <motion.nav
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 w-full z-50 overflow-hidden"
          >
            

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
              <div className="flex justify-between items-center h-28">
                {/* Logo */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className='font-light text-4xl text-white'
                >
                  Cine<span className='alt-font italic font-medium'>Malt</span>
                </motion.p>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-12">
                  {['About', 'Work', 'Team', 'Contact'].map((item, i) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
                      className="text-lg tracking-wide text-white transition-colors"
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="text-white text-3xl hover:text-gray-300 transition-colors"
                  >
                    <HiOutlineMenuAlt3 />
                  </button>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Compact Menu Bar */}
      <AnimatePresence>
        {showCompact && (
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 w-full bg-black text-white z-50"
          >
            <div className="flex justify-center space-x-16 h-12 items-center">
              {['About', 'Work', 'Team', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="uppercase text-sm tracking-wider hover:text-gray-300 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for Mobile */}
<AnimatePresence>
  {isSidebarOpen && (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-50 bg-stone-800 flex flex-col"
    >
      {/* Close Button */}
      <div className="flex justify-end p-6">
        <motion.button
          onClick={() => setIsSidebarOpen(false)}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-white text-4xl hover:text-gray-300 transition-colors"
        >
          <IoCloseSharp />
        </motion.button>
      </div>

      {/* Nav Links - Bottom Left */}
      <motion.div
        className="mt-auto mb-12 ml-12 flex flex-col space-y-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.05 }
          }
        }}
      >
        {['About', 'Work', 'Team', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            variants={{
              hidden: { x: 20, opacity: 0 },
              visible: { x: 0, opacity: 1 }
            }}
            whileHover={{
              x: 6,
              color: '#ffffff',
              textShadow: '0 0 8px rgba(255,255,255,0.6)'
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsSidebarOpen(false)}
            className="text-4xl font-light tracking-tight text-white/80 hover:text-white transition-all"
          >
            {item}
          </motion.a>
        ))}
      </motion.div>
    </motion.aside>
  )}
</AnimatePresence>

    </>
  );
};

export default Navigation;
