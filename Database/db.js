import mongoose from "mongoose";
import { MONGODB_URL } from "../config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL || 5001);
    console.log("Connected to Database successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectToDB;
