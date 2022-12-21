import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Course from "../models/Course";
import User from "../models/User";
import Professor from "../models/Professor";
import { IProfessor } from "../models/Professor";
import { forEach, parse } from 'csv-string';
import TA from "../models/TA";
import mongoose from "mongoose";

// @Desc Get all Courses
// @Route /api/course
// @Method GET
export const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    let any_course = await Course.findOne({});
    if (!any_course) {
        res.status(404);
        throw new Error("No course in the database!");
    }

    let courses = await any_course.get_list_of_need_to_fix_courses();

    res.status(200).json({ courses });
});

// @Desc Get Course by term year and course number
// @Route /api/course/search/:term_year/:course_number
// @Method GET
export const getCourse = asyncHandler(async (req: Request, res: Response) => {
    const term_year = req.params.term_year!;
    const course_number = req.params.course_number!;

    let course = await Course.findOne({ term_year: term_year, course_number: course_number });

    if (!course) {
        res.status(404);
        throw new Error("Course not found!");
    }

    res.status(200).json({ course });
});

// @Desc Get all Courses
// @Route /api/course/:id
// @Method GET
export const getCourseById = asyncHandler(async (req: Request, res: Response) => {
    let course = await Course.findOne({ _id: req.params.id });
    if (!course) {
        res.status(404);
        throw new Error(`No course with Object ID ${req.params.id} in the database!`);
    }
    res.status(200).json({ course });
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
            let courseInstructor = await User.findOne({ email: instructorEmail }).select("-password");
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
export const addCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { course_name, course_description, term_year, course_number, course_instructors } = req.body;
    //converting the course_instructors emails to a list of IProfessor objects
    let instuctorObjectList = await (async function (course_instructors: any, res: Response, next: NextFunction) {
        var resultObjectList: IProfessor[] = [];
        for (var email of course_instructors) {
            let userId = await User.findOne({ email: email }).select("_id");
            let course_instructor = await Professor.findOne({ professor: userId });
            if (!course_instructor) {
                try {
                    res.status(404);
                    throw new Error("Instructor not found in the database! Add user and continue.");
                }
                catch (e) {
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

// @Desc Get the course's current TA
// @Route /api/course/:id/ta
// @Method GET
export const getCourseTA = asyncHandler(async (req: Request, res: Response) => {

    const term_year = req.query.term_year!;
    const course_number = req.query.course_number!;
    //if term_year was not provided will calculate the current one
    if (!term_year) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        let season: string;
        if (mm >= 1 && mm <= 4) {
            season = "Winter";
        }
        else if (mm >= 5 && mm <= 8) {
            season = "Summer";
        }
        else {
            season = "Fall";
        }

        let current_term_year = season + " " + String(yyyy);

        let course = await Course.findOne({ course_number: course_number, term_year: current_term_year });

        if (!course) {
            res.status(404);
            throw new Error("Course not found");
        }

        let current_ta = await course.get_course_TA_info(course_number, current_term_year);

        res.status(200).json(current_ta
        );
    }
    else {
        let course = await Course.findOne({ course_number: course_number, term_year: term_year });

        if (!course) {
            res.status(404);
            throw new Error("Course not found");
        }

        let ta = await course.get_course_TA_info(course_number, term_year);

        res.status(200).json(ta
        );
    }
});

// @Desc Get the course's current prof
// @Route /api/course/:id/prof
// @Method GET
export const getCourseProf = asyncHandler(async (req: Request, res: Response) => {

    const term_year = req.query.term_year!;
    const course_number = req.query.course_number!;

    if (!term_year) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        let season: string;
        if (mm >= 1 && mm <= 4) {
            season = "Winter";
        }
        else if (mm >= 5 && mm <= 8) {
            season = "Summer";
        }
        else {
            season = "Fall";
        }

        let current_term_year = season + " " + String(yyyy);

        let course = await Course.findOne({ course_number: course_number, term_year: current_term_year });

        if (!course) {
            res.status(404);
            throw new Error("Course not found");
        }

        let instructors = await course.course_instructors;

        res.status(200).json({ instructors: instructors }
        );
    }
    else {
        let course = await Course.findOne({ course_number: course_number, term_year: term_year });

        if (!course) {
            res.status(404);
            throw new Error("Course not found");
        }

        let instructors = await course.course_instructors;

        res.status(200).json({ instructors: instructors }
        );
    }
});

// @Desc Delete Course
// @Route /api/course/:id
// @Method DELETE
export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseNumber } = req.body;

    let course = await Course.findOne({ course_number: courseNumber });
    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    await User.findOneAndDelete({ courseNumber });
    res.status(201).json({});
});


// @Desc Get all the courses of a prof
// @Route /api/course/prof/:id
// @Method GET
export const getCoursesByInstructorEmail = asyncHandler(async (req: Request, res: Response) => {
    const email = req.query.email!;
    let prof = await Professor.findOne({ email: email }, { _id: 1 });
    if (!prof) {
        res.status(404);
        throw new Error("Professor not found");
    }
    let courses = await Course.find({ course_instructors: { $elemMatch: { _id: prof._id } } });
    res.status(200).json(courses);
});


// @Desc Get all the coruses of a ta
// @Route /api/course/ta/:id
// @Method GET
export const getCoursesByTaEmail = asyncHandler(async (req: Request, res: Response) => {
    const email = req.query.email!;
    let ta = await TA.findOne({ email: email }, { _id: 1 });
    if (!ta) {
        res.status(404);
        throw new Error("TA not found");
    }
    let courses = await Course.find({ course_TA: { $elemMatch: { _id: ta._id } } });
    res.status(200).json(courses);
});

// @Desc add a TA to a Course
// @Route /api/course/:id/ta/:id
// @Method POST
export const addTaToCourse = asyncHandler(async (req: Request, res: Response) => {
    const { course_number, term_year, email } = req.body;

    let ta = await TA.findOne({ email: email });

    if (!ta) {
        res.status(404);
        throw new Error("TA not found");
    }

    let course = await Course.findOne({ course_number: course_number, term_year: term_year });

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    course.add_ta_to_course(ta);
    res.status(201).json({});
});

// @Desc delete a TA from a Course
// @Route /api/course/:term_year/:cousre_number/ta/:email
// @Method DELETE
export const deleteTaFromCourse = asyncHandler(async (req: Request, res: Response) => {
    // const { course_number, term_year, email } = req.body;
    const term_year = req.params.term_year!;
    const course_number = req.params.course_number!;
    const email = req.params.email!;


    let ta = await TA.findOne({ email: email });

    if (!ta) {
        res.status(404);
        throw new Error("TA not found");
    }

    let course = await Course.findOne({ course_number: course_number, term_year: term_year });

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }

    course.delete_ta_from_course(ta);
    res.status(200).json({}
    );
});

// @Desc get the courses from all history
// @Route /api/course/:course_number/
// @Method GET
export const getCoursesByCourseNumber = asyncHandler(async (req: Request, res: Response) => {
    const course_number = req.params.course_number!;

    let course = await Course.find({ course_number: course_number });

    if (!course) {
        res.status(404);
        throw new Error("Course not found!");
    }

    res.status(200).json({ course });
});
