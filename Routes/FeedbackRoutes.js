import {Router} from "express"; // Import express
import {addFeedback, deleteFeedback, getAllFeedback, getFeedbackById, updateFeedback} from "../Controllers/FeedbackControllers.js"; // Import Feedback controllers
import { authorizeFeedbackEdit, authorizeUserType, verifyJWT } from "../middlewares/auth.js";

const feedbackRouter = Router(); // Create a new router

// Define routes
feedbackRouter.get("/", verifyJWT, authorizeUserType('admin'), getAllFeedback);
feedbackRouter.post("/", verifyJWT, authorizeUserType('user'), addFeedback);
feedbackRouter.get("/:id",verifyJWT, authorizeUserType('user', 'admin'),authorizeFeedbackEdit, getFeedbackById);
feedbackRouter.put("/:id", verifyJWT, authorizeUserType('admin'), updateFeedback);
feedbackRouter.delete("/:id", verifyJWT, authorizeUserType('admin'), deleteFeedback);

// Export the router
export default feedbackRouter; 
