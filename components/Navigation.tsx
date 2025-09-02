"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

const NAV_ITEMS = ["Home", "About", "Work", "Contact"];

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCompact, setShowCompact] = useState(false);

  useEffect(() => {
    let ticking = false;

    const controlNavbar = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
          ticking = false;
        });

        ticking = true;
      }
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
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 w-full z-50"
          >
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 lg:pr-20 relative z-10">
              <div className="flex justify-between items-center h-20 sm:h-24">
                {/* Logo */}
                <Image
                  src="/cinemalt-logo.png"
                  alt="Cinemalt Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto sm:h-14"
                  priority
                />

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10 lg:space-x-12">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item}
                      href={`${
                        item == "Home"
                        ? "/"
                        : item.toLowerCase().replace(/\s+/g, "-")
                      }`}
                      className="text-base lg:text-lg tracking-wide text-white hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </a>
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
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 w-full text-white bg-stone-800 z-[99]"
          >
            <div className="flex justify-evenly sm:justify-center space-x-6 sm:space-x-12 h-12 items-center text-xs sm:text-sm">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`${
                    item == "Home"
                      ? "/"
                      : item.toLowerCase().replace(/\s+/g, "-")
                  }`}
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
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed bg-stone-800 inset-0 z-50 flex flex-col"
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white text-4xl hover:text-gray-300 transition-colors"
              >
                <IoCloseSharp />
              </button>
            </div>

            {/* Nav Links */}
            <motion.div
              className="mt-auto mb-12 ml-8 sm:ml-12 flex flex-col space-y-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                },
              }}
            >
              {NAV_ITEMS.map((item) => (
                <motion.a
                  key={item}
                  href={`${
                    item == "Home"
                      ? "/"
                      : item.toLowerCase().replace(/\s+/g, "-")
                  }`}
                  variants={{
                    hidden: { x: 20, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  whileHover={{
                    x: 6,
                    color: "#fff",
                    textShadow: "0 0 6px rgba(255,255,255,0.5)",
                  }}
                  whileTap={{ scale: 0.96 }}
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
