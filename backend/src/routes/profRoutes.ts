import express from 'express';
import { getAllProfs, addProf, registerProfAndCourseFromFile, uploadProf, deleteProf, checkValidEmail, getProfById } from '../controllers/profController';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.route("/").get(getAllProfs);
router.route("/:id").get(getProfById);
router.route("/add").post(addProf);
router.route("/checkValidEmail/:email").get(checkValidEmail);
router.route("/delete/:email").delete(deleteProf);
router.route("/uploadProf").post(upload.single("csvFile"), uploadProf);
router.route("/uploadProfAndCourse").post(upload.single("csvFile"), registerProfAndCourseFromFile);

export default router;