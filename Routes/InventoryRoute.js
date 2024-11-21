import {Router} from "express"; // Import express
import {addInventory, deleteInventory, getInventory, getInventoryById, updateInventory} from "../controllers/InventoryController.js"; // If using named exports
import { authorizeUserType, verifyJWT } from "../middlewares/auth.js";

const inventoryRouter = Router(); // Create a new router

// Define routes
inventoryRouter.get("/", verifyJWT, authorizeUserType('admin'), getInventory);
inventoryRouter.post("/", verifyJWT, authorizeUserType('admin'),addInventory);
inventoryRouter.get("/:Iid", verifyJWT, authorizeUserType('admin'), getInventoryById);
inventoryRouter.put("/:Iid", verifyJWT, authorizeUserType('admin'), updateInventory);
inventoryRouter.delete("/:Iid", verifyJWT, authorizeUserType('admin'),deleteInventory);

// Export the router
export default inventoryRouter; 
