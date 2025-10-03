"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const StatusUpdateModal = ({ children }) => {
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
          <button className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600">
            Live Now
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
            Completed
          </button>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-600">
            Sold Out
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600">
            Cancelled
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateModal;
