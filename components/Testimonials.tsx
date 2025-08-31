"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { text: "Cinemalt has an excellent team that truly knows how to bring imagination to life. Their execution—from shooting to editing—was smooth, creative, and professional. A superb experience from start to finish.", brand: "Showman Artist" },
  { text: "Cinemalt has been my go-to partner for music videos, corporate films, and independent documentaries. Every project we've done together has been a seamless experience. Their team's energy, creativity, and attention to detail are unmatched. They consistently deliver on their promises—with precision, professionalism, and genuine passion. Collaborating with Cinemalt has made a significant difference in the quality and impact of my work. I'm truly grateful to have them behind my projects.", brand: "Behrupiya Pictures" },
  { text: "The Cinemalt studio is truly top-notch! We recently recorded a podcast episode of 'The News Darshan' here, and the experience was fantastic. The staff, including Raghav, Ranjan, and Arpit, were incredibly cooperative and made the whole process smooth and enjoyable. They work with a professionalism and passion that puts them on par with the best in the industry.", brand: "The News Darshan" },
  { text: "Cinemalt isn’t just a production house; they’re true collaborators who know how to blend artistry with technical brilliance. We’re grateful for the journey we shared with them and can’t wait to create more magic together.", brand: "The CenterPiece" },
  { text: "We were impressed not only by their technical expertise but also by how invested they were in our brand’s identity. It felt less like working with an agency and more like collaborating with artists who truly understood our vision.", brand: "Haven Fragrances" },
  { text: "Their team approached our project with remarkable discipline, clear communication, and a deep respect for deadlines. What impressed us most was their ability to handle complex narratives with empathy, while maintaining the highest production standards.", brand: "Social Footprint" },
];

function TestimonialCard({
  text,
  brand,
  showReadMore,
}: {
  text: string;
  brand: string;
  showReadMore: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-6 bg-stone-700/40 rounded-xl border border-stone-600/40 hover:bg-stone-700/60 hover:border-stone-400/40 transition-colors duration-300">
      <p
        className={`text-sm md:text-base leading-relaxed italic text-stone-200 transition-all duration-500 ${
          showReadMore && !expanded ? "line-clamp-3" : ""
        }`}
      >
        “{text}”
      </p>

      <footer className="not-italic mt-4 text-xs md:text-sm tracking-wide text-stone-400">
        — {brand}
      </footer>

      {showReadMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-stone-300 hover:text-white transition-colors underline underline-offset-2"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    setMounted(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-stone-900 text-stone-100 py-24 sm:px-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-light mb-8 sm:mb-14 text-center"
        >
          What <span className="alt-font italic text-white">our clients</span> say
        </motion.p>

        {isMobile ? (
          <div className="flex flex-col items-center">
            {/* Mobile: Horizontal Slide */}
            <div className="w-full max-w-md overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ x: direction > 0 ? "100%" : "-100%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <TestimonialCard
                    text={testimonials[index].text}
                    brand={testimonials[index].brand}
                    showReadMore
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                onClick={prev}
                className="p-3 bg-stone-700/50 rounded-full hover:bg-stone-700/70 transition"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={next}
                className="p-3 bg-stone-700/50 rounded-full hover:bg-stone-700/70 transition"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          // Desktop: Grid with entry motion
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <TestimonialCard text={t.text} brand={t.brand} showReadMore />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
