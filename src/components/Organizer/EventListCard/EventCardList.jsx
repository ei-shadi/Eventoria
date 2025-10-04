import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import StatusUpdateModal from "../StatusUpdateModal/StatusUpdateModal";

// আপনার ফেক ডাটা
const myEventsData = [
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
    startDateTime: "2025-12-01T09:00",
    endDateTime: "2025-12-03T17:00",
    venueName: "Silicon Valley Conference Center",
    address: "California, USA",
    country: "USA",
    description: "Gathering of top tech leaders to discuss future innovations.",
    coverImage: "https://i.ibb.co/KcdTCDv3/event-image-1.jpg",
    organizerEmail: "organizer@example.com",
    approvalStatus: "pending",
    eventStatus: "sold out",
  },
  {
    eventName: "Art & Culture Expo",
    eventCategory: { value: "exhibition", label: "Exhibition" },
    startDateTime: "2025-10-20T10:00",
    endDateTime: "2025-10-25T18:00",
    venueName: "Louvre Gallery",
    address: "Paris, France",
    country: "France",
    description: "Showcasing artworks from emerging and renowned artists.",
    coverImage: "https://i.ibb.co/KcdTCDv3/event-image-1.jpg",
    organizerEmail: "organizer@example.com",
    approvalStatus: "approved",
    eventStatus: "completed",
  },
  {
    eventName: "Culinary Fiesta",
    eventCategory: { value: "food", label: "Food Festival" },
    startDateTime: "2025-11-15T12:00",
    endDateTime: "2025-11-17T20:00",
    venueName: "Downtown Market",
    address: "Tokyo, Japan",
    country: "Japan",
    description:
      "A delicious journey through international cuisines and chefs.",
    coverImage: "https://i.ibb.co/KcdTCDv3/event-image-1.jpg",
    organizerEmail: "organizer@example.com",
    approvalStatus: "approved",
    eventStatus: "live",
  },
  {
    eventName: "Marathon for Charity",
    eventCategory: { value: "sports", label: "Sports" },
    startDateTime: "2025-12-10T06:00",
    endDateTime: "2025-12-10T12:00",
    venueName: "Central Park",
    address: "New York, USA",
    country: "USA",
    description: "Annual charity marathon to support local communities.",
    coverImage: "https://i.ibb.co/KcdTCDv3/event-image-1.jpg",
    organizerEmail: "organizer@example.com",
    approvalStatus: "approved",
    eventStatus: "live",
  },
];

// ডেটা ফরম্যাট করার হেল্পার
const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), "MMM dd, yyyy • h:mm a");
  } catch (error) {
    return dateString;
  }
};

const EventCardList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {myEventsData.map((event, index) => (
        <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.eventName}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 ">
            <h2 className="text-lg font-bold mb-2">{event.eventName}</h2>

            <div className="pt-2 space-y-3">
              <p className="text-sm text-gray-500 mb-2">
                {event.eventCategory.label}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                <Calendar size={16} /> {formatDate(event.startDateTime)} -{" "}
                {formatDate(event.endDateTime)}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin size={16} /> {event.venueName}, {event.address}
              </p>
              <p
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  event.approvalStatus === "approved"
                    ? "bg-green-100 text-green-800"
                    : event.approvalStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {event.approvalStatus}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm cursor-pointer">
                View
              </button>
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm cursor-pointer">
                Edit
              </button>
              {event.approvalStatus === "approved" && (
                <StatusUpdateModal>
                  <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm cursor-pointer">
                    Update Status
                  </button>
                </StatusUpdateModal>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCardList;
