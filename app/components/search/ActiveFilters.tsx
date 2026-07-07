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
    <div className="max-w-7xl mx-auto mt-2.5 flex flex-wrap gap-2 items-center">
      {remoteOnly && (
        <span className="flex items-center gap-1 px-3 py-1 bg-[#FFF3EE] text-[#F05A22] text-xs rounded-full font-medium">
          Remote only
          <button
            onClick={() => setRemoteOnly(false)}
            className="ml-1"
          >
            <X size={9} />
          </button>
        </span>
      )}
      {[...selectedTypes, ...selectedLevels, ...selectedCategories].map(
        (f) => (
          <span
            key={f}
            className="flex items-center gap-1 px-3 py-1 bg-[#FFF3EE] text-[#F05A22] text-xs rounded-full font-medium"
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
              className="ml-1"
            >
              <X size={9} />
            </button>
          </span>
        )
      )}
      <button
        onClick={clearAllFilters}
        className="text-xs text-[#6B7280] hover:text-[#111111] underline underline-offset-2"
      >
        Clear all
      </button>
    </div>
  );
}
