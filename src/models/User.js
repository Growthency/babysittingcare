import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: false, // Google Login এর ক্ষেত্রে পাসওয়ার্ড লাগে না, তাই false রাখলাম
    },
    nid: {
      type: String,
      required: false, // শুরুতে Google দিয়ে লগিন করলে NID নাও থাকতে পারে
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// যদি মডেল আগে থেকে থাকে, তবে সেটাই ব্যবহার করো, না হলে নতুন বানাও
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
