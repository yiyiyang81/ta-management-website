import express from 'express';
import { getAllTAs, addTA, registerTAFromFile, getTAByEmail, getTAByStudentNumber } from '../controllers/taController';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.route("/").get(getAllTAs);
router.route("/add").post(addTA);
router.route("/upload/:fileType").post(upload.single("csvFile"), registerTAFromFile);
router.route("/email/:email").get(getTAByEmail);
router.route("/student-number/:student_number").get(getTAByStudentNumber);

export default router;