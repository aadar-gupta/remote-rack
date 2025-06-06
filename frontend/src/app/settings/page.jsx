"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

import { User, Shirt, Copy, Check, } from "lucide-react";
import { PiPants, PiTShirt, PiBaseballCap, PiWatch } from "react-icons/pi";
import { GiRunningShoe, GiEmeraldNecklace, GiDiamondRing } from "react-icons/gi";


import CircleButton from "@/components/general/CircleButton";
import ClosetManagementPopup from "@/components/settings/ClosetManagementPopup";
import { mockUser } from "../../constants";

const CLOSET_CATEGORIES = [
  { id: "hats", label: "Hats", icon: PiBaseballCap },
  { id: "tops", label: "Tops", icon: PiTShirt },
  { id: "bottoms", label: "Bottoms", icon: PiPants },
  { id: "shoes", label: "Shoes", icon: GiRunningShoe },
  { id: "watches", label: "Watches", icon: PiWatch },
  { id: "necklaces", label: "Necklaces", icon: GiEmeraldNecklace },
  { id: "earrings", label: "Earrings", icon: GiDiamondRing }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isClosetPopupOpen, setIsClosetPopupOpen] = useState(false);
  const [selectedClosetCategory, setSelectedClosetCategory] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // TODO: Implement profile update
      console.log("Updating profile:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(mockUser.partnerCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const getItemCount = (category) => {
    // Handle undefined or null outfits
    if (!mockUser?.outfits) {
      return 0;
    }
    // Handle null category or non-array category
    const categoryItems = mockUser.outfits[category];
    if (categoryItems === null || !Array.isArray(categoryItems)) {
      return 0;
    }
    return categoryItems.length;
  };

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "closet", label: "Closet", icon: Shirt },
  ];

  const renderClosetSection = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-medium text-charcoal mb-2">Closet Settings</h2>
          <p className="text-charcoal/70">Manage your existing closet items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLOSET_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-cream/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={20} />
                  <h3 className="text-lg font-medium text-charcoal">{category.label}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal/70">Total Items</span>
                    <span className="text-charcoal font-medium">{getItemCount(category.id)}</span>
                  </div>
                <CircleButton
                  type="outlined"
                  color="primary"
                  text="Manage Items"
                  className="w-full"
                  onClick={() => {
                    setSelectedClosetCategory(category.id);
                    setIsClosetPopupOpen(true);
                  }}
                />
              </div>
            </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-medium text-charcoal mb-2">Profile Settings</h2>
                <p className="text-charcoal/70">Update your personal information</p>
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
                    value={mockUser.email || ""}
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-cream/50 cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-charcoal/60">
                    Email cannot be changed
                  </p>
                </div>

                <div className="pt-4">
                  <CircleButton
                    type="filled"
                    color="primary"
                    text={isSaving ? "Saving..." : "Save Changes"}
                    className="w-full sm:w-auto"
                    disabled={isSaving}
                  />
                </div>
              </form>
            </div>

            {/* Partner Code Section */}
            <div className="space-y-6 pt-6 border-t border-charcoal/10">
              <div>
                <h2 className="text-2xl font-medium text-charcoal mb-2">Partner Code</h2>
                <p className="text-charcoal/70">Share this code with your partner to connect your accounts</p>
              </div>

              <div className="bg-cream/30 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-charcoal/70">Your Partner Code</span>
                      {mockUser.partner && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          Connected
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-lg text-charcoal">
                      {mockUser.partnerCode}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                      copied
                        ? "bg-green-100 text-green-600"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        <span className="text-sm font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span className="text-sm font-medium">Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                {!mockUser.partner && (
                  <p className="mt-4 text-sm text-charcoal/60">
                    Share this code with your partner so they can connect their account to yours.
                    Once connected, you'll be able to coordinate outfits together.
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case "closet":
        return renderClosetSection();

      default:
        return null;
    }
  };

  const handleUpdateCloset = async (updatedCloset) => {
    // TODO: Replace with actual API call
    console.log("Updating closet:", updatedCloset);
  };

  return (
    <main className="min-h-screen bg-cream pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] divide-y md:divide-y-0 md:divide-x divide-charcoal/10">
            {/* Side Menu */}
            <div className="p-6">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-white"
                          : "text-charcoal/70 hover:bg-cream hover:text-charcoal"
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Closet Management Popup */}
      <ClosetManagementPopup
        isOpen={isClosetPopupOpen}
        onClose={() => {
          setIsClosetPopupOpen(false);
          setSelectedClosetCategory(null);
        }}
        user={mockUser}
        onUpdateCloset={handleUpdateCloset}
        initialCategory={selectedClosetCategory}
      />
    </main>
  );
}
