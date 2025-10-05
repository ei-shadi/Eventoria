"use client";

import React, { useState } from "react";
import Papa from "papaparse";

// Dummy data
const eventsAttendees = [
  {
    eventId: 1,
    eventName: "Summer Music Festival",
    attendees: [
      {
        name: "John Doe",
        email: "john@example.com",
        ticketType: "VIP",
        quantity: 2,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        ticketType: "Regular",
        quantity: 1,
      },
    ],
  },
  {
    eventId: 2,
    eventName: "Tech Innovators Summit",
    attendees: [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        ticketType: "Regular",
        quantity: 1,
      },
    ],
  },
];

const AttendeeManagementCard = () => {
  const [selectedEventId, setSelectedEventId] = useState(
    eventsAttendees[0].eventId
  );

  const selectedEvent = eventsAttendees.find(
    (event) => event.eventId === selectedEventId
  );

  // Download CSV
  const downloadCSV = () => {
    if (!selectedEvent) return;
    const csv = Papa.unparse(selectedEvent.attendees);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${selectedEvent.eventName}_attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg  mx-auto mt-10">
      {/* Event Selector */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
          Select Event:
        </label>
        <select
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(Number(e.target.value))}
        >
          {eventsAttendees.map((event) => (
            <option key={event.eventId} value={event.eventId}>
              {event.eventName}
            </option>
          ))}
        </select>
      </div>

      {/* CARD VIEW for Small to Large Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 xl:hidden">
        {selectedEvent.attendees.map((attendee, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition text-center"
          >
            <h4 className="font-semibold text-lg text-black dark:text-white">
              {attendee.name}
            </h4>
            <p className="text-gray-700 dark:text-gray-300">{attendee.email}</p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Ticket:</strong> {attendee.ticketType}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Quantity:</strong> {attendee.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE VIEW for XL Devices */}
      <div className="hidden xl:block bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mt-6">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Ticket Type</th>
              <th className="p-3 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {selectedEvent.attendees.map((attendee, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="p-3 font-medium text-gray-900 dark:text-gray-100">
                  {attendee.name}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {attendee.email}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {attendee.ticketType}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {attendee.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download Attendees CSV
        </button>
      </div>
    </div>
  );
};

export default AttendeeManagementCard;
