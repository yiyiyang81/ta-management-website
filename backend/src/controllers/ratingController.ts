import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseHelper } from "../helpers/courseHelper";
import Rating from "../models/Rating";
import { TAHelper } from "../helpers/taHelper";
import { RatingHelper } from "../helpers/ratingHelper";

// @Desc Get all ratings
// @Route /api/ratings
// @Method GET
export const getAllRatings = asyncHandler(async (req: Request, res: Response) => {
	const ratings = await Rating.find({});
	res.status(200).json({
		ratings
	});
});

// @Desc Get a list of Ratings by the email
// @Route /api/ratings/:email
// @Method GET
export const getRatingsByEmail = asyncHandler(async (req: Request, res: Response) => {
	const email = req.params.email
	const ratings = await Rating.find({ email: email })
	res.status(200).json({
		ratings
	});

});

// @Desc Get a list of Ratings by the email and course number
// @Route /api/ratings/:email/:courseNumber
// @Method GET
export const getRatingsByEmailAndCourseNumber = asyncHandler(async (req: Request, res: Response) => {
	const { email, courseNumber } = req.params
	const ratings = await Rating.find({ email: email, course_number: courseNumber })
	res.status(200).json({
		ratings
	});
});

// @Desc Get a list of comments about the TA associated with the course 
// by the email of a TA and a course number 
// @Route /api/ratings/comments/:email/:courseNumber
// @Method GET
export const getRatingsCommentsByEmailAndCourseNumber = asyncHandler(async (req: Request, res: Response) => {
	const { email, courseNumber } = req.params
	const ratings = await Rating.find({ email: email, course_number: courseNumber })
	let comments = []
	for (let i = 0; i < ratings.length; i++) {
		comments.push(ratings[i].comment)
	}
	res.status(200).json({
		email: email,
		course_number: courseNumber,
		comments: comments
	});
});

// @Desc Add a rating
// @Route /api/ratings/add
// @Method POST
export const addRating = asyncHandler(async (req: Request, res: Response) => {
	const { course_number, email, rating_score, comment } = req.body
	const courseId = await CourseHelper.getCourseIdByCourseNumber(course_number)
	const teachingAssistantId = await TAHelper.getTAIdByEmail(email)
	
	const rating = await RatingHelper.createRatingsDb(course_number, courseId, email, teachingAssistantId, rating_score, comment)
	res.status(200).json({
		rating
	});
});
