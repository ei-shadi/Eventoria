"use client";

import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import StatusUpdateModal from "../StatusUpdateModal/StatusUpdateModal";
import useAxios from "@/app/Hooks/useAxios";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import EventUpdateModal from "../EventUpdateModal/EventUpdateModal";

// Helper for date formatting
const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), "MMM dd, yyyy • h:mm a");
  } catch {
    return dateString;
  }
};

// Event Status style mapping
const getEventStatusStyle = (status) => {
  switch (status) {
    case "Live-Now":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-orange-100 text-orange-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const EventCardList = () => {
  const axiosInstance = useAxios();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const { data: myEventsData = [], isLoading, error, refetch } = useQuery({
    queryKey: ["organizerEvents", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosInstance.get(
        `/api/organizerEvents?email=${email}`
      );
      return res.data;
    },
    enabled: !!email,
  });

  const handleEventDelete = async (eventId) => {
    try {
      await axiosInstance.delete(
        `/api/organizerEvents?eventId=${eventId}&email=${email}`
      );
      refetch();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      {/* CARD VIEW - Small devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
        {myEventsData
          .filter((event) => event.approvalStatus === "approved")
          .map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={event.coverImage}
                alt={event.eventName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{event.eventName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                  {event.eventCategory.label}
                </p>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-200 mb-2 gap-2">
                  <Calendar size={16} /> {formatDate(event.startDateTime)} -{" "}
                  {formatDate(event.endDateTime)}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-200 mb-3 gap-2">
                  <MapPin size={16} /> {event.venueName}, {event.address}
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  {/* Approval Status */}
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      event.approvalStatus === "approved"
                        ? "bg-green-100 text-green-800"
                        : event.approvalStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.approvalStatus}
                  </span>

                  {/* Event Status */}
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${getEventStatusStyle(
                      event.eventStatus
                    )}`}
                  >
                    {event.eventStatus}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View
                  </button>
                  <button
                    onClick={() => handleEditClick(event)}
                    className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleEventDelete(event._id)}
                    className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <StatusUpdateModal eventId={event._id} refetchStatus={refetch}>
                    <button className="text-sm px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">
                      Update Status
                    </button>
                  </StatusUpdateModal>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* TABLE VIEW - Large devices */}
      <div className="hidden xl:block bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="p-2">Event</th>
              <th className="p-2">Category</th>
              <th className="p-2">Date & Time</th>
              <th className="p-2">Venue</th>
              <th className="p-2">Approval Status</th>
              <th className="p-2">Event Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myEventsData
              .filter((event) => event.approvalStatus === "approved")
              .map((event, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-2 flex items-center gap-2 font-medium">
                    <img
                      src={event.coverImage}
                      alt={event.eventName}
                      className="w-10 h-10 object-cover rounded"
                    />
                    {event.eventName}
                  </td>
                  <td className="p-2">{event.eventCategory.label}</td>
                  <td className="p-2 text-sm text-gray-600 dark:text-gray-200">
                    {formatDate(event.startDateTime)} <br />
                    <span className="text-xs text-gray-400 dark:text-gray-400">
                      {formatDate(event.endDateTime)}
                    </span>
                  </td>
                  <td className="p-2 text-sm text-gray-600 dark:text-gray-200">
                    {event.venueName}, {event.address}
                  </td>
                  <td className="p-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        event.approvalStatus === "approved"
                          ? "bg-green-100 text-green-800"
                          : event.approvalStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.approvalStatus}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${getEventStatusStyle(
                        event.eventStatus
                      )}`}
                    >
                      {event.eventStatus}
                    </span>
                  </td>
                  <td className="p-2 flex flex-wrap gap-2">
                    <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(event)}
                      className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleEventDelete(event._id)}
                      className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <StatusUpdateModal eventId={event._id} refetchStatus={refetch}>
                      <button className="text-sm px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">
                        Update Status
                      </button>
                    </StatusUpdateModal>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <EventUpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultValues={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventCardList;
