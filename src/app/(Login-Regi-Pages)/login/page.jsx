
// app/login/page.js
"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  console.log(session);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/", // Redirect after login
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-3 ">
      {/* 2. Card Background: Light Mode (bg-gray-100) | Dark Mode (dark:bg-gray-800) */}
      {/* 3. Text Color: Default (text-gray-900) | Dark Mode (dark:text-white) */}
      <div className="p-8 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 4. Input Fields: Dark Mode Styling */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2 
                       bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                       focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-2 
                       bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                       focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors">
            Login
          </button>
        </form>

        {/* 5. Horizontal Rule (Separator): Dark Mode (dark:border-gray-700) */}
        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        {/* 6. Google Button: Dark Mode (No major change needed, but added hover) */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-green-600 hover:bg-green-800 text-white py-2 rounded transition-colors"
        >
          Sign in with Google
        </button>

        {/* 7. Register Link: Dark Mode Text Color (dark:text-blue-400) */}
        <p className="text-center mt-5">
          New in jobPortal?
          <Link
            href={"/register"}
            className="underline text-blue-700 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}


