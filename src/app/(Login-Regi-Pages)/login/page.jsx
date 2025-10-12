
"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
      // Removed useSession since it's not strictly necessary for the login form logic
      const { data: session, status } = useSession();
      console.log(session);

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [errorState, setErrorState] = useState("");
      const router = useRouter();

      const handleSubmit = async (e) => {
            e.preventDefault();
            setErrorState("");

            const result = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                  callbackUrl: "/",
            });

            if (result.error) {

                  if (result.error === 'CredentialsSignin') {
                        setErrorState("Invalid Email or Password. Please try again.");
                  } else {
                        setErrorState(result.error);
                        console.log(errorState);
                  }
            } else {

                  router.push(result.url || "/");
            }
      };

      return (
            <div className="min-h-[80vh] flex items-center justify-center p-3 ">
                  <div className="p-8 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-gray-900 dark:text-white">
                        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                        {/* 💡 ত্রুটি মেসেজ দেখানোর ক্ষেত্র */}
                        {errorState && (
                              <p className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 p-2 rounded mb-4 text-center">
                                    {errorState}
                              </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
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

                        <hr className="my-6 border-gray-300 dark:border-gray-700" />

                        <button
                              onClick={() => signIn("google", { callbackUrl: "/" })}
                              className="w-full bg-green-600 hover:bg-green-800 text-white py-2 rounded transition-colors"
                        >
                              Sign in with Google
                        </button>

                        <p className="text-center mt-5">
                              New in Eventoria?
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