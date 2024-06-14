import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link href={"/training"}>
        <span className="text-5xl">Get Started</span>
      </Link>
    </div>
  );
}
