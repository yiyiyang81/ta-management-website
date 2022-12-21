import { callBackend } from "../apiConfig";

export abstract class ProfHelper {
	constructor() { }
	public static async fetchProfData(): Promise<any> {
		try {
			const res = await callBackend("/api/prof");
			const data = await res.json();
			const profObject = [];
			for (const d of data.profs) {
				const instructorRes = await callBackend("/api/users/" + d.email);
				const instructorData = await instructorRes.json()
				if (instructorData.exists) {
					let course = { hasCourse: false }
					if (d.course) {
						const courseRes = await callBackend("api/course/" + d.course)
						if (courseRes) {
							const courseData = await courseRes.json()
							if (courseData.exists) {
								course["hasCourse"] = true
								course["courseName"] = courseData.course.course_name
								course["courseNumber"] = courseData.course.course_number
								course["termYear"] = courseData.course.term_year
							}
						}
					}
					let item = {
						faculty: d.faculty,
						department: d.department,
					};

					if (instructorData.exists) {
						item["firstName"] = instructorData.user.first_name;
						item["lastName"] = instructorData.user.last_name;
						item["email"] = instructorData.user.email;
					} else {
						item["firstName"] = "";
						item["lastName"] = "";
						item["email"] = "";
					}
					const newItem = Object.assign(item, course)
					profObject.push(newItem);
				}
			}
			return (profObject)
		} catch (err) {
			console.log(err);
		}
	};

	public static async deleteProfByEmail(email: string): Promise<any> {
		try {
			const res = await callBackend(`/api/prof/delete/${email}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.status === 200) {
				ProfHelper.fetchProfData();
				setTimeout(() => {
				}, 500);
			} else {
				alert("Error while deleting user.");
			}
		} catch (e) {
			console.log(e)
		}
	}

	public static async checkUniqueEmail(email: string): Promise<any> {
		try {
			const res = await callBackend(
				`/api/prof/checkValidEmail/${email}`,
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



