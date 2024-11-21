import mongoose from "mongoose"; // Import mongoose

// Define the payment plan schema
const paymentPlanSchema = new mongoose.Schema({
  packageName: {
    type: String, // Name of the package
    required: true, // This is a required field
  },
  packagePrice: {
    type: Number, // Price of the package
    required: true, // This is a required field
  },
  cardHolderName: {
    type: String, // Name of the card holder
    required: true, // This is a required field
  },
  paymentSuccessTime: {
    type: Date, // Time of successful payment
    default: Date.now, // Automatically records the time of the payment
  },
});

// Export the model
const PaymentPlan = mongoose.model("PaymentPlan", paymentPlanSchema);
export default  PaymentPlan;