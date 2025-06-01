"use client";

import { useEffect, useState } from "react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";

// Mock user data for development - this will be replaced with actual auth
const mockUser = {
  firstName: "Aadar",
  lastName: "Gupta",
  email: "aadar.gupta@example.com",
  partner: {
    firstName: "Anjanie",
    lastName: "Sukhnandan"
  }
};

// Set to null to test unauthenticated state
// const mockUser = null;

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
