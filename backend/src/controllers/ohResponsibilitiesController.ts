import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import OHResponsibilities from "../models/OHResponsibilities";

// @Desc Set OHs and Responsibilities for an individual
// @Route /api/ohresps/set
// @Method POST
export const setOHResponsibilities = asyncHandler(async (req: Request, res: Response) => {
    const { term_year, course_number, is_instructor, full_name, email, office_hours, location, responsibilities } = req.body;
    const ohresps = await OHResponsibilities.findOne({ course_number: course_number, email: email });

    if(!ohresps) {
        const ohr = new OHResponsibilities({ term_year, course_number, is_instructor, full_name, email, office_hours, location, responsibilities});
        await ohr.save();
        res.status(201).json({
            id: ohr._id,
            term_year: ohr.term_year,
            course_number: ohr.course_number,
            is_instructor: ohr.is_instructor,
            full_name: ohr.full_name,
            email: ohr.email,
            office_hours: ohr.office_hours,
            location: ohr.location,
            responsibilities: ohr.responsibilities
        });

    } else { // overwrite existing data
        ohresps.is_instructor = is_instructor;
        ohresps.full_name = full_name;
        ohresps.office_hours = office_hours;
        ohresps.location = location;
        ohresps.responsibilities = responsibilities;

        await ohresps.save();
        res.status(200).json({
            id: ohresps._id,
            term_year: ohresps.term_year,
            course_number: ohresps.course_number,
            is_instructor: ohresps.is_instructor,
            full_name: ohresps.full_name,
            email: ohresps.email,
            office_hours: ohresps.office_hours,
            location: ohresps.location,
            responsibilities: ohresps.responsibilities
        });
    }
});

// @Desc Get course OH of specific individual by course number and email
// @Route /api/ohresps/oh
// @Method GET
export const getCourseOH = asyncHandler(async (req: Request, res: Response) => {
    const { course_number, email } = req.body;
    const oh = await OHResponsibilities.findOne({ course_number: course_number, email: email });

    if (!oh) {
        res.status(200).json({});
    } else {
        res.status(200).json({ office_hours: oh.office_hours });
    }
});

// @Desc Get all OHs (from potentially multiple classes) of an email
// @Route /api/ohresps/allohs
// @Method GET
export const getAllOHs = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const ohs = await OHResponsibilities.find({ email: email });

    if (!ohs) {
        res.status(200).json({});
    } else {
        let all = new String();
        all += '{'
        for (var i = 0;i<=ohs.length-1 ;i++){
            all += '"' + ohs[i].course_number + '": "';
            all += ohs[i].office_hours + '"';

            if (i <= ohs.length-2) {
                all += ",";
            }
        }
        all += '}'
        res.status(200).json({all_ohs: JSON.parse(all.valueOf()) });
    }
});

// @Desc Get all responsibiltiies
// @Route /api/ohresps/resps
// @Method GET
export const getCourseResponsibilities = asyncHandler(async (req: Request, res: Response) => {
    const { course_number, email } = req.body;
    const ohresps = await OHResponsibilities.findOne({ course_number: course_number, email: email });

    if (!ohresps) {
        res.status(200).json({});
    } else {
        res.status(200).json({ responsibilities: ohresps.responsibilities });
    }
});
