// components/EventList.js
"use client";

import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // --- A. DATA FETCHING ---
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");

      const data = await res.json();
      setEvents(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Could not load events: " + error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // --- B. STATUS UPDATE ---
  const handleUpdateStatus = async (eventId, newStatus) => {
    if (isUpdating) return;

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you really want to ${newStatus} this event?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus}!`,
      cancelButtonText: "Cancel",
      confirmButtonColor: newStatus === "approved" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    setIsUpdating(true);

    try {
      const res = await fetch(`/api/events`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, newStatus }),
      });

      if (!res.ok) throw new Error("Status update failed");

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, approvalStatus: newStatus }
            : event
        )
      );

      Swal.fire({
        icon: "success",
        title: `Event status changed!`,
        text: `This event is now ${newStatus}.`,
        confirmButtonColor: newStatus === "approved" ? "#16a34a" : "#dc2626",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update status.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // --- C. STATUS COLOR ---
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (events.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400">
        No events found in the queue.
      </div>
    );
  }

  // --- D. MOBILE CARD ---
  const EventCard = ({ event }) => (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 lg:hidden transition-shadow hover:shadow-xl">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {event.eventName || "Untitled Event"}
          </h3>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Email:{" "}
            {event.organizerEmail.length > 8
              ? event.organizerEmail.slice(0, 8) + "..."
              : event.organizerEmail}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Start Date:{" "}
            {event.startDateTime
              ? new Date(event.startDateTime).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            End Date:{" "}
            {event.endDateTime
              ? new Date(event.endDateTime).toLocaleDateString()
              : "N/A"}
          </p>
          Status:{" "}
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
              event.approvalStatus
            )}`}
          >
            {event.approvalStatus}
          </span>
        </div>

        <div>
          {event.approvalStatus === "pending" ? (
            <div className="flex flex-col space-y-2 mt-4">
              <button
                onClick={() => handleUpdateStatus(event._id, "approved")}
                disabled={isUpdating}
                className="flex-1 px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateStatus(event._id, "rejected")}
                disabled={isUpdating}
                className="flex-1 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                Reject
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleUpdateStatus(event._id, "pending")}
              disabled={isUpdating}
              className="px-4 py-1 text-xs rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 m-1"
            >
              Cancel {event.approvalStatus}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // --- E. MAIN RENDER ---
  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        Event Moderation Queue
      </h2>

      {/* ====== Desktop Table ====== */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {events.map((event) => (
              <tr
                key={event._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {event.eventName || "N/A"}
                </td>
                <td
                  className="px-6 py-4 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                  title={`${event.organizerEmail}`}
                >
                  {event.organizerEmail.length > 8
                    ? event.organizerEmail.slice(0, 8) + "..."
                    : event.organizerEmail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {event.startDateTime
                    ? new Date(event.startDateTime).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {event.endDateTime
                    ? new Date(event.endDateTime).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                      event.approvalStatus
                    )}`}
                  >
                    {event.approvalStatus}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-center space-x-2">
                  {event.approvalStatus === "pending" ? (
                    <div className="item-center">
                      <button
                        onClick={() =>
                          handleUpdateStatus(event._id, "approved")
                        }
                        disabled={isUpdating}
                        className="px-4 py-1 text-xs rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 m-1"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateStatus(event._id, "rejected")
                        }
                        disabled={isUpdating}
                        className="px-4 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 m-1"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(event._id, "pending")}
                      disabled={isUpdating}
                      className="px-4 py-1 text-xs rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 m-1"
                    >
                      Cancel {event.approvalStatus}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====== Mobile Card View ====== */}
      <div className="lg:hidden space-y-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
