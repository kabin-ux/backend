import express from "express"; 
import dotenv from "dotenv"; 
import cors from "cors";

// Import routers
import inventoryRouter from "./Routes/InventoryRoute.js";
import requestRouter from "./Routes/RequestRoute.js";
import paymentPlanRouter from "./Routes/PaymentPlanRoute.js";
import categoryRouter from "./Routes/CategoryRoutes.js";
import feedbackRouter from "./Routes/FeedbackRoutes.js";
import accountRouter from "./Routes/AccountRoutes.js";
import supportRouter from "./Routes/SupportRoutes.js";
import complainRouter from "./Routes/ComplaintRoutes.js";
import employeeRouter from "./Routes/EmployeeRoutes.js";
import planRouter from "./Routes/PlanRoutes.js";
import categoryRouterOr from "./Routes/CategoryRoutesOr.js";
import { loginAdmin } from "./ErrorHandler/Loginhandler.js";
import userRouter from "./Routes/userRoute.js";
import adminRouter from "./Routes/adminRoute.js";
import driverRouter from "./Routes/driverRoute.js";
import binRouter from "./Routes/binRoute.js";
import orderRouter from "./Routes/OrderRoute.js";
import taskRouter from "./Routes/taskRoute.js";
import categoryRouterHza from "./Routes/CategoryRoutesHza.js";
import "./Model/PdfModel.js"; // Adjusted import for the PdfModel
import connectToDB from "./Database/db.js";
import { PORT } from "./config.js";
import pdfRouter from "./Routes/PdfRoute.js";
import { registerAdmin } from "./ErrorHandler/AdminregisterHandler.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use("/request", requestRouter);
app.use("/inventory", inventoryRouter);
app.use("/paymentplan", paymentPlanRouter);
app.use("/feedback", feedbackRouter);
app.use("/category", categoryRouter);
app.use("/account", accountRouter);
app.use("/support", supportRouter);
app.use("/complain", complainRouter);
app.use("/employee", employeeRouter);
app.post("/register", registerAdmin);
app.use("/plan", planRouter);
app.use("/recyclable", categoryRouterOr);
app.post("/loginAdmin", loginAdmin);
app.use("/file", express.static("file"));
app.use("/users", userRouter);
app.use("/drivers", driverRouter);
app.use("/bins", binRouter);
app.use("/tasks", taskRouter);
app.use("/admins", adminRouter);
app.use("/order", orderRouter);
app.use("/hazardous", categoryRouterHza);
app.use("/pdf", pdfRouter);

// MongoDB connection
connectToDB();

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));