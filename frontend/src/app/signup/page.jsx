"use client";

import { useState } from "react";
import Link from "next/link";
import CircleButton from "@/components/general/CircleButton";
import Logo from "@/components/Logo";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({
    dateOfBirth: "",
  });

  const validateAge = (dateOfBirth) => {
    if (!dateOfBirth) return false;

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    // Check if date is valid
    if (isNaN(birthDate.getTime())) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: "Please enter a valid date"
      }));
      return false;
    }

    // Check if date is in the future
    if (birthDate > today) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: "Date of birth cannot be in the future"
      }));
      return false;
    }

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check if under 13
    if (age < 13) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: "You must be at least 13 years old to sign up"
      }));
      return false;
    }

    // Clear any errors if validation passes
    setErrors(prev => ({
      ...prev,
      dateOfBirth: ""
    }));
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAge(formData.dateOfBirth)) {
      return;
    }

    // TODO: Handle signup
    console.log("Signup attempt:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate age on date change
    if (name === "dateOfBirth") {
      validateAge(value);
    }
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mt-16">
        <div className="text-center mb-8">
          <div className="mb-4">
            <Logo className="mx-auto" />
          </div>
          <h2 className="text-5xl font-semibold mb-2">
            <span className="text-secondary text-shadow-outline">Join </span>
            <span className="text-primary text-shadow-outline">Now</span>
          </h2>
          <p className="text-charcoal/70">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Enter last name"
              />
            </div>
          </div>

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
              minLength={8}
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="Create a password (min. 8 characters)"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-charcoal mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-charcoal mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.dateOfBirth ? 'border-red-500' : 'border-charcoal/20'
              } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors`}
            />
            {errors.dateOfBirth ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.dateOfBirth}
              </p>
            ) : (
              <p className="mt-1 text-sm text-charcoal/60">
                You must be at least 13 years old to sign up
              </p>
            )}
          </div>

          <CircleButton
            type="filled"
            color="primary"
            text="Create Account"
            className="w-full"
          />

          <div className="text-center text-charcoal/70">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
