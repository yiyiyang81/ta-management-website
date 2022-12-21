import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserTypes {
  Student = "stud",
  Professor = "prof",
  TA = "ta",
  Admin = "admin",
  Sysop = "sysop",
}
export interface IUser extends mongoose.Document {
    first_name: string,
    last_name: string,
    email: string,
    student_id?: string,
    username: string,
    password: string,
    registered_courses?: [Schema.Types.ObjectId],
    semester?: string,
    user_types: Array<UserTypes>,
    createdAt: Date,
    updatedAt: Date,
    active : boolean,
    compare_password(enteredPassword: string): Promise<Boolean>
}

const UserSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    student_id: {
        type: String,
        required: false,
    },

    username: {
        type: String,
        required: false,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    registered_courses: {
        type: [Schema.Types.ObjectId],
        ref: "Course"
    },
    semester: {
        type: String,
        required: false,
    },
    user_types: {
        type: Array,
        required: true,
    },
    active : {
        type: Boolean,
        required : true,
        default : true
    }
}, {
    timestamps: true
})

export interface IUserRequest extends Request {
    user?: any
}



UserSchema.pre("save", async function (next) {
    const user = this as unknown as IUser;
    if (!user.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();

})

UserSchema.methods.compare_password = function (enteredPassword: string) {
    const user = this as IUser;
    return bcrypt.compareSync(enteredPassword, user.password);
}

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

