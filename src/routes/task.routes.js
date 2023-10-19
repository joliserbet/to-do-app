import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTasks, getTask, createTask, deleteTask, editTask } from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { taskSchema } from "../schemas/task.schema.js";

const tasksRouter = Router();

tasksRouter.get("/tasks", authRequired, getTasks);
tasksRouter.get("/tasks/:id", authRequired, getTask);
tasksRouter.post("/tasks/new", authRequired, validateSchema(taskSchema), createTask);
tasksRouter.delete("/tasks/delete/:id", authRequired, deleteTask);
tasksRouter.patch("/tasks/edit/:id", authRequired, editTask);

export default tasksRouter;