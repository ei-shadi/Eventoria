import React from "react";

import EventCardList from "@/components/Organizer/EventListCard/EventCardList";





const MyEvents = () => {
  return (
    <div className="px-3 md:p-6">
      <h1 className="text-2xl text-center lg:text-4xl font-bold mb-6">My Events</h1>
      <EventCardList />
    </div>
  );
};

export default MyEvents;
