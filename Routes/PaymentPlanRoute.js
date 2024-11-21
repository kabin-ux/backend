import express from "express"; // Import express
import * as PaymentPlanController from "../Controllers/PaymentPlanControllers.js"; // Import payment plan controllers

const paymentPlanRouter = express.Router(); // Create a new router

// Define routes
// paymentPlanRouter.get("/", PaymentPlanController.getAllPaymentPlans);
paymentPlanRouter.post("/", PaymentPlanController.savePaymentDetails);
// paymentPlanRouter.get("/:id", PaymentPlanController.getPaymentPlanById);
// paymentPlanRouter.put("/:id", PaymentPlanController.updatePaymentPlan);
// paymentPlanRouter.delete("/:id", PaymentPlanController.deletePaymentPlan);

// Export the router
export default paymentPlanRouter; // Export using ES6 syntax
