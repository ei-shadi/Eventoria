// app/register/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Link component ব্যবহার করা হলো

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // try {
    //  const res = await fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, password, role }),
    //  });

    //  const data = await res.json();

    //  if (!res.ok) {
    //   setError(data.error || "Something went wrong");
    //   setLoading(false);
    //   return;
    //  }

    //  // redirect to login after success
    //  router.push("/login");
    // } catch (err) {
    //  setError("Failed to register. Try again.");
    //  setLoading(false);
    // }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-3 ">
      {/* 2. Card Background & Text Color: dark:bg-gray-800 dark:text-white */}
      <div className="p-8 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && (
          <p className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 4. Input Fields: Dark Mode Styling */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-4 py-2 
                       bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                       focus:ring-green-500 focus:border-green-500"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2 
                       bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                       focus:ring-green-500 focus:border-green-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-2 
                       bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                       focus:ring-green-500 focus:border-green-500"
            required
          />

          {/* 5. Role Selection: Dark Mode Styling */}
          {/* <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded px-4 py-2 
                       bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            {/* অপশন টেক্সট Dark Mode-এ সাদা থাকবে, কিন্তু সিলেক্টেড ভ্যালু ঠিক মতো দেখাতে কিছু ব্রাউজার ডিফল্ট স্টাইল override করা কঠিন হতে পারে। 
            <option value="">Select Role</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select> */}

          {/* 6. Button: Added hover effect, main color is green */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* 7. Login Link: Dark Mode Text Color */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
