"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="px-5 py-20 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="relative bg-[#5A7A6A] rounded-[28px] p-12 overflow-hidden text-center">
          {/* Subtle texture */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/[0.07]" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/[0.05]" />
            <div className="absolute top-1/2 right-10 w-28 h-28 rounded-full bg-white/[0.04]" />
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 rounded-full text-white/90 text-sm mb-6 border border-white/20">
              <Sparkles size={13} />
              <span>850,000+ professionals trust TalentFlow</span>
            </div>

            <h2
              className="text-3xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Ready to find your<br />dream job?
            </h2>
            <p className="text-white/70 mb-8 text-[15px] max-w-sm mx-auto leading-relaxed">
              Your next opportunity is waiting. Join the community of modern professionals today.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#5A7A6A] px-8 py-3 rounded-xl font-semibold hover:bg-[#F4F8F5] transition-colors shadow-sm group"
              >
                Explore Jobs
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/companies"
                className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
