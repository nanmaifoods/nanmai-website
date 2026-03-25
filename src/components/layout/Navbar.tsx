"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="bg-brand-green text-white text-sm py-2 px-4 text-center hidden md:block">
        <span>🌿 Free delivery on orders above ₹499 &nbsp;|&nbsp;</span>
        <span className="inline-flex items-center gap-1">
          <Phone size={12} /> +91 98765 43210
        </span>
      </div>

      <header
        className={clsx(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white",
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          {/* ── Logo: image only, no text ── */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/images/logo.svg"
                alt="Nanmai Appalam"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    pathname === href
                      ? "bg-brand-pink text-white shadow-brand"
                      : "text-gray-700 hover:bg-brand-pink/10 hover:text-brand-pink",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="hidden md:flex btn-primary text-sm py-2 px-5"
            >
              Shop Now
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-full hover:bg-brand-pink/10 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={22} className="text-brand-dark" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-pink text-white text-xs rounded-full flex items-center justify-center font-bold animate-fade-in">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
            <ul className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={clsx(
                      "block px-4 py-3 rounded-xl font-medium transition-all",
                      pathname === href
                        ? "bg-brand-pink text-white"
                        : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="btn-primary w-full justify-center mt-2"
                >
                  Shop Now
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
