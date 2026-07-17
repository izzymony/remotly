"use client";

import { COMPANIES } from "@/app/data/companies";
import CompanyLogo from "@/app/components/shared/CompanyLogo";
import { type Job } from "@/app/data/jobs";

export function SimilarJobs({
  jobs,
  onSelect,
}: {
  jobs: Job[];
  onSelect: (job: Job) => void;
}) {
  if (jobs.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm shadow-black/[0.01]">
      <h3 className="font-bold text-[#2C2C2C] mb-4 text-[15px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        Similar jobs
      </h3>
      <div className="space-y-1">
        {jobs.map((sj) => {
          const sjCompany = COMPANIES.find((c) => c.id === sj.companyId)!;
          return (
            <button
              key={sj.id}
              onClick={() => onSelect(sj)}
              className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF9F7] transition-all duration-150 group"
            >
              <CompanyLogo company={sjCompany} size={34} />
              <div>
                <p className="font-semibold text-[#2C2C2C] group-hover:text-[#5A7A6A] transition-colors text-sm leading-snug">
                  {sj.title}
                </p>
                <p className="text-xs text-[#6E7A6E] mt-0.5">
                  {sj.company} · {sj.salary}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
