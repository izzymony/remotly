"use client";

import { ArrowRight } from "lucide-react";
import { COMPANIES } from "@/app/data/companies";
import { CompanyCard } from "@/app/components/shared/CompanyCard";

export function TopCompanies({
  setPage,
  setSelectedCompany,
}: {
  setPage: (p: string) => void;
  setSelectedCompany: (c: any) => void;
}) {
  const topCompanies = COMPANIES.slice(0, 6);

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-9">
          <div>
            <h2 className="text-3xl font-bold text-[#111111] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Top hiring companies
            </h2>
            <p className="text-[#6B7280]">Join world-class teams at the most innovative companies.</p>
          </div>
          <button
            onClick={() => setPage("companies")}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#F05A22]"
          >
            All companies <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {topCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={() => {
                setSelectedCompany(company);
                setPage("company");
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
