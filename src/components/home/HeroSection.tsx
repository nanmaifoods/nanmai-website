import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop / tablet hero (top 15% of source image cropped off) */}
      <div className="relative hidden sm:block w-full aspect-[3536/1513]">
        <Image
          src="/images/new_assets/Crispy delights and authentic flavors.png"
          alt="Nanmai Appalam - Crispy Goodness, Authentic Taste"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-x-0 top-[76.5%] -translate-y-1/2 flex items-center justify-center gap-4 md:gap-6 px-4">
          <div className="animate-float">
            <Link
              href="/products"
              className="btn-primary text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8 lg:px-9 py-2 sm:py-2.5 md:py-3"
            >
              Shop Now
            </Link>
          </div>
          <div className="animate-float [animation-delay:0.5s]">
            <Link
              href="/about"
              className="btn-secondary text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8 lg:px-9 py-2 sm:py-2.5 md:py-3 bg-white/70 backdrop-blur-sm"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile hero */}
      <div className="relative block sm:hidden w-full aspect-[862/1608]">
        <Image
          src="/images/new_assets/file_00000000373071faa52116db7b83d462.png"
          alt="Nanmai Appalam - Crispy Goodness, Authentic Taste"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 top-[59%] -translate-y-1/2 flex items-center justify-center gap-3 px-4">
          <div className="animate-float">
            <Link
              href="/products"
              className="btn-primary text-sm px-5 py-2.5 gap-1.5"
            >
              Shop Now
            </Link>
          </div>
          <div className="animate-float [animation-delay:0.5s]">
            <Link
              href="/about"
              className="btn-secondary text-sm px-5 py-2.5 gap-1.5 bg-white/70 backdrop-blur-sm"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
