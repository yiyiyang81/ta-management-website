import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Course from "../models/Course";
import User from "../models/User";
import Professor from "../models/Professor";
import {IProfessor} from "../models/Professor";
import { parse } from 'csv-string';

// @Desc Get all Courses
// @Route /api/course
// @Method GET
export const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const courses = await Course.find({});
    res.status(200).json({ courses });
});

// @Desc Save multiple courses
// @Route /api/course/upload
// @Method POST
export const registerCourseFromFile = asyncHandler(async (req: Request, res: Response) => {
    const csv = req.file;
    if (csv) {
        const fileContent = parse(csv.buffer.toString('utf-8'));
        for (let record of fileContent) {
            const instructorEmail = record[5];
            let courseInstructor = await User.findOne({ instructorEmail }).select("-password");
            if (!courseInstructor) {
                res.status(404);
                console.log("Instructor not found in the database! Skipping row.");
            } else {
                const course = new Course({
                    course_name: record[0],
                    course_description: record[1],
                    term_year: record[2] + " " + record[3],
                    course_number: record[4],
                    course_instructor: courseInstructor
                });
                course.save(); // can be made concurrent
            }
        }
    } else {
        res.status(500);
        throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
});


// @Desc Add Courses
// @Route /api/course/add
// @Method POST
export const addCourses = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { course_name, course_description, term_year, course_number, course_instructors } = req.body;
    //converting the course_instructors emails to a list of IProfessor objects
        let instuctorObjectList = await (async function (course_instructors: any, res: Response, next: NextFunction) {
            var resultObjectList: IProfessor[] = [];
            for (var email of course_instructors) {
                let userId = await User.findOne({ email }).select("_id");
                let course_instructor = await Professor.findOne({professor: userId});
                if (!course_instructor) {
                    try{
                        res.status(404);
                        throw new Error("Instructor not found in the database! Add user and continue.");
                    }
                    catch(e){
                        next(e);
                    }
                }
                else {
                    resultObjectList.push(course_instructor);
                }
            }
            return resultObjectList;
    })(course_instructors, res, next);

    const course = new Course({ course_name, course_description, term_year, course_number, course_instructors: instuctorObjectList });
    await course.save();
    res.status(201).json({
        id: course._id,
        course_name: course.course_name,
        course_description: course.course_description,
        term_year: course.term_year,
        course_number: course.course_number,
        course_instructors: course.course_instructors
    });
});

// @Desc Delete Course
// @Route /api/course/:id
// @Method DELETE
export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseNumber } = req.body;

    let course = await Course.findOne({ courseNumber });
    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    await User.findOneAndDelete({ courseNumber });
    res.status(201).json({});
});