"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

const Navigation = () => {
  const [showCompact, setShowCompact] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current + 5) {
        // scrolling down
        if (currentScrollY > 100) setShowCompact(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // scrolling up
        if (currentScrollY <= 100) {
          setShowCompact(false);
        } else {
          setShowCompact(false);
        }
      }
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Full Navbar */}
      <motion.nav
        initial={false}
        animate={{
          y: showCompact ? -80 : 0,
          opacity: showCompact ? 0 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 w-full z-50 bg-transparent"
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 lg:pr-20 relative z-10">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo */}
            <motion.div animate={{ opacity: 1, x: 0 }}>
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
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
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

      {/* Compact Menu Bar */}
      <motion.div
        initial={false}
        animate={{
          y: showCompact ? 0 : -60,
          opacity: showCompact ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 w-full text-white bg-stone-800 z-40 shadow-md"
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

      {/* Sidebar for Mobile */}
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
    </>
  );
};

export default Navigation;
