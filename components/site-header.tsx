import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-accent">▲</span> Climb Log
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-accent">
              Gyms
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-accent">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
