import {addPopupImage,deletePoupImage, getPopups} from '../controllers/popup_image.controller.js'
import { Router } from 'express';
import { upload } from "../middlewares/multer.middleware.js";
const router=Router();

router.route('/add-popup').post(
    upload.fields([
        {
            name:"photo",
            maxCount:1
        }
    ]),
    addPopupImage);

router.delete('/delete-popup/:id',deletePoupImage);
router.route('/get-popups').get(getPopups);

export default router;