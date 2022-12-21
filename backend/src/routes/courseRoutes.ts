import express from 'express';
import {
    getAllCourses, getCourse, addCourse, registerCourseFromFile,
    getCourseTA, getCoursesByInstructorEmail,
    deleteCourse, checkValidCourse,
    getCoursesByTaEmail, addTaToCourse, deleteTaFromCourse,
    getCoursesByCourseNumber, getCourseById, getCourseProf
} from '../controllers/courseController';
import multer from "multer";
const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/:id").get(getCourseById);
router.route("/:id/ta/").get(getCourseTA);
router.route("/checkValidCourse/:courseNumber/:term/:year").get(checkValidCourse);
router.route("/:id/prof").get(getCourseProf);
router.route("/add").post(addCourse);
router.route("/delete/:courseNumber").delete(deleteCourse);
router.route("/upload").post(upload.single("csvFile"), registerCourseFromFile);
router.route("/prof/:id").get(getCoursesByInstructorEmail);
router.route("/ta/:id").get(getCoursesByTaEmail);
router.route("/:id/ta/:id").post(addTaToCourse);
router.route("/:term_year/:course_number/ta/:email").delete(deleteTaFromCourse);
router.route("/search/:term_year/:course_number").get(getCourse);
router.route("/search-course-num/:course_number").get(getCoursesByCourseNumber)
router.route("/course-id/:id").get(getCourseById);

export default router;