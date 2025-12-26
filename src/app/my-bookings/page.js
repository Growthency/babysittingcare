"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyBookings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.email) {
      fetch(`/api/booking?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }
  }, [session, status, router]);

  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (confirm) {
      const res = await fetch(`/api/admin/all-bookings?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== id));
        alert("Booking cancelled successfully.");
      } else {
        alert("Failed to cancel.");
      }
    }
  };

  if (status === "loading")
    return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-xl">No bookings found.</p>
          <Link
            href="/services"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Book a Service
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">
                  {booking.serviceTitle}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Date:</span> {booking.date} |
                  <span className="font-semibold ml-2">Duration:</span>{" "}
                  {booking.duration} Days
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Address:</span>{" "}
                  {booking.address.area}, {booking.address.district}
                </p>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  Tk {booking.totalCost}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-bold
                    ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {booking.status || "Pending"}
                </span>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/services`}
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition text-sm"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm shadow"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
