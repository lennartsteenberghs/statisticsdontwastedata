//import express
import express from "express";

//import functions from controller
import {
  getMPExcel, 
  getWasteExcel
} from "../controllers/waste_controller.js";

//init express router
const router = express.Router();

//get motivation fact
router.get("/download-waste-data", getWasteExcel);

//get photo based on id
router.get('/download-metal-and-plastic-stats', getMPExcel);

//export default router
export default router;
