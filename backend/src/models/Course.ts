import mongoose from 'mongoose';
import { IProfessor } from "./Professor";

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
    course_instructor: [IProfessor]
    // course_TA: [ITA],
    // TA_wishlist: [ITA]
}

const CourseSchema = new mongoose.Schema({

    course_name: {
        type: String,
        required: true,
    },

    course_description: {
        type: String,
        required: true,
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
        // required: true,
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
    // course_TA:{
    //     type:Array,
    //     default: []
    // },
    // TA_wishlist:{
    //     type:Array,
    //     default: []
    // }
}, {
    timestamps: true
})


//Database Methods
CourseSchema.statics.update_course_quota = function(){

}

CourseSchema.statics.get_course_TA_info = function (course_number: string, term_year: string) {
    return this.where({ course_number: course_number, term_year: term_year })
}

CourseSchema.statics.get_list_of_need_to_fix_courses = function () {

}

CourseSchema.statics.get_course_ta_history = function (course_number: string) {

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

const Course = mongoose.model<ICourse>("Course", CourseSchema);

export default Course;