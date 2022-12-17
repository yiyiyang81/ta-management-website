import express from 'express';
import { getAllProfs, addProf, registerProfAndCourseFromFile} from '../controllers/profController';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.route("/").get(getAllProfs);
router.route("/add").post(addProf);
router.route("/upload").post(upload.single("csvFile"), registerProfAndCourseFromFile);

export default router;