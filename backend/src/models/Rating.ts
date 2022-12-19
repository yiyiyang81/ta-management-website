import mongoose, { Schema } from 'mongoose';
import { ICourse } from './Course';
import { ITA } from './TA';

export interface IRating extends mongoose.Document {
	course_number: string,
	course: ICourse,
	teaching_assistant: ITA,
	email: string,
	rating_score: number,
	comment: string, 
	createdAt: Date,
	updatedAt: Date,
}

const UserSchema = new mongoose.Schema({
	course_number: {
		type: String,
		required: true,
	},
	course: {
		type: Schema.Types.ObjectId,
		required: true
	},
	teaching_assistant: {
		type: Schema.Types.ObjectId,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	rating_score: {
		type: Number,
		required: true
	},
	comment: {
		type: String,
		required: false
	},
	createdAt: Date,
	updatedAt: Date,
}, {
	timestamps: true
})

const Rating = mongoose.model<IRating>("Rating", UserSchema);
export default Rating;


