import { Router } from "express";
import {addDrivers, deleteDriver, getAllDrivers, getById, loginDriver, updateDriver} from "../Controllers/driverControllers.js"; // Import Driver controllers
import { authorizeUserType, verifyJWT } from "../middlewares/auth.js";

const driverRouter = Router(); 

// Define routes
driverRouter.get("/",verifyJWT, authorizeUserType('admin'),getAllDrivers);
driverRouter.post("/", addDrivers);
driverRouter.get("/:did", verifyJWT, authorizeUserType('admin'), getById);
driverRouter.put("/:did", verifyJWT, updateDriver);
driverRouter.delete("/:did", verifyJWT, authorizeUserType('admin'),deleteDriver);
driverRouter.post("/login", loginDriver);

export default driverRouter; 
