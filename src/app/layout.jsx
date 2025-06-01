import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

// Mock user data for development
let mockUser = {
  firstName: "Aadar",
  lastName: "Gupta",
  email: "aadar.gupta@example.com",
};

//mockUser = null;

export const metadata = {
  title: "RemoteRack - Your Virtual Closet Made for Two",
  description: "Share and coordinate outfits with your partner, whether you're together or apart.",
};

export default function RootLayout({ children }) {
  // Add console.log to debug
  console.log("Mock user in layout:", mockUser);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-cream`}>
        <Navbar user={mockUser} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
