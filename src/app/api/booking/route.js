import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectDB();

    // ১. বুকিং ডাটাবেসে সেভ করা
    const newBooking = await Booking.create(data);

    // ২. ইমেইল ট্রান্সপোর্টার সেটআপ
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ৩. ইমেইল এর ডিজাইন (Invoice Design)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.userEmail,
      subject: `Booking Confirmed: ${data.serviceTitle} - Care.xyz`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #2563EB; text-align: center;">Booking Confirmation</h2>
          <p>Hello,</p>
          <p>Thank you for choosing <strong>Care.xyz</strong>. Your booking has been confirmed!</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">Invoice Details</h3>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${data.serviceTitle}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${data.date}</p>
            <p style="margin: 5px 0;"><strong>Duration:</strong> ${data.duration} Days</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${data.address.area}, ${data.address.district}</p>
            <hr style="border: 0; border-top: 1px solid #d1d5db; margin: 10px 0;">
            <p style="font-size: 18px; font-weight: bold; color: #2563EB; text-align: right;">Total Paid: Tk ${data.totalCost}</p>
          </div>

          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            If you have any questions, reply to this email or call us at +880 1712 345 678.
          </p>
        </div>
      `,
    };

    // ৪. ইমেইল পাঠানো
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Booking successful & Email sent!" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Error creating booking" },
      { status: 500 }
    );
  }
}

// GET মেথড (যেমন ছিল তেমনই থাকবে)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    await connectDB();
    const bookings = await Booking.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
