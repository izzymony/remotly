"use client";

import { Search, Bookmark, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    { step: "01", icon: <Search size={22} />, title: "Search & filter", desc: "Find the perfect role using powerful filters — location, salary, level, remote, and more. No noise, just signal." },
    { step: "02", icon: <Bookmark size={22} />, title: "Save your favorites", desc: "Build your shortlist of dream roles and organize everything in your personal dashboard. Apply on your timeline." },
    { step: "03", icon: <CheckCircle size={22} />, title: "Apply with confidence", desc: "Submit applications with detailed company insights and role information so you always walk in prepared." },
  ];

  return (
    <section className="bg-[#FFFFFF] py-20 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#111111] mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          How TalentFlow works
        </h2>
        <p className="text-[#6B7280] mb-14">Three steps to your next great role.</p>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div key={step.step} className="bg-white rounded-[24px] p-8 border border-[#EAEAEA] text-left">
              <div className="text-5xl font-black text-[#F5F5F5] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {step.step}
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#FFF3EE] text-[#F05A22] flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-[#111111] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
