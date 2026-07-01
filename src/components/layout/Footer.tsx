import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-cream">
      {/* Free Delivery Banner */}
      <div className="bg-gradient-to-r from-brand-pink to-brand-green py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-black text-white mb-1">
              Free Delivery on Every Order
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              No minimum order. No hidden charges. Delivered fresh to your doorstep.
            </p>
          </div>
          <Link
            href="/products"
            className="shrink-0 px-8 py-3 bg-white text-brand-pink font-bold rounded-full hover:bg-brand-cream transition-colors whitespace-nowrap shadow-md"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/footer-nanmai-logo-square.png" alt="Nanmai Appalam" className="h-24 w-24 object-cover mix-blend-screen" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Perfect for everyday meals or special occasions, our appalams add a
            light and flavorful crunch that completes every plate.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, href: "#" },
              { Icon: Facebook, href: "#" },
              { Icon: Youtube, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-brand-pink hover:text-white transition-colors flex items-center justify-center"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-brand-cream mb-4 text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[
              ["/", "Home"],
              ["/about", "About Us"],
              ["/products", "Products"],
              ["/blogs", "Blogs"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-brand-pink transition-colors hover:pl-1 duration-200 block"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-semibold text-brand-cream mb-4 text-sm uppercase tracking-wider">
            Our Products
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[
              "Classic Appalam",
              "Garlic Appalam",
              "Pepper Appalam",
              "Cumin Appalam",
              "Mini Appalam",
            ].map((p) => (
              <li key={p}>
                <Link
                  href="/products"
                  className="hover:text-brand-pink transition-colors hover:pl-1 duration-200 block"
                >
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-brand-cream mb-4 text-sm uppercase tracking-wider">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-brand-pink mt-0.5 shrink-0" />
              <span>
                Apple Infinite Solutions No,418 2nd main road, Prakash Nagar,
                Thirunindravur, Tiruvallur, Chennai - 602024
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-brand-pink shrink-0" />
              <a
                href="tel:+919677030371"
                className="hover:text-brand-pink transition-colors"
              >
                +91 9677030371
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-brand-pink shrink-0" />
              <a
                href="mailto:Nanmaifoods2025@gmail.com"
                className="hover:text-brand-pink transition-colors"
              >
                Nanmaifoods2025@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Nanmai Appalam. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy-policy"
              className="hover:text-brand-cream transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-brand-cream transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-brand-cream transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
