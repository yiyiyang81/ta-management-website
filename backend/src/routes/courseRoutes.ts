import express from 'express';
import { getAllCourses, addCourse, registerCourseFromFile, getCourseCurrentTA } from '../controllers/courseController';
import multer from "multer";
const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/ta/:id").get(getCourseCurrentTA);
router.route("/add").post(addCourse);
router.route("/upload").post(upload.single("csvFile"), registerCourseFromFile);

export default router;