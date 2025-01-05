import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {addTestimonial,getTestimonials,deleteTestimonial, updateTestimonialVisibility} from "../controllers/testimonial.controller.js";

const router=Router();

router.route('/add-testimonial').post(
    upload.fields([
        {
            name:"photo",
            maxCount:1
        }
    ]),
    addTestimonial);

router.get('/get-testimonials', getTestimonials); 
router.route('/delete-testimonial/:id').delete(deleteTestimonial);
router.route('/update-visibility-testimonial/:id/is-public').patch(updateTestimonialVisibility);

export default router;