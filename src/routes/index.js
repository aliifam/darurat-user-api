import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllFaskes } from "../controllers/faskes.controller.js";

const router = express.Router();

//group api to /api/v1 and use verifyToken middleware
router.use(verifyToken);

//ambulan
router.get("/faskes", getAllFaskes);

export default router;
