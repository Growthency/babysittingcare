import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // ফ্রন্টএন্ড থেকে ডাটা রিসিভ করছি
    const { name, email, password, nid, phone } = await req.json();

    await connectDB();

    // চেক করছি এই ইমেইল দিয়ে আগে কেউ একাউন্ট খুলেছে কিনা
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 400 }
      );
    }

    // পাসওয়ার্ড এনক্রিপ্ট (Hash) করা হচ্ছে সিকিউরিটির জন্য
    const hashedPassword = await bcrypt.hash(password, 10);

    // ডাটাবেসে নতুন ইউজার তৈরি করা হচ্ছে
    await User.create({
      name,
      email,
      password: hashedPassword,
      nid,
      phone,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Registration Error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
