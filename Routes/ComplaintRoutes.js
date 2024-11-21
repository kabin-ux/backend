import {Router} from "express";
import { addComplaint, deleteComplaint, getAllComplaints, updateComplaint, getComplaintById} from "../controllers/ComplaintController.js"; // Import Complain controllers
import { authorizeComplaintEdit, authorizeUserType, verifyJWT } from "../middlewares/auth.js";

const complaintRouter = Router(); // Create a new router

// Define routes
complaintRouter.get("/", verifyJWT, authorizeUserType('admin'), getAllComplaints);
complaintRouter.post("/", verifyJWT, authorizeUserType('user'), addComplaint);
complaintRouter.get("/:id", verifyJWT, authorizeUserType('user', 'admin'), authorizeComplaintEdit, getComplaintById);
complaintRouter.put("/:id", verifyJWT, authorizeUserType('admin'), updateComplaint);
complaintRouter.delete("/:id", verifyJWT, authorizeUserType('admin'), deleteComplaint);

// Export the router
export default complaintRouter; 
