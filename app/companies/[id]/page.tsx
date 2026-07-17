"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { COMPANIES } from "@/app/data/companies";
import { CompanyProfilePage } from "@/app/components/pages/CompanyProfilePage";

export default function CompanyDetailPage() {
  const params = useParams();
  const id = params.id;
  const company = COMPANIES.find((c) => String(c.id) === id);

  if (!company) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center px-5">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Company not found</h2>
          <p className="text-[#6E7A6E] mb-6">The company profile you are looking for does not exist.</p>
          <Link href="/companies" className="bg-[#5A7A6A] hover:bg-[#3D5C4E] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors">
            Back to companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CompanyProfilePage company={company} />
  );
}
