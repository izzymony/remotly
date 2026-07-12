"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchHeader } from "@/app/components/search/SearchHeader";
import { ActiveFilters } from "@/app/components/search/ActiveFilters";
import { SearchResults } from "@/app/components/search/SearchResults";

function JobsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount =
    (remoteOnly ? 1 : 0) +
    selectedTypes.length +
    selectedLevels.length +
    selectedCategories.length;

  const clearAllFilters = () => {
    setRemoteOnly(false);
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSelectedCategories([]);
    setQuery("");
    setLocation("");
  };

  return (
    <div className="pt-16 min-h-screen bg-[#FFFFFF]">
      <SearchHeader
        query={query}
        setQuery={setQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        activeFilterCount={activeFilterCount}
      />
      <ActiveFilters
        remoteOnly={remoteOnly}
        setRemoteOnly={setRemoteOnly}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        clearAllFilters={clearAllFilters}
      />
      <div className="mt-4">
        <SearchResults
          query={query}
          location={location}
          remoteOnly={remoteOnly}
          selectedTypes={selectedTypes}
          selectedCategories={selectedCategories}
        />
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center">Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}
