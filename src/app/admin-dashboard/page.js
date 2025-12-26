"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  const ADMIN_EMAIL = "its4mustaqeem@gmail.com";

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || session?.user?.email !== ADMIN_EMAIL) {
      router.push("/"); 
    } else {

      fetch("/api/admin/all-bookings")
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }
  }, [status, session, router]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirm) {
      await fetch(`/api/admin/all-bookings?id=${id}`, { method: "DELETE" });
      setBookings(bookings.filter((b) => b._id !== id));
    }
  };

  if (status === "loading")
    return <div className="p-10 text-center">Checking permission...</div>;


  if (session?.user?.email !== ADMIN_EMAIL) {
    return (
      <div className="p-10 text-center text-red-500">
        Access Denied! Redirecting...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-4xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-4xl font-bold">
              Tk {bookings.reduce((sum, b) => sum + b.totalCost, 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">User</th>
                <th className="p-4">Date</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{booking.serviceTitle}</td>
                  <td className="p-4 text-gray-600">{booking.userEmail}</td>
                  <td className="p-4">{booking.date}</td>
                  <td className="p-4 font-bold text-blue-600">
                    Tk {booking.totalCost}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
