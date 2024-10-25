import { Router } from "express";
import { addPlacemant ,getPlacement,deletePlacement} from "../controllers/placement_card.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router =Router();

router.route('/add-placement').post(
    upload.fields([
        {
            name:"photo",
            maxCount:1
        }
    ]),
    addPlacemant);

router.route('/get-placement').get(getPlacement);
router.route('/delete-placement/:id').delete(deletePlacement);




export default router;