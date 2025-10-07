"use client";

import React from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxios from "@/app/Hooks/useAxios";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Bangladesh time convert from string to date
const bdDateFromString = (dateString) => {
  const bdString = new Date(dateString).toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
  });
  return new Date(bdString);
};

// event calendar convert form event to calendar event
const convertFormEventToCalendarEvent = (formEvent) => ({
  id: formEvent._id || Math.random(),
  title: formEvent.eventName,
  start: bdDateFromString(formEvent.startDateTime),
  end: bdDateFromString(formEvent.endDateTime),
  category: formEvent.eventCategory.label,
});

const EventCalendarShow = () => {
  const axiosInstance = useAxios();
  const { data: session } = useSession();
  const email = session?.user?.email;

  // fetch data
  const {
    data: myEventsData = [],
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
    enabled: !!email, // email থাকলে ফেচ হবে
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // calendar show
  const events = myEventsData.map(convertFormEventToCalendarEvent);

  // ইভেন্ট কালারিং
  const eventStyleGetter = (event) => {
    let bg = "#2b7fff dark:bg-[#1f8eb7]"; // default red
    if (event.category === "Concert") bg = "#1f8eb7";
    else if (event.category === "Seminar") bg = "#34d399";
    else if (event.category === "Conference") bg = "#fbbf24";
    else if (event.category === "Exhibition") bg = "#a78bfa";
    else if (event.category === "Workshop") bg = "#063970";
    else if (event.category === "Other") bg = "#76b5c5";

    return {
      style: {
        backgroundColor: bg,
        color: "#fff ",
        borderRadius: "5px",
        padding: "2px 5px",
        fontSize: "0.85rem",
      },
    };
  };

  // event render with time bdt
  const EventRenderer = ({ event }) => {
    const startTime = format(event.start, "p");
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
      <h2 className="text-xl lg:text-2xl font-bold mb-4 text-black text-center lg:text-left dark:text-white pb-3 lg:pb-6">
        Upcoming Events Calendar (Bangladesh Time)
      </h2>

      <Calendar
        localizer={localizer}
        events={events}
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
