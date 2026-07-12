"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Building2, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

interface CompanyCardProps {
  companies?: any[];
}

export function CompanyCard({ companies: passedCompanies }: CompanyCardProps) {
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const { data: fetchedData, isLoading, error } = useQuery({
    queryKey: ["companies"],
    enabled: !passedCompanies,
    queryFn: async () => {
      const res = await fetch("/api/companies", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch companies from API");
      }

      const payload = await res.json();
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload?.companies)) return payload.companies;
      if (Array.isArray(payload?.data)) return payload.data;
      return [];
    },
  });

  if (!passedCompanies && isLoading) return (
    <div className="flex h-48 w-full items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#F05A22] border-t-transparent" />
    </div>
  );
  if (!passedCompanies && error) return <div className="p-4 text-sm text-red-500">Error loading companies</div>;

  const data = passedCompanies ?? fetchedData;

  return (
    <div className="grid px-8 mt-6 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data?.map((company: Record<string, any>, index: number) => {
        const companyId = String(company.company_id || company.id || company.name || `company-${index}`);
        const isFollowing = Boolean(followed[companyId]);
        const logoValue = typeof company.logo_url === "string"
          ? company.logo_url
          : typeof company.logo === "string"
            ? company.logo
            : "";
        const hasValidImageUrl = (() => {
          if (!logoValue) return false;
          if (typeof logoValue !== "string") return false;
          if (logoValue.startsWith("#")) return false;
          try {
            const parsed = new URL(logoValue);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
          } catch {
            return false;
          }
        })();

        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-orange-200/60 hover:shadow-xl hover:shadow-orange-500/5"
            key={companyId}
          >
            {/* Subtle background gradient on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/0 transition-colors duration-500 group-hover:from-orange-50/50 group-hover:to-transparent" />

            <div className="relative z-10 flex items-start justify-between">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
                {hasValidImageUrl ? (
                  <img
                    src={logoValue}
                    alt={String(company.name || "Company logo")}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F05A22] to-orange-400 text-lg font-bold text-white" style={{ backgroundColor: typeof company.logo === 'string' && company.logo.startsWith('#') ? company.logo : undefined }}>
                    {String(company.name || "C").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFollowed((current) => ({ ...current, [companyId]: !current[companyId] }));
                }}
                className="flex h-8 items-center justify-center rounded-full px-4 text-xs font-semibold tracking-wide transition-all duration-300 border border-gray-200 bg-white text-gray-700 hover:border-[#F05A22] hover:bg-orange-50 hover:text-[#F05A22]"
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <div className="relative z-10 mt-5">
              <Link href={`/companies/${companyId}`} className="block">
                <h3 className="mb-1 text-lg font-bold tracking-tight text-gray-900 transition-colors group-hover:text-[#F05A22]">
                  {String(company.name ?? "")}
                </h3>
              </Link>
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                {String(company.description || company.tagline || "Explore opportunities with this team and discover what it's like to work here.")}
              </p>
            </div>

            <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2">
              {company.industry ? (
                <span className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                  <Briefcase size={12} className="text-gray-400" />
                  {String(company.industry)}
                </span>
              ) : null}
              {company.location ? (
                <span className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                  <MapPin size={12} className="text-gray-400" />
                  {String(company.location)}
                </span>
              ) : null}
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-gray-100 pt-4 transition-colors group-hover:border-orange-100">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-[#F05A22]">
                  <Building2 size={13} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  <span className="text-[#F05A22]">{String(company.job_count ?? company.openJobs ?? 0)}</span> open roles
                </span>
              </div>
              <Link
                href={`/companies/${companyId}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-[#F05A22] hover:text-white"
              >
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
