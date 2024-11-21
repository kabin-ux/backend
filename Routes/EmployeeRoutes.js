import express from "express"; // Import express
import* as EmployeeController from "../Controllers/EmployeeControllers.js"; // Import Employee controllers

const employeerouter = express.Router(); // Create a new router

// Define routes
employeerouter.get("/", EmployeeController.getEmployee);
employeerouter.post("/", EmployeeController.addEmployee);
employeerouter.get("/:id", EmployeeController.getById);
employeerouter.put("/:id", EmployeeController.updateEmployee);
employeerouter.delete("/:id", EmployeeController.deleteEmployee);

// Export the router
export default employeerouter; // Export using ES6 syntax
