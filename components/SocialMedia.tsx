import { ArrowRight } from "lucide-react";
import {motion} from "framer-motion";
import { useReducedMotion, Variants } from "framer-motion";

const SOCIALS = [
  { name: "Instagram", color: "#E1306C", url: "https://instagram.com" },
  { name: "Twitter", color: "#1DA1F2", url: "https://twitter.com" },
  { name: "Facebook", color: "#1877F2", url: "https://facebook.com" },
  { name: "YouTube", color: "#FF0000", url: "https://youtube.com" },
];

export const SocialMedia = () => {
  const reduce = useReducedMotion();
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };
  const list = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: reduce ? 0 : 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
};


  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-stone-50 w-full py-12 lg:py-28 text-left lg:px-24 px-6 text-stone-900"
    >
      {/* Heading */}
      <motion.p variants={fadeUp} className="text-3xl md:text-5xl font-normal sm:mb-12 mb-6">
        Join our <span className="alt-font italic">journey</span>
      </motion.p>

      {/* Socials */}
      <motion.div
        variants={list}
        className="flex flex-row flex-wrap justify-start items-start lg:items-center gap-4 sm:gap-12 md:gap-16"
      >
        {SOCIALS.map((social, i) => (
          <motion.a
            key={i}
            variants={item}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-3xl md:text-5xl font-light transition-all duration-300"
            style={{ color: "black" }}
          >
            {/* Text with hover styles */}
            <span
              className="
                relative transition-all duration-300
                group-hover:font-normal group-hover:underline
              "
              style={{
                // underline color (only visible on hover due to class above)
                textDecorationColor: social.color,
                textDecorationThickness: "3px",
              }}
            >
              {/* change text color to brand on hover */}
              <span
                className="transition-colors duration-300 group-hover:text-[var(--hover-c)]"
              >
                {social.name}
              </span>
            </span>

            {/* Arrow slides forward on hover */}
            <span
              className="transform transition-transform duration-300 group-hover:translate-x-2"
              style={{ color: social.color }}
            >
              <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
};
