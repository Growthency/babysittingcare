import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceTitle: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    address: {
      division: String,
      district: String,
      area: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;

