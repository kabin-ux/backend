import {Router} from "express";
import {addSupport, deleteSupport, getAllSupport, getById, updateSupport} from "../Controllers/SupportControllers.js"; 
import { authorizeUserType, verifyJWT } from "../middlewares/auth.js";

const supportRouter = Router(); // Create a new router

// Define routes
supportRouter.get("/", verifyJWT, authorizeUserType('admin'), getAllSupport);
supportRouter.post("/", verifyJWT, authorizeUserType('user'), addSupport);
supportRouter.get("/:id", verifyJWT, authorizeUserType('admin'), getById);
supportRouter.put("/:id", verifyJWT, authorizeUserType('admin'), updateSupport);
supportRouter.delete("/:id", verifyJWT, authorizeUserType('admin'), deleteSupport);

// Export the router
export default supportRouter; 
