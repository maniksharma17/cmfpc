"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCompact, setShowCompact] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setShowCompact(false);
      } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setShowCompact(true);
      } else if (currentScrollY <= 100) {
        setIsVisible(true);
        setShowCompact(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
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
            className="fixed top-0 w-full z-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex justify-between items-center h-20 sm:h-24">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="/cinemalt-logo.png"
                    alt="Cinemalt Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto sm:h-14"
                  />
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10 lg:space-x-12">
                  {["About", "Work", "Team", "Contact"].map((item, i) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
                      className="text-base lg:text-lg tracking-wide text-white hover:text-gray-300 transition-colors"
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
            className="fixed top-0 w-full text-white bg-stone-800 z-50"
          >
            <div className="flex justify-evenly sm:justify-center space-x-6 sm:space-x-12 h-12 items-center text-xs sm:text-sm">
              {["About", "Work", "Team", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="uppercase tracking-tight hover:text-gray-300 transition-colors"
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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="fixed bg-stone-800 inset-0 z-50 flex flex-col"
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

            {/* Nav Links */}
            <motion.div
              className="mt-auto mb-12 ml-8 sm:ml-12 flex flex-col space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
            >
              {["About", "Work", "Team", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  variants={{
                    hidden: { x: 20, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  whileHover={{
                    x: 6,
                    color: "#fff",
                    textShadow: "0 0 8px rgba(255,255,255,0.6)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-2xl sm:text-4xl font-light tracking-tight text-white/80 hover:text-white transition-all"
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
