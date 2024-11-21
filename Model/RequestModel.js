import mongoose from "mongoose"; 

// Define the request service schema
const requestServiceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
},
{
  timestamps: true, // Enable timestamps for created and updated fields
});

// Export the model
const RequestService =  mongoose.model("RequestService", requestServiceSchema); // Exporting using ES6 syntax
export default  RequestService;