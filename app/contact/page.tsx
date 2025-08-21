"use client";

import React from "react";
import InputField from "@/components/ThemedInput";
import { ArrowRight } from "lucide-react";
import FilmTicker from "@/components/FilmTicker";
import Contact from "@/components/Contact";
import { motion, useReducedMotion, Variants } from "framer-motion";


const ContactPage = () => {
  return (
    <main className="relative min-h-screen flex flex-col items-center bg-stone-800 w-full text-white">
      {/* Content wrapper for intro + form */}
      <div className="w-full max-w-full px-6 lg:px-24 pt-12">
        {/* 2-column layout on lg+; stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-12 lg:py-32 py-16">
          <ContactIntro />
          {/* Divider on large screens */}
          <div className="hidden lg:block w-px bg-white/20" />
          <FormComponent />
        </div>
      </div>

      {/* Full-width Social */}
      <div className="w-full">
        <SocialMedia />
      </div>

      {/* Full-width FilmTicker */}
      <div className="w-full">
        <FilmTicker />
      </div>

      {/* Full-width Contact */}
      <div className="w-full">
        <Contact />
      </div>
    </main>
  );
};

const ContactIntro = () => {
  const reduce = useReducedMotion();
  const fadeLeft: Variants = {
  hidden: { opacity: 0, x: reduce ? 0 : -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

  return (
    <motion.section
      variants={fadeLeft}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex-1 flex flex-col justify-center gap-8"
    >
      <p className="text-2xl lg:text-5xl leading-tight">
        Share your vision, story, creation, challenge, or even the wild thoughts
        keeping you up at night —{" "}
        <span className="alt-font italic">we’re all ears</span>.
      </p>

      <div className="space-y-4">
        <a href="tel:+919045064021" className="group flex items-center gap-3">
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
          <span className="text-xl lg:text-4xl underline-offset-4 hover:underline">
            +91 9045064021
          </span>
        </a>

        <a
          href="mailto:contact@cinemalt.com"
          className="group flex items-center gap-3"
        >
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
          <span className="text-xl lg:text-4xl underline-offset-4 hover:underline">
            contact@cinemalt.com
          </span>
        </a>
      </div>
    </motion.section>
  );
};

const FormComponent = () => {
  const reduce = useReducedMotion();
  const fadeUp: Variants = {
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
  },
};


  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex-1"
    >
      <motion.form
        variants={fadeUp}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-5"
      >
        <InputField label="Name" name="name" placeholder="Enter your name" />
        <InputField
          label="Contact"
          name="contact"
          placeholder="Enter your contact number"
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <InputField
          label="Message"
          name="message"
          placeholder="Write your message"
          textarea
        />

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-4 px-8 py-3 rounded-full
              bg-white/10 text-white text-lg font-medium
              border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]
              hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
              transition-all duration-300 group"
          >
            <span>Reach out</span>
            <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md">
              <ArrowRight className="relative z-10 text-black text-xl transform transition-transform duration-500 group-hover:translate-x-2" />
            </div>
          </button>
        </div>
      </motion.form>
    </motion.section>
  );
};

const SOCIALS = [
  { name: "Instagram", color: "#E1306C", url: "https://instagram.com" },
  { name: "Twitter", color: "#1DA1F2", url: "https://twitter.com" },
  { name: "Facebook", color: "#1877F2", url: "https://facebook.com" },
  { name: "YouTube", color: "#FF0000", url: "https://youtube.com" },
];

const SocialMedia = () => {
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

export default ContactPage;
