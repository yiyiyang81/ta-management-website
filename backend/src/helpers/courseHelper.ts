import { Schema } from "mongoose";
import Course from "../models/Course";

export class CourseHelper {
	static async getCourseIdByCourseNumber(courseNumber: string) {
		const course = await Course.findOne({ course_number: courseNumber });
		if (course) {
			return course._id
		}
		else {
			throw new Error("Course not found!");
		}
	}

	static async getCoursesIdsByCourseNumbers(courseNumbers: string[]) {
		const allCourseIds = new Array<Schema.Types.ObjectId>()
		for (let i = 0; i < courseNumbers.length; i++) {
			const courseId = await CourseHelper.getCourseIdByCourseNumber(courseNumbers[i])
			allCourseIds.push(courseId)
		}
		return allCourseIds
	}

	static async checkCourseExistsOrCreateSkeleton(
		courseNumber: string,
		courseName: string,
		termYear: string,
		courseInstructors: Schema.Types.ObjectId[]) {
		const course = await Course.findOne({ course_number: courseNumber });
		if (course) {
			return course;
		}
		else {
			const course = new Course({
				course_number: courseNumber,
				course_name: courseName,
				term_year: termYear,
				course_instructors: courseInstructors
			})
			return await course.save()
		}
	}



}