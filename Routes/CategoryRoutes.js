import express from "express"; // Import express
import Category from "../Model/CategoryModel.js"; // Import the Category model
import * as CategoryController from "../Controllers/CategoryControllers.js"; // Import Category controllers


const categoryRouter = express.Router(); // Create a new router

// Define routes
categoryRouter.get("/", CategoryController.getAllCategory);
categoryRouter.post("/", CategoryController.addCategory);
categoryRouter.get("/:id", CategoryController.getCategoryById);
categoryRouter.put("/:id", CategoryController.updateCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);

// Export the router
export default categoryRouter; // Export using ES6 syntax
