"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    nid: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleInput = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPending(true);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(info.password)) {
      setError(
        "Password must be at least 6 characters, contain 1 uppercase and 1 lowercase letter."
      );
      setPending(false);
      return;
    }

    if (
      !info.name ||
      !info.email ||
      !info.password ||
      !info.nid ||
      !info.phone
    ) {
      setError("All fields are required.");
      setPending(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (res.ok) {
        setPending(false);
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
        setPending(false);
      }
    } catch (err) {
      setPending(false);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleInput}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleInput}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleInput}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="nid"
            placeholder="NID Number"
            onChange={handleInput}
            className="w-full border p-2 rounded"
          />
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
              className="w-full border p-2 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be 6+ chars, 1 Uppercase, 1 Lowercase
            </p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={pending}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {pending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
