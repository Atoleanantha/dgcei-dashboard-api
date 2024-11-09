import {addGallaryImage,deleteGallaryImage, getGallaryImages} from '../controllers/gallary.controller.js'
import { Router } from 'express';
import { upload } from "../middlewares/multer.middleware.js";
const router=Router();

router.route('/add-gallary').post(
    upload.any(),
    // upload.fields([
    //     {
    //         name:"photo",
    //         maxCount:1
    //     }
    // ]),
    addGallaryImage);

router.delete('/delete-gallary-image/:id',deleteGallaryImage);
router.route('/get-gallary').get(getGallaryImages);

export default router;