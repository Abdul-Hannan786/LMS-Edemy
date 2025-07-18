import express from "express";
import { updatRoleToEducator } from "../controllers/educatorController.js";

const router = express.Router();

router.get("/update-role", updatRoleToEducator);

export default router
