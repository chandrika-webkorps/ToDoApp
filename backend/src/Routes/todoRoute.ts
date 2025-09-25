import express from "express"
const router=express.Router()
import * as todoController from "../Controllers/todoController1.js"

router.post("/new-task",todoController.addTask)
router.post('/toggle-task',todoController.toggleTask)
router.get('/get-tasks',todoController.getTasks)
router.delete('/delete-task/:id',todoController.deleteTask)
// router.put('/edit-task/:id',todoController.editTask)

export default router