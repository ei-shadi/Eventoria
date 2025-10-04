"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

export default function RegisterFormClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password}),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        console.log(error);
        setLoading(false);
        return;
      }

      // redirect to login after success
      router.push("/login");
    } catch (err) {
      setError("Failed to register. Try again.");
      setLoading(false);
    }
  };


  return (
    <div className="p-8 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      
      {/* Error Message */}
      {error && (
        <p className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 p-2 rounded mb-4">{error}</p>
      )}

      {/* Form and Input fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... আপনার সমস্ত ইনপুট এবং বাটন এখানে থাকবে ... */}
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-4 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500" required />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-4 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-4 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500" required />
        
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
          Login
        </Link>
      </p>
    </div>
  );
}