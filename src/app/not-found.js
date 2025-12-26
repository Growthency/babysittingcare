import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg"
      >
        Return to Home
      </Link>
    </div>
  );
}
