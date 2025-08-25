"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const portfolioCategories = [
  {
    name: "Advertisements",
    description: "Compelling advertisements that last an impression.",
    image: "https://images.pexels.com/photos/6202743/pexels-photo-6202743.jpeg",
    slug: "advertisements",
  },
  {
    name: "Brand Films",
    description: "Cinematic storytelling that defines a brand’s identity.",
    image:
      "https://images.unsplash.com/photo-1683090987787-d83d1f41a038?q=80&w=2071&auto=format&fit=crop",
    slug: "brand-films",
  },
  {
    name: "Brand Reels",
    description: "Short, snappy, and visually magnetic.",
    image:
      "https://images.unsplash.com/photo-1532800783378-1bed60adaf58?q=80&w=2070&auto=format&fit=crop",
    slug: "brand-reels",
  },
  {
    name: "Campaigns",
    description: "Strategic visual stories that resonate deeply.",
    image:
      "https://images.unsplash.com/photo-1635344620529-2b8aa633231a?q=80&w=2064&auto=format&fit=crop",
    slug: "campaigns",
  },
  {
    name: "Documentaries",
    description: "Real stories told with raw authenticity.",
    image:
      "https://images.unsplash.com/photo-1615310126233-642c6a0df67a?q=80&w=2070&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop",
    slug: "music-videos",
  },
];

function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
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
    <section id="work" className="bg-black text-white">
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
          className="border-y border-y-gray-300 border-y-1/2 relative h-[40vh] sm:h-screen w-full overflow-hidden cursor-pointer"
        >
          {/* Image */}
          <CardImage src={category.image} alt={category.name} />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          {/* Text */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 max-w-2xl">
            {/* Heading + Arrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-row gap-4 items-center"
            >
              <h3 className="text-2xl sm:text-4xl font-light leading-tight tracking-tight">
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
                delay: index * 0.1,
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
