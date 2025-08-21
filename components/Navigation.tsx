"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

const Navigation = () => {
  const [showNav, setShowNav] = useState(true);
  const [showCompact, setShowCompact] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateNavbar = () => {
      const current = Math.max(0, window.scrollY);
      const delta = current - lastScrollY.current;

      if (current <= 80) {
        setShowNav(true);
        setShowCompact(false);
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
        if (delta > 3) {
          // scrolling down → hide everything
          setShowNav(false);
          setShowCompact(false);
        } else if (delta < -6) {
          // scrolling up → show compact
          setShowNav(false);
          setShowCompact(true);
        }
      }

      lastScrollY.current = current;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(updateNavbar);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll as any);
  }, []);

  return (
    <>
      {/* Main Navbar (only at top) */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            key="main"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 w-full z-50 bg-transparent`}
          >
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 lg:pr-20">
              <div className="flex justify-between items-center h-20 sm:h-24">
                <Image
                  src="/cinemalt-logo.png"
                  alt="Cinemalt Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto sm:h-14"
                  priority
                />

                <div className="hidden md:flex space-x-10 lg:space-x-12">
                  {["About", "Work", "Team", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-base lg:text-lg tracking-wide text-white hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>

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

      {/* Compact Navbar (on scroll up) */}
      <AnimatePresence>
        {showCompact && (
          <motion.nav
            key="compact"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 w-full z-50 bg-stone-800 backdrop-blur-md shadow-sm"
          >
            <div className="max-w-full mx-auto px-6">
              <div className="flex justify-around sm:justify-center sm:gap-12 mx-auto items-center h-10">
                  {["Home", "About", "Work", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-white font-light tracking-tight hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Sidebar for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col bg-stone-800"
          >
            <div className="flex justify-end p-6">
              <motion.button
                onClick={() => setIsSidebarOpen(false)}
                whileHover={{ rotate: 90, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-4xl hover:text-gray-300"
              >
                <IoCloseSharp />
              </motion.button>
            </div>

            <motion.div
              className="mt-auto mb-12 ml-8 sm:ml-12 flex flex-col space-y-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
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
                  className="text-2xl sm:text-4xl font-light tracking-tight text-white/80 hover:text-white"
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
