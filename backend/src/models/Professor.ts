import mongoose from 'mongoose';
import User, { IUser } from "./User";
const Schema = mongoose.Schema;

export interface IProfessor extends mongoose.Document {
    professor: IUser,
    email:string,
    faculty: string, // think about what happens when profs are cross appointed 
    department: string,
    course: string,
    get_prof_by_name(name: string): Promise<string>,
    get_prof_by_email(email: string): Promise<string>
}

const ProfessorSchema = new mongoose.Schema({
    professor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    faculty: {
        type: String,
        required: false,
    },

    department: {
        type: String,
        required: false,
    },

    course: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Course"
    }
}, {
    timestamps: true
})

ProfessorSchema.methods.get_prof_by_email = async function (email: string) {
    const user_id = await User.findOne({ email: email }, { _id: 1 });
    return Professor.findOne({ professor: user_id });
}

ProfessorSchema.methods.get_prof_by_name = async function (name: string) {
    let [first_name, ...last_names] = name.split(" ");
    const last_name = last_names.join(" ");
    const user_id = await User.findOne({
        firstName: {
            $regex: new RegExp(first_name, "i")
        }, lastName: {
            $regex: new RegExp(last_name, "i")
        }
    }, { _id: 1 });
    return Professor.findOne({ professor: user_id });
}

const Professor = mongoose.model<IProfessor>("Professor", ProfessorSchema);

export default Professor;