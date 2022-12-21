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

const TAInfo = () => {

    const [subPage, setSubPage] = useState("Search");
    const [email, setEmail] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [displayErrorSN, setDisplayErrorSN] = useState(false);
    const [displayErrorEmail, setDisplayErrorEmail] = useState(false);
    const [ta, setTAInfo] = useState<TA>();
    const [performanceLogs, setPerformanceLogs] = useState<Array<PerformanceLog>>([]);
    const [ratings, setRatings] = useState<Array<Rating>>([]);

    useEffect(() => {
        const fetchTAData = async () => {
            try {

                let performance_logs: PerformanceLog[] = [];
                let courses_assigned: string[] = [];
                let average_rating = 0;
                let rating_comments = [];
                let taRowInfo = ta;
                console.log("ta", taRowInfo)
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

                try {
                    const courses_assigned_res = await callBackend(`/api/course/ta/1?email=` + ta.email);
                    const all_courses_assigned = await courses_assigned_res.json();
                    for (let course of all_courses_assigned) {
                        let course_info = course.course_number.concat(": ", course.term_year);
                        courses_assigned.push(course_info);
                    }
                    taRowInfo["courses_assigned"] = courses_assigned;
                } catch (e) {
                    taRowInfo["courses_assigned"] = [];
                }

                const ratings_res = await callBackend(`/api/ratings/${ta.email}`);
                const all_ratings = await ratings_res.json();
                console.log(all_ratings)

                if (all_ratings.ratings.length === 0) {
                    taRowInfo["average_rating"] = -1;
                    setRatings([]);
                }
                else {
                    for (let rating of all_ratings.ratings) {
                        let course = await callBackend(`/api/course/${rating.course.toString()}`);
                        let course_res = await course.json();
                        console.log(course_res);
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
                setTAInfo(taRowInfo);
            } catch (err) {
                console.error(err);
            }
        }
        fetchTAData();
    }, [ta])

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

    const handleGoBack = () => {
        setTAInfo(emptyTA);
        setEmail("");
        setStudentNumber("");
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

export default TAInfo;