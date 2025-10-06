import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaTicketAlt } from "react-icons/fa";

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 🔹 Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 🔹 Modal Box */}
      <div className="relative bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 animate-fadeIn overflow-y-auto scrollbar-hidden max-h-screen">
        {/* Header Image */}
        <div className="relative">
          <img
            src={event.coverImage}
            alt={event.eventName}
            className="w-full h-60 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-3xl text-gray-100 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-screen">
          <h2 className="text-2xl font-bold mb-2">{event.eventName}</h2>
          <p className="text-sm text-gray-600 mb-4">
            Category: <span className="font-semibold text-purple-600">{event.eventCategory.label}</span>
          </p>

          <div className="space-y-3 text-sm md:text-base">
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" />
              <span>
                {new Date(event.startDateTime).toLocaleString()} →{" "}
                {new Date(event.endDateTime).toLocaleString()}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-purple-500" />
              <span>
                {event.venueName}, {event.address}, {event.country}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-purple-500" />
              <span>Organizer: {event.organizerEmail}</span>
            </p>
          </div>

          {/* 🔹 Tickets Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaTicketAlt className="text-purple-600" /> Tickets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {event.tickets.map((t, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl p-3 flex justify-between items-center hover:bg-purple-50 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{t.type}</p>
                    <p className="text-sm text-gray-500">
                      Available: {t.availability}
                    </p>
                  </div>
                  <p className="font-semibold text-purple-600">${t.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 Footer Buttons */}
          <div className="flex justify-end mt-8">
            <button
              onClick={() => alert("Booking feature coming soon!")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
