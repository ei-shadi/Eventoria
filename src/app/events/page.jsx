"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Select from "react-select";
import useAxios from "../Hooks/useAxios";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { format } from "date-fns";

const AllEvents = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const axiosInstance = useAxios();

  const eventCategories = [
    { value: "conference", label: "Conference" },
    { value: "workshop", label: "Workshop" },
    { value: "concert", label: "Concert" },
    { value: "exhibition", label: "Exhibition" },
    { value: "seminar", label: "Seminar" },
    { value: "other", label: "Other" },
  ];

  // Fetch data
  const {
    data: AllEventsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-events"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/all-events`);
      return res.data;
    },
  });

  // Direct filtering (no useMemo)
  const filteredEvents = AllEventsData.filter((event) => {
    const matchesSearch = event.eventName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.eventCategory?.value === selectedCategory.value
      : true;
    return matchesSearch && matchesCategory;
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading events...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <section className="pt-[104px] min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#8FDA20] to-[#4A00E0] text-white text-center py-10 lg:py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">All Events</h1>
        <p className="text-sm md:text-base opacity-90">
          Explore and discover all upcoming approved events
        </p>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Field */}
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Search Event
            </label>
            <input
              type="text"
              placeholder="Search by event name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#8FDA20] outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Filter by Category
            </label>
            <Select
              options={eventCategories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Select category..."
              className="react-select-container text-black"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#f9fafb",
                  borderColor: "#d1d5db",
                  borderRadius: "0.5rem",
                  padding: "2px",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 20,
                }),
              }}
            />
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300">
              No events found.
            </p>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <img
                  src={event.coverImage}
                  alt={event.eventName}
                  className="w-full h-52 object-cover"
                />

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {event.eventName}
                  </h3>

                  {/* Date */}
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
                    <FaCalendarAlt className="mr-2 text-[#8FDA20] dark:text-[#8FDA20]" />
                    <span>
                      {`${format(
                        new Date(event.startDateTime),
                        "EEE, dd MMM yyyy"
                      )} – ${format(
                        new Date(event.endDateTime),
                        "EEE, dd MMM yyyy"
                      )}`}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
                    <FaTag className="mr-2 text-[#8FDA20] dark:text-[#8FDA20]" />
                    <span>{event.eventCategory?.label || "N/A"}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-3">
                    <FaMapMarkerAlt className="mr-2 text-[#8FDA20] dark:text-[#8FDA20]" />
                    <span>
                      {event.venueName}, {event.country}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto flex gap-3">
                    <button className="w-1/2 bg-[#8FDA20] hover:bg-[#7ac61b] text-white font-medium py-2 rounded-lg transition-all">
                      View Event
                    </button>
                    <button className="w-1/2 border border-[#8FDA20] text-[#8FDA20] dark:text-[#8FDA20] hover:bg-[#8FDA20] hover:text-white font-medium py-2 rounded-lg transition-all">
                      Buy Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllEvents;
