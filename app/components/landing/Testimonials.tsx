"use client";

import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/app/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111111] mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            What people are saying
          </h2>
          <p className="text-[#6B7280]">Join thousands of professionals who found their dream job.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#EAEAEA]">
              <div className="flex mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-[#FCB400] fill-[#FCB400]" />
                ))}
              </div>
              <p className="text-[#111111] text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F05A22] flex items-center justify-center text-white text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#111111] text-sm">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
