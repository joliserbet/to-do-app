import { Router } from "express";
import { viewTasks, addTask, deleteTask, editTask } from "../controllers/task.controller.js";


const router = Router();

router.get("/", viewTasks);
router.post("/add", addTask);
router.delete("/delete", deleteTask);
router.patch("/edit", editTask);

export default router;