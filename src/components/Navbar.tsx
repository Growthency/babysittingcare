"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* ১. বাম পাশে Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Care.xyz
            </Link>
          </div>

          {/* ২. মাঝখানে Menu Links (Home, Services) */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Services
            </Link>
            {/* লগিন থাকলে My Bookings মাঝখানে দেখাবে */}
            {session?.user && (
              <Link
                href="/my-bookings"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                My Bookings
              </Link>
            )}
          </div>

          {/* ৩. ডান পাশে Login/Register বা User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-700">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.user.role === "admin" ? "Admin" : "User"}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
