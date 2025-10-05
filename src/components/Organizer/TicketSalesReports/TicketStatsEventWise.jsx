"use client";
import React from "react";
import { Ticket, DollarSign, Users } from "lucide-react";
import Papa from "papaparse";

const eventWiseTicketsStat = [
  {
    eventName: "Summer Music Festival",
    ticketsSold: 150,
    ticketsRemaining: 50,
    revenue: 7500,
  },
  {
    eventName: "Tech Innovators Summit",
    ticketsSold: 120,
    ticketsRemaining: 180,
    revenue: 6000,
  },
  {
    eventName: "Intel Conference",
    ticketsSold: 120,
    ticketsRemaining: 180,
    revenue: 6000,
  },
  {
    eventName: "MicroSoft Conference",
    ticketsSold: 120,
    ticketsRemaining: 180,
    revenue: 6000,
  },
];

const TicketStatsEventWise = () => {
  const downloadCSV = () => {
    // JSON → CSV
    const csv = Papa.unparse(eventWiseTicketsStat);

    // Create blob
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create temporary link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "event_wise_ticket_report.csv");

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="w-full lg:p-6">
      <div className="py-3 lg:py-6 flex flex-col md:flex-row justify-between px-6">
        <h2 className="text-2xl font-bold mb-6">Ticket Stats Event Wise</h2>
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Download CSV
        </button>
      </div>

      {/* CARD VIEW for Small Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:hidden">
        {eventWiseTicketsStat.map((event, index) => (
          <div
            key={index}
            className="bg-white dark:bg-card shadow rounded-lg overflow-hidden border border-border"
          >
            <div className="p-5">
              <h3 className="text-lg font-bold mb-3">{event.eventName}</h3>

              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                <Ticket className="w-4 h-4 text-indigo-500" />
                Tickets Sold:{" "}
                <span className="font-semibold">{event.ticketsSold}</span>
              </p>

              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-green-500" />
                Tickets Remaining:{" "}
                <span className="font-semibold">{event.ticketsRemaining}</span>
              </p>

              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-yellow-500" />
                Revenue: <span className="font-semibold">${event.revenue}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE VIEW for Large Devices */}
      <div className="hidden xl:block bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden border border-border mt-6">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left">Tickets Sold</th>
              <th className="p-3 text-left">Tickets Remaining</th>
              <th className="p-3 text-left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {eventWiseTicketsStat.map((event, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors"
              >
                <td className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                  {event.eventName}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {event.ticketsSold}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {event.ticketsRemaining}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  ${event.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketStatsEventWise;
