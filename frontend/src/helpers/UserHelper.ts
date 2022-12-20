import { callBackend } from "../apiConfig";

export abstract class UserHelper {
	constructor() { }
	public static async checkUniqueAccount(email: string, username: string): Promise<any> {
		try {
			const res = await callBackend(
				`/api/users/checkValidAccount/${email}/${username}`,
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

	public static async checkUniqueEmail(email: string): Promise<any> {
		try {
			const res = await callBackend(
				`/api/users/checkValidEmail/${email}`,
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

	public static async fetchUserData(): Promise<any> {
		try {
			const res = await callBackend("/api/users");
			const json = await res.json();
			return json.users
		} catch (err) {
			console.log(err);
		}
	};

	public static async deleteUserByEmail(email: string): Promise<any> {
		try {
			const res = await callBackend(`/api/users/${email}/delete`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.status === 200) {
				UserHelper.fetchUserData();
				setTimeout(() => {
				}, 500);
			} else {
				alert("Error while deleting user.");
			}
		} catch (e) {
			console.log(e)
		}
	}

	public static async editUser(editedUser, initialEmail:string): Promise<any> {
		let editedUserObject = {
			email: editedUser.email,
			first_name: editedUser.firstName,
			last_name: editedUser.lastName,
			password: editedUser.password,
			registered_courses: editedUser.registeredCourses,
			roles: editedUser.roles,
			student_id: editedUser.studentId,
			username: editedUser.username,
			term: editedUser.term,
			year: editedUser.year
		}

		try {
			const res = await callBackend(`/api/users/editUser/${initialEmail}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(editedUserObject),
			});
			if (res.status === 200) {
				return 200
			} else {
				alert("Error while adding user.");
			}
		} catch (err) {
			console.log(err);
		}
	}
}


