"use client";

import { Bookmark, BookmarkCheck, DollarSign, MapPin, Briefcase, TrendingUp, Clock } from "lucide-react";
import { type Job } from "@/app/data/jobs";
import { type Company } from "@/app/data/companies";
import CompanyLogo from "@/app/components/shared/CompanyLogo";

export function JobHeader({
  job,
  company,
  isSaved,
  onSave,
}: {
  job: Job;
  company: Company;
  isSaved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="bg-white rounded-3xl border border-[#E4EBE6] p-7 shadow-sm shadow-black/[0.01]">
      <div className="flex items-start gap-4 mb-6">
        <CompanyLogo company={company} size={60} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2C2C2C] leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {job.title}
          </h1>
          <p className="text-[#6E7A6E] mt-1 text-sm font-semibold">
            {job.company} · {job.location}
          </p>
        </div>
        <button
          onClick={onSave}
          className="p-2 rounded-xl border border-[#E4EBE6] hover:border-[#5A7A6A] text-[#7A7A7A] hover:text-[#5A7A6A] transition-colors"
        >
          {isSaved ? (
            <BookmarkCheck size={19} className="text-[#5A7A6A] fill-[#5A7A6A]/10" />
          ) : (
            <Bookmark size={19} />
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {[
          { icon: <DollarSign size={13} />, label: job.salary },
          { icon: <MapPin size={13} />, label: job.location },
          { icon: <Briefcase size={13} />, label: job.type },
          { icon: <TrendingUp size={13} />, label: job.level },
          { icon: <Clock size={13} />, label: `Posted ${job.posted}` },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs font-semibold text-[#6E7A6E] bg-[#FAF9F7] px-3 py-2 rounded-lg border border-[#EEF3EF]">
            <span className="text-[#5A7A6A]">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((skill) => (
          <span key={skill} className="px-3 py-1.5 bg-[#EBF2EE] text-[#5A7A6A] text-xs rounded-lg font-bold border border-[#5A7A6A]/10">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
