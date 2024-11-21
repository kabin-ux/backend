import mongoose from "mongoose"; // Import mongoose

// Define the order schema
const orderSchema = new mongoose.Schema({
  productName: {
    type: String, // Data type
    required: true, // Validate
  },
  productCategory: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  deliveryType: {
    type: String,
    required: true,
  },
  trackingID: {
    type: String,
    required: true,
    unique: true,
  },
  orderDescription: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
const Order = mongoose.model("Order", orderSchema); 
export default Order; 