import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">
        This gym or route does not exist, or it has been removed.
      </p>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">
        Back to the gyms
      </Link>
    </div>
  );
}
