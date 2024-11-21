import { Router } from "express"; 
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
   // Assuming this exists in userControllers for clarity
} from "../Controllers/userControllers.js";
import { authorizeUserDetailsEdit, authorizeUserType, verifyJWT } from "../middlewares/auth.js";

// Create a new router
const userRouter = Router();

// Admin-only routes
userRouter.get("/", verifyJWT, authorizeUserType('admin'), getAllUsers); 

//get feedback by id
userRouter.get("/getUserById/:uid", verifyJWT, authorizeUserType('admin', 'user'), getUserById); 
userRouter.put("/:uid", verifyJWT, authorizeUserType('admin', 'user'), authorizeUserDetailsEdit, updateUser); 
userRouter.delete("/:uid", verifyJWT, authorizeUserType('admin'), deleteUser); 

// Public routes
userRouter.post("/", createUser); 
userRouter.post("/login", loginUser); 

export default userRouter;
