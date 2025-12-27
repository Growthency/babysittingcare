"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু ওপেন/ক্লোজ এর জন্য স্টেট
  
  // 🔥 তোমার এডমিন ইমেইল
  const ADMIN_EMAIL = "its4mustaqeem@gmail.com";

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

          {/* ২. ডেস্কটপ মেনু (Desktop Only) */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link href="/" className="text-gray-700 font-medium hover:text-blue-600 transition">Home</Link>
            <Link href="/services" className="text-gray-700 font-medium hover:text-blue-600 transition">Services</Link>
            {session?.user?.email === ADMIN_EMAIL && (
              <Link href="/admin-dashboard" className="text-red-600 font-bold hover:text-red-800 transition border border-red-200 px-3 rounded bg-red-50">Admin Panel</Link>
            )}
            {session?.user && (
              <Link href="/my-bookings" className="text-gray-700 font-medium hover:text-blue-600 transition">My Bookings</Link>
            )}
          </div>

          {/* ৩. ডেস্কটপ লগিন বাটন (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-700">{session.user.name}</p>
                </div>
                <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition shadow-sm">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 font-medium hover:text-blue-600 transition">Login</Link>
                <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm">Register</Link>
              </>
            )}
          </div>

          {/* ৪. মোবাইল মেনু বাটন (Mobile Only - Hamburger Icon) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ৫. মোবাইল মেনু ড্রপডাউন (Mobile Menu Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</Link>
            <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Services</Link>
            
            {session?.user?.email === ADMIN_EMAIL && (
              <Link href="/admin-dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-red-600 bg-red-50 hover:bg-red-100">Admin Panel</Link>
            )}
            
            {session?.user && (
              <Link href="/my-bookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">My Bookings</Link>
            )}

            {/* মোবাইল লগিন/লগআউট */}
            <div className="border-t border-gray-200 pt-4 pb-3">
              {session?.user ? (
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                      {session.user.name?.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-800">{session.user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-500 mt-1">{session.user.email}</div>
                    <button onClick={() => signOut()} className="mt-3 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 space-y-2 px-2">
                  <Link href="/login" className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100">Login</Link>
                  <Link href="/register" className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;