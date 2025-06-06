"use client";

import { useEffect, useState } from "react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import { mockUser } from "../constants";

export default function Home() {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // In a real app, this would check the auth state
    setUser(mockUser);
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return user ? <Dashboard user={user} /> : <LandingPage />;
}
