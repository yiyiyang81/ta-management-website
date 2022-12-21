import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import OHResponsibilities from "../models/OHResponsibilities";

// Helper function written by Yiyi :) which gets the current term and year, e.g., "Fall 2022"
export function getTermYear() { 
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

        return season + " " + String(yyyy);
}

// @Desc Set OHs and Responsibilities for an individual
// @Route /api/ohresps/set
// @Method POST
export const setOHResponsibilities = asyncHandler(async (req: Request, res: Response) => {
    const { course_number, is_instructor, full_name, email, office_hours, location, responsibilities } = req.body;
    const ohresps = await OHResponsibilities.findOne({ course_number: course_number, email: email });

    const term_year = getTermYear();

    if(!ohresps) { // sets the OHs and responsibilities for the first time
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

// @Desc Get course OH and Responsibilities of specific individual by course number and email
// @Route /api/ohresps/get
// @Method GET
export const getCourseOHResps = asyncHandler(async (req: Request, res: Response) => {
    const course_number = req.query.course_number;
    const email = req.query.email;

    const oh = await OHResponsibilities.findOne({ course_number: course_number, email: email });

    if (!oh) {
        res.status(200).json({}); // no OHs and Reponsibilities set yet
    } else {
        res.status(200).json({ oh });
    }
});

// @Desc Get all OHs (from potentially multiple classes) of an email
// @Route /api/ohresps/allohs
// @Method GET
export const getAllOHs = asyncHandler(async (req: Request, res: Response) => {
    const email = req.query.email;
    const ohs = await OHResponsibilities.find({ email: email });

    if (!ohs) {
        res.status(200).json({}); // no OHs set for individual yet
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
