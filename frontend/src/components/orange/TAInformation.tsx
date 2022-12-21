import React, { useEffect, useState } from "react";
import { TA, emptyTA } from "../../classes/TA";
import { Container } from "react-bootstrap";
import { callBackend } from "../../apiConfig";
import Button from "../../common/Button";
import TAInfoRow from "./TAInfoRow";
import SearchTA from "./SearchTA";
import PerformanceLogRow from "./PerformanceLogRow";
import { PerformanceLog } from "../../classes/PerformanceLog";
import { Rating } from "../../classes/Rating";
import RatingRow from "./RatingRow";
import "../../style/taAdmin.css"
import "../../style/userTable.css";

const TAInformation = () => {

    const [subPage, setSubPage] = useState("Search");
    const [email, setEmail] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [displayErrorSN, setDisplayErrorSN] = useState(false);
    const [displayErrorEmail, setDisplayErrorEmail] = useState(false);
    const [ta, setTAInfo] = useState<TA>(emptyTA);
    const [performanceLogs, setPerformanceLogs] = useState<Array<PerformanceLog>>([]);
    const [ratings, setRatings] = useState<Array<Rating>>([]);


    //when a TA Student Number or Email is entered by the user, will fetch all data for this TA
    useEffect(() => {
        const fetchTAData = async () => {
            try {
                let performance_logs: PerformanceLog[] = [];
                let courses_assigned: string[] = [];
                let average_rating = 0;
                let rating_comments = [];
                let taRowInfo = ta;

                //getting performance logs info and update state
                try {
                    const performance_logs_res = await callBackend(`/api/performancelog/get?TA_email=` + ta.email);
                    const all_logs = await performance_logs_res.json();
                    for (let log of all_logs.log) {
                        if (log.time_date_stamped_comments.length !== 0) {
                            for (let comment of log.time_date_stamped_comments) {
                                let item: PerformanceLog = { "term_year": log.term_year, "comment": comment }
                                performance_logs.push(item);
                            }
                        }
                    }
                    setPerformanceLogs(performance_logs);
                }
                catch (e) {
                    setPerformanceLogs([]);
                }

                //get info on courses this TA is assigned to
                try {
                    const courses_assigned_res = await callBackend(`/api/course/ta/1?email=` + ta.email);
                    const all_courses_assigned = await courses_assigned_res.json();
                    for (let course of all_courses_assigned) {
                        let course_info = course.course_number.concat(": ", course.term_year);
                        courses_assigned.push(course_info);
                    }
                    //course assigned will not be returned in a seperate table so no need to use state
                    ta["courses_assigned"] = courses_assigned;
                } catch (e) {
                    ta["courses_assigned"] = [];
                }

                //get course that this TA is a member of the prof's wishlist
                try {
                    //first get current date to get next semester
                    var today = new Date();
                    var mm = today.getMonth() + 1; //January is 0!
                    var yyyy = today.getFullYear();
                    let season: string;
                    if (mm >= 1 && mm <= 4) {
                        season = "Summer";
                    }
                    else if (mm >= 5 && mm <= 8) {
                        season = "Fall";
                    }
                    else {
                        season = "Winter";
                    }
                    let next_term_year = season + " " + String(yyyy);

                    //get courses that a prof wish this TA to work with
                    const courses_wishlisted_res = await callBackend(`/api/tawishlist/ta?next_term_year=${next_term_year}&TA_email=${ta.email}`);
                    const courses_wishlisted = await courses_wishlisted_res.json();
                    ta["courses_wishlisted"] = courses_wishlisted.courses;
                } catch (e) {
                    ta["courses_wishlisted"] = [];
                }

                //get average rating and all ratings info
                try {
                    const ratings_res = await callBackend(`/api/ratings/${ta.email}`);
                    const all_ratings = await ratings_res.json();

                    if (all_ratings.ratings.length === 0) {
                        taRowInfo["average_rating"] = -1;
                        setRatings([]);
                    }
                    else {
                        for (let rating of all_ratings.ratings) {
                            let course = await callBackend(`/api/course/${rating.course.toString()}`);
                            let course_res = await course.json();
                            let item = {
                                "created_at": rating.createdAt,
                                "course_number": rating.course_number,
                                "course_name": course_res.course.course_name,
                                "rating_score": rating.rating_score,
                                "comment": rating.comment,
                            }
                            average_rating = average_rating + rating.rating_score;
                            rating_comments.push(item);
                        }
                        taRowInfo["average_rating"] = average_rating / all_ratings.ratings.length;
                        setRatings(rating_comments)
                    }
                } catch (e) {
                    taRowInfo["average_rating"] = -1;
                    setRatings([]);
                }
                setTAInfo(taRowInfo);
            } catch (err) {
                console.error(err);
            }
        }
        fetchTAData();
    }, [ta])

    //verify if the TA exists with Student Number specified
    const checkValidTABySN = async () => {
        try {
            const res = await callBackend(`/api/ta/student-number/${studentNumber}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return await res.json();
        } catch (e) {
            console.log(e);
        }
    };

    //verify if the TA exists with email specified
    const checkValidTAByEmail = async () => {
        try {
            const res = await callBackend(`/api/ta/email/${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return await res.json();
        } catch (e) {
            console.log(e);
        }
    };

    //reset all states to initial values
    const handleGoBack = () => {
        setTAInfo(emptyTA);
        setEmail("");
        setStudentNumber("");
        setPerformanceLogs([]);
        setRatings([]);
        setSubPage("Search");
    }

    const handleTASNSearchClick = async () => {
        setDisplayErrorSN(false)
        const ta = await checkValidTABySN();
        if (ta.TAs !== null && ta.TAs !== undefined) {
            setSubPage("TA");
            setTAInfo(ta.TAs);
        }
        else {
            setDisplayErrorSN(true);
        }
    };

    const handleTAEmailSearchClick = async () => {
        setDisplayErrorEmail(false);
        const ta = await checkValidTAByEmail();
        if (ta.TAs !== null && ta.TAs !== undefined) {
            setSubPage("TA");
            setTAInfo(ta.TAs);
        }
        else {
            setDisplayErrorEmail(true);
        }
    };

    return (
        <div>
            {subPage === "Search" && (
                <div className="ta-admin-container">
                    <SearchTA
                        studentNumber={studentNumber}
                        email={email}
                        handleStudentNumber={setStudentNumber}
                        handleEmail={setEmail}
                        handleTASNSearchClick={handleTASNSearchClick}
                        handleTAEmailSearchClick={handleTAEmailSearchClick}
                        displayErrorEmail={displayErrorEmail}
                        displayErrorSN={displayErrorSN}
                    ></SearchTA>
                </div>
            )}

            {subPage === "TA" && (
                <div className="ta-admin-container">
                    <div className="ta-admin-button-container">
                        <Button
                            width="15rem"
                            type="primary"
                            value="Go Back"
                            onClick={handleGoBack}
                        ></Button>
                    </div>

                    <Container className="mt-5">
                        <div className="rowC">
                            <h2 style={{ marginBottom: "20px" }}>TA Basic Information</h2>
                        </div>
                        <div id="profTable">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="column0"></th>
                                        <th >Student Number</th>
                                        <th >Student Name</th>
                                        <th >Email</th>
                                        <th >Average Rating</th>
                                        <th >Courses Assigned</th>
                                        <th >Wishlisted Next Term</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TAInfoRow ta={ta} />
                                </tbody>
                            </table>
                        </div>
                    </Container>
                    <Container className="mt-5">
                        <div className="rowC">
                            <h2 style={{ marginBottom: "20px" }}>Ratings</h2>
                        </div>
                        <div id="profTable">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="column0"></th>
                                        <th >Created At</th>
                                        <th >Course Number</th>
                                        <th >Course Name</th>
                                        <th >Rating Score</th>
                                        <th >Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ratings.map((rating: Rating, i: number) => (
                                        <RatingRow key={i} rating={rating} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Container>

                    <Container className="mt-3">
                        <div className="rowC">
                            <h2 style={{ marginBottom: "20px" }}>Performance Logs</h2>
                        </div>
                        <div id="profTable">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="column0"></th>
                                        <th >Term Year</th>
                                        <th >Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {performanceLogs.map((performance_log: PerformanceLog, i: number) => (
                                        <PerformanceLogRow key={i} performance_log={performance_log} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Container>

                </div>

            )
            }
        </div >
    );
};

export default TAInformation;