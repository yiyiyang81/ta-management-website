import { callBackend } from "../apiConfig";

export abstract class CourseHelper {
	constructor() { }

	public static async getCourseByCourseId(courseId: string) {
		try {
			const res = await callBackend(`/api/course/${courseId}`);
			const data = await res.json();
			const d = data.course
			const term_year = d.term_year.split(" ");
			let item = {
				courseNumber: d.course_number,
				courseName: d.course_name,
				courseDesc: d.course_desc,
				term: term_year[0],
				year: term_year[1],
			};
			// Uncomment if you need instructors
			// let instructorNames = [];
			// for (const prof of d.course_instructors) {
			// 	const instructorRes = await callBackend("/api/users/" + prof.email);
			// 	if (instructorRes) {
			// 		const instructorData = await instructorRes.json();
			// 		instructorNames.push(
			// 			instructorData.user.first_name +
			// 			" " +
			// 			instructorData.user.last_name
			// 		);
			// 	}
			// }
			// item["instructorNames"] = instructorNames.join(",");
			return item;

		} catch (err) {
			console.error(err);
		}
	}

	public static async getCoursesByCoursesId(coursesId: string[]) {
		if (coursesId && coursesId.length > 0) {
			return await Promise.all(coursesId.map(async (courseId) => await this.getCourseByCourseId(courseId)))
		}
		else {
			return []
		}
	}

	public static async fetchCourseData(): Promise<any> {
		try {
			const res = await callBackend("/api/course");
			const data = await res.json();
			const courseObject = [];
			for (const d of data.courses) {
				const term_year = d.term_year.split(" ");
				let item = {
					courseNumber: d.course_number,
					courseName: d.course_name,
					courseDesc: d.course_desc,
					term: term_year[0],
					year: term_year[1],
				};
				let instructorNames = [];
				for (const prof of d.course_instructors) {
					const instructorRes = await callBackend("/api/users/" + prof.email);
					if (instructorRes) {
						const instructorData = await instructorRes.json();
						instructorNames.push(
							instructorData.user.first_name +
							" " +
							instructorData.user.last_name
						);
					}
				}
				item["instructorNames"] = instructorNames.join(",");
				courseObject.push(item);
			}
			return courseObject;
		} catch (err) {
			console.error(err);
		}
	};

	public static async fetchCourseNames(): Promise<any> {
		try {
			const res = await callBackend("/api/course");
			const data = await res.json();
			const courseObject = [];
			for (const d of data.courses) {
				const term_year = d.term_year.split(" ");
				let item = {
					courseNumber: d.course_number,
					courseName: d.course_name,
					courseDesc: d.course_desc,
					term: term_year[0],
					year: term_year[1],
				};
				courseObject.push(item);
			}
			return courseObject;
		} catch (err) {
			console.error(err);
		}
	};

	public static createCourseFullName(courseNumber: string, courseName: string) {
		return `${courseNumber}: ${courseName}`
	}

	public static convertCourseFullNamesToCourseNumbers(courses: string[]) {
		if (courses.length > 0) 
		{
			return courses.map((course) => {
				return (course.split(":")[0])});

		} else {
			return courses;
		}
	};
}




