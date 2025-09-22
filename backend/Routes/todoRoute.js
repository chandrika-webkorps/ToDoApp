const express=require('express')
const todoController=require("../Controllers/todoController")
const router=express.Router()

router.post("/new-task",todoController.addTask)
router.post('/toggle-task',todoController.toggleTask)
router.get('/get-tasks',todoController.getTasks)
router.delete('/delete-task/:id',todoController.deleteTask)
router.put('/edit-task/:id',todoController.editTask)

module.exports=router