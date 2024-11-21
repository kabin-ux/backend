import express from "express"; // Import express
import * as HazardousController from "../Controllers/CategoryControllersHza.js"; // Import Hazardous controllers

const hazardousRouter = express.Router(); // Create a new router

// Define routes
hazardousRouter.get("/", HazardousController.getAllHazardous);
hazardousRouter.post("/", HazardousController.addHazardous);
hazardousRouter.get("/:id", HazardousController.getHazardousById);
hazardousRouter.put("/:id", HazardousController.updateHazardous);
hazardousRouter.delete("/:id", HazardousController.deleteHazardous);

// Export the router
export default hazardousRouter; // Export using ES6 syntax
