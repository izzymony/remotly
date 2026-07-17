"use client";

import { useRouter } from "next/navigation";
import { Code2, Palette, TrendingUp, Layers, Database, Cpu } from "lucide-react";
import { CATEGORIES } from "@/app/data/categories";

const ICON_MAP: Record<string, React.ReactNode> = {
  Engineering: <Code2 size={20} />,
  Design: <Palette size={20} />,
  Marketing: <TrendingUp size={20} />,
  Product: <Layers size={20} />,
  Data: <Database size={20} />,
  "AI/ML": <Cpu size={20} />,
};

// Sage-toned color overrides per category
const SAGE_COLORS: Record<string, { icon: string; bg: string }> = {
  Engineering: { icon: "#5A7A6A", bg: "#EBF2EE" },
  Design:      { icon: "#6B8FA0", bg: "#E8F1F5" },
  Marketing:   { icon: "#7A7060", bg: "#F2EEE8" },
  Product:     { icon: "#5A7A6A", bg: "#EBF2EE" },
  Data:        { icon: "#5E6EA0", bg: "#EAECF5" },
  "AI/ML":     { icon: "#7A6A8A", bg: "#F0EBF5" },
};

export function Categories() {
  const router = useRouter();

  return (
    <section className="bg-[#FAF9F7] py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#5A7A6A] uppercase mb-3">
            Browse by category
          </span>
          <h2
            className="text-3xl font-bold text-[#2C2C2C] mb-2"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Find what excites you
          </h2>
          <p className="text-[#6E7A6E]">Explore opportunities in the field you love most.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const colors = SAGE_COLORS[cat.name] ?? { icon: "#5A7A6A", bg: "#EBF2EE" };
            return (
              <button
                key={cat.name}
                onClick={() => router.push(`/jobs?category=${encodeURIComponent(cat.name)}`)}
                className="group bg-white hover:bg-[#F4F8F5] border border-[#E4EBE6] hover:border-[#5A7A6A]/30 rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-[#5A7A6A]/[0.08] hover:-translate-y-0.5"
              >
                <div
                  className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: colors.bg, color: colors.icon }}
                >
                  {ICON_MAP[cat.name]}
                </div>
                <p className="font-semibold text-[#2C2C2C] text-sm mb-0.5 group-hover:text-[#5A7A6A] transition-colors">
                  {cat.name}
                </p>
                <p className="text-xs text-[#7A7A7A]">{cat.count.toLocaleString()} roles</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
