import Link from "next/link";

export function Header() {
  return (
    <header className="w-content border-b-2">
      <div className="flex items-center justify-center">
        <Link href={"/"}>
          <img src="/icon.png" alt="" width="40" />
        </Link>
        <span className="p-2 text-4xl">BlindPrintCoach</span>
      </div>
    </header>
  );
}
