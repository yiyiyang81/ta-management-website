import express from 'express';
import { addTAToWishlist, getCoursesTAWishlisted, getInstructorWishlist } from '../controllers/taWishlistController';

const router = express.Router();

router.route("/add").post(addTAToWishlist);
router.route("/get").get(getInstructorWishlist);
router.route("/ta").get(getCoursesTAWishlisted);

export default router;