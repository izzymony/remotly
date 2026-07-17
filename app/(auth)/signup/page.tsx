"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["bg-red-400", "bg-yellow-400", "bg-[#5A7A6A]"];
  const labels = ["Weak", "Fair", "Strong"];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 space-y-2"
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < score ? colors[score - 1] : "bg-[#E5E7EB]"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-[#7A7A7A]">
        Strength:{" "}
        <span className={`font-semibold ${score === 3 ? "text-[#5A7A6A]" : score === 2 ? "text-yellow-600" : "text-red-500"}`}>
          {score > 0 ? labels[score - 1] : "Too short"}
        </span>
      </p>
      <ul className="space-y-1">
        {checks.map((c) => (
          <li key={c.label} className={`flex items-center gap-1.5 text-xs ${c.pass ? "text-[#5A7A6A] font-medium" : "text-[#A8A8A8]"}`}>
            <CheckCircle2 size={12} className={c.pass ? "text-[#5A7A6A]" : "text-[#D1D5DB]"} />
            {c.label}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, error } = useAuthStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [focusedPassword, setFocusedPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!firstName.trim()) {
      setFormError("Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      setFormError("Please enter your last name.");
      return;
    }
    
    if (!email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    try {
      await signup(email.trim(), password, firstName.trim(), lastName.trim());
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setFormError(message);
    }
  };

  const displayError = formError ?? error;

  return (
    <div
      className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-5 py-10"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#5A7A6A]/[0.05] blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#6B9E7E]/[0.04] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#E4EBE6] shadow-xl shadow-black/[0.02] p-8 md:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-[10px] bg-[#5A7A6A] flex items-center justify-center shadow-sm shadow-[#5A7A6A]/20">
              <Sparkles size={14} className="text-white" />
            </div>
            <span
              className="font-bold text-[17px] text-[#2C2C2C] tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              TalentFlow
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-[26px] font-bold text-[#2C2C2C] leading-tight mb-1.5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Create your account
            </h1>
            <p className="text-[#6E7A6E] text-sm leading-relaxed font-medium">
              Join thousands finding remote-friendly opportunities that matter.
            </p>
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {displayError && (
              <motion.div
                key="signup-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100 mb-6"
              >
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 leading-snug">{displayError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form id="signup-form" onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="signup-firstname" className="block text-xs font-semibold text-[#4A4A4A]">
                  First name
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A8A8] pointer-events-none"
                  />
                  <input
                    id="signup-firstname"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Jane"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E4EBE6] bg-[#FAF9F7] text-[#2C2C2C] placeholder-[#A8A8A8] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A7A6A]/20 focus:border-[#5A7A6A] focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="signup-lastname" className="block text-xs font-semibold text-[#4A4A4A]">
                  Last name
                </label>
                <div className="relative">
                  <input
                    id="signup-lastname"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Smith"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E4EBE6] bg-[#FAF9F7] text-[#2C2C2C] placeholder-[#A8A8A8] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A7A6A]/20 focus:border-[#5A7A6A] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="signup-email" className="block text-xs font-semibold text-[#4A4A4A]">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A8A8] pointer-events-none"
                />
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E4EBE6] bg-[#FAF9F7] text-[#2C2C2C] placeholder-[#A8A8A8] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A7A6A]/20 focus:border-[#5A7A6A] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="signup-password" className="block text-xs font-semibold text-[#4A4A4A]">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A8A8] pointer-events-none"
                />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedPassword(true)}
                  onBlur={() => setFocusedPassword(false)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#E4EBE6] bg-[#FAF9F7] text-[#2C2C2C] placeholder-[#A8A8A8] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A7A6A]/20 focus:border-[#5A7A6A] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A8A8A8] hover:text-[#6E7A6E] transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {(focusedPassword || password) && <PasswordStrength password={password} />}
            </div>

            {/* Terms checkbox note */}
            <p className="text-[11px] text-[#7A7A7A] leading-relaxed pt-1">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="text-[#5A7A6A] hover:underline font-semibold">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#5A7A6A] hover:underline font-semibold">Privacy Policy</Link>.
            </p>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#5A7A6A] hover:bg-[#3D5C4E] text-white font-semibold text-sm transition-all duration-200 shadow-sm shadow-[#5A7A6A]/25 hover:shadow-md hover:shadow-[#5A7A6A]/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>
                  Create account
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#EEF3EF]" />
            <span className="text-xs text-[#A8A8A8] font-medium font-mono">or</span>
            <div className="flex-1 h-px bg-[#EEF3EF]" />
          </div>

          {/* Google OAuth */}
          <button
            id="signup-google"
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-6 rounded-xl border border-[#E4EBE6] bg-white hover:bg-[#FAF9F7] text-[#4A4A4A] font-semibold text-sm transition-all duration-200 hover:border-[#5A7A6A]/30 hover:shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087C16.6582 14.0127 17.64 11.8059 17.64 9.2045z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.8591-3.0477.8591-2.3441 0-4.3282-1.5832-5.036-3.7105H.957v2.3318C2.4382 15.9836 5.4818 18 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71c-.18-.54-.2818-1.1168-.2818-1.71s.1018-1.17.2818-1.71V4.9582H.957A8.9965 8.9965 0 000 9c0 1.4523.3477 2.8268.957 4.0418L3.964 10.71z" fill="#FBBC05"/>
              <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4627.8918 11.4255 0 9 0 5.4818 0 2.4382 2.0164.957 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-[#6E7A6E] mt-6 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-[#5A7A6A] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
