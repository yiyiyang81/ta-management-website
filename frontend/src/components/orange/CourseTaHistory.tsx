import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import "../../style/taAdmin.css"
import { CourseQuota } from "../../classes/CourseQuota";
import { TA } from "../../classes/TA";
import { Container } from "react-bootstrap";
import { callBackend } from "../../apiConfig";
import SearchCourseSimple from "./SearchCourseSimple";
import Button from "../../common/Button";
import TAPlainRow from "./TAHistoryRow";


const CourseTaHistory = ({ courseNumber, setCourseNumber }: {
    courseNumber: string;
    setCourseNumber: React.Dispatch<React.SetStateAction<any>>
}) => {

    const [subPage, setSubPage] = useState("Search");
    const [displayError, setDisplayError] = useState(false);
    const [coursesInfo, setCoursesInfo] = useState<Array<CourseQuota>>([]);
    const [tas, setTas] = useState<Array<TA>>([]);

    //when a course is specified, fetch TA information for that course
    useEffect(() => {
        const fetchHistoryTAData = async () => {
            try {
                //an empty list for setting new state for TAs later
                let new_tas = [];
                //need to iterate because a course with a given course number can have multiple terms
                for (let courseInfo of coursesInfo) {
                    if (courseInfo) {
                        let course_query = "term_year=" + courseInfo.term_year + "&course_number=" + courseInfo.course_number;
                        let course_res = await callBackend(`/api/course/1/ta?` + course_query);
                        let data = await course_res.json();

                        //get the list of course TA and fetch information for them one by one
                        for (let ta of data.course_TA) {
                            let performance_logs = [];
                            let courses_assigned: string[] = [];
                            let average_rating = 0;
                            let rating_comments = [];

                            //fetch info for performance logs
                            try {
                                const performance_logs_res = await callBackend(`/api/performancelog/get?TA_email=` + ta.email);
                                const all_logs = await performance_logs_res.json();
                                for (let log of all_logs.log) {
                                    performance_logs = performance_logs.concat(log.time_date_stamped_comments);
                                }
                                ta["performance_logs"] = performance_logs.join(", ");
                            }
                            catch (e) {
                                ta["performance_logs"] = ["Not Available"];
                            }

                            //fetch info for courses assigned
                            try {
                                const courses_assigned_res = await callBackend(`/api/course/ta/1?email=` + ta.email);
                                const all_courses_assigned = await courses_assigned_res.json();
                                for (let course of all_courses_assigned) {
                                    let course_info = course.course_number.concat(": ", course.term_year);
                                    courses_assigned.push(course_info);
                                }
                                ta["courses_assigned"] = courses_assigned.join(", ");
                            } catch (e) {
                                courses_assigned = ["Not Available"];
                            }

                            //fetch info related to ratings
                            try {
                                const ratings_res = await callBackend(`/api/ratings/${ta.email}`);
                                const all_ratings = await ratings_res.json();

                                for (let rating of all_ratings.ratings) {
                                    average_rating = average_rating + rating.rating_score;
                                    rating_comments.push(rating.comment);
                                }
                                if (all_ratings.ratings.length === 0) {
                                    ta["average_rating"] = -1;
                                    ta["rating_comments"] = ["Not Available"];
                                }
                                else {
                                    ta["average_rating"] = average_rating / all_ratings.ratings.length;
                                    ta["rating_comments"] = rating_comments.join(", ");
                                }
                            } catch (e) {
                                ta["average_rating"] = -1;
                                ta["rating_comments"] = ["Not Available"];
                            }

                            ta["term_year"] = courseInfo.term_year;
                            //push ta with detailed info into list of new TAs
                            new_tas.push(ta);
                        }
                    }
                }
                setTas(new_tas);
            } catch (err) {
                console.error(err);
            }
        }
        fetchHistoryTAData();
    }, [coursesInfo]);

    //verify if the course exists before searching for the course
    const checkValidCourse = async () => {
        try {
            const res = await callBackend(`/api/course/search-course-num/${courseNumber}`, {
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

    //emptying the TA list for new search and switch page
    const handleGoBack = () => {
        setTas([]);
        setSubPage("Search");
    }

    //set course state if course is found
    const handleCourseSearchClick = async () => {
        setDisplayError(false)
        const course = await checkValidCourse();
        if (course !== null && course !== undefined && course.course.length !== 0) {
            setSubPage("Course");
            setCoursesInfo(course.course);
        }
        else {
            setDisplayError(true);
        }
    };


    return (
        <div className="ta-admin-container">
            {subPage === "Search" && (
                <div>
                    <SearchCourseSimple
                        courseNumber={courseNumber}
                        handleCourseNumber={setCourseNumber}
                        handleCourseSearchClick={handleCourseSearchClick}
                        displayError={displayError}
                    ></SearchCourseSimple>
                </div>
            )}

            {subPage === "Course" && (
                <div>
                    <Container className="mt-3">
                        <div className="rowC">
                            <h2 style={{ marginBottom: "20px" }}>TA History</h2>
                        </div>
                        <div id="profTable">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="column0"></th>
                                        <th >Term Year</th>
                                        <th >Student Number</th>
                                        <th >Student Name</th>
                                        <th >Email</th>
                                        <th >Average Rating</th>
                                        <th >Rating Comments</th>
                                        <th >Performance Logs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tas.map((ta: TA, i: number) => (
                                        <TAPlainRow key={i} ta={ta} course_number={courseNumber} />
                                    ))}
                                </tbody>
                            </table>
                            <div className="ta-admin-button-container">
                                <Button
                                    width="15rem"
                                    type="primary"
                                    value="Go Back"
                                    onClick={handleGoBack}
                                ></Button>
                            </div>
                        </div>
                    </Container>

                </div>

            )
            }
        </div >
    );
};

export default CourseTaHistory;