// app/api/events/[id]/route.js

import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET, PUT, and DELETE methods will receive the { params } object
// which contains the dynamic segment: { id: '...' }

// --- 1. GET: Fetch a single event by ID ---
export async function GET(req, { params }) {
    try {
        const { id } = params;
        
        if (!id) {
            return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
        }

        const db = await getDatabase();
        const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
        
        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        
        return NextResponse.json(event);
    } catch (error) {
        console.error("GET Single Event Error:", error);
        if (error.name === 'BSONTypeError') {
            return NextResponse.json({ message: "Invalid Event ID format" }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to fetch event" }, { status: 500 });
    }
}

// --- 2. PUT: Fully replace/update a single event by ID (e.g., editing all details) ---
export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const updatedData = await req.json(); // The new full event object
        
        if (!id) {
            return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
        }
        
        // Remove _id from the updatedData to prevent errors
        const { _id, ...dataToUpdate } = updatedData;

        const db = await getDatabase();
        const result = await db.collection('events').updateOne(
            { _id: new ObjectId(id) }, 
            { $set: approvalStatus } // $set ensures only provided fields are updated
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Event updated successfully", modifiedCount: result.modifiedCount });
    } catch (error) {
        console.error("PUT Event Error:", error);
        if (error.name === 'BSONTypeError') {
            return NextResponse.json({ message: "Invalid Event ID format" }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to update event" }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("EventoriaDB");
    const { id } = params;
    const { newStatus } = await req.json();

    // Validate status
    if (!["approved", "rejected", "pending"].includes(newStatus)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    // Update event status
    const result = await db
      .collection("events")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { approvalStatus: newStatus } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Event status updated to ${newStatus}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { message: "Failed to update event status" },
      { status: 500 }
    );
  }
}

// --- 3. DELETE: Delete a single event by ID ---
export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        
        if (!id) {
            return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
        }

        const db = await getDatabase();
        const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("DELETE Event Error:", error);
        if (error.name === 'BSONTypeError') {
            return NextResponse.json({ message: "Invalid Event ID format" }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to delete event" }, { status: 500 });
    }
}