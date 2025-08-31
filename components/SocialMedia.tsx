"use client";

import { useReducedMotion, motion, Variants } from "framer-motion";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ArrowRight,
} from "lucide-react";

type Social = {
  name: "Instagram" | "Twitter" | "Facebook" | "YouTube";
  color: string;
  url: string;
  icon: React.ElementType;
};

const SOCIALS: Social[] = [
  { name: "Instagram", color: "#E1306C", url: "https://instagram.com", icon: Instagram },
  { name: "Twitter",   color: "#1DA1F2", url: "https://twitter.com",   icon: Twitter },
  { name: "Facebook",  color: "#1877F2", url: "https://facebook.com",  icon: Facebook },
  { name: "YouTube",   color: "#FF0000", url: "https://youtube.com",   icon: Youtube },
];

export const SocialMedia = () => {
  const reduce = useReducedMotion();

  const section: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  const list: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <motion.section
      variants={section}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-stone-50 w-full lg:py-28 py-14 lg:px-24 px-6 text-stone-900"
    >
      {/* Heading */}
      <div className="mb-8 sm:mb-12">
        <motion.p
          variants={section}
          className="text-3xl md:text-5xl font-normal"
        >
          Follow the <span className="alt-font italic">vision</span>
        </motion.p>
        <motion.p
          variants={section}
          className="mt-3 text-stone-500 text-sm md:text-base"
        >
          See work-in-progress, launches, and behind-the-scenes.
        </motion.p>
      </div>

      {/* Cards */}
      <motion.div
        variants={list}
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-4 sm:gap-6
        "
      >
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          return (
            <motion.a
              key={s.name}
              variants={item}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${s.name}`}
              // Use a CSS variable so we can reuse the brand color in Tailwind arbitrary values.
              style={{ ["--brand" as any]: s.color }}
              className="
                group relative isolate overflow-hidden rounded-2xl
                bg-white border border-stone-200/80 shadow-sm
                hover:shadow-xl transition-shadow duration-300
                focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand)]/25
                p-5 sm:p-6
              "
            >
              {/* Brand top accent */}
              <span
                className="
                  pointer-events-none absolute inset-x-0 top-0 h-1
                  bg-[var(--brand)]
                "
              />

              {/* Subtle glow on hover (kept GPU-accelerated to avoid jitter) */}
              <span
                className="
                  pointer-events-none absolute -inset-px opacity-0
                  group-hover:opacity-100 transition-opacity duration-300
                  [background:radial-gradient(60%_60%_at_0%_0%,_var(--brand)/10,_transparent_60%)]
                "
              />

              <div className="flex items-start justify-between gap-4">
                {/* Icon bubble */}
                <div
                  className="
                    grid place-items-center h-12 w-12 rounded-xl
                    border border-stone-200 bg-stone-50
                    transition-transform duration-300 transform-gpu
                    group-hover:-translate-y-0.5
                  "
                >
                  <Icon className="h-6 w-6 text-[var(--brand)]" strokeWidth={1.6} />
                </div>

                {/* Arrow */}
                <div
                  className="
                    mt-1 text-[var(--brand)]
                    transition-transform duration-300 transform-gpu
                    group-hover:translate-x-1
                  "
                >
                  <ArrowRight className="h-7 w-7" />
                </div>
              </div>

              {/* Text */}
              <div className="mt-5">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                  {s.name}
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  Follow us on {s.name}.
                </p>
              </div>

              {/* CTA chip */}
              <span
                className="
                  mt-5 inline-flex items-center gap-2 rounded-full
                  border px-3 py-1 text-sm
                  border-stone-200 text-stone-700 bg-stone-50
                  group-hover:border-[var(--brand)]/30 group-hover:bg-white
                  transition-colors
                "
              >
                Open {s.name}
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          );
        })}
      </motion.div>
    </motion.section>
  );
};
