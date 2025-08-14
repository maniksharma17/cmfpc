"use client";

import { motion, easeOut, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

const portfolioCategories = [
  {
    name: "Advertisements",
    description: "Compelling advertisements that last an impression.",
    image: "https://images.unsplash.com/photo-1560785218-893cc779709b?q=80&w=2070&auto=format&fit=crop",
    slug: "advertisements",
  },
  {
    name: "Brand Films",
    description: "Cinematic storytelling that defines a brand’s identity.",
    image: "https://images.unsplash.com/photo-1683090987787-d83d1f41a038?q=80&w=2071&auto=format&fit=crop",
    slug: "brand-films",
  },
  {
    name: "Brand Reels",
    description: "Short, snappy, and visually magnetic.",
    image: "https://images.unsplash.com/photo-1532800783378-1bed60adaf58?q=80&w=2070&auto=format&fit=crop",
    slug: "brand-reels",
  },
  {
    name: "Campaigns",
    description: "Strategic visual stories that resonate deeply.",
    image: "https://images.unsplash.com/photo-1635344620529-2b8aa633231a?q=80&w=2064&auto=format&fit=crop",
    slug: "campaigns",
  },
  {
    name: "Documentaries",
    description: "Real stories told with raw authenticity.",
    image: "https://images.unsplash.com/photo-1615310126233-642c6a0df67a?q=80&w=2070&auto=format&fit=crop",
    slug: "documentaries",
  },
  {
    name: "Motion Graphics",
    description: "Dynamic animations that make ideas come alive.",
    image: "https://images.pexels.com/photos/417458/pexels-photo-417458.jpeg",
    slug: "motion-graphics",
  },
  {
    name: "Music Videos",
    description: "Visual experiences that amplify sound and emotion.",
    image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop",
    slug: "music-video",
  },
];

const fadeScale = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: easeOut },
};

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Desktop → parallax, Mobile → fade & scale
  const yRange = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktop ? ["-15%", "15%"] : ["0%", "0%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  const y = useSpring(yRange, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 overflow-hidden will-change-transform"
      style={isDesktop ? { y } : { opacity, scale }}
    >
      <motion.div
        className="w-full h-full will-change-transform"
        whileHover={isDesktop ? { scale: 1.03 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

const Portfolio = () => {
  const router = useRouter();

  return (
    <section id="work" className="bg-black text-white">
      

      {portfolioCategories.map((category) => (
        <motion.div
          key={category.name}
          initial={fadeScale.initial}
          whileInView={fadeScale.whileInView}
          transition={fadeScale.transition}
          viewport={{ once: true }}
          onClick={() => router.push(`/category/${category.slug}`)}
          className="relative h-[40vh] sm:h-screen w-full overflow-hidden cursor-pointer group"
        >
          <ParallaxImage src={category.image} alt={category.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 max-w-2xl transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            <h2 className="text-3xl sm:text-7xl font-light leading-tight">
              {category.name}
            </h2>
            <p className="text-sm sm:text-lg text-white/90 max-w-lg">
              {category.description}
            </p>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default Portfolio;
