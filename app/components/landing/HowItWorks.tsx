"use client";

import { Search, Bookmark, CheckCircle } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: <Search size={22} />,
    title: "Search & filter",
    desc: "Find the perfect role using powerful filters — location, salary, level, remote, and more. No noise, just signal.",
  },
  {
    step: "02",
    icon: <Bookmark size={22} />,
    title: "Save your favourites",
    desc: "Build your shortlist of dream roles and organise everything in your personal dashboard. Apply on your timeline.",
  },
  {
    step: "03",
    icon: <CheckCircle size={22} />,
    title: "Apply with confidence",
    desc: "Submit applications with detailed company insights and role information so you always walk in prepared.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold tracking-widest text-[#5A7A6A] uppercase mb-3">
          How it works
        </span>
        <h2
          className="text-3xl font-bold text-[#2C2C2C] mb-3"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Three steps to your next role
        </h2>
        <p className="text-[#6E7A6E] mb-14">Simple, streamlined, and built for modern job seekers.</p>

        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              className="relative bg-[#FAF9F7] hover:bg-white border border-[#E4EBE6] hover:border-[#5A7A6A]/30 rounded-2xl p-7 text-left transition-all duration-200 hover:shadow-lg hover:shadow-[#5A7A6A]/[0.07] group"
            >
              {/* Step number watermark */}
              <div
                className="text-5xl font-black text-[#E4EBE6] group-hover:text-[#EBF2EE] mb-4 transition-colors select-none"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {step.step}
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#EBF2EE] text-[#5A7A6A] flex items-center justify-center mb-4 group-hover:bg-[#5A7A6A] group-hover:text-white transition-all duration-200">
                {step.icon}
              </div>
              <h3
                className="font-bold text-[#2C2C2C] mb-2 group-hover:text-[#5A7A6A] transition-colors"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-[#6E7A6E] leading-relaxed">{step.desc}</p>

              {/* connector dots */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-2.5 w-5 h-5 -translate-y-1/2 z-10">
                  <div className="w-2 h-2 rounded-full bg-[#5A7A6A]/30 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
