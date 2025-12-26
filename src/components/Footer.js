import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Care.xyz</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We provide reliable and trusted care services for your family
            members. From babysitting to elderly care, we are here to help.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition">
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-500 transition">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-blue-500 transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>📍 House 10, Road 5, Dhaka, BD</li>
            <li>📞 +880 1712 345 678</li>
            <li>✉️ support@care.xyz</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Care.xyz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
