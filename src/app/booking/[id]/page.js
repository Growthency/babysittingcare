"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";

export default function BookingPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setServiceId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  const [bookingData, setBookingData] = useState({
    duration: 1,
    division: "",
    district: "",
    address: "",
    date: "",
  });

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const service = services.find((s) => s._id === serviceId);

  useEffect(() => {
    if (service) setTotalCost(bookingData.duration * service.price);
  }, [bookingData.duration, service]);

  const handleInput = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    const finalData = {
      userEmail: session.user.email,
      serviceId: service._id,
      serviceTitle: service.title,
      date: bookingData.date,
      duration: Number(bookingData.duration),
      totalCost: totalCost,
      address: {
        division: bookingData.division,
        district: bookingData.district,
        area: bookingData.address,
      },
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        alert("Booking Confirmed Successfully!"); 
        router.push("/my-bookings");
        router.refresh();
      } else {
        alert("Failed to book service.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  if (status === "loading" || !serviceId)
    return <div className="text-center mt-20">Loading...</div>;
  if (!service)
    return (
      <div className="text-center mt-20 text-red-500">Service not found!</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-2">
          Book Service: {service.title}
        </h2>
        <div className="mb-6 bg-blue-50 p-4 rounded text-sm">
          <p>
            <strong>Name:</strong> {session?.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {session?.user?.email}
          </p>
        </div>
        <form onSubmit={handleConfirmBooking} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Duration (Days)</label>
            <input
              type="number"
              name="duration"
              min="1"
              value={bookingData.duration}
              onChange={handleInput}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="date"
              onChange={handleInput}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Division</label>
              <input
                type="text"
                name="division"
                onChange={handleInput}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">District</label>
              <input
                type="text"
                name="district"
                onChange={handleInput}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Full Address</label>
            <textarea
              name="address"
              onChange={handleInput}
              rows="2"
              className="w-full border p-2 rounded"
              required
            ></textarea>
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded text-right">
            <p className="text-2xl font-bold text-blue-600">
              Total Cost: {totalCost} Tk
            </p>
          </div>
          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
