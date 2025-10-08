import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET — Fetch all approved events
export async function GET() {
  try {
    const db = await getDatabase();

    const result = await db
      .collection("events")
      .find({ approvalStatus: "approved" })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching approved events:", error);
    return NextResponse.json(
      { message: "Failed to fetch approved events", error: error.message },
      { status: 500 }
    );
  }
}
