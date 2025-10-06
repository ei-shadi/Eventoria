"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import EventUpdateForm from "./EventUpdateForm";

const EventUpdateModal = ({ isOpen, onClose, defaultValues }) => {
  
console.log(defaultValues,'from event modal update modal')
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[100vw] sm:max-w-3xl lg:max-w-7xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>Update your event details below</DialogDescription>
        </DialogHeader>
        <EventUpdateForm defaultValues={defaultValues} />
       
      </DialogContent>
    </Dialog>
  );
};

export default EventUpdateModal;
