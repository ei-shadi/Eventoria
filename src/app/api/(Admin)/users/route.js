// src/app/api/users/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// ✅ GET user(s) by email or get all users
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("EventoriaDB");
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      // Get a single user's profile by email
      const user = await db.collection("users").findOne({ email });

      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      // Return the user's profile data
      return NextResponse.json({ message: "Profile fetched successfully", data: user }, { status: 200 });
    } else {
      // Get all users
      const users = await db.collection("users").find({}).toArray();
      const usersData = users.map((user) => ({
        ...user,
        _id: user._id.toString(),
      }));
      return NextResponse.json({
        message: "Users fetched successfully",
        data: usersData
      }, { status: 200 });
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}

// ✅ PATCH (Update) a user's profile or role
export async function PATCH(req) {
  try {
    const client = await clientPromise;
    const db = client.db("EventoriaDB");
    const { email, ...updateData } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const result = await db.collection("users").updateOne(
      { email },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}