import express from 'express';
import { setOHResponsibilities, getCourseOHResps, getAllOHs } from '../controllers/ohResponsibilitiesController';

const router = express.Router();

router.route("/get").get(getCourseOHResps);
router.route("/allohs").get(getAllOHs);
router.route("/set").post(setOHResponsibilities);

export default router;