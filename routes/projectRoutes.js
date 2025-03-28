import express from "express";
import { addProject, getProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();


router.post("/", addProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
