//import express from "express"
//const router = express.Router()
import { Router } from "express";
const router = Router()

//import { deleteUser, getAllUsers, getUserId, saveUser, updateAll, updateUser } from "../controllers/usersController.js";
import * as controller from "../controllers/usersController.js"

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserId)
router.post("/", controller.saveUser);
router.patch('/:id',controller.updateUser)
router.put('/:id', controller.updateAllUsers)
router.delete('/:id', controller.deleteUser)

export default router
