import mongoose from "mongoose"; // Import mongoose

// Define the plan model schema
const planModelSchema = new mongoose.Schema({
  packageName: {
    type: String, // type: String
    required: true, // value
  },
  packagePrice: {
    type: Number, // type: Number
    required: true, // value
  },
  features: {
    type: [String], // type: String
    required: true, // value
  },
});

// Export the model
const Plan = mongoose.model("Plan", planModelSchema);
export default Plan;
