import type { ReactNode } from "react";

interface AboutStorySectionProps {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt?: string;
  imageClassName?: string;
  imgClassName?: string;
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
  imgClassName = "",
  imageOnLeft = false,
  sectionClassName = "",
  children,
}: AboutStorySectionProps) {
  const imageBlock = (
    <div className={`w-full ${imageOnLeft ? "order-last lg:order-first" : ""}`}>
      <div
        className={`relative overflow-hidden rounded-3xl aspect-[4/3] w-full ${imageClassName}`}
      >
        <img
          src={image}
          alt={imageAlt}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </div>
    </div>
  );

  const textBlock = (
    <div>
      <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
        {eyebrow}
      </p>
      <h2 className="section-title mb-5">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </div>
  );

  return (
    <section className={`py-10 px-4 ${sectionClassName}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
