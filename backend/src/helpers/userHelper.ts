import { Schema } from "mongoose";
import User, { UserTypes } from "../models/User";
import { CourseHelper } from "./courseHelper";

export class UserHelper {
	static async generateUsername(firstName: string, lastName: string, identifier: number): Promise<string> {
		let generatedUsername = (firstName[0] + lastName + identifier.toString()).split(" ").join('').toLowerCase()
		let user = await User.exists({ username: generatedUsername });
		if (!user) {
			return generatedUsername
		}
		else {
			return await UserHelper.generateUsername(firstName, lastName, identifier + 1)
		}
	}

	static async generateEmail(firstName: string, lastName: string, identifier: number): Promise<string> {
		let generatedEmail = (firstName + "." + lastName + identifier.toString() +"@mail.mcgill.ca").split(" ").join('').toLowerCase()
		let user = await User.exists({ email: generatedEmail });
		if (!user) {
			return generatedEmail
		}
		else {
			return await UserHelper.generateEmail(firstName, lastName, identifier + 1)
		}
	}

	// get users
	static async getAllUsersDb(includePasswords: boolean) {
		if (includePasswords) {
			return await User.find({});
		}
		else {
			return await User.find({}).select("-password");
		}
	}

	static async getUserDbByEmail(email: string, includePassword: boolean) {
		if (includePassword) {
			return await User.find({ email: email });
		}
		else {
			return await User.find({ email: email }).select("-password");
		}
	}

	// create users
	static async createSkeletonUserDb(
		firstName: string,
		lastName: string,
		email: string,
		username: string,
		password: string,
		userTypes: UserTypes[]) {
		const user = new User({
			first_name: firstName,
			last_name: lastName,
			email: email,
			username: username,
			password: password,
			user_types: userTypes
		});
		return await user.save();
	}

	static async createUserDb(
		firstName: string,
		lastName: string,
		email: string,
		studentId: string,
		username: string,
		password: string,
		registeredCourses: Schema.Types.ObjectId[],
		semester: string,
		userTypes: UserTypes[]) {
		const user = new User({
			first_name: firstName,
			last_name: lastName,
			email: email,
			student_id: studentId,
			username: username,
			password: password,
			registered_courses: registeredCourses,
			semester: semester,
			user_types: userTypes,
		})
		return await user.save();
	}

	static async checkExistsOrCreateSkeleton(firstName: string, lastName: string, userTypes: UserTypes[]) {
		let user = await User.findOne({first_name: firstName, last_name: lastName})
		if (user) {
			return user
		} else {
			const username = await this.generateUsername(firstName, lastName, 1)
			const email = await this.generateEmail(firstName, lastName, 1)
			const password = username
			return await this.createSkeletonUserDb(firstName, lastName, email, username, password, userTypes)
		}
	}
	// delete users
	static async deleteUserDbByEmail(email: string) {
		await User.findOneAndDelete({ email: email });
	}




}


