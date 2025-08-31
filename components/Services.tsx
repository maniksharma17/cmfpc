"use client";

import { motion } from "framer-motion";
import {
  Film,
  Mic2,
  Camera,
  Image,
  Video,
  Music2,
  Megaphone,
  CameraOff,
  ImagePlus,
} from "lucide-react";

const SERVICES = [
  {
    title: "Brand Campaigns",
    text: "End-to-end campaigns that connect with your audience.",
    icon: Megaphone,
  },
  {
    title: "Podcast Setup",
    text: "Professional podcast recording, editing, and distribution.",
    icon: Mic2,
  },
  {
    title: "Documentaries",
    text: "Cinematic documentaries with compelling narratives.",
    icon: Film,
  },
  {
    title: "Brand Films",
    text: "Films that tell your brand’s story and vision.",
    icon: Video,
  },
  {
    title: "Ad Films",
    text: "Creative ads tailored for impact across platforms.",
    icon: Camera,
  },
  {
    title: "Event Photography",
    text: "Capturing the moments that matter at your events.",
    icon: CameraOff,
  },
  {
    title: "Campaign Shoots",
    text: "Stylized campaign photography that stands out.",
    icon: Image,
  },
  {
    title: "Product Photography",
    text: "High-quality images to showcase your products.",
    icon: ImagePlus,
  },
  {
    title: "Music Videos",
    text: "Visually stunning music videos with story-driven direction.",
    icon: Music2,
  },
];

export default function Services() {
  return (
    <section className="bg-stone-800 text-white py-24">
      <div className="max-w-6xl px-6 lg:px-24 mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl text-center font-light mb-12">
          Our <span className="alt-font italic text-white">Services</span>
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4"
              >
                {/* Icon Box */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-700 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-stone-200" strokeWidth={1} />
                </div>

                {/* Title + Text */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-xl font-medium">
                    {service.title}
                  </h3>
                  <p className="text-md md:text-md font-light leading-tighter sm:leading-relaxed text-stone-300">
                    {service.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
