import { Router } from "express";
import { deleteFile, getFile, uploadFile } from "../Controllers/PdfController.js";
import { upload } from "../middlewares/multer.js";

const pdfRouter = Router();

pdfRouter.get("/getFile", getFile);

pdfRouter.post("/uploadFile", upload.single("file"), uploadFile);

pdfRouter.delete("/deleteFile/:id", deleteFile);

export default pdfRouter;