import express from 'express';
import {
    getAllCourses, addCourse, registerCourseFromFile,
    getCourseCurrentTA, getCoursesByInstructorEmail,
    getCoursesByTaEmail, addTaToCourse, deleteTaFromCourse
} from '../controllers/courseController';
import multer from "multer";
const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/:id/ta/").get(getCourseCurrentTA);
router.route("/add").post(addCourse);
router.route("/upload").post(upload.single("csvFile"), registerCourseFromFile);
router.route("/prof/:id").get(getCoursesByInstructorEmail);
router.route("/ta/:id").get(getCoursesByTaEmail);
router.route("/:id/ta/:id").post(addTaToCourse);
router.route("/:id/ta/:id").delete(deleteTaFromCourse);


export default router;