"use client";
import { useState } from "react";
import { Save, Bell, Shield, CreditCard, Truck, Store } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [tab, setTab] = useState("store");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Settings saved!");
    setSaving(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-card p-3 h-fit">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Settings
        </p>
        {[
          { id: "store", icon: Store, label: "Store Details" },
          { id: "shipping", icon: Truck, label: "Shipping" },
          { id: "payment", icon: CreditCard, label: "Payment" },
          { id: "security", icon: Shield, label: "Security" },
          { id: "notifications", icon: Bell, label: "Notifications" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === id ? "bg-brand-pink text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <Icon size={15} className="shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-base capitalize">{tab} Settings</h3>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-sm py-2"
          >
            {saving ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={14} />
                Save
              </>
            )}
          </button>
        </div>
        <div className="p-6 space-y-5">
          {tab === "store" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Store Name
                </label>
                <input defaultValue="Nanmai Appalam" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Store Email
                </label>
                <input
                  type="email"
                  defaultValue="kothandapani6776@gmail.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input defaultValue="+91 9842504050" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Store Address
                </label>
                <textarea
                  rows={3}
                  defaultValue="Apple Infinite Solutions No,418 2nd main road, Prakash Nagar, Thirunindravur, Tiruvallur, Chennai - 602024"
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  GST Number
                </label>
                <input defaultValue="33AAAAA0000A1ZV" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Currency
                </label>
                <select className="input-field">
                  <option value="INR">INR – Indian Rupee (₹)</option>
                </select>
              </div>
            </>
          )}
          {tab === "shipping" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    defaultValue="499"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Standard Shipping Cost (₹)
                  </label>
                  <input
                    type="number"
                    defaultValue="60"
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Estimated Delivery Days
                </label>
                <input
                  defaultValue="3–5 business days"
                  className="input-field"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-[#12A6DF]"
                />
                <span className="text-sm font-medium">
                  Enable express delivery (extra charge)
                </span>
              </label>
            </>
          )}
          {tab === "payment" && (
            <>
              <div className="p-4 rounded-2xl bg-brand-green/10 text-brand-green text-sm font-medium mb-2">
                ✅ Razorpay is connected and active.
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Razorpay Key ID
                </label>
                <input
                  type="password"
                  defaultValue="rzp_live_xxxxxxxxxxxx"
                  className="input-field font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Accepted Payment Methods
                </label>
                <div className="space-y-2">
                  {[
                    "UPI (PhonePe, GPay, Paytm)",
                    "Credit/Debit Cards",
                    "Net Banking",
                    "EMI",
                    "Wallets",
                  ].map((m) => (
                    <label
                      key={m}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 accent-[#12A6DF]"
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
          {tab === "security" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@nanmaiappalam.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="New password..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password..."
                  className="input-field"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-[#12A6DF]"
                />
                <span className="text-sm font-medium">
                  Enable Two-Factor Authentication
                </span>
              </label>
            </>
          )}
          {tab === "notifications" && (
            <>
              <p className="text-sm text-gray-500 mb-3">
                Configure when you receive email notifications.
              </p>
              {[
                [
                  "New Order Received",
                  "Instant email when a new order is placed",
                ],
                ["Payment Failed", "Alert when a payment fails"],
                ["Low Stock Alert", "When product stock falls below 5 units"],
                ["Order Delivered", "When an order is marked as delivered"],
                ["New Customer Registered", "When a new customer signs up"],
                [
                  "Daily Sales Summary",
                  "Daily email with sales overview (sent at 8pm)",
                ],
              ].map(([label, desc]) => (
                <div
                  key={label}
                  className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <div className="text-sm font-semibold">{label}</div>
                    <div className="text-xs text-gray-400">{desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-[#12A6DF] mt-0.5 shrink-0 cursor-pointer"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
