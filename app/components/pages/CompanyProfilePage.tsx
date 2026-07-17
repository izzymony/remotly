"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Users, MapPin, Globe, Briefcase, Building2, Star, ThumbsUp, Heart, Award } from "lucide-react";
import { JOBS } from "@/app/data/jobs";
import CompanyLogo from "@/app/components/shared/CompanyLogo";
import Link from "next/link";

export function CompanyProfilePage({
  company,
}: {
  company: any;
}) {
  const [followed, setFollowed] = useState(false);
  const companyJobs = JOBS.filter((j) => j.companyId === company.id);

  // Soft cream/sage premium cover gradients
  const coverGradients: Record<number, string> = {
    1: "from-[#D5E2DB] to-[#FAF9F7]",
    2: "from-[#D6E6DF] to-[#EBF2EE]",
    3: "from-[#DFE7E2] to-[#FAF9F7]",
    4: "from-[#D5DFD9] to-[#EBF2EE]",
    5: "from-[#DFE5DF] to-[#FAF9F7]",
    6: "from-[#D2DFD7] to-[#EBF2EE]",
    7: "from-[#D8E4DD] to-[#FAF9F7]",
    8: "from-[#E3ECE6] to-[#FAF9F7]",
    9: "from-[#D0DED5] to-[#EBF2EE]",
    10: "from-[#DFE6E1] to-[#FAF9F7]",
    11: "from-[#E5ECE8] to-[#FAF9F7]",
    12: "from-[#D2E0D7] to-[#EBF2EE]",
  };

  // Generate mock rating info based on company name
  const getMockRating = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const score = 4.0 + (Math.abs(hash) % 10) / 10;
    const reviews = 12 + (Math.abs(hash) % 180);
    const recRate = 78 + (Math.abs(hash) % 21);
    const ceoApproval = 82 + (Math.abs(hash) % 17);
    return {
      score: score.toFixed(1),
      reviews,
      recRate,
      ceoApproval,
      culture: (score - 0.1).toFixed(1),
      growth: (score + 0.1 > 5 ? 5.0 : score + 0.1).toFixed(1),
      balance: (score - 0.2).toFixed(1),
      comp: (score + 0.2 > 5 ? 5.0 : score + 0.2).toFixed(1),
    };
  };

  const ratingInfo = getMockRating(company.name);

  return (
    <div className="pt-16 min-h-screen bg-[#FAF9F7]">
      {/* Cover Banner */}
      <div
        className={`h-56 bg-gradient-to-r ${coverGradients[company.id] || "from-[#E3ECE6] to-[#FAF9F7]"} relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #5A7A6A 1px, transparent 1px), radial-gradient(circle at 80% 50%, #5A7A6A 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F7] via-transparent to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-5">
        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-[#E4EBE6] p-7 -mt-16 mb-6 relative shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-5">
            <div className="flex items-center gap-5">
              <div className="ring-4 ring-white rounded-2xl shadow-md bg-white">
                <CompanyLogo company={company} size={76} />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {company.name}
                  </h1>
                  {/* Verified Rating badge */}
                  <div className="flex items-center gap-1 bg-[#EBF2EE] text-[#5A7A6A] px-2.5 py-0.5 rounded-lg text-sm font-bold">
                    <Star size={13} className="fill-[#5A7A6A] text-[#5A7A6A]" />
                    <span>{ratingInfo.score}</span>
                    <span className="text-xs text-[#6E7A6E] font-medium font-mono">({ratingInfo.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-[#6E7A6E] mt-1 font-medium">{company.tagline}</p>
              </div>
            </div>
            <button
              onClick={() => setFollowed(!followed)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm ${
                followed
                  ? "bg-[#5A7A6A] text-white shadow-md shadow-[#5A7A6A]/20"
                  : "border-2 border-[#5A7A6A] text-[#5A7A6A] hover:bg-[#5A7A6A] hover:text-white"
              }`}
            >
              {followed ? "Following" : "Follow Company"}
            </button>
          </div>

          <div className="flex flex-wrap gap-5 mt-6 pt-5 border-t border-[#EEF3EF]">
            {[
              { icon: <Building2 size={14} />, label: company.industry },
              { icon: <Users size={14} />, label: `${company.size} employees` },
              { icon: <MapPin size={14} />, label: company.location },
              { icon: <Globe size={14} />, label: company.website },
              { icon: <Briefcase size={14} />, label: `${company.openJobs} open roles` },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-[#6E7A6E] font-medium">
                <span className="text-[#5A7A6A]">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid lg:grid-cols-[1fr_310px] gap-6 pb-16">
          <div className="space-y-6">
            {/* About */}
            <div className="bg-white rounded-3xl border border-[#E4EBE6] p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                About {company.name}
              </h2>
              <p className="text-[#6E7A6E] leading-relaxed text-[15px]">{company.about}</p>
            </div>

            {/* Ratings & Employer Reviews breakdown */}
            <div className="bg-white rounded-3xl border border-[#E4EBE6] p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Workplace Ratings
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { score: ratingInfo.score, title: "Overall Rating", desc: `Based on ${ratingInfo.reviews} reviews` },
                  { score: `${ratingInfo.recRate}%`, title: "Recommend to Friend", desc: "Share with peers" },
                  { score: `${ratingInfo.ceoApproval}%`, title: "CEO Approval", desc: `Support of leadership` },
                  { score: "4.8", title: "Job Security", desc: "Stable prospects" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-[#FAF9F7] rounded-2xl p-4 text-center border border-[#EEF3EF]">
                    <div className="text-2xl font-extrabold text-[#5A7A6A]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {stat.score}
                    </div>
                    <div className="text-xs font-bold text-[#2C2C2C] mt-1">{stat.title}</div>
                    <div className="text-[10px] text-[#7A7A7A] mt-0.5">{stat.desc}</div>
                  </div>
                ))}
              </div>

              {/* Progress bars of rating components */}
              <div className="space-y-3.5 pt-4 border-t border-[#EEF3EF]">
                {[
                  { label: "Culture & Values", val: ratingInfo.culture, icon: <Heart size={14} /> },
                  { label: "Career Opportunities", val: ratingInfo.growth, icon: <Award size={14} /> },
                  { label: "Work-Life Balance", val: ratingInfo.balance, icon: <ThumbsUp size={14} /> },
                  { label: "Compensation & Benefits", val: ratingInfo.comp, icon: <Star size={14} /> }
                ].map((bar, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#4A4A4A] w-48">
                      <span className="text-[#5A7A6A]">{bar.icon}</span>
                      {bar.label}
                    </div>
                    <div className="flex-1 h-2 bg-[#EBF2EE] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#5A7A6A] rounded-full"
                        style={{ width: `${(parseFloat(bar.val) / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-[#5A7A6A] w-8 text-right font-mono">{bar.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Culture */}
            <div className="bg-white rounded-3xl border border-[#E4EBE6] p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Culture & Mission
              </h2>
              <div className="bg-[#EBF2EE] rounded-2xl p-6 border-l-4 border-[#5A7A6A]">
                <p className="text-[#3D5C4E] italic text-[15px] leading-relaxed">
                  &ldquo;{company.culture}&rdquo;
                </p>
              </div>
            </div>

            {/* Open positions */}
            <div className="bg-white rounded-3xl border border-[#E4EBE6] p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Open positions{" "}
                <span className="text-[#5A7A6A]">({companyJobs.length})</span>
              </h2>
              {companyJobs.length > 0 ? (
                <div className="space-y-3">
                  {companyJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-[#E4EBE6] hover:border-[#5A7A6A] hover:bg-[#FAF9F7] transition-all text-left group block"
                    >
                      <div>
                        <p className="font-semibold text-[#2C2C2C] text-sm group-hover:text-[#5A7A6A] transition-colors">
                          {job.title}
                        </p>
                        <p className="text-xs text-[#6E7A6E] mt-0.5">
                          {job.location} · {job.salary} · {job.type}
                        </p>
                      </div>
                      <ArrowRight size={15} className="text-[#5A7A6A] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#6E7A6E]">
                  No open positions listed currently — check back soon.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm">
              <h3 className="font-bold text-[#2C2C2C] mb-4 text-[17px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Benefits
              </h3>
              <div className="space-y-2.5">
                {company.benefits.map((b: string) => (
                  <div key={b} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle size={14} className="text-[#6B9E7E] flex-shrink-0" />
                    <span className="text-[#6E7A6E]">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm">
              <h3 className="font-bold text-[#2C2C2C] mb-4 text-[17px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
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
                    <span className="text-[#6E7A6E] font-medium">{item.label}</span>
                    <span className="font-semibold text-[#2C2C2C] text-right">{item.value}</span>
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
