"use client";

import { useState } from "react";
import { Copy, Check, UserPlus } from "lucide-react";
import clsx from "clsx";

export default function PartnerCodeManager({ user, onPartnerConnect }) {
  const [copied, setCopied] = useState(false);
  const [partnerCode, setPartnerCode] = useState("");
  const [error, setError] = useState("");

  // Generate a unique code based on the user's email
  const userCode = user.partnerCode || generatePartnerCode(user.email);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(userCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    setError("");

    if (!partnerCode.trim()) {
      setError("Please enter a partner code");
      return;
    }

    if (partnerCode === userCode) {
      setError("You cannot use your own code");
      return;
    }

    // TODO: Validate code format
    if (partnerCode.length !== 8) {
      setError("Invalid partner code format");
      return;
    }

    onPartnerConnect(partnerCode);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus size={28} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Connect with Your Partner
        </h2>
        <p className="text-charcoal/70">
          Share your code or enter your partner's code to start coordinating outfits
        </p>
      </div>

      {/* Your Code Section */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-charcoal/70 mb-2">Your Partner Code</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-cream rounded-lg px-4 py-3 text-lg font-mono text-charcoal">
            {userCode}
          </div>
          <button
            onClick={handleCopyCode}
            className={clsx(
              "p-3 rounded-lg transition-colors",
              copied
                ? "bg-green-100 text-green-600"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      {/* Partner Code Input */}
      <form onSubmit={handleSubmitCode}>
        <div className="mb-4">
          <label htmlFor="partnerCode" className="block text-sm font-medium text-charcoal/70 mb-2">
            Enter Partner's Code
          </label>
          <input
            type="text"
            id="partnerCode"
            value={partnerCode}
            onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
            placeholder="Enter 8-character code"
            className="w-full bg-cream rounded-lg px-4 py-3 text-lg font-mono text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
            maxLength={8}
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white rounded-lg px-4 py-3 font-medium hover:bg-primary/90 transition-colors"
        >
          Connect with Partner
        </button>
      </form>
    </div>
  );
}

// Helper function to generate a deterministic 8-character code from an email
function generatePartnerCode(email) {
  // Use a simple hash function to generate a consistent number from the email
  const hash = email.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);

  // Use the hash to seed a pseudo-random number generator
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  let seed = Math.abs(hash);

  // Generate 8 characters using the seeded random number
  for (let i = 0; i < 8; i++) {
    // Use a simple linear congruential generator
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const index = seed % chars.length;
    code += chars[index];
  }

  return code;
}
