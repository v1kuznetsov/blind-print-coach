import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto flex w-content items-center justify-center border-t-2">
      <p className="p-4">
        Ⓒ2024 <Link href={"/"}>BlintPrintCoach.</Link> All right reserved.
      </p>
    </footer>
  );
}
