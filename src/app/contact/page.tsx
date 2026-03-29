"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { Metadata } from "next";

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
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-cream to-white py-16 px-4 text-center border-b border-gray-100">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="font-bold text-xl">Our Contact Details</h2>

            {[
              {
                Icon: Phone,
                title: "Phone",
                lines: ["+91 9842504050", "Mon–Sat, 9am–6pm"],
                href: "tel:+919876543210",
                color: "green",
              },
              {
                Icon: Mail,
                title: "Email",
                lines: [
                  "kothandapani6776@gmail.com",
                  "We reply within 24 hours",
                ],
                href: "mailto:kothandapani6776@gmail.com",
                color: "pink",
              },
              {
                Icon: MapPin,
                title: "Address",
                lines: ["123 Temple Street,", "Chennai, Tamil Nadu 600001"],
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

            <div className="p-5 rounded-2xl bg-brand-green/10 border border-brand-green/20">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle size={16} className="text-brand-green" />
                <span className="font-semibold text-sm">
                  Quick Response on WhatsApp
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                For urgent queries and order support, WhatsApp us for the
                fastest response.
              </p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green text-sm py-2 px-4 inline-flex"
              >
                Chat on WhatsApp
              </a>
            </div>
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
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
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
