"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Eye,
  FileText,
  ChevronRight,
  Users,
  Sparkles,
  Clock,
  CheckCircle,
} from "lucide-react";
import { JOBS } from "@/app/data/jobs";
import { COMPANIES } from "@/app/data/companies";
import CompanyLogo  from "@/app/components/shared/CompanyLogo";

import Link from "next/link";
import { useSavedJobs } from "@/app/components/provider";

export function DashboardPage() {
  const { savedJobs } = useSavedJobs();
  const savedJobsList = JOBS.filter((j) => savedJobs.has(j.id));
  const recommendedJobs = JOBS.filter((j) => !savedJobs.has(j.id) && j.featured).slice(0, 4);

  const stats = [
    { label: "Saved Jobs", value: savedJobsList.length, icon: <Bookmark size={19} />, color: "#F05A22", bg: "#FFF3EE" },
    { label: "Applications", value: 3, icon: <FileText size={19} />, color: "#10A37F", bg: "#DCFCE7" },
    { label: "Profile Views", value: 48, icon: <Eye size={19} />, color: "#F59E0B", bg: "#FEF3C7" },
    { label: "Interviews", value: 1, icon: <Users size={19} />, color: "#F24E1E", bg: "#FFEDD5" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Good morning, Alex 👋
            </h1>
            <p className="text-[#6B7280] text-sm mt-0.5">
              Here&apos;s your job search overview.
            </p>
          </div>
          <Link
            href="/jobs"
            className="bg-[#F05A22] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#D94E1A] transition-colors text-sm shadow-md shadow-orange-200/50 inline-block"
          >
            Find Jobs
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-[20px] border border-[#EAEAEA] p-5">
              <div
                className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                style={{ backgroundColor: stat.bg, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#6B7280] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-[#111111]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Profile completion
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                A complete profile gets 4x more views
              </p>
            </div>
            <span className="text-lg font-bold text-[#F05A22]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              72%
            </span>
          </div>
          <div className="h-2 bg-[#FFF3EE] rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-[#F05A22] rounded-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Resume uploaded", done: true },
              { label: "Skills added", done: true },
              { label: "Portfolio link", done: false },
              { label: "LinkedIn connected", done: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
                  item.done ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F5F5F5] text-[#6B7280]"
                }`}
              >
                {item.done ? (
                  <CheckCircle size={11} />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border border-current" />
                )}
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#111111]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Saved Jobs
              </h2>
              <Link href="/saved" className="text-sm text-[#F05A22] hover:underline font-medium">
                View all
              </Link>
            </div>
            {savedJobsList.length === 0 ? (
              <div className="text-center py-8">
                <Bookmark size={22} className="mx-auto mb-2 text-[#EAEAEA]" />
                <p className="text-sm text-[#6B7280]">No saved jobs yet</p>
                <Link href="/jobs" className="mt-3 text-sm text-[#F05A22] hover:underline inline-block">
                  Explore Jobs
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {savedJobsList.slice(0, 4).map((job) => {
                  const company = COMPANIES.find((c) => c.id === job.companyId)!;
                  return (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] transition-colors text-left group block"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <CompanyLogo company={company} size={38} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#111111] text-sm truncate group-hover:text-[#F05A22] transition-colors">
                            {job.title}
                          </p>
                          <p className="text-xs text-[#6B7280]">{job.company} · {job.salary}</p>
                        </div>
                        <ChevronRight size={13} className="text-[#9CA3AF] flex-shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#111111]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Recommended for you
              </h2>
              <Link href="/jobs" className="text-sm text-[#F05A22] hover:underline font-medium">
                Explore
              </Link>
            </div>
            <div className="space-y-2">
              {recommendedJobs.map((job) => {
                const company = COMPANIES.find((c) => c.id === job.companyId)!;
                return (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] transition-colors text-left group block"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <CompanyLogo company={company} size={38} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#111111] text-sm truncate group-hover:text-[#F05A22] transition-colors">
                          {job.title}
                        </p>
                        <p className="text-xs text-[#6B7280]">{job.company} · {job.salary}</p>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#F05A22] bg-[#FFF3EE] px-2 py-1 rounded-full flex-shrink-0">
                        <Sparkles size={9} /> Match
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
            <h2 className="font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Recent searches
            </h2>
            <div className="space-y-1">
              {["Senior React Engineer", "Product Designer Remote", "ML Engineer SF", "Engineering Manager"].map(
                (search) => (
                  <Link
                    key={search}
                    href={`/jobs?q=${encodeURIComponent(search)}`}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#FFFFFF] transition-colors text-left text-sm text-[#6B7280] hover:text-[#111111] block"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock size={13} className="text-[#9CA3AF]" />
                      {search}
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
            <h2 className="font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Applications
            </h2>
            <div className="space-y-2.5">
              {[
                { title: "Frontend Engineer", company: "Stripe", status: "Interview", statusColor: "#F05A22", statusBg: "#FFF3EE" },
                { title: "Product Designer", company: "Figma", status: "Applied", statusColor: "#6B7280", statusBg: "#F5F5F5" },
                { title: "ML Research Engineer", company: "OpenAI", status: "Reviewed", statusColor: "#D97706", statusBg: "#FEF3C7" },
              ].map((app) => (
                <div key={app.title} className="flex items-center justify-between p-3.5 rounded-xl border border-[#EAEAEA] hover:border-[#E0DAFF] transition-colors">
                  <div>
                    <p className="font-medium text-[#111111] text-sm">{app.title}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{app.company}</p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1.5 rounded-full font-semibold"
                    style={{ color: app.statusColor, backgroundColor: app.statusBg }}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
