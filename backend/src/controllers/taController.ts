import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import TA from "../models/TA";
import Professor from "../models/Professor";
import Course, { ICourse } from "../models/Course";
import User from "../models/User";
import { parse } from 'csv-string';

// @Desc Get all TAs
// @Route /api/ta
// @Method GET
export const getAllTAs = asyncHandler(async (req: Request, res: Response) => {
    const TAs = await TA.find({});
    res.status(200).json({
        TAs
    });
});


// @Desc Save multiple TAs
// @Route /api/ta/upload
// @Method POST
export const registerTAFromFile = asyncHandler(async (req: Request, res: Response) => {
    const csv = req.file;
    const type = req.body;  //need to pass the file type info from frontend
    if (!csv) {
        res.status(500);
        throw new Error("File upload unsuccessful.");
    }

    if (type === "tacohort") {
        const fileContent = parse(csv.buffer.toString('utf-8'));
        for (let record of fileContent) {
            const taEmail = record[4];
            const courses_applied = record[13];
            let courses_applied_for_list: ICourse[] = []
            // doing checks before adding the information to database
            for (let course_number of courses_applied) {
                let course = await Course.findOne({ course_number: course_number });
                if (!course) {
                    // res.status(404);
                    console.log("Course not found in the database! Skipping course %s .", course_number);
                }
                else {
                    courses_applied_for_list.push(course);
                }
            }

            const ta = new TA({
                term_year: record[0],
                TA_name: record[1],
                student_ID: record[2],
                legal_name: record[3],
                email: record[4],
                grad_ugrad: record[5],
                supervisor_name: record[6],
                priority: record[7],
                hours: record[8],
                date_applied: record[9],
                location: record[10],
                phone: record[11],
                degree: record[12],
                courses_applied_for_list: courses_applied_for_list,
                open_to_other_courses: record[14],
                notes: record[15]
            });
            await ta.save();
        }

    }
    else if (type === "coursequota") {
        const fileContent = parse(csv.buffer.toString('utf-8'));
        for (let record of fileContent) {
            const term_year = record[0];
            const course_number = record[1];
            const course_type = record[2];
            const course_name = record[3];
            const instructor_name = record[4];
            const course_enrollment_num = Number(record[5]);
            const TA_quota = Number(record[6]);
            let any_prof = await Professor.findOne();//need an instance to invoke schema method
            //will exit the loop if there is no professor in the db
            if (!any_prof) {
                res.status(404);
                console.log("Empty database for instructor! Cannot proceed");
                break;
            }
            let instructor = any_prof.get_prof_by_name(instructor_name);
            let course = await Course.findOne({ course_number: course_number, term_year: term_year });
            if (!instructor) {
                console.log("Instructor not found in the database! Skipping row.");
                continue;
            }
            else if (!course) {
                console.log("Course not found in the database! Skipping row.");
                continue;
            }
            else {
                course.update_course_quota(term_year, course_number, course_type, course_enrollment_num, TA_quota);
            }
        }
    }
    //should be removed later
    else {
        res.status(500);
        throw new Error("Incorrect type received.");
    }
    res.status(200).json({});
});

// @Desc Add TA
// @Route /api/ta/add
// @Method POST
export const addTA = asyncHandler(async (req: Request, res: Response) => {
    const { term_year, TA_name, student_ID, legal_name, email, grad_ugrad, supervisor_name,
        priority, hours, date_applied, location, phone, degree, courses_applied_for_list,
        open_to_other_courses, notes } = req.body;

    let courses_applied_found: ICourse[] = [];

    for (let course_number of courses_applied_for_list) {
        let course = await Course.findOne({course_number: course_number });
        if (!course) {
            console.log("Course not found in the database! Skipping course %s .", course_number);
        }
        else {
            courses_applied_found.push(course);
        }
    }

    const ta = new TA({
        term_year: term_year,
        TA_name: TA_name,
        student_ID: student_ID,
        legal_name: legal_name,
        email: email,
        grad_ugrad: grad_ugrad,
        supervisor_name: supervisor_name,
        priority: priority,
        hours: hours,
        date_applied: date_applied,
        location: location,
        phone: phone,
        degree: degree,
        courses_applied_for_list: courses_applied_found,
        open_to_other_courses: open_to_other_courses,
        notes: notes
    });
    await ta.save();
    res.status(201).json({
        id: ta._id,
        term_year: ta.term_year,
        TA_name: ta.TA_name,
        student_ID: ta.student_ID,
        legal_name: ta.legal_name,
        email: ta.email,
        grad_ugrad: ta.grad_ugrad,
        supervisor_name: ta.supervisor_name,
        priority: ta.priority,
        hours: ta.hours,
        date_applied: ta.date_applied,
        location: ta.location,
        phone: ta.phone,
        degree: ta.degree,
        courses_applied_for_list: ta.courses_applied_for_list,
        open_to_other_courses: ta.open_to_other_courses,
        notes: ta.notes
    });
});