"use client";

import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/app/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-purple uppercase mb-3">
            Testimonials
          </span>
          <h2
            className="text-3xl font-bold text-charcoal mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            What people are saying
          </h2>
          <p className="text-charcoal-50">
            Join thousands of professionals who found their dream job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-6 border-l-4 border-l-purple border border-border hover:shadow-lg hover:shadow-purple/[0.08] transition-all duration-200 group flex flex-col"
            >
              {/* Star rating — purple */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-purple fill-purple" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={18} className="text-purple-light mb-2 fill-purple-light" />

              <p className="text-charcoal-80 text-sm leading-relaxed mb-5 flex-1">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple to-purple-dark flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                  <p className="text-xs text-charcoal-50">{t.role}</p>
                </div>
                {/* Verified badge */}
                <div className="ml-auto flex items-center gap-1 px-2.5 py-1 bg-purple-light rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple" />
                  <span className="text-[10px] font-semibold text-purple-dark">Hired</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
