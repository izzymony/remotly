// src/providers/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

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

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}