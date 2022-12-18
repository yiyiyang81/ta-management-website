import mongoose from 'mongoose';
import { ICourse } from './Course';
import User, { IUser } from './User';
const Schema = mongoose.Schema;

export interface ITA extends mongoose.Document {
    ta: IUser,
    TA_name: string,
    student_ID: string,
    legal_name: string,
    email: string,
    term_year: string,
    grad_ugrad: string,
    supervisor_name: string,
    priority: boolean,
    hours: number,
    date_applied: string,
    location: string,
    phone: string,
    degree: string,
    courses_applied_for_list: Array<ICourse>,
    open_to_other_courses: boolean,
    notes: string,
    assigned_hours: number
}

const TASchema = new mongoose.Schema({
    ta: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    TA_name: {
        type: String,
        required: true,
    },
    student_ID: {
        type: String,
        required: true,
    },

    legal_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    term_year: {
        type: String,
    },

    grad_ugrad: {
        type: String,
    },

    supervisor_name: {
        type: String,
    },

    priority: {
        type: Boolean,
    },

    hours: {
        type: Number,
    },

    date_applied: {
        type: String,
    },

    location: {
        type: String,
    },

    phone: {
        type: String,
    },

    degree: {
        type: String,
    },

    courses_applied_for_list: {
        type: Array,
    },

    open_to_other_courses: {
        type: Boolean,
    },

    notes: {
        type: String,
    },

    assigned_hours: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

//attempt to find the User object by email and add it to TA if found
TASchema.pre('save', async function (next) {
    const user = await User.findOne({ email: this.email });
    if (user) {
        const user_id = new mongoose.Types.ObjectId(user._id);
        this.ta = user_id;
    }
    next();
})


const TA = mongoose.model<ITA>("TA", TASchema);

export default TA;