import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

// ✅ PATCH /api/events/[id]/status
export async function PATCH(req, context) {
  try {
    // ✅ params async হওয়ায় await করতে হবে
    const { id } = await context.params;

    const db = await getDatabase();
    const { status } = await req.json();

    console.log("Received ID:", id, "New Status:", status);

    // ✅ Validation checks
    if (!id) {
      return NextResponse.json(
        { error: "Event ID is missing" },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "Status field is required" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid event ID format" },
        { status: 400 }
      );
    }

    // ✅ Update event status
    const result = await db.collection("events").updateOne(
      { _id: new ObjectId(id) },
      { $set: { eventStatus: status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "✅ Event status updated successfully!",
      newStatus: status,
    });
  } catch (error) {
    console.error("❌ Error updating event status:", error);
    return NextResponse.json(
      { error: "Failed to update event status" },
      { status: 500 }
    );
  }
}
