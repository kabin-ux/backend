import { Router } from "express";
import {addRequests, deleteRequest, getAllRequests, getRequestById, updateRequest, updateRequestStatus} from "../controllers/RequestController.js"
import { authorizeRequestEdit, authorizeUserType, verifyJWT } from "../middlewares/auth.js";

const requestRouter = Router(); // Create a new router

// Define routes
requestRouter.get('/', verifyJWT, authorizeUserType('admin'), getAllRequests);
requestRouter.post('/', verifyJWT, addRequests);
requestRouter.get('/:id', verifyJWT, authorizeUserType('user', 'admin'), getRequestById);
requestRouter.put('/:id', verifyJWT, authorizeUserType('user', 'admin'), authorizeRequestEdit, updateRequest);
requestRouter.delete('/:id', verifyJWT, authorizeUserType('admin'), deleteRequest);
requestRouter.put('/:id/status', verifyJWT, authorizeUserType('admin'), updateRequestStatus); // Corrected endpoint for status update

// Export the router
export default requestRouter; 
