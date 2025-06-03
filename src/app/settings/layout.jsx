"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

// Mock user data for development - this will be replaced with actual auth
const mockUser = {
  firstName: "Anjanie",
  lastName: "Sukhnandan",
  email: "anjanie015@gmail.com",
  partner: {
    firstName: "Aadar",
    lastName: "Gupta",
    email: "aadar100@gmail.com",
  },
};

export default function SettingsLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // In a real app, this would check the auth state
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // For now, we'll use the mock user
  // In a real app, this would check if the user is authenticated
  if (!mockUser) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Navbar user={mockUser} />
      {children}
    </>
  );
}
