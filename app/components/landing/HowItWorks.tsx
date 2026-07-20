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
        <span className="inline-block text-xs font-semibold tracking-widest text-purple uppercase mb-3">
          How it works
        </span>
        <h2
          className="text-3xl font-bold text-charcoal mb-3"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Three steps to your next role
        </h2>
        <p className="text-charcoal-50 mb-14">Simple, streamlined, and built for modern job seekers.</p>

        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              className="relative bg-white hover:bg-purple-xlight border border-border hover:border-purple/30 rounded-xl p-7 text-left transition-all duration-200 hover:shadow-lg hover:shadow-purple/[0.08] group"
            >
              {/* Step number watermark */}
              <div
                className="text-5xl font-black text-border group-hover:text-purple-light mb-4 transition-colors select-none"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {step.step}
              </div>
              <div className="w-11 h-11 rounded-lg bg-purple-light text-purple flex items-center justify-center mb-4 group-hover:bg-purple group-hover:text-white transition-all duration-200">
                {step.icon}
              </div>
              <h3
                className="font-bold text-charcoal mb-2 group-hover:text-purple transition-colors"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-charcoal-50 leading-relaxed">{step.desc}</p>

              {/* connector dots */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-2.5 w-5 h-5 -translate-y-1/2 z-10">
                  <div className="w-2 h-2 rounded-full bg-purple/20 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
