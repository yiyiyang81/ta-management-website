import { Schema } from "mongoose";
import Course from "../models/Course";
import { IProfessor } from "../models/Professor";

export class CourseHelper {
	static async getCourseByCourseId(courseId: Schema.Types.ObjectId) {
		const course = await Course.findOne({ _id: courseId })
		if (course) {
			return course
		}
		else {
			throw new Error("Course not found!");
		}
	}

	static async getCoursesByCourseIds(courseIds: Schema.Types.ObjectId[]) {
		return await Promise.all((courseIds).map(courseId => this.getCourseByCourseId(courseId)))
	}

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

	static async deleteProfessorFromCourse(courseId: Schema.Types.ObjectId, professorEmail: String) {
		const course = await Course.findOne({ _id: courseId })
		if (course) {
			const courseProfs = course.course_instructors
			const filteredCourseProfs = courseProfs.filter((profObject) => profObject.email !== professorEmail)
			const filter = { _id: courseId }
			const update = {
				courses_instructors: filteredCourseProfs
			}
			await Course.findOneAndUpdate(filter, update);
		}
		else {
			throw new Error("Course not found!")
		}
	}

	static async addProfessorToCourse(courseId: Schema.Types.ObjectId, professor: IProfessor) {
		const course = await Course.findOne({ _id: courseId })
		if (course) {
			const courseProfs = course.course_instructors
			const filteredCourseProfs = courseProfs.filter((profId) => profId !== professor._id)
			filteredCourseProfs.push(professor._id)
			const filter = { _id: courseId }
			const update = {
				course_instructors: filteredCourseProfs
			}
			await Course.findOneAndUpdate(filter, update);
		}
		else {
			throw new Error("Course not found!")
		}
	}

	




}