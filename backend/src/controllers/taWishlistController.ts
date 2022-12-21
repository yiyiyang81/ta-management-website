import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import TAWishlist from "../models/TAWishlist";

// @Desc Add a TA on a prof's wishlist for next semester
// @Route /api/tawishlist/add
// @Method POST
export const addTAToWishlist = asyncHandler(async (req: Request, res: Response) => {
    const { next_term_year, course_number, TA_name, TA_email, instructor_name, instructor_email } = req.body;

    const tawl = await TAWishlist.findOne({ next_term_year: next_term_year, course_number: course_number, instructor_email: instructor_email });

    if(!tawl) { // create wishlist for instructor if doesn't exist yet
        let TA_names = Array();
        let TA_emails = Array();

        TA_names.push(TA_name);
        TA_emails.push(TA_email)

        const wl = new TAWishlist({ next_term_year, course_number, TA_names, TA_emails, instructor_name, instructor_email});
        await wl.save();
        res.status(201).json({
            id: wl._id,
            next_term_year: wl.next_term_year,
            course_number: wl.course_number,
            TA_name: wl.TA_names,
            TA_email: wl.TA_emails,
            instructor_email: wl.instructor_email,
            instructor_name: wl.instructor_name
        });

    } else { // add TA to existing wishlist
        if (!tawl.TA_emails.includes(TA_email)) { // check if TA has been added already
            tawl.TA_names.push(TA_name);
            tawl.TA_emails.push(TA_email);
            await tawl.save();
        }

        await tawl.save();
        res.status(200).json({
            id: tawl._id,
            next_term_year: tawl.next_term_year,
            course_number: tawl.course_number,
            TA_names: tawl.TA_names,
            TA_emails: tawl.TA_emails,
            instructor_name: tawl.instructor_name,
            instructor_email: tawl.instructor_email
        });
    }
});

// @Desc Get an instructor's wishlist for next semester's TAs
// @Route /api/tawishlist/get
// @Method GET
export const getInstructorWishlist = asyncHandler(async (req: Request, res: Response) => {
    const next_term_year = req.query.next_term_year;
    const instructor_email = req.query.instructor_email;

    const tawl = await TAWishlist.findOne({ next_term_year: next_term_year, instructor_email: instructor_email });

    if (!tawl) {
        res.status(200).json({}); // instructor has no wishlist
    } else {
        res.status(200).json({ wished_TAs: tawl.TA_emails });
    }
});

// @Desc Get all courses where a TA is on their wishlist for next semester
// @Route /api/tawishlist/ta
// @Method GET
export const getCoursesTAWishlisted = asyncHandler(async (req: Request, res: Response) => {
    const next_term_year = req.query.next_term_year;
    let TA_email:string;

    if (req.query && req.query.TA_email) { 
        TA_email = (req.query as any).TA_email; 

        const tawls = await TAWishlist.find({ next_term_year: next_term_year });

        if (!tawls) {
            res.status(200).json({}); // no wishlist exists for next term year yet
        } else { // search through each wishlist to check if TA is in a wishlist
                let courses = new Array();
                tawls.forEach(function(wl) {
                    if (wl.TA_emails.includes(TA_email)) {
                        courses.push(wl.course_number);
                    }
                });

                res.status(200).json({ courses: courses});
        }   
    } 
});
