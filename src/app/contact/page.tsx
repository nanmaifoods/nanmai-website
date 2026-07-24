"use client";
import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { Metadata } from "next";
import { Spinner } from "@/components/ui/Spinner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-cream to-white py-16 px-4 text-center border-b border-gray-100">
        {/* Decorative broken appalam pieces */}
        <div className="absolute -top-10 -left-10 w-28 h-28 sm:-top-16 sm:-left-16 sm:w-56 sm:h-56 md:-top-24 md:-left-24 md:w-72 md:h-72 rotate-[-18deg] opacity-90 pointer-events-none">
          <div
            className="relative w-full h-full animate-appalam-float"
            style={{ animationDuration: "4.5s" }}
          >
            <Image
              src="/images/new_assets/broken1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-28 h-28 sm:-bottom-16 sm:-right-16 sm:w-56 sm:h-56 md:-bottom-24 md:-right-24 md:w-72 md:h-72 rotate-[14deg] opacity-90 pointer-events-none">
          <div
            className="relative w-full h-full animate-appalam-float"
            style={{ animationDuration: "5.5s", animationDelay: "1.2s" }}
          >
            <Image
              src="/images/new_assets/broken2.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-black text-brand-dark mb-3">
            Contact Us
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            We'd love to hear from you. Send us a message and we'll respond within
            24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="font-bold text-xl">Our Contact Details</h2>

            {[
              {
                Icon: Phone,
                title: "Phone",
                lines: ["+91 9677030371", "Mon–Sat, 9am–6pm"],
                href: "tel:+919677030371",
                color: "green",
              },
              {
                Icon: Mail,
                title: "Email",
                lines: [
                  "Info@nanmai.co.in",
                  "We reply within 24 hours",
                ],
                href: "mailto:Info@nanmai.co.in",
                color: "pink",
              },
              {
                Icon: MapPin,
                title: "Address",
                lines: [
                  "Apple Infinite Solutions",
                  "No,418 2nd main road, Prakash Nagar,",
                  "Thirunindravur, Tiruvallur, Chennai - 602024",
                ],
                href: "#",
                color: "gold",
              },
              {
                Icon: Clock,
                title: "Business Hours",
                lines: ["Mon–Fri: 9am–6pm", "Sat: 9am–2pm"],
                href: "#",
                color: "green",
              },
            ].map(({ Icon, title, lines, href, color }) => (
              <a
                key={title}
                href={href}
                className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color === "green" ? "bg-brand-green/10 text-brand-green" : color === "pink" ? "bg-brand-pink/10 text-brand-pink" : "bg-brand-gold/20 text-brand-gold"} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-brand-dark">
                    {title}
                  </div>
                  {lines.map((l, i) => (
                    <div key={i} className="text-sm text-gray-500">
                      {l}
                    </div>
                  ))}
                </div>
              </a>
            ))}

          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="font-bold text-xl mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+91 9842504050"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Subject *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, subject: e.target.value }))
                      }
                      className="input-field"
                    >
                      <option value="">Select subject</option>
                      <option>Order Inquiry</option>
                      <option>Product Question</option>
                      <option>Bulk Order</option>
                      <option>Feedback</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-4"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Spinner size={56} />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
