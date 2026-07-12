"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Users, MapPin, Globe, Briefcase, Building2 } from "lucide-react";
import { JOBS } from "@/app/data/jobs";
import { COMPANIES } from "@/app/data/companies";
import CompanyLogo  from "@/app/components/shared/CompanyLogo";

import Link from "next/link";

export function CompanyProfilePage({
  company,
}: {
  company: any;
}) {
  const [followed, setFollowed] = useState(false);
  const companyJobs = JOBS.filter((j) => j.companyId === company.id);

  const coverGradients: Record<number, string> = {
    1: "from-[#6772E5]/25 to-[#8B7EFF]/10",
    2: "from-[#5E6AD2]/25 to-[#F05A22]/10",
    3: "from-gray-200/80 to-gray-100/60",
    4: "from-[#F24E1E]/20 to-orange-100/60",
    5: "from-gray-200/80 to-gray-100/60",
    6: "from-[#CC785C]/25 to-orange-50/60",
    7: "from-[#10A37F]/20 to-green-50/60",
    8: "from-[#625DF5]/20 to-orange-50/60",
    9: "from-gray-200/80 to-gray-100/60",
    10: "from-[#FCB400]/25 to-yellow-50/60",
    11: "from-[#E94E4E]/20 to-red-50/60",
    12: "from-[#F33F86]/20 to-pink-50/60",
  };

  return (
    <div className="pt-16 min-h-screen bg-[#FFFFFF]">
      <div
        className={`h-52 bg-gradient-to-r ${coverGradients[company.id] || "from-[#FFF3EE] to-[#FFFFFF]"} relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-5">
        <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-7 -mt-12 mb-6 relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <div className="ring-4 ring-white rounded-[20px] shadow-sm">
                <CompanyLogo company={company} size={70} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {company.name}
                </h1>
                <p className="text-[#6B7280] mt-0.5">{company.tagline}</p>
              </div>
            </div>
            <button
              onClick={() => setFollowed(!followed)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm ${
                followed
                  ? "bg-[#F05A22] text-white shadow-md shadow-orange-200/50"
                  : "border-2 border-[#F05A22] text-[#F05A22] hover:bg-[#F05A22] hover:text-white"
              }`}
            >
              {followed ? "Following" : "Follow Company"}
            </button>
          </div>

          <div className="flex flex-wrap gap-5 mt-5">
            {[
              { icon: <Building2 size={14} />, label: company.industry },
              { icon: <Users size={14} />, label: `${company.size} employees` },
              { icon: <MapPin size={14} />, label: company.location },
              { icon: <Globe size={14} />, label: company.website },
              { icon: <Briefcase size={14} />, label: `${company.openJobs} open roles` },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                <span className="text-[#F05A22]">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6 pb-14">
          <div className="space-y-5">
            <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-7">
              <h2 className="text-lg font-bold text-[#111111] mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                About {company.name}
              </h2>
              <p className="text-[#6B7280] leading-relaxed">{company.about}</p>
            </div>

            <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-7">
              <h2 className="text-lg font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Culture
              </h2>
              <div className="bg-[#FFF3EE] rounded-xl p-5 border-l-4 border-[#F05A22]">
                <p className="text-[#F05A22] italic text-[15px] leading-relaxed">
                  &ldquo;{company.culture}&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-7">
              <h2 className="text-lg font-bold text-[#111111] mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Open positions{" "}
                <span className="text-[#F05A22]">({companyJobs.length})</span>
              </h2>
              {companyJobs.length > 0 ? (
                <div className="space-y-3">
                  {companyJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-[#EAEAEA] hover:border-[#F05A22] hover:bg-[#FFFFFF] transition-all text-left group block"
                    >
                      <div>
                        <p className="font-semibold text-[#111111] text-sm group-hover:text-[#F05A22] transition-colors">
                          {job.title}
                        </p>
                        <p className="text-xs text-[#6B7280] mt-0.5">
                          {job.location} · {job.salary} · {job.type}
                        </p>
                      </div>
                      <ArrowRight size={15} className="text-[#F05A22] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#6B7280]">
                  No open positions listed currently — check back soon.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
              <h3 className="font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Benefits
              </h3>
              <div className="space-y-2.5">
                {company.benefits.map((b: string) => (
                  <div key={b} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={13} className="text-[#22C55E] flex-shrink-0" />
                    <span className="text-[#6B7280]">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
              <h3 className="font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Quick facts
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Founded", value: String(company.founded) },
                  { label: "Industry", value: company.industry },
                  { label: "Team size", value: company.size },
                  { label: "Open roles", value: String(company.openJobs) },
                  { label: "Headquarters", value: company.location },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm gap-2">
                    <span className="text-[#6B7280]">{item.label}</span>
                    <span className="font-medium text-[#111111] text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
