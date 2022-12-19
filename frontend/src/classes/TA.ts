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