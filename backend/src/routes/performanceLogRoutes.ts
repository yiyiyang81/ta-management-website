import express from 'express';
import { addPerformanceLog, getCourseComments, getPerformanceLogs } from '../controllers/performanceLogController';

const router = express.Router();

router.route("/add").post(addPerformanceLog);
router.route("/coursecomments").get(getCourseComments);
router.route("/get").get(getPerformanceLogs);

export default router;