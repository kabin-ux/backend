import { Router } from "express";
import {
    getAllTasks,
    addTask,
    updateTaskStatus,
    getTaskById,
    deleteTask
} from "../Controllers/taskController.js"; 
import { authorizeDriver, authorizeUserType, verifyJWT } from "../middlewares/auth.js";

const taskRouter = Router();

// Route to get all tasks
taskRouter.get("/", verifyJWT, authorizeUserType('admin'), getAllTasks);
// Route to create a new task
taskRouter.post("/", verifyJWT, authorizeUserType('admin'), addTask);
// Route to update task completion status
taskRouter.patch("/:tid", verifyJWT, authorizeUserType('admin'), updateTaskStatus);
// Route to get a task by ID
taskRouter.get("/:tid", verifyJWT, authorizeUserType('admin', 'driver'), authorizeDriver, getTaskById);
// Route to delete a task by ID
taskRouter.delete("/:tid", verifyJWT, authorizeUserType('admin'), deleteTask);

// Export the router
export default taskRouter; 
