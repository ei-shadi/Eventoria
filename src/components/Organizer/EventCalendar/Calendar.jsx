"use client";

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Helper: Convert string to Bangladesh local Date
const bdDateFromString = (dateString) => {
  const bdString = new Date(dateString).toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
  });
  return new Date(bdString);
};

// Convert form-like event to calendar event
const convertFormEventToCalendarEvent = (formEvent) => ({
  id: Math.random(),
  title: formEvent.eventName,
  start: bdDateFromString(formEvent.startDateTime),
  end: bdDateFromString(formEvent.endDateTime),
  category: formEvent.eventCategory.label,
});

// Dummy data (form structure)
const dummyEvents = [
  {
    eventName: "Summer Music Festival",
    eventCategory: { value: "concert", label: "Concert" },
    startDateTime: "2025-11-05T18:00",
    endDateTime: "2025-11-05T22:00",
    venueName: "Madison Square Garden",
    address: "New York, USA",
    country: "USA",
    description: "A night full of live music with top artists performing.",
    coverImage: "https://i.ibb.co/KcdTCDv3/event-image-1.jpg",
    organizerEmail: "organizer@example.com",
    approvalStatus: "pending",
    eventStatus: "cancelled",
  },
  {
    eventName: "Tech Innovators Summit",
    eventCategory: { value: "conference", label: "Conference" },
    startDateTime: "2025-11-10T10:00",
    endDateTime: "2025-11-10T16:00",
    venueName: "Bangabandhu International Conference Center",
    address: "Dhaka, Bangladesh",
    country: "Bangladesh",
    description: "Annual conference for tech enthusiasts and startups.",
    coverImage: "https://i.ibb.co/YZxj4Z9/event-image-2.jpg",
    organizerEmail: "tech@organizer.com",
    approvalStatus: "approved",
    eventStatus: "upcoming",
  },
  {
    eventName: "Art Expo",
    eventCategory: { value: "exhibition", label: "Exhibition" },
    startDateTime: "2025-10-15T09:00",
    endDateTime: "2025-11-15T17:00",
    venueName: "Dhaka Art Gallery",
    address: "Dhaka, Bangladesh",
    country: "Bangladesh",
    description: "Showcasing local artists and their creative artworks.",
    coverImage: "https://i.ibb.co/4dXJwWQ/event-image-3.jpg",
    organizerEmail: "art@organizer.com",
    approvalStatus: "approved",
    eventStatus: "upcoming",
  },
];

const EventCalendarShow = () => {
  const initialEvents = dummyEvents.map(convertFormEventToCalendarEvent);
  const [filteredEvents] = useState(initialEvents);

  // Event color coding
  const eventStyleGetter = (event) => {
    let bg = "#ff0000"; // default
    if (event.category === "Concert") bg = "#f87171";
    else if (event.category === "Seminar") bg = "#34d399";
    else if (event.category === "Conference") bg = "#fbbf24";
    else if (event.category === "Exhibition") bg = "#a78bfa";

    return {
      style: {
        backgroundColor: bg,
        color: "#fff",
        borderRadius: "5px",
        padding: "2px 5px",
        fontSize: "0.85rem",
      },
    };
  };

  // Custom event renderer (to show time with title)
  const EventRenderer = ({ event }) => {
    const startTime = format(event.start, "p"); // example: 6:00 PM
    const endTime = format(event.end, "p"); 
    return (
      <span>
        <strong>{event.title}</strong> <br />
        <span>
          {startTime} - {endTime}
        </span>
      </span>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg container mx-auto">
      <h2 className="text-xl lg:text-2xl font-bold mb-4 text-black dark:text-white text-center lg:text-left">
        Upcoming Events Calendar (Bangladesh Time)
      </h2>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        components={{
          event: EventRenderer,
        }}
      />
    </div>
  );
};

export default EventCalendarShow;
