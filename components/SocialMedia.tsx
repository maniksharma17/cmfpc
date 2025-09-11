"use client";

import { useReducedMotion, motion, Variants } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";

type Social = {
  name: "Instagram" | "Twitter" | "Facebook" | "YouTube";
  color: string;
  url: string;
  icon: React.ElementType;
};

const SOCIALS: Social[] = [
  { name: "Instagram", color: "#E1306C", url: "https://instagram.com", icon: Instagram },
  { name: "Twitter", color: "#1DA1F2", url: "https://twitter.com", icon: Twitter },
  { name: "Facebook", color: "#1877F2", url: "https://facebook.com", icon: Facebook },
  { name: "YouTube", color: "#FF0000", url: "https://youtube.com", icon: Youtube },
];

export const SocialMedia = () => {
  const reduce = useReducedMotion();

  const section: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      variants={section}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="w-full light-grainy text-stone-900 py-20 lg:py-28 px-6 lg:px-24"
    >
      {/* Heading */}
      <div className="mb-12 text-left">
        <motion.h2
          variants={section}
          className="text-3xl md:text-5xl font-light tracking-tight"
        >
          Follow the{" "}
          <span className="italic text-stone-700">vision</span>
        </motion.h2>
        <motion.p
          variants={section}
          className="mt-3 text-stone-500 text-sm md:text-base"
        >
          Behind-the-scenes, launches, and stories in motion.
        </motion.p>
      </div>

      {/* Cards */}
      <motion.div
        variants={list}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
              style={{ ["--brand" as any]: s.color }}
              className="z-[99] group rounded-xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              {/* Icon + Arrow */}
              <div className="flex items-center justify-between">
                <div className="grid place-items-center h-12 w-12 rounded-lg border border-stone-200 bg-stone-50">
                  <Icon
                    className="h-6 w-6"
                    style={{ color: s.color }}
                    strokeWidth={1.6}
                  />
                </div>
                <ArrowRight
                  className="h-6 w-6 text-stone-400 group-hover:text-[var(--brand)] transition-colors"
                />
              </div>

              {/* Text */}
              <div className="mt-6">
                <h3 className="text-xl font-medium">{s.name}</h3>
                <p className="text-sm text-stone-500 mt-1">
                  Follow us on {s.name}.
                </p>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </motion.section>
  );
};
