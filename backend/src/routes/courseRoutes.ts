import express from 'express';
import {
    getAllCourses, addCourse, registerCourseFromFile,
<<<<<<< HEAD
    getCourseTA, getCourseProf, getCoursesByInstructorEmail,
    getCoursesByTaEmail, addTaToCourse, deleteTaFromCourse
=======
    getCourseTA, getCoursesByInstructorEmail,
    getCoursesByTaEmail, addTaToCourse, deleteTaFromCourse, getCourseById
>>>>>>> main
} from '../controllers/courseController';
import multer from "multer";
const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/:id").get(getCourseById);
router.route("/:id/ta/").get(getCourseTA);
router.route("/:id/prof").get(getCourseProf);
router.route("/add").post(addCourse);
router.route("/upload").post(upload.single("csvFile"), registerCourseFromFile);
router.route("/prof/:id").get(getCoursesByInstructorEmail);
router.route("/ta/:id").get(getCoursesByTaEmail);
router.route("/:id/ta/:id").post(addTaToCourse);
router.route("/:id/ta/:id").delete(deleteTaFromCourse);


export default router;