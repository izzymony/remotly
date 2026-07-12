// src/providers/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode, createContext, useContext } from 'react';

const SavedJobsContext = createContext<{
  savedJobs: Set<number>;
  toggleSaveJob: (id: number) => void;
}>({
  savedJobs: new Set(),
  toggleSaveJob: () => {},
});

export function useSavedJobs() {
  return useContext(SavedJobsContext);
}

export default function Provider({ children }: { children: ReactNode }) {
  // Creating the query client inside state ensures data isn't shared 
  // between different users during Server-Side Rendering (SSR)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Data stays "fresh" for 5 minutes
        refetchOnWindowFocus: false, // Don't aggressively re-fetch on tab switch
      },
    },
  }));

  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set([1, 4]));

  const toggleSaveJob = (id: number) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SavedJobsContext.Provider value={{ savedJobs, toggleSaveJob }}>
        {children}
      </SavedJobsContext.Provider>
    </QueryClientProvider>
  );
}