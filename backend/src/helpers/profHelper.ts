import Professor from "../models/Professor";
import { Schema } from 'mongoose';
import Course from "../models/Course";
import { deleteProf } from "../controllers/profController";
import { CourseHelper } from "./courseHelper";

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
				email: email,
			})
			return await prof.save()
		}
	}

	static async addCourseToProf(email: String, courseId: Schema.Types.ObjectId) {
		let instructorId = await Professor.findOne({ email: email })
		if (!instructorId) {
			throw new Error(`No instructor found with email: ${email}`)
		}
		let course = await Course.findOne({ _id: courseId })
		if (course) {
			const filter = { email: email }
			const update = {
				course: course._id
				
			}
			await Professor.findOneAndUpdate(filter, update);
		}

	}

	static async deleteProf(email: String) {
		let instructor = await Professor.findOne({ email: email })
		if (!instructor) {
			throw new Error("Instructor not found in the database! Add user and continue.");
		}

		if (instructor.course) {
			let course = await Course.findOne({ _id: instructor.course });
			if (!course) {
			}
			else {
				course.delete_prof_from_course(instructor)
			}
		}

		await Professor.findOneAndDelete({ email: email })
	}
}
