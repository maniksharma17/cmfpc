'use client';

import { motion } from 'framer-motion';

const testimonials = [
  { 
    brand: "Zomato", 
    text: "CineMalt captured our essence with precision — every frame felt alive. What stood out was how naturally they blended storytelling with subtle brand cues." 
  },
  { 
    brand: "Swiggy", 
    text: "A story told so naturally, it felt less like an ad and more like a memory. CineMalt managed to show the magic of convenience without ever making it feel transactional." 
  },
  { 
    brand: "Razorpay", 
    text: "They turned complex fintech into something human, relatable, and powerful. Payments can often feel dry and technical, but the way they framed our journey made it feel emotional." 
  },
  { 
    brand: "CRED", 
    text: "Every second of the film oozed intent and craft. Nothing felt accidental. There was restraint where it was needed, and boldness where it mattered." 
  },
];


export default function Testimonials() {
  return (
    <section className="bg-stone-100 text-stone-800 py-24 sm:px-24 px-6 md:px-20">
      <div className="max-w-full mx-auto space-y-12">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl md:text-5xl font-light mb-10"
        >
          What <span className="alt-font italic">our clients</span> say
        </motion.p>

        <div className="space-y-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`text-2xl max-w-4xl md:text-3xl leading-relaxed italic ${
                i % 2 === 0 ? "text-stone-800" : "text-stone-600"
              }`}
            >
              “{t.text}”
              <footer className="not-italic mt-4 text-base md:text-lg tracking-wide text-stone-500">
                — {t.brand}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
