"use client";

import { type Job } from "@/app/data/jobs";

export function JobOverview({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-3xl border border-[#E4EBE6] p-7 shadow-sm shadow-black/[0.01]">
      <h2 className="text-base font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        About this role
      </h2>
      <p className="text-[#6E7A6E] text-sm leading-relaxed">{job.description}</p>
    </div>
  );
}
