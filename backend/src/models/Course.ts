import mongoose from 'mongoose';
import { IProfessor } from "./Professor";
import TA, { ITA } from "./TA";
import User, { IUser } from './User';
import TAWishlist, { ITAWishlist } from './TAWishlist';
import QueryString from 'qs';

const Schema = mongoose.Schema;

enum Term {
    Fall = "fall",
    Spring = "spring",
    Summer = "summer"
}

enum CourseType {
    Regular = "regular",
    Seminar = "seminar",
    Lab = "lab",
    Other = "other"
}

export interface ICourse extends mongoose.Document {
    course_name: string,
    course_description: string,
    term_year: string,
    course_number: string,
    course_type: CourseType,
    course_enrolllment_num: number,
    TA_quota: number,
    is_need_fix: Boolean,
    instructor_office_hour: string,
    lecture_hours: string,
    course_instructors: [IProfessor],
    course_TA: [ITA],
    TA_wishlist: [ITA]
    update_course_quota(course_type: string, course_enrollment_num: number, TA_quota: number): Promise<string>,
    get_course_TA_info(course_number: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[], term_year: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[]): Promise<Array<any>>,
    get_list_of_need_to_fix_courses(): Promise<Array<IUser>>,
    add_wishlist_to_course(course_number: String, term_year: String): Promise<string>,
    add_ta_to_course(ta: ITA): Promise<string>,
    add_prof_to_course(prof: IProfessor): Promise<string>,
    delete_ta_from_course(ta: ITA): Promise<string>,
    delete_prof_from_course(prof: IProfessor): Promise<string>,
}

const CourseSchema = new mongoose.Schema({

    course_name: {
        type: String,
        required: true,
    },

    course_description: {
        type: String,
        required: false,
    },

    term_year: {
        type: String,
        required: true,
    },

    course_number: {
        type: String,
        required: true,
    },

    course_type: {
        type: String,
        required: false,
    },

    course_enrollment_num: {
        type: Number,
        default: 0
    },
    TA_quota: {
        type: Number,
        default: 1
    },
    is_need_fix: {
        type: Boolean
    },
    instructor_office_hour: {
        type: String,
    },
    lecture_hours: {
        type: String,
    },
    course_instructors: {
        type: Array,
        default: [],
        required: true
    },
    course_TA: {
        type: Array,
        default: []
    },
    TA_wishlist: {
        type: Schema.Types.ObjectId,
        ref: 'TAWishlist'
    },

    active : {
        type: Boolean,
        required : true,
        default : true
    }
}, {
    timestamps: true
})


//Database Methods
CourseSchema.methods.update_course_quota = async function (
    // term_year: string, course_number: string,
    course_type: string, course_enrollment_num: number, TA_quota: number) {

    console.log("course_enrollment_num", course_enrollment_num);
    console.log("course_type", course_type)
    console.log("TA_quota", TA_quota)

    return await this.updateOne(
        // { "term_year": term_year, "course_number": course_number },
        { $set: { course_type: course_type, course_enrollment_num: course_enrollment_num, TA_quota: TA_quota } }
    );
}

CourseSchema.methods.get_course_TA_info = function (course_number: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[], term_year: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[]) {
    return Course.findOne({ course_number: course_number, term_year: term_year }, { "course_TA": 1, "_id": 0 });
}

CourseSchema.methods.get_list_of_need_to_fix_courses = function () {
    return Course.find({ is_need_fix: true });
}

// TODO: test this one when ITA is merged
CourseSchema.methods.get_course_ta_history = function (course_number: string) {
    return Course.find({}, { "course_TA": 1 });
}

CourseSchema.methods.add_wishlist_to_course = async function (course_number: String, term_year: String) {
    const course = await Course.findOne({ course_number: course_number, term_year: term_year });
    if (!course) {
        throw new Error("Course not found!");
    }
    const new_wishlists: ITAWishlist[] = [];
    const profs = course.course_instructors;
    for (let prof of profs) {
        let prof_email = await User.findOne({ _id: prof._id }, { "email": 1 });
        let wishlist = await TAWishlist.findOne({ next_term_year: term_year, course_number: course_number, instructor_email: prof_email });
        if (wishlist) {
            new_wishlists.push(wishlist);
        }
    }
    return Course.updateOne({ term_year: term_year, course_number: course_number },
        { $set: { TA_wishlist: new_wishlists } });
}

CourseSchema.methods.add_ta_to_course = async function (ta: ITA) {
    let current_ta_list = this.course_TA;
    if (!current_ta_list.find((i: { email: string; }) => i.email == ta.email)) {
        current_ta_list.push(ta);
    }
    else {
        console.log("TA already exist!");
    }
    return await this.updateOne({ $set: { course_TA: current_ta_list } });
}

CourseSchema.methods.add_prof_to_course = async function (prof: IProfessor) {
    let current_prof_list = this.course_instructors;
    if (!current_prof_list.find((i: { email: string; }) => i.email == prof.email)) {
        current_prof_list.push(prof);
    }
    else {
        console.log("Professor already exist!");
    }
    return this.updateOne({ $set: { course_instructors: current_prof_list } });
}

CourseSchema.methods.delete_ta_from_course = async function (ta: ITA) {
    let current_ta_list = this.course_TA;
    if (!current_ta_list.find((i: { email: string; }) => i.email === ta.email)) {
        console.log("TA not in course!");
    }
    else {
        current_ta_list = current_ta_list.filter((i: { email: string; }) =>
            i.email !== ta.email
        );
    }
    return this.updateOne({ $set: { course_TA: current_ta_list } });
}

CourseSchema.methods.delete_prof_from_course = async function (prof: IProfessor) {
    let current_prof_list = this.course_instructors;
    if (!current_prof_list.find((i: { email: string; }) => i.email === prof.email)) {
        console.log("Prof not in course!");
    }
    else {
        current_prof_list = current_prof_list.filter((i: { email: string; }) =>
            i.email !== prof.email
        );
    }
    return this.updateOne({ $set: { course_TA: current_prof_list } });
}

//setting is_need_fix variable by calculating the TA per person ratio
CourseSchema.pre('save', function (next) {
    const TA_per_student = this.course_enrollment_num / this.TA_quota;
    if (TA_per_student < 30 || TA_per_student > 45) {
        this.is_need_fix = true;
    }
    else {
        this.is_need_fix = false;
    }
    next();
})

// CourseSchema.pre("deleteOne",function(next) {
//     const userId = this.getQuery()["_id"];
//     mongoose.model("Professor").updateMany({course : userId},{ $unset : {course : ""}})
//     next()
// })
const Course = mongoose.model<ICourse>("Course", CourseSchema);

export default Course;