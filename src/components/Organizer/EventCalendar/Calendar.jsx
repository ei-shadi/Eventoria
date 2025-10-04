"use client";

import React from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

// Setup date-fns localizer
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Dummy events data based on your form structure
const events = [
  {
    id: 1,
    title: "Intel Seminar",
    start: new Date("2025-10-15T17:16"),
    end: new Date("2025-10-25T18:16"),
    category: "Seminar",
  },
  {
    id: 2,
    title: "Summer Music Festival",
    start: new Date("2025-10-10T10:00"),
    end: new Date("2025-10-12T18:00"),
    category: "Concert",
  },
  {
    id: 3,
    title: "Tech Innovators Summit",
    start: new Date("2025-10-20T09:00"),
    end: new Date("2025-10-21T17:00"),
    category: "Conference",
  },
];

// Optional: function to color-code events by category
const eventStyleGetter = (event) => {
  let backgroundColor = "#60a5fa"; // default

  if (event.category === "Concert") backgroundColor = "#f87171";
  else if (event.category === "Seminar") backgroundColor = "#34d399";
  else if (event.category === "Conference") backgroundColor = "#fbbf24";

  return {
    style: {
      backgroundColor,
      color: "#fff",
      borderRadius: "5px",
      border: "none",
      padding: "2px 5px",
    },
  };
};

const Calendar = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Calendar;
