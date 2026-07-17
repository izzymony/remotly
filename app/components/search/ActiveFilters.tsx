"use client";

import { X } from "lucide-react";

export function ActiveFilters({
  remoteOnly,
  setRemoteOnly,
  selectedTypes,
  setSelectedTypes,
  selectedLevels,
  setSelectedLevels,
  selectedCategories,
  setSelectedCategories,
  clearAllFilters,
}: {
  remoteOnly: boolean;
  setRemoteOnly: (v: boolean) => void;
  selectedTypes: string[];
  setSelectedTypes: (v: string[]) => void;
  selectedLevels: string[];
  setSelectedLevels: (v: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  clearAllFilters: () => void;
}) {
  const toggleFilter = (
    arr: string[],
    setArr: (a: string[]) => void,
    val: string
  ) => {
    setArr(
      arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]
    );
  };

  const activeFilterCount =
    (remoteOnly ? 1 : 0) +
    selectedTypes.length +
    selectedLevels.length +
    selectedCategories.length;

  if (activeFilterCount === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-5 mt-3.5 flex flex-wrap gap-2 items-center">
      {remoteOnly && (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-[#EBF2EE] text-[#5A7A6A] border border-[#5A7A6A]/10 text-xs rounded-lg font-semibold shadow-sm shadow-[#5A7A6A]/5">
          Remote only
          <button
            onClick={() => setRemoteOnly(false)}
            aria-label="Remove Remote only filter"
            className="text-[#6E7A6E] hover:text-[#5A7A6A] transition-colors"
          >
            <X size={10} strokeWidth={2.5} />
          </button>
        </span>
      )}
      {[...selectedTypes, ...selectedLevels, ...selectedCategories].map(
        (f) => (
          <span
            key={f}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#EBF2EE] text-[#5A7A6A] border border-[#5A7A6A]/10 text-xs rounded-lg font-semibold shadow-sm shadow-[#5A7A6A]/5"
          >
            {f}
            <button
              onClick={() => {
                if (selectedTypes.includes(f))
                  toggleFilter(selectedTypes, setSelectedTypes, f);
                if (selectedLevels.includes(f))
                  toggleFilter(selectedLevels, setSelectedLevels, f);
                if (selectedCategories.includes(f))
                  toggleFilter(selectedCategories, setSelectedCategories, f);
              }}
              aria-label={`Remove ${f} filter`}
              className="text-[#6E7A6E] hover:text-[#5A7A6A] transition-colors"
            >
              <X size={10} strokeWidth={2.5} />
            </button>
          </span>
        )
      )}
      <button
        onClick={clearAllFilters}
        className="text-xs text-[#7A7A7A] hover:text-[#2C2C2C] font-medium underline underline-offset-4 decoration-[#E4EBE6] hover:decoration-[#5A7A6A] transition-colors ml-1.5"
      >
        Clear all filters
      </button>
    </div>
  );
}
