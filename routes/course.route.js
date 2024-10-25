import { Router } from "express";
import { addCourse,getCourses,deleteCourse } from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router();

router.route('/add-course').post(
    upload.fields([
        {
            name:"photo",
            maxCount:1
        }
    ]),
    addCourse);

    
router.route('/get-course').get(getCourses);
router.route('/delete-course/:id').delete(deleteCourse);

export default router;