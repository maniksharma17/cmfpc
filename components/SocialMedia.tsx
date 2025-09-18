"use client";

import { useReducedMotion, motion, Variants } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight, ArrowUpRight } from "lucide-react";

type Social = {
  name: "Instagram" | "Twitter" | "Facebook" | "YouTube";
  color: string;
  url: string;
  icon: React.ElementType;
};

const SOCIALS: Social[] = [
  { name: "YouTube", color: "#FF0000", url: "https://youtube.com/@cinemaltstudio?si=yabKzXzGi70Dg_An", icon: Youtube },
  { name: "Instagram", color: "#E1306C", url: "https://www.instagram.com/cinemalt.in/?utm_source=ig_web_button_share_sheet", icon: Instagram },
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
      <div className="mb-12 text-center">
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
        className="flex flex-col md:flex-row justify-center items-center gap-6"
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
              className={`z-[50] flex w-fit flex-row gap-2 justify-start items-center group transition-all sm:p-6 `}
            >
              <motion.h1 className={`text-3xl md:text-5xl`}
              style={{
                color: `${s.color}`
              }}
              >{s.name}</motion.h1>
              <ArrowUpRight color={s.color} size={50} strokeWidth={1} className="group-hover:translate-x-5 group-hover:-translate-y-4 transition-all duration-300 hidden sm:block" />
              <ArrowUpRight color={s.color} size={30} strokeWidth={1} className="group-hover:translate-x-5 group-hover:-translate-y-4 transition-all duration-300 block sm:hidden" />
            </motion.a>
          );
        })}
      </motion.div>
    </motion.section>
  );
};
