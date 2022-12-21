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
				courseDesc: d.course_description,
				term: term_year[0],
				year: term_year[1],
			};
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
					courseDesc: d.course_description,
					term: term_year[0],
					year: term_year[1],
				};
				let instructorNames = [];
				for (const prof of d.course_instructors) {
					const userRes = await callBackend("/api/users/" + prof.email);
					const userData = await userRes.json()
					if (userData.exists) {
						instructorNames.push(
							userData.user.first_name +
							" " +
							userData.user.last_name
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
					courseDesc: d.course_description,
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

	public static createCourseFullNameWithTerm(courseNumber: string, courseName: string, term: string, year: string) {
		return `${courseNumber}: ${courseName} - ${term} ${year}`
	}

	public static convertCourseFullNamesToCourseNumbers(courses: string[]) {
		if (courses.length > 0) {
			return courses.map((course) => {
				return (course.split(":")[0])
			});

		} else {
			return courses;
		}
	};

	public static convertCourseNameTerm(courseTemp: string) {
		const splitCourse = courseTemp.split("-")
		const course = splitCourse[0]
		const courseNumber = course.split(":")[0]
		const termYear = splitCourse[1].trim()
		return { courseNumber, termYear }
	}

	public static async deleteCourseByCourseNumber(courseNumber: string): Promise<any> {
		try {
			const res = await callBackend(`/api/course/delete/${courseNumber}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.status === 201) {
				CourseHelper.fetchCourseData();
				setTimeout(() => {
				}, 500);
			} else {
				alert("Error while deleting course.");
			}
		} catch (e) {
			console.log(e)
		}
	}

	public static async checkUniqueCourse(courseNumber: string, term: string, year: string): Promise<any> {
		try {
			const res = await callBackend(
				`/api/course/checkValidCourse/${courseNumber}/${term}/${year}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return await res.json();
		} catch (err) {
			console.log(err);
		}
	};

}




