import Image from "next/image";

export default function Logo({ className = "" }) {
  return (
    <Image
      src="/logo.svg"
      alt="RemoteRack"
      width={240}
      height={60}
      priority
      className={`h-16 w-auto ${className}`}
    />
  );
}
