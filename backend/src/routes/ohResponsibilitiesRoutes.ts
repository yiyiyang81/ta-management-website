import express from 'express';
import { setOHResponsibilities, getCourseOH, getAllOHs, getCourseResponsibilities } from '../controllers/ohResponsibilitiesController';

const router = express.Router();

router.route("/oh").get(getCourseOH);
router.route("/allohs").get(getAllOHs);
router.route("/resps").get(getCourseResponsibilities);
router.route("/set").post(setOHResponsibilities);

export default router;