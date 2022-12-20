import { Course } from "./Course";


export interface TA {
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
    courses_applied_for_list: Array<Course>,
    open_to_other_courses: boolean,
    notes: string,
    assigned_hours: number
    average_rating:number,
    rating_comments:Array<string>,
    performance_logs:Array<string>,
    courses_assigned:Array<string>
}

export const emptyTA: TA = {
    TA_name: "", student_ID: "", email: "",
    legal_name: "",
    term_year: "",
    grad_ugrad: "",
    supervisor_name: "",
    priority: false,
    hours: 0,
    date_applied: "",
    location: "",
    phone: "",
    degree: "",
    courses_applied_for_list: [],
    open_to_other_courses: false,
    notes: "",
    assigned_hours: 0,
    average_rating: 0,
    rating_comments: [],
    performance_logs: [],
    courses_assigned: []
};
