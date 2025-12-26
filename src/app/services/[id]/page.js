import { services } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

// ১. ডায়নামিক মেটাডাটা (Next.js 15 স্টাইল)
export async function generateMetadata({ params }) {
  const { id } = await params; // এখানে await ব্যবহার করতে হবে
  const service = services.find((s) => s._id === id);
  if (!service) {
    return {
      title: "Service Not Found - Care.xyz",
    };
  }
  return {
    title: `${service.title} - Care.xyz`,
    description: service.description,
  };
}

// ২. মেইন পেজ কম্পোনেন্ট
export default async function ServiceDetails({ params }) {
  const { id } = await params; // এখানেও await করতে হবে

  // ইউজার যে আইডিতে ক্লিক করেছে, সেই ডাটা খুঁজে বের করছি
  const service = services.find((s) => s._id === id);

  // যদি সার্ভিস না পাওয়া যায়, 404 পেজে পাঠাবো
  if (!service) {
    return notFound();
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* সার্ভিস ইমেজ */}
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {service.title}
              </h1>
              <p className="text-gray-500 text-sm mb-4">
                Service ID: {service._id}
              </p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xl font-bold px-4 py-2 rounded">
              Tk {service.price} / day
            </span>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {service.description}
          </p>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded text-sm text-blue-700">
            <strong>Note:</strong> Service charges are calculated based on the
            duration you select in the next step.
          </div>

          {/* বুকিং বাটন */}
          <div className="mt-8 flex justify-end">
            <Link
              href="/"
              className="mr-4 px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
            >
              Back to Home
            </Link>
            <Link
              href={`/booking/${service._id}`}
              className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition shadow-lg"
            >
              Book This Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
