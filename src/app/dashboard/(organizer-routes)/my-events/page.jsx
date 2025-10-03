import React from "react";
import { format } from "date-fns";

import EventCardList from "@/components/Organizer/EventListCard/EventCardList";



// format helper
const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), "MMM dd, yyyy • h:mm a");
  } catch (error) {
    return dateString;
  }
};

const MyEvents = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">My Events</h1>
      <EventCardList />
    </div>
  );
};

export default MyEvents;
