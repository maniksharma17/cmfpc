"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const portfolioCategories = [
  {
    name: "Advertisements",
    description: "Compelling advertisements that last an impression.",
    image: `${BASE_URL}/cover/Hero%20Splendor.webp`,
    slug: "advertisements",
  },
  {
    name: "Brand Films",
    description: "Cinematic storytelling that defines a brand’s identity.",
    image: `${BASE_URL}/cover/Kohler.webp`,
    slug: "brand-films",
  },
  {
    name: "Brand Reels",
    description: "Short, snappy, and visually magnetic.",
    image: `${BASE_URL}/cover/brandreel.webp`,
    slug: "brand-reels",
  },
  {
    name: "Campaigns",
    description: "Strategic visual stories that resonate deeply.", 
    image: `${BASE_URL}/cover/Silk%20X%20News18.webp`,
    slug: "campaigns",
  },
  {
    name: "Documentaries",
    description: "Real stories told with raw authenticity.",
    image: `${BASE_URL}/cover/Bojh.webp`,
    slug: "documentaries",
  },
  {
    name: "Motion Graphics",
    description: "Dynamic animations that make ideas come alive.",
    image: `${BASE_URL}/cover/Map%20Animation.webp`,
    slug: "motion-graphics",
  },
  {
    name: "Music Videos",
    description: "Visual experiences that amplify sound and emotion.", 
    image: `${BASE_URL}/cover/The%20CenterPiece_2.webp`,
    slug: "music-videos",
  },
];

function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="w-full h-full"
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
    </div>
  );
}

export default function Portfolio() {
  const router = useRouter();

  return (
    <section id="work" className="light-grainy bg-white text-white px-4 sm:px-8 py-8 sm:py-16 space-y-4">
      {portfolioCategories.map((category, index) => (
        <motion.div
          key={category.name}
          onClick={() => router.push(`/work/${category.slug}`)}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: index * 0.05,
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative h-[25vh] lg:h-[90vh] w-full overflow-hidden cursor-pointer rounded-3xl shadow-intense bg-black"
        >
          {/* Image */}
          <CardImage src={category.image} alt={category.name} />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl" />

          {/* Text */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-row gap-4 items-center"
            >
              <h3 className="text-xl sm:text-4xl font-light leading-tight tracking-tight">
                {category.name}
              </h3>

              {/* Animated arrow */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-white/60"
              >
                <ArrowRight size={32} />
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-1 text-sm italic font-light sm:text-md text-white/80 max-w-lg leading-snug"
            >
              {category.description}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
