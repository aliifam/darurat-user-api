import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getNearFaskes } from "../controllers/faskes.controller.js";
import { getNearAmbulan } from "../controllers/ambulan.controller.js";

const router = express.Router();

//group api to /api/v1 and use verifyToken middleware
router.use(verifyToken);

//fasilitas kesehatan
router.get("/faskes", getNearFaskes);
//ambulan
router.get("/ambulan", getNearAmbulan);
//pemadam
router.get("/pemadam");
//polisi
router.get("/polisi");

export default router;
