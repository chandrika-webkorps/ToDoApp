import express from 'express'
import * as userController from '../Controllers/userController.js'
const router=express.Router()

router.post('/new-user',userController.addUser)
router.post('/login-user',userController.loginUser)

export default router