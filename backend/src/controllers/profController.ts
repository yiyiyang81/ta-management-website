import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Professor from "../models/Professor";
import Course from "../models/Course";
import User, { UserTypes } from "../models/User";
import { parse } from 'csv-string';
import { ProfHelper } from "../helpers/profHelper";
import { UserHelper } from "../helpers/userHelper";
import { CourseHelper } from "../helpers/courseHelper";

// @Desc Get all Profs
// @Route /api/prof
// @Method GET
export const getAllProfs = asyncHandler(async (req: Request, res: Response) => {
    const profs = await Professor.find({});
    res.status(200).json({
        profs
    });
});

// @Desc Get profa by Obejct Id
// @Route /api/prof/:id
// @Method GET
export const getProfById = asyncHandler(async (req: Request, res: Response) => {
    const prof = await Professor.findOne({_id: req.params.id});
    if (prof){
        res.status(200).json({
            exists: true,
            prof: prof
        });
    } else {
        res.status(200).json({
            exists: false
        })
    }
    });

// @Desc Register or create professor and course from file
// @Route /api/prof/uploadProfAndCourse
// @Method POST
export const registerProfAndCourseFromFile = asyncHandler(async (req: Request, res: Response) => {
    const csv = req.file;
    if (csv) {
        const fileContent = parse(csv.buffer.toString('utf-8'));
        for (let record of fileContent) {
            const term_year = record[0];
            const course_number = record[1];
            const course_name = record[2];
            const instructor_fullname = record[3];
            const split_fullname = instructor_fullname.split(" ")
            let instructor_user = await UserHelper.checkExistsOrCreateSkeleton(split_fullname[0], split_fullname[1], [UserTypes.Professor])
            let professor = await ProfHelper.checkExistsOrCreateSkeleton(instructor_user.email, instructor_user._id)
            if (!professor) {
                throw new Error(`Error when creating professor for user ${instructor_user._id}`)
            }
            let course = await CourseHelper.checkCourseExistsOrCreateSkeleton(course_number, course_name, term_year, [professor._id])
            if (!course) {
                throw new Error(`Error when creating course with course number ${course_number}`)
            }
            await ProfHelper.addCourseToProf(instructor_user.email, course._id)
        }
    } else {
        res.status(500);
        throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
});

// @Desc Add Professor
// @Route /api/prof/add
// @Method POST
export const addProf = asyncHandler(async (req: Request, res: Response) => {
    const { email, faculty, department, course_number } = req.body;
    // Also think of the case when the email is not that of a prof, how can you handle it?
    console.log(email)
    let instructor = await User.findOne({ email: email }).select("-password");
    if (!instructor) {
        res.status(404);
        throw new Error("Instructor not found in the database! Add user and continue.");
    }

    let course = await Course.findOne({ course_number: course_number });
    if (!course) {
        res.status(404);
        throw new Error("Course not found in the database! Add course and continue.");
    }

    const prof = await ProfHelper.createProfDb(instructor._id, email, faculty, department, course._id)
    course.add_prof_to_course(prof)
    res.status(200).json({
        id: prof._id,
        instructor: prof.professor,
        faculty: prof.faculty,
        term: prof.department,
        course: prof.course,
    });
});

// @Desc Delete Professor
// @Route /api/prof/delete/:email
// @Method DELETE
export const deleteProf = asyncHandler(async (req: Request, res: Response) => {
    await ProfHelper.deleteProf(req.params.email)
    res.status(200).send()
});

// @Desc Upload Professor from file
// @Route /api/prof/uploadProf
// @Method POST
export const uploadProf = asyncHandler(async (req: Request, res: Response) => {
    const csv = req.file;
    if (csv) {
        const fileContent = parse(csv.buffer.toString('utf-8'));
        for (let record of fileContent) {
            const email = record[0];
            const faculty = record[1];
            const department = record[2];
            const course_number = record[3];

            const instructor_user = await UserHelper.getUserDbByEmail(email, false)
            if (!instructor_user) {
                throw new Error("Instructor not found in the user database! Skipping.");
            }
            let course = await CourseHelper.getCourseIdByCourseNumber(course_number)
            if (!course) {
                throw new Error(`Course with course number ${course_number} not found in the user database! Skipping.`);
            }
            let professor = await ProfHelper.createProfDb(instructor_user!._id, email, faculty, department, course._id)
            if (!professor) {
                throw new Error(`Error when creating professor for user ${instructor_user!._id}`)
            }
            await CourseHelper.addProfessorToCourse(course._id, professor)
        }
    } else {
        res.status(500);
        throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
})

// @Desc Check if email is already used by a Professor
// @Route /api/prof/checkValidEmail/:email
// @Method GET
export const checkValidEmail = asyncHandler(async (req: Request, res: Response) => {
    const email = await Professor.exists({ email: req.params.email })
    let emailExists = false
    if (email) {
        emailExists = true
    }

    res.status(200).json({
        emailExists: emailExists,
    });
});