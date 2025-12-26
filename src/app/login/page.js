"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [info, setInfo] = useState({ email: "", password: "" });
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

    try {
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        setPending(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setPending(false);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleInput}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            className="w-full border p-2 rounded"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={pending}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {pending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-between">
          <span className="h-px bg-gray-300 w-full"></span>
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <span className="h-px bg-gray-300 w-full"></span>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 border p-2 rounded hover:bg-gray-50 transition"
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
