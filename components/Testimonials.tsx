"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Cinemalt has an excellent team that truly knows how to bring imagination to life. Their execution—from shooting to editing—was smooth, creative, and professional. A superb experience from start to finish.",
    brand: "Showman Artist",
  },
  {
    text: "Cinemalt has been my go-to partner for music videos, corporate films, and independent documentaries. Every project we've done together has been a seamless experience. Their team's energy, creativity, and attention to detail are unmatched. They consistently deliver on their promises—with precision, professionalism, and genuine passion.",
    brand: "Behrupiya Pictures",
  },
  {
    text: "The Cinemalt studio is truly top-notch! We recently recorded a podcast episode of 'The News Darshan' here, and the experience was fantastic. The staff, including Raghav, Ranjan, and Arpit, were incredibly cooperative and made the whole process smooth and enjoyable.",
    brand: "The News Darshan",
  },
  {
    text: "Cinemalt isn’t just a production house; they’re true collaborators who know how to blend artistry with technical brilliance. We’re grateful for the journey we shared with them and can’t wait to create more magic together.",
    brand: "The CenterPiece",
  },
  {
    text: "We were impressed not only by their technical expertise but also by how invested they were in our brand’s identity. It felt less like working with an agency and more like collaborating with artists who truly understood our vision.",
    brand: "Haven Fragrances",
  },
  {
    text: "Their team approached our project with remarkable discipline, clear communication, and a deep respect for deadlines. What impressed us most was their ability to handle complex narratives with empathy, while maintaining the highest production standards.",
    brand: "Social Footprint",
  },
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
    <div
      className="
        p-5 sm:p-6 rounded-xl border border-stone-600 bg-stone-700
        shadow-sm hover:shadow-md transition-all duration-300
        backdrop-blur-sm
      "
    >
      <p
        className={`text-sm md:text-base leading-relaxed text-stone-200 transition-all duration-500 ${
          showReadMore && !expanded ? "line-clamp-3" : ""
        }`}
      >
        <span className="text-stone-200 text-xl mr-1">“</span>
        {text}
        <span className="text-stone-200 text-xl ml-1">”</span>
      </p>

      <footer className="mt-4 text-xs md:text-sm font-medium text-stone-100">
        — {brand}
      </footer>

      {showReadMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-stone-300 hover:text-stone-100 transition-colors"
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
    <section className="bg-stone-800 text-stone-50 py-20 sm:px-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-center font-light"
        >
          What Our <span className="italic alt-font">Clients</span> Say
        </motion.p>

        {isMobile ? (
          <div className="flex flex-col items-center">
            {/* Mobile: Slide */}
            <div className="w-full max-w-md overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? "-50%" : "50%", opacity: 0 }}
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

            {/* Arrows */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="p-2.5 bg-stone-700 rounded-full border border-stone-600 hover:shadow-sm transition"
              >
                <ChevronLeft className="w-5 h-5 text-stone-400" />
              </button>
              <button
                onClick={next}
                className="p-2.5 bg-stone-700 rounded-full border border-stone-600 hover:shadow-sm transition"
              >
                <ChevronRight className="w-5 h-5 text-stone-400" />
              </button>
            </div>
          </div>
        ) : (
          // Desktop: Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
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
