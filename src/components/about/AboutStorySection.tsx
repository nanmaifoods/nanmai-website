"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const imageVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.25 },
  },
};

const viewportConfig = {
  once: true,
  amount: 0.3,
  margin: "-150px 0px -150px 0px",
} as const;

interface AboutStorySectionProps {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt?: string;
  imageClassName?: string;
  imageOnLeft?: boolean;
  sectionClassName?: string;
  children: ReactNode;
}

export function AboutStorySection({
  eyebrow,
  title,
  image,
  imageAlt = "Nanmai Appalam",
  imageClassName = "",
  imageOnLeft = false,
  sectionClassName = "",
  children,
}: AboutStorySectionProps) {
  const imageBlock = (
    <motion.div
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={`relative rounded-3xl overflow-hidden aspect-[4/3] ${imageClassName} ${
        imageOnLeft ? "order-last lg:order-first" : ""
      }`}
    >
      <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
    </motion.div>
  );

  const textBlock = (
    <motion.div
      variants={textVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
        {eyebrow}
      </p>
      <h2 className="section-title mb-5">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </motion.div>
  );

  return (
    <section className={`py-20 px-4 ${sectionClassName}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {imageOnLeft ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  );
}
