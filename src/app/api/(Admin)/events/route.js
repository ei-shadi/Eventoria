// api/events/route.js

import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// --- 1. GET: Fetch all events ---
export async function GET() {
    try {
        const db = await getDatabase();
        // optionally, fetch only pending events for the moderation queue
        const events = await db.collection('events').find({}).toArray();
        return NextResponse.json(events);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 });
    }
}

// --- 2. POST: Create a new event ---
// export async function POST(req) {
//     try {
//         const db = await getDatabase();
//         const data = await req.json();
//         // Set initial status to 'Pending' upon creation
//         const eventData = { ...data, status: 'pending', createdAt: new Date() };
        
//         const result = await db.collection('events').insertOne(eventData);
//         return NextResponse.json(result, { status: 201 }); // 201 Created
//     } catch (error) {
//         console.error("POST error:", error);
//         return NextResponse.json({ message: "Failed to create event" }, { status: 500 });
//     }
// }

// --- 3. PATCH: Update event status (Approve/Reject) ---
// Note: We use PATCH instead of PUT for partial updates.
// The client must send { id: '...', status: 'Approved'/'Rejected' }
export async function PATCH(req) {
    try {
        const db = await getDatabase();
        const data = await req.json();
        const { eventId, newStatus } = data; // Expects _id string and new status
        
        if (!eventId || !newStatus) {
            return NextResponse.json({ message: "Missing ID or status in request body" }, { status: 400 });
        }

        const result = await db.collection('events').updateOne(
            { _id: new ObjectId(eventId) }, 
            { $set: { approvalStatus: newStatus } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        
        return NextResponse.json({ 
            message: "Status updated successfully", 
            modifiedCount: result.modifiedCount 
        });

    } catch (error) {
        console.error("PATCH error:", error);
        // Handle invalid ObjectId format
        if (error.name === 'BSONTypeError' || error.message.includes('ObjectId')) {
             return NextResponse.json({ message: "Invalid Event ID format" }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to update event status" }, { status: 500 });
    }
}

// --- 4. DELETE: Delete an event ---
export async function DELETE(req) {
    try {
        const db = await getDatabase();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: "Missing ID search parameter" }, { status: 400 });
        }
        
        const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("DELETE error:", error);
         if (error.name === 'BSONTypeError' || error.message.includes('ObjectId')) {
             return NextResponse.json({ message: "Invalid Event ID format" }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to delete event" }, { status: 500 });
    }
}