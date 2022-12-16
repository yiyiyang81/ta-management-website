import express from 'express';
import { getAllCourses, addCourses, registerCourseFromFile, getCourse } from '../controllers/courseController';
import multer from "multer";
const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/:id").get(getCourse);
router.route("/add").post(addCourses);
router.route("/upload").post(upload.single("csvFile"), registerCourseFromFile);

export default router;