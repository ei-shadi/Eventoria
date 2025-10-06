import React from "react";
import AddEventForm from "@/components/Organizer/AddEvent/AddEventForm";

const AddEvent = () => {
  return (
    <div className="p-2 lg:p-6">
    <h1 className="text-2xl text-center lg:text-4xl font-bold mb-6">Add Event</h1>
      <AddEventForm />
    </div>
  );
};

export default AddEvent;
