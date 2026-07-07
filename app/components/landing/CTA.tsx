"use client";

import { Sparkles } from "lucide-react";

export function CTA({ setPage }: { setPage: (p: string) => void }) {
  return (
    <section className="px-5 py-20 bg-[#FFFFFF]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#F05A22] rounded-[32px] p-12 relative overflow-hidden text-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute top-1/2 right-8 w-24 h-24 rounded-full bg-white/5" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Ready to find your dream job?
            </h2>
            <p className="text-white/75 mb-8 text-[15px]">
              Join 850,000+ professionals already using TalentFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setPage("search")}
                className="bg-white text-[#F05A22] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFFFFF] transition-colors shadow-sm"
              >
                Explore Jobs
              </button>
              <button
                onClick={() => setPage("companies")}
                className="border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Companies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
