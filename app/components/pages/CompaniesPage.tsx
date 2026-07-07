"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Companies } from "@/types/jobs";
import { CompanyCard } from "@/app/components/shared/CompanyCard";
import {useQuery }from '@tanstack/react-query'

export function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedIndustry, setSelectedIndustry] = useState("");

 

 
  return (
    <div className="">
      <div className='px-6'>
      <h1 className="text-2xl font-bold text-black mb-8">Companies</h1>
            </div>
      <CompanyCard/>

      </div>
  );
}