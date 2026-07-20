"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }
    if (!password) {
      setFormError("Please enter your password.");
      return;
    }

    try {
      await login(email.trim(), password);
      router.push("/dashboard");
    } catch {
      // error is surfaced via the store error state
    }
  };

  const displayError = formError ?? error;

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-5"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-purple/[0.04] blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue/[0.03] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl border border-border shadow-lg shadow-black/[0.05] p-8 md:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-[10px] bg-purple flex items-center justify-center shadow-sm shadow-purple/20">
              <Sparkles size={14} className="text-white" />
            </div>
            <span
              className="font-bold text-[17px] text-charcoal tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              TalentFlow
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-[26px] font-bold text-charcoal leading-tight mb-1.5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Welcome back
            </h1>
            <p className="text-charcoal-50 text-sm leading-relaxed font-medium">
              Sign in to continue discovering your next opportunity.
            </p>
          </div>

          {/* Error Banner */}
          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100 mb-6"
            >
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 leading-snug">{displayError}</p>
            </motion.div>
          )}

          {/* Form */}
          <form id="login-form" onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-semibold text-charcoal">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-30 pointer-events-none"
                />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-border-light text-charcoal placeholder-charcoal-30 text-sm focus:outline-none focus:ring-2 focus:ring-purple/20 focus:border-purple focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="block text-xs font-semibold text-charcoal">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-purple font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-30 pointer-events-none"
                />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-border bg-border-light text-charcoal placeholder-charcoal-30 text-sm focus:outline-none focus:ring-2 focus:ring-purple/20 focus:border-purple focus:bg-white transition-all"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-30 hover:text-charcoal-50 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-purple hover:bg-purple-dark text-white font-semibold text-sm transition-all duration-200 shadow-sm shadow-purple/25 hover:shadow-md hover:shadow-purple/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border-light" />
            <span className="text-xs text-charcoal-30 font-medium font-mono">or</span>
            <div className="flex-1 h-px bg-border-light" />
          </div>

          {/* Google OAuth */}
          <button
            id="login-google"
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-6 rounded-lg border border-border bg-white hover:bg-border-light text-charcoal font-semibold text-sm transition-all duration-200 hover:border-purple/30 hover:shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087C16.6582 14.0127 17.64 11.8059 17.64 9.2045z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.8591-3.0477.8591-2.3441 0-4.3282-1.5832-5.036-3.7105H.957v2.3318C2.4382 15.9836 5.4818 18 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71c-.18-.54-.2818-1.1168-.2818-1.71s.1018-1.17.2818-1.71V4.9582H.957A8.9965 8.9965 0 000 9c0 1.4523.3477 2.8268.957 4.0418L3.964 10.71z" fill="#FBBC05"/>
              <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4627.8918 11.4255 0 9 0 5.4818 0 2.4382 2.0164.957 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign-up link */}
          <p className="text-center text-sm text-charcoal-50 mt-6 font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-purple font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-charcoal-30 mt-5">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-charcoal-50">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-charcoal-50">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}
