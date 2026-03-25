"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Leaf } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check credentials
    const adminEmail =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL || "nanmaifoods2025@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "NanmaiAppalam@2025";

    if (email === adminEmail && password === adminPassword) {
      // Set session in localStorage
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem("adminEmail", email);
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-dark to-brand-pink/20 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-pink/20 mb-3 sm:mb-4">
            <Leaf size={28} className="text-brand-pink sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            NANMAI
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Admin Panel Login
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nanmaifoods.com"
                className="input-field w-full text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field w-full pr-10 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs sm:text-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-2.5 sm:py-3 text-sm sm:text-base"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <a
              href="/"
              className="text-xs sm:text-sm text-gray-500 hover:text-brand-pink transition-colors inline-flex items-center gap-1"
            >
              <span>←</span> Back to Website
            </a>
          </div>
        </div>

        <p className="text-center text-white/40 text-[10px] sm:text-xs mt-4 sm:mt-6">
          © 2024 Nanmai Appalam. All rights reserved.
        </p>
      </div>
    </div>
  );
}
