'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function SlowScrollWrapper({ children }: { children: React.ReactNode }) {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Very stiff, slow spring
  const smoothY = useSpring(scrollY, {
    damping: 40,   // higher damping = less bouncy
    stiffness: 0, // lower stiffness = slow movement
    mass: 0.1,
  });

  // Transform spring to slow upward movement
  const y = useTransform(smoothY, (v) => -v * 1);

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        style={{
          y, // apply the transformed spring
          position: 'relative',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
