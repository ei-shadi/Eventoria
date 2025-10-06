"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import axios from "axios";

const EventUpdateForm = ({ defaultValues }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const {
    fields: ticketFields,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    control,
    name: "tickets",
  });

  const [updatedCoverImage, setUpdatedCoverImage] = useState(
    defaultValues?.coverImage || ""
  );

  const [previewUrl, setPreviewUrl] = useState(defaultValues?.coverImage);

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    }
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;

    const res = await axios.post(imagUploadUrl, formData);
    setUpdatedCoverImage(res.data.data.url);
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

  //updating event start
  const onSubmit = (data) => {
    const updatedEventData = {
      ...data,
      coverImage: updatedCoverImage,
    };
    console.log("this is full data", updatedEventData);
    // Add API call to submit the form and update event
  };
  //updating event ends

  // Dynamic categories from defaultValues
  const eventCategories = defaultValues?.eventCategory
    ? [defaultValues.eventCategory]
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
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
                className="w-full p-2 border border-border rounded-md bg-background dark:bg-gray-800 text-foreground"
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
                className="w-full p-2 border border-border rounded-md bg-background dark:bg-gray-800 text-foreground"
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
                className="w-full p-2 border border-border rounded-md bg-background dark:bg-gray-800 text-foreground"
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
                className="w-full p-2 border border-border rounded-md bg-background dark:bg-gray-800 text-foreground"
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
              className="w-full p-2 border border-border rounded-md bg-background dark:bg-gray-800 text-foreground"
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
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cover Image */}
          <div>
            {previewUrl ? (
              <div className="w-full rounded-lg border p-2 flex items-center gap-3 relative dark:bg-gray-800">
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
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <IoMdClose size={16} />
                </button>
              </div>
            ) : (
              <>
                <label className="text-[#685f78] block mb-1 font-medium">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-[#e9ecef] rounded px-3 py-3 cursor-pointer dark:bg-gray-800"
                />
              </>
            )}
          </div>

          {/* Description */}
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

      {/* Tickets */}
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
                                value.charAt(0).toUpperCase() + value.slice(1),
                            }
                          : null
                      }
                      onChange={(selected) => onChange(selected?.value)}
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
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  {...register(`tickets.${index}.price`, {
                    required: "Price is required",
                  })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground dark:bg-gray-800"
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
                />
                {errors.tickets?.[index]?.availability && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tickets[index].availability.message}
                  </p>
                )}
              </div>

              {/* Remove Ticket */}
              <div className="flex items-center">
                {ticketFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicket(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              appendTicket({ type: "", price: "", availability: "" })
            }
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
          >
            Add Ticket
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="px-6 py-2 w-full lg:w-9/12">
          Update Event
        </Button>
      </div>
    </form>
  );
};

export default EventUpdateForm;
