import TA from "../models/TA";

export class TAHelper {
	static async getTAIdByEmail(email: string) {
		const teachingAssistant = await TA.findOne({ email: email });
		if (teachingAssistant) {
			return teachingAssistant._id
		}
		else {
			throw new Error(`Teaching Assistant with email ${email} not found!`);
		}
	}
}

