import express from 'express';
import { getAllRatings, addRating, getRatingsByEmail, getRatingsByEmailAndCourseNumber, getRatingsCommentsByEmailAndCourseNumber } from '../controllers/ratingController';

const router = express.Router();

router.route("/").get(getAllRatings)
router.route("/:email").get(getRatingsByEmail);
router.route("/:email/:courseNumber").get(getRatingsByEmailAndCourseNumber);
router.route("/comments/:email/:courseNumber").get(getRatingsCommentsByEmailAndCourseNumber);
router.route("/add").post(addRating);

export default router;