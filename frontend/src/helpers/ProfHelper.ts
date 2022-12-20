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
				let item = {
					faculty: d.faculty,
					department: d.department,
				};
				if (instructorRes) {
					const instructorData = await instructorRes.json();
					item["firstName"] = instructorData.user.first_name;
					item["lastName"] = instructorData.user.last_name;
					item["email"] = instructorData.user.email;
				} else {
					item["firstName"] = "";
					item["lastName"] = "";
					item["email"] = "";
				}
				profObject.push(item);
			}
			return (profObject)
		} catch (err) {
			console.log(err);
		}
	};
}



