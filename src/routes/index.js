import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getNearFaskes } from "../controllers/faskes.controller.js";
import { getNearAmbulans } from "../controllers/ambulan.controller.js";
import { getNearPemadams } from "../controllers/pemadam.controller.js";
import { getNearPolisis } from "../controllers/polisi.controller.js";

const router = express.Router();

//group api to /api/v1 and use verifyToken middleware
router.use(verifyToken);

router.get("/faskes", getNearFaskes);
router.get("/ambulan", getNearAmbulans);
router.get("/pemadam", getNearPemadams);
router.get("/polisi", getNearPolisis);

export default router;
