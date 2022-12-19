import express from 'express';
import {
    getAllCourses, getCourse, addCourse, registerCourseFromFile,
    getCourseTA, getCoursesByInstructorEmail,
    getCoursesByTaEmail, addTaToCourse, deleteTaFromCourse,
    getCoursesByCourseNumber
} from '../controllers/courseController';
import multer from "multer";
const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/:id/ta/").get(getCourseTA);
router.route("/add").post(addCourse);
router.route("/upload").post(upload.single("csvFile"), registerCourseFromFile);
router.route("/prof/:id").get(getCoursesByInstructorEmail);
router.route("/ta/:id").get(getCoursesByTaEmail);
router.route("/:id/ta/:id").post(addTaToCourse);
router.route("/:id/ta/:id").delete(deleteTaFromCourse);
router.route("/:term_year/:course_number").get(getCourse);
router.route("/:course_number").get(getCoursesByCourseNumber)

export default router;