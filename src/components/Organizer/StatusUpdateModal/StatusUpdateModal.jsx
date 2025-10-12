"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxios from "@/app/Hooks/useAxios";

const StatusUpdateModal = ({ children,eventId,refetchStatus }) => {
  const axiosInstance=useAxios()
  console.log(eventId,'this is event id this')
  const handleUpdateStatus = async (status) => {
    try {
      const res=await axiosInstance.patch(`/api/events/${eventId}/status`, {
        status,
      });
      refetchStatus()
      console.log(res);
      alert('Status updated successfully')
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };


  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* Modal Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Event Status</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-3 mt-4">
          <button onClick={() => handleUpdateStatus("Live-Now")} className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer hover:bg-green-900">
            Live Now
          </button>
          <button onClick={() => handleUpdateStatus("Completed")} className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
            Completed
          </button>

          <button onClick={() => handleUpdateStatus("Cancelled")} className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600">
            Cancelled
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateModal;
