"use client";

import { useState, useEffect } from "react";
import { User, Shirt, Copy, Check, ChevronDown } from "lucide-react";
import CircleButton from "@/components/CircleButton";
import clsx from "clsx";

// Mock user data for development - this will be replaced with actual auth
const mockUser = {
  firstName: "Anjanie",
  lastName: "Sukhnandan",
  email: "anjanie015@gmail.com",
  partnerCode: "ABC123XY",
  partner: {
    firstName: "Aadar",
    lastName: "Gupta",
    email: "aadar100@gmail.com",
  },
  outfits: {
    hats: [],
    tops: [
      {
        id: "t1",
        name: "White Gray Design",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/White Gray Design - Calvin Klein.png"
      },
      {
        id: "t2",
        name: "Black",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/Black - Calvin Klein.png"
      },
      {
        id: "t3",
        name: "Blue",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/Blue - Calvin Klein.png"
      },
      {
        id: "t4",
        name: "Gray",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/Gray - Calvin Klein.png"
      },
      {
        id: "t5",
        name: "Navy",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/Navy - Calvin Klein.png"
      },
      {
        id: "t6",
        name: "White",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/White - Calvin Klein.png"
      },
      {
        id: "t7",
        name: "White Gray Design",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/White Gray Design - Calvin Klein.png"
      },
      {
        id: "t8",
        name: "Black",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/Black - Calvin Klein.png"
      },
      {
        id: "t9",
        name: "Blue",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/Blue - Calvin Klein.png"
      },
      {
        id: "t10",
        name: "Gray",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/Gray - Calvin Klein.png"
      },
      {
        id: "t11",
        name: "Navy",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/tops/Navy - Calvin Klein.png"
      }
    ],
    bottoms: [
      {
        id: "b1",
        name: "Navy",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/bottoms/Navy - Calvin Klein.png"
      },
      {
        id: "b2",
        name: "Black",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/bottoms/Black - Calvin Klein.png"
      },
      {
        id: "b3",
        name: "Blue",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/bottoms/Blue - Calvin Klein.png"
      },
      {
        id: "b4",
        name: "Gray",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/bottoms/Gray - Calvin Klein.png"
      },
      {
        id: "b5",
        name: "Navy",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/bottoms/Navy - Calvin Klein.png"
      },
      {
        id: "b6",
        name: "Black",
        brand: "Calvin Klein",
        img: "/outfits/aadar100@gmail.com/bottoms/Black - Calvin Klein.png"
      }
    ],
    shoes: [],
    watches: [
      {
        id: "w1",
        name: "Semi Mechanical",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Semi Mechanical - Fossil.png"
      },
      {
        id: "w2",
        name: "Black",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Black - Fossil.png"
      },
      {
        id: "w3",
        name: "Blue",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Blue - Fossil.png"
      },
      {
        id: "w4",
        name: "Gray",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Gray - Fossil.png"
      },
      {
        id: "w5",
        name: "Navy",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Navy - Fossil.png"
      },
      {
        id: "w6",
        name: "Black",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Black - Fossil.png"
      },
      {
        id: "w7",
        name: "Blue",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Blue - Fossil.png"
      },
      {
        id: "w8",
        name: "Gray",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Gray - Fossil.png"
      },
      {
        id: "w9",
        name: "Navy",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Navy - Fossil.png"
      },
      {
        id: "w10",
        name: "Black",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Black - Fossil.png"
      },
      {
        id: "w11",
        name: "Blue",
        brand: "Fossil",
        img: "/outfits/aadar100@gmail.com/watches/Blue - Fossil.png"
      }
    ],
    necklaces: [],
    earrings: []
  }
};

const CLOSET_CATEGORIES = [
  { id: "hats", label: "Hats", icon: "🎩" },
  { id: "tops", label: "Tops", icon: "👕" },
  { id: "bottoms", label: "Bottoms", icon: "👖" },
  { id: "shoes", label: "Shoes", icon: "👞" },
  { id: "watches", label: "Watches", icon: "⌚" },
  { id: "necklaces", label: "Necklaces", icon: "📿" },
  { id: "earrings", label: "Earrings", icon: "💍" }
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

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
    return mockUser.outfits[category]?.length || 0;
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
          {CLOSET_CATEGORIES.map((category) => (
            <div key={category.id} className="bg-cream/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{category.icon}</span>
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
                    // TODO: Implement manage items
                    console.log("Manage items clicked for:", category.id);
                  }}
                />
              </div>
            </div>
          ))}
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
    </main>
  );
}
