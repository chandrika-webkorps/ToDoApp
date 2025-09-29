import express from "express";
const router = express.Router();
import * as todoController from "../Controllers/todoController1.js";
import { jwtAuthMiddleware } from "../middlewares/jwtAuth.js";
router.post("/new-task", jwtAuthMiddleware,todoController.addTask);
router.post('/toggle-task',jwtAuthMiddleware, todoController.toggleTask);
router.get('/get-tasks', jwtAuthMiddleware,todoController.getTasks);
router.delete('/delete-task/:id', jwtAuthMiddleware,todoController.deleteTask);
router.put('/edit-task/:id',jwtAuthMiddleware,todoController.editTask)
export default router;
