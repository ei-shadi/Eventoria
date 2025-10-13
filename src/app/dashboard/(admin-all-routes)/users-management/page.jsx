// src/app/dashboard/admin/users/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Loading from "@/components/Loading/Loading";

export default function ManageUsers() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users on component mount
  useEffect(() => {
    async function fetchUsers() {
      if (status === "authenticated" && session?.user?.role === "admin") {
        try {
          const res = await fetch("/api/users");
          if (!res.ok) {
            throw new Error("Failed to fetch users.");
          }
          const data = await res.json();
          setUsers(data.data);
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to load users. Please try again.",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [session, status]);

  // Handle role change
  const handleRoleChange = async (email, newRole) => {
    const result = await Swal.fire({
      title: `Are you sure you want to change this user's role to ${newRole}?`,
      text: "This action is irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch("/api/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, role: newRole }),
        });

        if (res.ok) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.email === email ? { ...user, role: newRole } : user
            )
          );
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `User role updated to ${newRole}.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to update user role.",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unexpected error occurred.",
        });
      }
    }
  };

  if (status === "loading" || loading) {
    return <Loading />;
  }

  if (status !== "authenticated" || session?.user?.role !== "admin") {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-500 dark:text-red-400">
          Access Denied
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          You must be an admin to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-8 min-h-screen ">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        Manage Users ({users.length})
      </h1>

      {/* Table for md+ devices */}
      <div className="hidden md:block ">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200">
              <th className="py-3 px-4 border-b dark:border-gray-600">Name</th>
              <th className="py-3 px-4 border-b dark:border-gray-600">Email</th>
              <th className="py-3 px-4 border-b dark:border-gray-600">Role</th>
              <th className="py-3 px-4 border-b dark:border-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900  transition-colors"
              >
                <td className="py-3 px-4 border-b  font-semibold text-gray-800 dark:text-gray-100">
                  {user.name}
                </td>
                <td className="py-3 px-4 border-b  text-gray-600 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="py-3 px-4 border-b capitalize">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 border-b dark:border-gray-600 text-center ">
                  <button
                    onClick={() => handleRoleChange(user.email, "user")}
                    className={`py-1 px-3 rounded-md text-xs font-medium m-1 ${
                      user.role === "user"
                        ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={user.role === "user"}
                  >
                    Make User
                  </button>
                  <button
                    onClick={() => handleRoleChange(user.email, "organizer")}
                    className={`py-1 px-3 rounded-md text-xs font-medium m-1 ${
                      user.role === "organizer"
                        ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={user.role === "organizer"}
                  >
                    Make Organizer
                  </button>
                  <button
                    onClick={() => handleRoleChange(user.email, "admin")}
                    className={`py-1 px-3 rounded-md text-xs font-medium m-1 ${
                      user.role === "admin"
                        ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    disabled={user.role === "admin"}
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small devices */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Role:{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {user.role}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => handleRoleChange(user.email, "user")}
                className={`py-1 px-3 rounded-md text-sm font-medium ${
                  user.role === "user"
                    ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={user.role === "user"}
              >
                Make User
              </button>
              <button
                onClick={() => handleRoleChange(user.email, "organizer")}
                className={`py-1 px-3 rounded-md text-sm font-medium ${
                  user.role === "organizer"
                    ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={user.role === "organizer"}
              >
                Make Organizer
              </button>
              <button
                onClick={() => handleRoleChange(user.email, "admin")}
                className={`py-1 px-3 rounded-md text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                disabled={user.role === "admin"}
              >
                Make Admin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
