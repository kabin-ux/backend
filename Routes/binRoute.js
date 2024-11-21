import express from "express"; // Import express
import Bin from "../Model/binModel.js"; // Import the Bin model
import * as BinController from "../Controllers/binControllers.js"; // Import Bin controllers

const binRouter = express.Router(); // Create a new router

// Define routes
binRouter.get("/", BinController.getAllBins);
binRouter.post("/", BinController.addBins);
binRouter.get("/:bid", BinController.getById);
binRouter.put("/:bid", BinController.updateBin);
binRouter.delete("/:bid", BinController.deleteBin);

// Export the router
export default binRouter; // Export using ES6 syntax
