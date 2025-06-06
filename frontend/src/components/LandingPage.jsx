import FloatingCard from "@/components/general/FloatingCard";
import Link from "next/link";
import CircleButton from "@/components/general/CircleButton";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-cream">
      <div className="w-full">
        <FloatingCard
          float="right"
          image="/wardrobe.jpg"
        >
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-1 lg:mb-2">
              <h2 className="text-xl lg:text-3xl text-charcoal/80 mb-0.5">
                Welcome to
              </h2>
              <h1 className="text-7xl 2xl:text-8xl font-semibold drop-shadow-white">
                <span className="text-secondary text-shadow-outline">Remote</span>
                <span className="text-primary text-shadow-outline">Rack</span>
              </h1>
            </div>
            <p className="text-lg lg:text-2xl text-charcoal/80 leading-relaxed mb-4 lg:mb-6">
              From hearts to hangers, style that bridges the distance.
            </p>
            <p className="text-sm lg:text-base text-charcoal/70 leading-relaxed mb-6 lg:mb-8 max-w-xl mx-auto">
              Your virtual closet made for two. Whether you're in a long-distance relationship or just love being part of your partner's daily routine, RemoteRack makes picking each other's outfits easy and fun. It's like raiding each other's closets — minus the mess, plus the romance.
            </p>
            <div className="space-y-3 lg:space-y-4 flex flex-col items-center">
              <Link href="/login" className="w-full flex justify-center">
                <CircleButton
                  type="filled"
                  color="primary"
                  text="Login"
                />
              </Link>
              <div className="text-charcoal/80">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors">
                  Signup!
                </Link>
              </div>
            </div>
          </div>
        </FloatingCard>
      </div>
    </main>
  );
}
