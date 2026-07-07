"use client";

import { type Job } from "@/app/data/jobs";

export function JobRequirements({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
      <h2 className="font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        Requirements
      </h2>
      <ul className="space-y-3">
        {job.requirements.map((r) => (
          <li key={r} className="flex items-start gap-2.5 text-sm text-[#6B7280]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F05A22] mt-2 flex-shrink-0" />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
