import Professor from "../models/Professor";
import { Schema } from 'mongoose';
import Course from "../models/Course";

export class ProfHelper {
	static async createProfDb(user: Schema.Types.ObjectId, email: string, faculty: string, department: string, course: Schema.Types.ObjectId) {
		const prof = new Professor({
			professor: user,
			email: email,
			faculty: faculty,
			department: department,
			course: course,
		})

		return await prof.save();
	}

	static async checkExistsOrCreateSkeleton(email: string, userId: Schema.Types.ObjectId) {
		let instructor = await Professor.findOne({ email: email })
		if (instructor) {
			return instructor
		}
		else {
			const prof = new Professor({
    			professor: userId,
				email: email
			})
			return await prof.save()
		}
	}

	static async addCourseToProf(email:String, courseId: Schema.Types.ObjectId) {
		let instructorId = await Professor.findOne({ email: email })
		if (!instructorId) {
			throw new Error(`No instructor found with email: ${email}`)
		}
		let course = await Course.findOne({ _id: courseId })
		if (!courseId) {
			throw new Error(`No course found with id: ${courseId}`)
		}
		const filter = { email: email }
		const update = {
			course: course

		}
		await Professor.findOneAndUpdate(filter, update);

	}
}
