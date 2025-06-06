"use client";

import { useState } from "react";
import Link from "next/link";
import CircleButton from "@/components/general/CircleButton";
import Logo from "@/components/Logo";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle login
    console.log("Login attempt:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md mt-16">
        <div className="text-center mb-8">
          <div className="mb-4">
            <Logo className="mx-auto" />
          </div>
          <h2 className="text-5xl font-semibold mb-2">
            <span className="text-secondary text-shadow-outline">Welcome </span>
            <span className="text-primary text-shadow-outline">Back</span>
          </h2>
          <p className="text-charcoal/70">Sign in to continue to RemoteRack</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </Link>
          </div>

          <CircleButton
            type="filled"
            color="primary"
            text="Login"
            className="w-full"
          />

          <div className="text-center text-charcoal/70">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
