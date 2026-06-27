"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Send, MessageCircle, Award, Users } from "lucide-react";

export default function DealersClient() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    businessName: "",
    gstNumber: "",
    monthlyRequirement: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Wholesale inquiry submitted! Our team will contact you within 24 hours.");
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      businessName: "",
      gstNumber: "",
      monthlyRequirement: "",
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-brand-cream to-white py-16 px-4 text-center border-b border-gray-100">
        <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
          Wholesale Partnership
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-black text-brand-dark mb-3">
          Become a Dealer or Distributor
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Partner with Nanmai Appalam to offer premium quality traditional papads to your customers. Enjoy competitive pricing, reliable supply, and dedicated support for your wholesale business.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Direct Contact – moved to top */}
        <section className="mb-16">
          <h2 className="font-bold text-xl text-brand-dark mb-6">
            Direct Contact
          </h2>
          <p className="text-gray-500 mb-6">
            For immediate assistance with wholesale inquiries, you can also reach us directly:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-brand-dark">WhatsApp</h3>
              <p className="text-gray-500">
                <a href="https://wa.me/919677030371" className="text-brand-pink hover:underline">
                  +91 9677030371
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Send us a message for quick responses
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-brand-dark">Email</h3>
              <p className="text-gray-500">
                <a href="mailto:Nanmaifoods2025@gmail.com" className="text-brand-pink hover:underline">
                  Nanmaifoods2025@gmail.com
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Dedicated wholesale inquiry address
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-bold text-xl text-brand-dark mb-6">
            Wholesale Inquiry Form
          </h2>
          <p className="text-gray-500 mb-6">
            Please fill out the form below to start your wholesale partnership with Nanmai Appalam. We'll review your information and get back to you shortly.
          </p>
          <div className="card p-8">
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
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    type="email"
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+91 9677030371"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Business Name *
                  </label>
                  <input
                    required
                    value={form.businessName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, businessName: e.target.value }))
                    }
                    placeholder="Your business or shop name"
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    GST Number (if applicable)
                  </label>
                  <input
                    value={form.gstNumber}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, gstNumber: e.target.value }))
                    }
                    placeholder="Your GST number"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Monthly Requirement (approx.)
                  </label>
                  <select
                    value={form.monthlyRequirement}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, monthlyRequirement: e.target.value }))
                    }
                    className="input-field"
                  >
                    <option value="">Select approximate monthly requirement</option>
                    <option value="Less than 5 kg">Less than 5 kg</option>
                    <option value="5-10 kg">5-10 kg</option>
                    <option value="10-25 kg">10-25 kg</option>
                    <option value="25-50 kg">25-50 kg</option>
                    <option value="50-100 kg">50-100 kg</option>
                    <option value="More than 100 kg">More than 100 kg</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    <option>New Dealership Inquiry</option>
                    <option>Distributorship Opportunity</option>
                    <option>Bulk Order Quote</option>
                    <option>Existing Dealer Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Preferred Contact Time
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="e.g., Weekdays 10am-2pm"
                    className="input-field"
                  />
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
                  placeholder="Tell us about your business, target market, and any specific requirements..."
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
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Send size={16} /> Submit Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-bold text-2xl text-brand-dark mb-8">
            Why Partner With Nanmai Appalam?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Made from finest ingredients using traditional methods, ensuring consistent taste and crispiness.",
                color: "bg-brand-gold/20 text-brand-gold",
              },
              {
                icon: Users,
                title: "Trusted Brand",
                desc: "Established brand with loyal customer base across South India and growing nationwide.",
                color: "bg-brand-green/10 text-brand-green",
              },
              {
                icon: MessageCircle,
                title: "Dedicated Support",
                desc: "Wholesale team provides personalized assistance for orders, logistics, and marketing support.",
                color: "bg-brand-pink/10 text-brand-pink",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 group cursor-default">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-bold text-xl text-brand-dark mb-6">
            Wholesale Benefits
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-brand-dark mb-3">Competitive Pricing</h3>
              <p className="text-gray-500">
                Tiered pricing structure based on order volume, ensuring better margins for your business.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-brand-dark mb-3">Flexible Ordering</h3>
              <p className="text-gray-500">
                Minimum order quantities designed for small retailers to large distributors. Regular replenishment schedules available.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-brand-dark mb-3">Marketing Support</h3>
              <p className="text-gray-500">
                Point-of-sale materials, digital assets, and co-branded promotional campaigns to help drive sales.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-brand-dark mb-3">Reliable Logistics</h3>
              <p className="text-gray-500">
                Pan-India delivery network with tracking capabilities. Temperature-controlled warehousing to maintain product freshness.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-bold text-xl text-brand-dark mb-6">
            How It Works
          </h2>
          <ol className="space-y-6 pl-8 list-decimal">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className="text-brand-pink font-medium rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Submit Inquiry</h3>
                <p className="text-gray-500">
                  Fill out the wholesale inquiry form below with your business details and requirements.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className="text-brand-pink font-medium rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Team Review</h3>
                <p className="text-gray-500">
                  Our wholesale team reviews your application and contacts you within 24 hours to discuss terms.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className="text-brand-pink font-medium rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Account Setup</h3>
                <p className="text-gray-500">
                  Once approved, we set up your wholesale account with pricing, payment terms, and delivery schedule.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className="text-brand-pink font-medium rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Start Ordering</h3>
                <p className="text-gray-500">
                  Place your first wholesale order and enjoy seamless replenishment for your business.
                </p>
              </div>
            </li>
          </ol>
        </section>


      </div>
    </div>
  );
}
