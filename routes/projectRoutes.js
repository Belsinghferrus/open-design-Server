import express from "express";
import { addProject, getProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectController.js";
import authMiddleware from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/",authMiddleware, addProject);
router.get("/",authMiddleware, getProjects);
router.get("/:id",authMiddleware, getProjectById);
router.put("/:id",authMiddleware, updateProject);
router.delete("/:id",authMiddleware, deleteProject);




export default router;
