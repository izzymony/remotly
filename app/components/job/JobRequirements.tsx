"use client";

import { type Job } from "@/app/data/jobs";

export function JobRequirements({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm shadow-black/[0.01]">
      <h2 className="font-bold text-[#2C2C2C] mb-4 text-[15px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        Requirements
      </h2>
      <ul className="space-y-3">
        {job.requirements.map((r) => (
          <li key={r} className="flex items-start gap-2.5 text-sm text-[#6E7A6E] font-medium leading-relaxed">
            <div className="w-1.5 h-1.5 rounded-full bg-[#5A7A6A] mt-2 flex-shrink-0" />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
