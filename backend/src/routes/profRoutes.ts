import express from 'express';
import { getAllProfs, addProf, registerProfAndCourseFromFile, uploadProf} from '../controllers/profController';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.route("/").get(getAllProfs);
router.route("/add").post(addProf);
router.route("/uploadProf").post(upload.single("csvFile"), uploadProf);
router.route("/uploadProfAndCourse").post(upload.single("csvFile"), registerProfAndCourseFromFile);

export default router;