"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const MyBookingsPage = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user?.email) {
        const res = await fetch(`/api/booking?email=${session.user.email}`);
        const data = await res.json();
        setBookings(data);
      }
    };
    fetchBookings();
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
        {bookings.length === 0 ? (
          <p>
            No bookings found.{" "}
            <Link href="/services" className="text-blue-600 underline">
              Book a service
            </Link>
          </p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded shadow border-l-4 border-blue-600 flex justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold">{booking.serviceTitle}</h3>
                  <p>
                    Date: {booking.date} | Duration: {booking.duration} Days
                  </p>
                  <p className="text-gray-500">{booking.address.area}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    Tk {booking.totalCost}
                  </p>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
