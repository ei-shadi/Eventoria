"use client";

import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventCategory: null,
    startDateTime: "",
    endDateTime: "",
    venueName: "",
    address: "",
    country: "",
    coverImage: null,
    description: "",
    tickets: [{ type: null, price: "", quantity: "" }],
  });

  const eventCategories = [
    { value: "conference", label: "Conference" },
    { value: "workshop", label: "Workshop" },
    { value: "concert", label: "Concert" },
    { value: "exhibition", label: "Exhibition" },
    { value: "seminar", label: "Seminar" },
    { value: "other", label: "Other" },
  ];

  const ticketTypes = [
    { value: "standard", label: "Standard" },
    { value: "vip", label: "VIP" },
    { value: "early_bird", label: "Early Bird" },
    { value: "student", label: "Student" },
    { value: "group", label: "Group" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...formData.tickets];
    updatedTickets[index][field] = value;
    setFormData({ ...formData, tickets: updatedTickets });
  };

  const addTicket = () => {
    setFormData({
      ...formData,
      tickets: [...formData.tickets, { type: null, price: "", quantity: "" }],
    });
  };

  const removeTicket = (index) => {
    const updatedTickets = [...formData.tickets];
    updatedTickets.splice(index, 1);
    setFormData({ ...formData, tickets: updatedTickets });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call to submit the form data
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Event</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Details */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="eventName"
                className="block text-sm font-medium mb-1"
              >
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="eventCategory"
                className="block text-sm font-medium mb-1"
              >
                Event Category/Type
              </label>
              <Select
                id="eventCategory"
                options={eventCategories}
                value={formData.eventCategory}
                onChange={(option) =>
                  handleSelectChange(option, "eventCategory")
                }
                className="react-select-container"
                classNamePrefix="react-select"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDateTime"
                  className="block text-sm font-medium mb-1"
                >
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="startDateTime"
                  name="startDateTime"
                  value={formData.startDateTime}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="endDateTime"
                  className="block text-sm font-medium mb-1"
                >
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="endDateTime"
                  name="endDateTime"
                  value={formData.endDateTime}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Venue Information</h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="venueName"
                className="block text-sm font-medium mb-1"
              >
                Venue Name
              </label>
              <input
                type="text"
                id="venueName"
                name="venueName"
                value={formData.venueName}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Address / Street
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Event Media & Description */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Media & Description</h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium mb-1"
              >
                Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Ticket Information */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Ticket Information</h2>

          <div className="space-y-4">
            {formData.tickets.map((ticket, index) => (
              <div
                key={index}
                className="flex flex-wrap items-end gap-4 pb-4 border-b"
              >
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium mb-1">
                    Ticket Type
                  </label>
                  <Select
                    options={ticketTypes}
                    value={ticket.type}
                    onChange={(option) =>
                      handleTicketChange(index, "type", option)
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(e) =>
                      handleTicketChange(index, "price", e.target.value)
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={ticket.quantity}
                    onChange={(e) =>
                      handleTicketChange(index, "quantity", e.target.value)
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    min="1"
                  />
                </div>

                {formData.tickets.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeTicket(index)}
                    className="mb-0"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addTicket}>
              Add Ticket
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="px-8">
            Submit Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
