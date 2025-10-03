"use client";

import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const AddEvent = () => {
  const [eventCoverImage, setEventCoverImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventName: "",
      eventCategory: null,
      startDateTime: "",
      endDateTime: "",
      venueName: "",
      address: "",
      country: "",
      description: "",
      tickets: [{ type: "", price: "", availability: "" }],
    },
  });
  const {
    fields: ticketFields,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    control,
    name: "tickets",
  });
  const eventCategories = [
    { value: "conference", label: "Conference" },
    { value: "workshop", label: "Workshop" },
    { value: "concert", label: "Concert" },
    { value: "exhibition", label: "Exhibition" },
    { value: "seminar", label: "Seminar" },
    { value: "other", label: "Other" },
  ];

  const onSubmit = (data) => {
    const finalFormData = {
      ...data,
      coverImage: eventCoverImage,
      status: "pending",
    };
    console.log("Form submitted:", data, "this is full data", finalFormData);
    // Add API call to submit the form data
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    }
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;

    const res = await axios.post(imagUploadUrl, formData);
    setEventCoverImage(res.data.data.url);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setEventCoverImage("");
    // Reset the file input
    const fileInput = document.querySelector(
      'input[type="file"][name="photo"]'
    );
    if (fileInput) {
      fileInput.value = "";
    }
  };
  console.log(eventCoverImage, "this is event cover image here ");
  return (
    <div className="p-2 lg:p-6">
      <h1 className="text-2xl font-bold mb-6">Add Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Event Details */}
        <div className="bg-card dark:bg-card p-6 rounded-lg shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  {...register("eventName", {
                    required: "Event name is required",
                  })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                />
                {errors.eventName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Category
                </label>
                <Controller
                  name="eventCategory"
                  control={control}
                  rules={{ required: "Event category is required" }}
                  render={({ field }) => (
                    <Select
                      options={eventCategories}
                      value={field.value}
                      onChange={field.onChange}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      placeholder="Select category"
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "var(--background)",
                          borderColor: "var(--border)",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "var(--background)",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused
                            ? "var(--accent)"
                            : "var(--background)",
                          color: "var(--foreground)",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "var(--foreground)",
                        }),
                      }}
                    />
                  )}
                />
                {errors.eventCategory && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventCategory.message}
                  </p>
                )}
              </div>
            </div>
            {/* start date and end date of event here  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  {...register("startDateTime", {
                    required: "Start date & time is required",
                  })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                />
                {errors.startDateTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startDateTime.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  {...register("endDateTime", {
                    required: "End date & time is required",
                  })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                />
                {errors.endDateTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.endDateTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <div className="bg-card dark:bg-card p-6 rounded-lg shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-4">Venue Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Venue Name
                </label>
                <input
                  type="text"
                  {...register("venueName", {
                    required: "Venue name is required",
                  })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                />
                {errors.venueName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.venueName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address/Street
                </label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                {...register("country", { required: "Country is required" })}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Media & Description */}
        <div className="bg-card dark:bg-card p-6 rounded-lg shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-4">Media & Description</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*event cover  Image Upload here*/}
              <div>
                <div>
                  {previewUrl ? (
                    <div
                      className="w-full rounded-lg border p-2 flex items-center gap-3 relative"
                      style={{
                        background: "var(--color-light-secondary)",
                        borderColor: "rgba(0,0,0,0.12)",
                      }}
                    >
                      <img
                        src={previewUrl}
                        alt="Selected preview"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="text-xs opacity-80">
                        Preview of your selected image
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        <IoMdClose size={16} className="cursor-pointer" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <label
                        className="text-[#685f78] block mb-1 font-medium"
                        htmlFor="profileImage"
                      >
                        Cover Image
                      </label>
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full border border-[#e9ecef] rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* description here */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows="4"
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* add ticket field start */}
        {/* Tickets Section */}
        <div className="bg-card dark:bg-card p-6 rounded-lg shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-4">Tickets</h2>

          <div className="space-y-4">
            {ticketFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
              >
                {/* Ticket Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ticket Type
                  </label>
                  <Controller
                    control={control}
                    name={`tickets.${index}.type`}
                    rules={{ required: "Ticket type is required" }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={[
                          { value: "vip", label: "VIP" },
                          { value: "regular", label: "Regular" },
                          { value: "early-bird", label: "Early Bird" },
                        ]}
                        value={
                          value
                            ? {
                                value,
                                label:
                                  value.charAt(0).toUpperCase() +
                                  value.slice(1),
                              }
                            : null
                        }
                        onChange={(selected) => onChange(selected?.value)}
                        placeholder="Select type"
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                  {errors.tickets?.[index]?.type && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tickets[index].type.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    {...register(`tickets.${index}.price`, {
                      required: "Price is required",
                    })}
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                    placeholder="Enter price"
                  />
                  {errors.tickets?.[index]?.price && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tickets[index].price.message}
                    </p>
                  )}
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Availability
                  </label>
                  <input
                    type="number"
                    {...register(`tickets.${index}.availability`, {
                      required: "Availability is required",
                    })}
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                    placeholder="No. of tickets"
                  />
                  {errors.tickets?.[index]?.availability && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tickets[index].availability.message}
                    </p>
                  )}
                </div>

                {/* Remove Ticket Button */}
                <div className="flex items-center">
                  {ticketFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTicket(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Add Ticket Button */}
            <button
              type="button"
              onClick={() =>
                appendTicket({ type: "", price: "", availability: "" })
              }
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer mt-2"
            >
              Add Ticket
            </button>
          </div>
        </div>

        {/* add ticket field end */}
        <div className="flex justify-end ">
          <Button type="submit" className="px-6 py-2 w-full lg:w-auto">
            Create Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
