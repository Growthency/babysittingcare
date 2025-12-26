import Link from "next/link";
import { services } from "@/lib/data";

export default function Home() {
  // প্রথম ৬টা সার্ভিস দেখাবো
  const featuredServices = services.slice(0, 6);

  return (
    <div>
      {/* 1. Banner Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl overflow-hidden mb-16 py-24 px-6 text-center shadow-lg">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Reliable Care for Your Family
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Professional babysitting, elderly care, and specialized support
            right at your doorstep. We ensure safety and trust.
          </p>
          <Link
            href="/services"
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-md"
          >
            Find a Caregiver
          </Link>
        </div>
      </section>

      {/* 2. Services Overview (Top 6) */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Popular Services
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Choose the best care plan for your loved ones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">
                    Tk {service.price}/day
                  </span>
                  <Link
                    href={`/services/${service._id}`}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-600 hover:text-white transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition"
          >
            See All Services →
          </Link>
        </div>
      </section>

      {/* 3. About / Mission Section */}
      <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-12 border border-gray-100">
        <div className="md:w-1/2 relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <img
            src="https://images.pexels.com/photos/7551666/pexels-photo-7551666.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Care Mission"
            className="relative rounded-xl shadow-xl w-full"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Why Choose Care.xyz?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Our mission is to make caregiving accessible and safe for everyone
            in Bangladesh. We verify every caregiver to ensure peace of mind for
            you and your family.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-1 rounded-full">
                ✓
              </span>{" "}
              Verified Professionals
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-1 rounded-full">
                ✓
              </span>{" "}
              24/7 Customer Support
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-1 rounded-full">
                ✓
              </span>{" "}
              Secure & Transparent Pricing
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
