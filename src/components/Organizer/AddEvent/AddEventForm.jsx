"use client";
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import useAxios from "@/app/Hooks/useAxios";
const AddEventForm = () => {
  const [eventCoverImage, setEventCoverImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const { data: session } = useSession();
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    control,
    watch,
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
      tickets: [{ type: "", price: "", availability: "", sold: 0 }],
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
      organizerEmail: session?.user?.email,
      coverImage: eventCoverImage,
      approvalStatus: "pending",
      eventStatus: "live",
    };

    // Add API call to submit the form data
    axiosInstance
      .post("/api/organizerEvents", finalFormData)
      .then((res) => {
        // Handle success (e.g., show a success message, redirect)
        alert(`Event ${res} added successfully!`);
      })
      .catch((error) => {
        console.error(error);
        // Handle error (e.g., show an error message)
      });
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
  // 👉 watch দিয়ে startDateTime এর মান পাওয়া যাবে
  const startDate = watch("startDateTime");
  console.log(startDate);
  return (
    <div className="p-2 lg:p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Event Details */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-border">
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
                  className="w-full p-2 border border-border rounded-md bg-background dark:bg-gray-800 text-foreground"
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
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "var(--background) dark:bg-gray-800",
                          borderColor: "var(--border)",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "var(--background) dark:bg-gray-800",
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
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
                  min={startDate}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-border">
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
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
                className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-border">
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
                        background:
                          "var(--color-light-secondary) dark:bg-gray-800",
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
                        className="w-full border border-[#e9ecef] rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer dark:bg-gray-800"
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
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-border">
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
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            backgroundColor:
                              document.documentElement.classList.contains(
                                "dark"
                              )
                                ? "#1f2937" // dark:bg-gray-800
                                : "#ffffff", // light mode white
                            color: document.documentElement.classList.contains(
                              "dark"
                            )
                              ? "#f9fafb"
                              : "#111827",
                            borderColor: state.isFocused
                              ? "#6366f1"
                              : "#d1d5db",
                            boxShadow: state.isFocused
                              ? "0 0 0 1px #6366f1"
                              : "none",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor:
                              document.documentElement.classList.contains(
                                "dark"
                              )
                                ? "#1f2937" // dark mode dropdown bg
                                : "#ffffff", // light mode dropdown bg
                            color: document.documentElement.classList.contains(
                              "dark"
                            )
                              ? "#f9fafb"
                              : "#111827",
                          }),
                          option: (base, { isFocused, isSelected }) => ({
                            ...base,
                            backgroundColor: isSelected
                              ? "#6366f1"
                              : isFocused
                              ? document.documentElement.classList.contains(
                                  "dark"
                                )
                                ? "#374151" // hover dark
                                : "#f3f4f6" // hover light
                              : "transparent",
                            color: isSelected
                              ? "#ffffff"
                              : document.documentElement.classList.contains(
                                  "dark"
                                )
                              ? "#f9fafb"
                              : "#111827",
                          }),
                        }}
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
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
                appendTicket({ type: "", price: "", availability: "", sold: 0 })
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

export default AddEventForm;
