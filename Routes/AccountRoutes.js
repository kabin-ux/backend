import express from "express"; // Import express
import Account from "../Model/AccountModel.js"; // Import the Account model
import * as AccountControllers from "../Controllers/AccountControllers.js"; // Import account controllers

const accountrouter = express.Router(); // Create a new router

// Create routes path
accountrouter.get("/", AccountControllers.getAllAccount);
accountrouter.post("/", AccountControllers.addAccount);
accountrouter.get("/:id", AccountControllers.getAccountById);
accountrouter.put("/:id", AccountControllers.updateAccount);
accountrouter.delete("/:id", AccountControllers.deleteAccount);

// Export the router
export default accountrouter; // Export using ES6 syntax
