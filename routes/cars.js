import { Router } from "express";
const router = Router()

import * as controller from "../controllers/carsController.js"

router.get("/", controller.getAllCars);
router.get("/:id", controller.getCarId);
router.post("/", controller.saveCar);
router.patch("/:id", controller.updateCar);
router.put('/:id', controller.updateAllCars);
router.delete('/:id', controller.deleteCar);

export default router