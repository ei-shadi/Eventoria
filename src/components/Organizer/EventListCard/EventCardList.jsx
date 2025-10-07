"use client";

import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import StatusUpdateModal from "../StatusUpdateModal/StatusUpdateModal";
import useAxios from "@/app/Hooks/useAxios";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import EventUpdateModal from "../EventUpdateModal/EventUpdateModal";

// Dummy Data-->

// Helper for date formatting
const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), "MMM dd, yyyy • h:mm a");
  } catch (error) {
    return dateString;
  }
};

const EventCardList = () => {
  const axiosInstance = useAxios();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (event) => {
    setSelectedEvent(event); // যেই event edit করতে চাও
    setIsModalOpen(true);    // modal open
  };
  const {
    data: myEventsData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["organizerEvents", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosInstance.get(
        `/api/organizerEvents?email=${email}`
      );
      return res.data;
    },
    enabled: !!email, // email
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const handleEventDelete = async (eventId) => {
    try {
      const res = await axiosInstance.delete(
        `/api/organizerEvents?eventId=${eventId}&email=${email}`
      );
      // Refresh the event list after deletion
      refetch();
      console.log(res, "this is res for delete");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  return (
    <div className="w-full">
      {/* CARD VIEW for Small Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:hidden">
        {myEventsData
          .filter((event) => event.approvalStatus === "approved")
          .map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden"
            >
              <img
                src={event.coverImage}
                alt={event.eventName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{event.eventName}</h2>
                <p className="text-sm text-gray-500 dark:text-white mb-1">
                  {event.eventCategory.label}
                </p>
                <p className="text-sm text-gray-600 dark:text-white flex items-center gap-1 mb-1">
                  <Calendar size={16} /> {formatDate(event.startDateTime)} -{" "}
                  {formatDate(event.endDateTime)}
                </p>
                <p className="text-sm text-gray-600 dark:text-white flex items-center gap-1">
                  <MapPin size={16} /> {event.venueName}, {event.address}
                </p>

                {/* Status */}
                <p
                  className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    event.approvalStatus === "approved"
                      ? "bg-green-100 text-green-800"
                      : event.approvalStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {event.approvalStatus}
                </p>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm cursor-pointer">
                    View
                  </button>
                  <button onClick={() => handleEditClick(event)}  className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm ">
                    Edit
                  </button>
                  <button
                    onClick={() => handleEventDelete(event._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm cursor-pointer"
                  >
                    Delete
                  </button>

                  {event.approvalStatus === "approved" && (
                    <StatusUpdateModal>
                      <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm cursor-pointer">
                        Update Status
                      </button>
                    </StatusUpdateModal>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* TABLE VIEW for Large Devices */}
      <div className="hidden xl:block bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date & Time</th>
              <th className="p-3 text-left">Venue</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
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
                  <td className="p-3 font-semibold flex items-center gap-2">
                    <img
                      src={event.coverImage}
                      alt={event.eventName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    {event.eventName}
                  </td>
                  <td className="p-3">{event.eventCategory.label}</td>
                  <td className="p-3 text-sm text-gray-600 dark:text-white">
                    {formatDate(event.startDateTime)} <br />
                    <span className="text-xs text-gray-400 dark:text-gray-100">
                      {formatDate(event.endDateTime)}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600 dark:text-white">
                    {event.venueName}, {event.address}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
                  <td className="p-3 space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                      View
                    </button>
                    <button onClick={() => handleEditClick(event)} className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm ">
                      Edit
                    </button>
                    <button
                      onClick={() => handleEventDelete(event._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                    {event.approvalStatus === "approved" && (
                      <StatusUpdateModal>
                        <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm">
                          Update Status
                        </button>
                      </StatusUpdateModal>
                    )}
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
