"use client";

import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/app/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-[#FAF9F7] py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#5A7A6A] uppercase mb-3">
            Testimonials
          </span>
          <h2
            className="text-3xl font-bold text-[#2C2C2C] mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            What people are saying
          </h2>
          <p className="text-[#6E7A6E]">
            Join thousands of professionals who found their dream job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-[#E4EBE6] hover:border-[#5A7A6A]/30 hover:shadow-lg hover:shadow-[#5A7A6A]/[0.07] transition-all duration-200 group flex flex-col"
            >
              {/* Star rating — sage green */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-[#5A7A6A] fill-[#5A7A6A]" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={18} className="text-[#EBF2EE] mb-2 fill-[#EBF2EE]" />

              <p className="text-[#4A4A4A] text-sm leading-relaxed mb-5 flex-1">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#EEF3EF]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5A7A6A] to-[#6B9E7E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#2C2C2C] text-sm">{t.name}</p>
                  <p className="text-xs text-[#7A7A7A]">{t.role}</p>
                </div>
                {/* Verified badge */}
                <div className="ml-auto flex items-center gap-1 px-2.5 py-1 bg-[#EBF2EE] rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5A7A6A]" />
                  <span className="text-[10px] font-semibold text-[#5A7A6A]">Hired</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
