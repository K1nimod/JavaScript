import {Router} from "express"
const router = Router()

import * as controller from "../controllers/albumController.js"

router.get("/", controller.getAllAlbums);
router.get("/:id", controller.getAlbumId);
router.post("/", controller.saveAlbum);
router.patch("/:id", controller.updateAlbum);
router.put('/:id', controller.updateAllAlbums);
router.delete('/:id', controller.deleteAlbum);

export default router