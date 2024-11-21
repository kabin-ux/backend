import express from "express"; // Import express
import Recyclable from "../Model/CategoryModelOr.js"; // Import the Recyclable model
import * as RecyclableController from "../Controllers/CategoryControllersOr.js"; // Import Recyclable controllers

const recyclableRouter = express.Router(); // Create a new router

// Define routes
recyclableRouter.get("/", RecyclableController.getAllRecyclable);
recyclableRouter.post("/", RecyclableController.addRecyclable);
recyclableRouter.get("/:id", RecyclableController.getRecyclableById);
recyclableRouter.put("/:id", RecyclableController.updateRecyclable);
recyclableRouter.delete("/:id", RecyclableController.deleteRecyclable);

// Export the router
export default recyclableRouter; // Export using ES6 syntax
