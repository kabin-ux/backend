import mongoose from "mongoose"; // Import mongoose

// Define the task schema
const taskSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver", // Reference to the Driver model
    required: true,
  },
  binIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bin", // Reference to the Bin model
      required: true,
    },
  ],
  taskId: {
    type: String,
    required: true,
    unique: true,
  },
  completionStatus: {
    type: Boolean,
    default: false, // Initially set to false
  },
  duration: {
    type: Number, // Duration can be in minutes or hours
    required: true,
  },
});

// Export the model
const Task = mongoose.model("Task", taskSchema);
export default Task;
