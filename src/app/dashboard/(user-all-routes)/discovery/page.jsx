"use client";

import EventDetailsModal from "@/components/Users/EventDetailsModal";
import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaTicketAlt } from "react-icons/fa";
// import Image from "next/image";

const Discovery = () => {
  // 🔹 Mock events data
  const mockEvents = [
    {
      _id: "1",
      eventName: "Chemotherapy Foundation Symposium",
      eventCategory: { value: "conference", label: "Conference" },
      startDateTime: "2025-10-23T17:35",
      endDateTime: "2025-10-29T15:35",
      venueName: "Principality Stadium",
      address: "Inglewood, California",
      country: "United States",
      tickets: [
        { type: "VIP", price: "599", availability: "90" },
        { type: "Regular", price: "199", availability: "999" },
      ],
      organizerEmail: "organizer@eventoria.com",
      coverImage: "https://www.pexels.com/photo/photo-of-people-sitting-on-a-conference-1494665/", // Conference
      approvalStatus: "approved",
      eventStatus: "live",
    },
    {
      _id: "2",
      eventName: "Tech Innovators Expo 2025",
      eventCategory: { value: "tech", label: "Technology" },
      startDateTime: "2025-11-10T09:00",
      endDateTime: "2025-11-12T18:00",
      venueName: "Silicon Valley Expo Center",
      address: "San Jose, CA",
      country: "United States",
      tickets: [
        { type: "VIP", price: "499", availability: "150" },
        { type: "Standard", price: "199", availability: "800" },
      ],
      organizerEmail: "tech@eventoria.com",
      coverImage: "https://images.unsplash.com/photo-1601462232265-b7d9e8fe22a9", // Technology Expo
      approvalStatus: "approved",
      eventStatus: "live",
    },
    {
      _id: "3",
      eventName: "Music Beats Festival",
      eventCategory: { value: "concert", label: "Concert" },
      startDateTime: "2025-12-05T15:00",
      endDateTime: "2025-12-07T23:00",
      venueName: "Hyde Park Arena",
      address: "London",
      country: "United Kingdom",
      tickets: [
        { type: "Regular", price: "99", availability: "500" },
        { type: "Premium", price: "249", availability: "200" },
      ],
      organizerEmail: "music@eventoria.com",
      coverImage: "https://images.unsplash.com/photo-1516357446957-bff586f68828", // Music Festival
      approvalStatus: "approved",
      eventStatus: "live",
    },
    {
      _id: "4",
      eventName: "Startup Pitch Fest",
      eventCategory: { value: "business", label: "Business" },
      startDateTime: "2025-11-01T10:00",
      endDateTime: "2025-11-01T17:00",
      venueName: "Dhaka Convention Center",
      address: "Dhaka",
      country: "Bangladesh",
      tickets: [
        { type: "Regular", price: "20", availability: "300" },
        { type: "VIP", price: "100", availability: "50" },
      ],
      organizerEmail: "pitch@eventoria.com",
      coverImage: "https://images.unsplash.com/photo-1573164574391-76f69db08173", // Business Pitch
      approvalStatus: "approved",
      eventStatus: "live",
    },
    {
      _id: "5",
      eventName: "Cultural Heritage Fair",
      eventCategory: { value: "cultural", label: "Cultural" },
      startDateTime: "2025-10-20T09:00",
      endDateTime: "2025-10-21T18:00",
      venueName: "National Museum Grounds",
      address: "New Delhi",
      country: "India",
      tickets: [
        { type: "General", price: "10", availability: "1000" },
        { type: "Premium", price: "30", availability: "200" },
      ],
      organizerEmail: "culture@eventoria.com",
      coverImage: "https://images.unsplash.com/photo-1542497792-72035c06201b", // Cultural Event
      approvalStatus: "approved",
      eventStatus: "live",
    },
    {
      _id: "6",
      eventName: "AI and Robotics Summit",
      eventCategory: { value: "tech", label: "Technology" },
      startDateTime: "2025-11-25T09:30",
      endDateTime: "2025-11-27T17:30",
      venueName: "Tokyo Tech Hall",
      address: "Tokyo",
      country: "Japan",
      tickets: [
        { type: "Standard", price: "300", availability: "400" },
        { type: "VIP", price: "700", availability: "100" },
      ],
      organizerEmail: "ai@eventoria.com",
      coverImage: "https://images.unsplash.com/photo-1519921530784-239c42470ab1", // AI Summit
      approvalStatus: "approved",
      eventStatus: "live",
    },
    {
      _id: "7",
      eventName: "World Food Expo",
      eventCategory: { value: "food", label: "Food" },
      startDateTime: "2025-12-15T10:00",
      endDateTime: "2025-12-17T20:00",
      venueName: "Paris Expo Center",
      address: "Paris",
      country: "France",
      tickets: [
        { type: "General", price: "50", availability: "600" },
        { type: "Premium", price: "150", availability: "200" },
      ],
      organizerEmail: "food@eventoria.com",
      coverImage: "https://images.unsplash.com/photo-1563720223-b0fc5e44b381", // Food Expo
      approvalStatus: "approved",
      eventStatus: "live",
    },
    {
      _id: "8",
      eventName: "Fitness and Wellness Retreat",
      eventCategory: { value: "health", label: "Health" },
      startDateTime: "2025-11-18T07:00",
      endDateTime: "2025-11-20T18:00",
      venueName: "Bali Wellness Resort",
      address: "Bali",
      country: "Indonesia",
      tickets: [
        { type: "Regular", price: "250", availability: "150" },
        { type: "VIP", price: "400", availability: "50" },
      ],
      organizerEmail: "wellness@eventoria.com",
      coverImage: "https://images.unsplash.com/photo-1582697595099-8d99d8f1bb0b", // Fitness and Wellness
      approvalStatus: "approved",
      eventStatus: "live",
    },
  ];
  
  

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const today = new Date();
    const upcoming = mockEvents.filter(
      (e) => new Date(e.startDateTime) > today
    );
    setEvents(upcoming);
  }, []);

  const filteredEvents = events.filter(
    (e) =>
      e.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.eventCategory.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-white w-full mx-auto ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Upcoming Events
        </h2>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Cover
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Event Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Venue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr
                  key={event._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3">
                    {/* <Image
                      src={event.coverImage}
                      alt={event.eventName}
                      width={60}
                      height={40}
                      className="rounded-md object-cover border border-gray-200"
                    /> */}
                  </td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-800">
                    {event.eventName}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {event.eventCategory.label}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {event.venueName}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {new Date(event.startDateTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {new Date(event.endDateTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {event.country}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                        onClick={() => handleView(event)}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                        onClick={() => alert(`Booking ${event.eventName}`)}
                      >
                        <FaTicketAlt /> Book
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  No upcoming events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default Discovery;
