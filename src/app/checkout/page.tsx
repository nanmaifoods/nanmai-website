"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import {
  Shield,
  CreditCard,
  ArrowRight,
  Lock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { initiatePayment } from "@/lib/razorpay";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<ShippingInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);

  const subtotal = totalPrice();
  const shipping = subtotal >= 499 ? 0 : 60;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }
    setLoading(true);
    try {
      // Create Razorpay order via API
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          customerInfo: info,
          items,
        }),
      });
      const order = await res.json();
      if (!order.id) throw new Error("Failed to create order");

      await initiatePayment({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: total * 100,
        currency: "INR",
        name: "Nanmai Appalam",
        description: `Order #${order.receipt}`,
        order_id: order.id,
        prefill: { name: info.name, email: info.email, contact: info.phone },
        theme: { color: "#12A6DF" },
        handler: async (response) => {
          const verify = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              orderData: { ...info, items, total, orderId: order.receipt },
            }),
          });
          const result = await verify.json();
          if (result.success) {
            clearCart();
            toast.success("Order placed successfully!");
            router.push(`/order-success?orderId=${result.orderId}`);
          } else {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });
    } catch (err) {
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  const update = (k: keyof ShippingInfo, v: string) =>
    setInfo((f) => ({ ...f, [k]: v }));

  if (!items.length) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-display text-2xl font-bold mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">Add some delicious appalams first!</p>
        <Link href="/products" className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Lock size={18} className="text-brand-green" />
          <h1 className="font-display text-2xl font-bold">Secure Checkout</h1>
        </div>

        <form onSubmit={handlePayment}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left – Form */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-card">
                <h2 className="font-bold text-lg mb-5">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        required
                        value={info.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        required
                        value={info.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={info.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Street Address *
                    </label>
                    <input
                      required
                      value={info.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="House/Flat no., Street, Locality"
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        City *
                      </label>
                      <input
                        required
                        value={info.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="Chennai"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        State *
                      </label>
                      <select
                        required
                        value={info.state}
                        onChange={(e) => update("state", e.target.value)}
                        className="input-field"
                      >
                        <option value="">State</option>
                        {[
                          "Tamil Nadu",
                          "Karnataka",
                          "Andhra Pradesh",
                          "Telangana",
                          "Kerala",
                          "Maharashtra",
                          "Delhi",
                          "Gujarat",
                          "Rajasthan",
                          "Other",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Pincode *
                      </label>
                      <input
                        required
                        value={info.pincode}
                        onChange={(e) => update("pincode", e.target.value)}
                        placeholder="600001"
                        maxLength={6}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security badges */}
              <div className="bg-white rounded-3xl p-5 shadow-card">
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  {[
                    { Icon: Shield, label: "SSL Secured" },
                    { Icon: Lock, label: "256-bit Encryption" },
                    { Icon: CreditCard, label: "Razorpay Secured" },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Icon size={16} className="text-brand-green" /> {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – Summary */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl shadow-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 font-bold text-base border-b border-gray-100"
                >
                  Order Summary ({items.length} items)
                  {orderSummaryOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {orderSummaryOpen && (
                  <div className="px-6 py-4 space-y-3 max-h-72 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3"
                      >
                        <div className="w-12 h-12 bg-brand-cream rounded-xl flex items-center justify-center text-2xl shrink-0">
                          🫓
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">
                            {item.product.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.product.weight} × {item.quantity}
                          </div>
                        </div>
                        <span className="font-bold text-brand-pink shrink-0">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="px-6 py-4 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0 ? "text-brand-green font-semibold" : ""
                      }
                    >
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between font-black text-lg border-t border-gray-100 pt-3">
                    <span>Total</span>
                    <span className="text-brand-pink">₹{total}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-brand-green/10 rounded-2xl px-4 py-3 text-sm text-brand-green font-medium">
                  🌿 Add ₹{499 - subtotal} more for FREE delivery!
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-4 text-base"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} /> Pay ₹{total} Securely
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400">
                Powered by <span className="font-semibold">Razorpay</span>. All
                payments are 100% secure & encrypted.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
