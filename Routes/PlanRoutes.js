import {Router} from "express"; // Import express
import { addPlans, deletePlan, getAllPlans, getPlanById, updatePlan } from "../Controllers/PlanControllers.js";
import { authorizeUserType, verifyJWT } from "../middlewares/auth.js";

const planRouter = Router(); // Create a new router

// Define routes
planRouter.get("/", verifyJWT, authorizeUserType('admin', 'user'), getAllPlans);
planRouter.post("/add", verifyJWT, authorizeUserType('admin'), addPlans);
planRouter.get("/:id",verifyJWT, authorizeUserType('admin', 'user'), getPlanById);
planRouter.put("/:id", verifyJWT, authorizeUserType('admin'), updatePlan);
planRouter.delete("/:id", verifyJWT, authorizeUserType('admin'), deletePlan);

// Export the router
export default planRouter; 
