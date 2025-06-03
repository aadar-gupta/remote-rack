"use client";

import { useEffect, useState } from "react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";

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
          name: "White",
          brand: "Kenneth Cole",
          img: "/outfits/aadar100@gmail.com/tops/White - Kenneth Cole.png"
        },
        {
          id: "t3",
          name: "Textured Pale Yellow",
          brand: "Calvin Klein",
          img: "/outfits/aadar100@gmail.com/tops/Textured Pale Yellow - Calvin Klein.png"
        },
        {
          id: "t4",
          name: "Textured Pale Green",
          brand: "Calvin Klein",
          img: "/outfits/aadar100@gmail.com/tops/Textured Pale Green - Calvin Klein.png"
        },
        {
          id: "t5",
          name: "Textured Gray",
          brand: "Calvin Klein",
          img: "/outfits/aadar100@gmail.com/tops/Textured Gray - Calvin Klein.png"
        },
        {
          id: "t6",
          name: "Purple",
          brand: "Kenneth Cole",
          img: "/outfits/aadar100@gmail.com/tops/Purple - Kenneth Cole.png"
        },
        {
          id: "t7",
          name: "Navy",
          brand: "Kenneth Cole",
          img: "/outfits/aadar100@gmail.com/tops/Navy - Kenneth Cole.png"
        },
        {
          id: "t8",
          name: "Light Pink",
          brand: "Kenneth Cole",
          img: "/outfits/aadar100@gmail.com/tops/Light Pink - Kenneth Cole.png"
        },
        {
          id: "t9",
          name: "Dirty Pink",
          brand: "Calvin Klein",
          img: "/outfits/aadar100@gmail.com/tops/Dirty Pink - Calvin Klein.png"
        },
        {
          id: "t10",
          name: "Blue",
          brand: "Kenneth Cole",
          img: "/outfits/aadar100@gmail.com/tops/Blue - Kenneth Cole.png"
        },
        {
          id: "t11",
          name: "Black",
          brand: "Van Heusen",
          img: "/outfits/aadar100@gmail.com/tops/Black - Van Heusen.png"
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
          name: "Khaki",
          brand: "Calvin Klein",
          img: "/outfits/aadar100@gmail.com/bottoms/Khaki - Calvin Klein.png"
        },
        {
          id: "b3",
          name: "Light Gray",
          brand: "Calvin Klein",
          img: "/outfits/aadar100@gmail.com/bottoms/Light Gray - Calvin Klein.png"
        },
        {
          id: "b4",
          name: "Dark Gray",
          brand: "Calvin Klein",
          img: "/outfits/aadar100@gmail.com/bottoms/Dark Gray - Calvin Klein.png"
        },
        {
          id: "b5",
          name: "Dark Blue",
          brand: "Calvin Klein",
          img: "/outfits/aadar100@gmail.com/bottoms/Dark Blue - Calvin Klein.png"
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
          name: "Gold and Silver",
          brand: "Fossil",
          img: "/outfits/aadar100@gmail.com/watches/Gold and Silver - Fossil.png"
        },
        {
          id: "w3",
          name: "Gold Mechanical",
          brand: "Fossil",
          img: "/outfits/aadar100@gmail.com/watches/Gold Mechanical - Fossil.png"
        },
        {
          id: "w4",
          name: "Gold",
          brand: "Tissot PRX",
          img: "/outfits/aadar100@gmail.com/watches/Gold - Tissot PRX.png"
        },
        {
          id: "w5",
          name: "Blue and Brown",
          brand: "Fossil",
          img: "/outfits/aadar100@gmail.com/watches/Blue and Brown - Fossil.png"
        },
        {
          id: "w6",
          name: "Black and Silver",
          brand: "Fossil",
          img: "/outfits/aadar100@gmail.com/watches/Black and Silver - Fossil.png"
        },
        {
          id: "w7",
          name: "Black and Silver",
          brand: "American Exchange",
          img: "/outfits/aadar100@gmail.com/watches/Black and Silver - American Exchange.png"
        },
        {
          id: "w8",
          name: "Black and Gold",
          brand: "Invicta",
          img: "/outfits/aadar100@gmail.com/watches/Black and Gold - Invicta.png"
        },
        {
          id: "w9",
          name: "Black and Gold",
          brand: "Diesel",
          img: "/outfits/aadar100@gmail.com/watches/Black and Gold - Diesel.png"
        },
        {
          id: "w10",
          name: "Black and Gold",
          brand: "Cruise",
          img: "/outfits/aadar100@gmail.com/watches/Black and Gold - Cruise.png"
        },
        {
          id: "w11",
          name: "Black Mechanical",
          brand: "Fossil",
          img: "/outfits/aadar100@gmail.com/watches/Black Mechanical - Fossil.png"
        }
      ],
      necklaces: [],
      earrings: []
    },
  },
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
