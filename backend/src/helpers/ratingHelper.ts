import { Schema } from "mongoose";
import Rating from "../models/Rating";

export class RatingHelper {
	static async createRatingsDb(
		course_number: string,
		course: Schema.Types.ObjectId,
		email: string,
		teaching_assistant: Schema.Types.ObjectId,
		rating_score: string,
		comment?: string
	) {
		let rating;
		if (comment) {
			rating = new Rating({
				course_number: course_number,
				course: course,
				teaching_assistant: teaching_assistant,
				email: email,
				rating_score: rating_score,
				comment: comment
			})
		}
		else {
			rating = new Rating({
				course_number: course_number,
				course: course,
				teaching_assistant: teaching_assistant,
				email: email,
				rating_score: rating_score,
			})
		}
		return await rating.save();
	}
}