import express from 'express';
import { getAllTAs, addTA, registerTAFromFile} from '../controllers/taController';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.route("/").get(getAllTAs);
router.route("/add").post(addTA);
router.route("/upload").post(upload.single("csvFile"), registerTAFromFile);

export default router;