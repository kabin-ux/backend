import express from "express"; // Import express
import * as orderController from "../Controllers/orderController.js"; // Import order controllers

const orderRouter = express.Router(); // Create a new router

// Define routes
orderRouter.get("/", orderController.getOrder);
orderRouter.post("/", orderController.addOrder);
orderRouter.get("/:Oid", orderController.getOrderById);
orderRouter.put("/:Oid", orderController.updateOrder);
orderRouter.delete("/:Oid", orderController.deleteOrder);

// Export the router
export default orderRouter; // Export using ES6 syntax
