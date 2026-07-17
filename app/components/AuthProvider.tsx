"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // Starts the session check and sets up the listener
    const unsubscribe = initializeAuth();
    
    // Automatically cleans up the Supabase listener when unmounted
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [initializeAuth]);

  return <>{children}</>;
}