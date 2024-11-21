import express from "express"; // Import express
import * as AdminController from "../Controllers/adminControllers.js"; // Import Admin controllers

const adminRouter = express.Router(); // Create a new router

// Define routes
adminRouter.get("/", AdminController.getAllAdmins);
adminRouter.post("/", AdminController.addAdmins);
adminRouter.get("/:aid", AdminController.getById);
adminRouter.put("/:aid", AdminController.updateAdmin);
adminRouter.delete("/:aid", AdminController.deleteAdmin);
adminRouter.post("/:aid/login", AdminController.loginAdmin); // Updated to avoid duplicate POST method

// Export the router
export default adminRouter; // Export using ES6 syntax
