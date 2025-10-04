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
    <div className="p-6">
      <div className="py-3 lg:py-6 flex flex-col md:flex-row justify-between px-6">
        <h2 className="text-2xl font-bold mb-6">Ticket Stats Event Wise</h2>
        <button
          onClick={downloadCSV}
          className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Download CSV
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {eventWiseTicketsStat.map((event, index) => (
          <div
            key={index}
            className="bg-white dark:bg-card p-5 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-4">{event.eventName}</h3>

            <div className="flex items-center mb-3">
              <Ticket className="w-5 h-5 text-indigo-500 mr-2" />
              <span className="text-sm font-medium">
                Tickets Sold:{" "}
                <span className="font-bold">{event.ticketsSold}</span>
              </span>
            </div>

            <div className="flex items-center mb-3">
              <Users className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">
                Tickets Remaining:{" "}
                <span className="font-bold">{event.ticketsRemaining}</span>
              </span>
            </div>

            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium">
                Revenue: <span className="font-bold">${event.revenue}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketStatsEventWise;
