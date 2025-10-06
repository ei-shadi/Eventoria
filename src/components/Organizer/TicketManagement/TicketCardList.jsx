"use client";

import useAxios from "@/app/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const TicketCardList = () => {
  const axiosInstance = useAxios();
  const { data: session } = useSession();
  const email = session?.user?.email;

  // =============================
  // Filter state
  // =============================
  const [filterEvent, setFilterEvent] = useState(""); // Event name filter

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  // Event-wise tickets logic
  
  const filteredEvents = filterEvent
    ? events.filter((event) =>
        event.eventName.toLowerCase().includes(filterEvent.toLowerCase())
      )
    : events;

  const eventWiseTickets = filteredEvents.map((event) => ({
    eventName: event.eventName,
    tickets: event.tickets.map((ticket) => ({
      ...ticket,
      remaining: ticket.availability - (ticket.sold ?? 0),
    })),
  }));


  return (
    <div className="p-6 space-y-8">
      {/* Filter input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by event name..."
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          value={filterEvent}
          onChange={(e) => setFilterEvent(e.target.value)}
        />
      </div>

      {eventWiseTickets.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No events found.</p>
      )}

      {eventWiseTickets.map((event) => (
        <div key={event.eventName}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {event.eventName} ({event.tickets.length} Tickets)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.tickets.map((ticket, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-lg"></div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {ticket.type} Ticket
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Price: ${ticket.price}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Available: {ticket.availability}
                </p>
                <p className="text-orange-500 dark:text-orange-400 mb-1 font-semibold">
                  Sold: {ticket.sold ?? 0}
                </p>
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  Remaining: {ticket.remaining}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-2 border-t-2 border-dashed border-gray-300 dark:border-gray-600"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketCardList;
