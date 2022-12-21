import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import PerformanceLog from "../models/PerformanceLog";
import { getTermYear } from "./ohResponsibilitiesController";

// @Desc Adds a time and date stamped comment about a TA to the TA's performance log
// @Route /api/performancelog/add
// @Method POST
export const addPerformanceLog = asyncHandler(async (req: Request, res: Response) => {
    const { course_number, TA_name, TA_email, time_date_stamped_comment } = req.body;

    const term_year = getTermYear();
    const log = await PerformanceLog.findOne({ term_year: term_year, course_number: course_number, TA_email: TA_email });

    if (!log) {
        let time_date_stamped_comments = new Array();
        time_date_stamped_comments.push(time_date_stamped_comment);

        const new_log = new PerformanceLog({ term_year, course_number, TA_name, TA_email, time_date_stamped_comments });
        await new_log.save();
        res.status(201).json({
            id: new_log._id,
            term_year: new_log.term_year,
            course_number: new_log.course_number,
            TA_name: new_log.TA_name,
            TA_email: new_log.TA_email,
            time_date_stamped_comments: new_log.time_date_stamped_comments
        });
    } else { // add new log to the existing document containing all logs by prof about same TA
        log.time_date_stamped_comments.push(time_date_stamped_comment);
        await log.save()
        res.status(200).json({
            id: log._id,
            term_year: log.term_year,
            course_number: TA_name.course_number,
            TA_name: log.TA_name,
            TA_email: log.TA_email,
            time_date_stamped_comments: log.time_date_stamped_comments
        });
    }
});

// @Desc Get performance log comments of specific course and TA
// @Route /api/performancelog/coursecomments
// @Method GET
export const getCourseComments = asyncHandler(async (req: Request, res: Response) => {
    const term_year = getTermYear();
    const course_number = req.query.course_number;
    const TA_email = req.query.TA_email;

    const log = await PerformanceLog.findOne({ term_year: term_year, course_number: course_number, TA_email: TA_email });

    if (!log) {
        res.status(200).json({}); // want an empty string returned as TA doesn't have associated notes
    } else {
        res.status(200).json({ performance_log_comments: log.time_date_stamped_comments });
    }
});

// @Desc Get all performance logs of specific TA
// @Route /api/performancelog/get
// @Method GET
export const getPerformanceLogs = asyncHandler(async (req: Request, res: Response) => {
    const TA_email = req.query.TA_email;
    
    const log = await PerformanceLog.find({ TA_email: TA_email });

    if (!log.length) {
        res.status(200).json({}); // prof didn't record any logs about this TA
    } else {
        res.status(200).json({ log });
    }
});