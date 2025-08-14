'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Avoid running on SSR
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      setShow(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    // Respect reduced-motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            
            fixed bottom-10 right-10 z-50
            h-16 w-16 rounded-full
            bg-white text-stone-900
            shadow-lg shadow-black/20
            hover:bg-stone-200 active:scale-95
            focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400
            flex items-center justify-center
          "
        >
          {/* Up Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
