import mongoose from "mongoose"; // Import mongoose

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" ,
    required: true,
  }
},
{
  timestamps: true,
}
);

// Export the model
const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
