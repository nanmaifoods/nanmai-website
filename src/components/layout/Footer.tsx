import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer({ showNewsletter = true }: { showNewsletter?: boolean }) {
  return (
    <footer className="bg-white text-black">
      {showNewsletter && (
        <div className="bg-gradient-to-r from-brand-pink to-brand-green py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Stay in the Loop
          </h3>
          <p className="text-white/80 mb-6">
            Get exclusive deals, new product launches & recipes!
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            action="/api/subscribe"
            method="POST"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full text-brand-dark bg-white outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-brand-pink font-bold rounded-full hover:bg-brand-cream transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/logo.svg" alt="Nanmai Appalam" className="h-14" />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
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
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-pink hover:text-white transition-colors flex items-center justify-center"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-black mb-4 text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-600">
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
          <h4 className="font-semibold text-black mb-4 text-sm uppercase tracking-wider">
            Our Products
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-600">
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
          <h4 className="font-semibold text-black mb-4 text-sm uppercase tracking-wider">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
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
                href="tel:+919876543210"
                className="hover:text-brand-pink transition-colors"
              >
                +91 9842504050
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-brand-pink shrink-0" />
              <a
                href="mailto:kothandapani6776@gmail.com"
                className="hover:text-brand-pink transition-colors"
              >
                kothandapani6776@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Nanmai Appalam. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy-policy"
              className="hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-gray-700 transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
