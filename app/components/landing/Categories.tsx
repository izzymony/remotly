"use client";

import { useRouter } from "next/navigation";
import { Code2, Palette, TrendingUp, Layers, Database, Cpu } from "lucide-react";
import { CATEGORIES } from "@/app/data/categories";

export function Categories() {
  const router = useRouter();
  const iconMap: Record<string, React.ReactNode> = {
    Engineering: <Code2 size={20} />,
    Design: <Palette size={20} />,
    Marketing: <TrendingUp size={20} />,
    Product: <Layers size={20} />,
    Data: <Database size={20} />,
    "AI/ML": <Cpu size={20} />,
  };

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-9">
          <h2 className="text-3xl font-bold text-[#111111] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Browse by category
          </h2>
          <p className="text-[#6B7280]">Find opportunities in the field that excites you most.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => router.push(`/jobs?category=${encodeURIComponent(cat.name)}`)}
              className="group bg-[#F8F8F8] hover:bg-white border border-[#E8E8E8] rounded-[20px] p-5 text-left transition-all hover:shadow-lg hover:shadow-orange-100/40 hover:border-orange-200"
            >
              <div
                className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                style={{ backgroundColor: cat.color + "18", color: cat.color }}
              >
                {iconMap[cat.name]}
              </div>
              <p className="font-semibold text-[#111111] text-sm mb-0.5">{cat.name}</p>
              <p className="text-xs text-[#6B7280]">{cat.count.toLocaleString()} jobs</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
