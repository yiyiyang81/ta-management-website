import React, { useEffect, useState } from "react";
import AddTaToCourse from "./AddTaToCourse";
import CoursePlainRow from "./CoursePlainRow";
import "../../style/userTable.css";
import { Course } from "../../classes/Course";
import { TA, emptyTA } from "../../classes/TA";
import ImportForm from "../sysop/ImportForm";
import { Container } from "react-bootstrap";
import { callBackend, createBackendUrl } from "../../apiConfig";
import SearchCourseSimple from "./SearchCourseSimple";
import Button from "../../common/Button";
import TARow from "./TARow";
import TAPlainRow from "./TAPlainRow";
import SearchTA from "./SearchTA";
import { SetMealRounded } from "@mui/icons-material";



const TAInfo = () => {

    const [subPage, setSubPage] = useState("Search");
    const [email, setEmail] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [displayError, setDisplayError] = useState(false);
    const [mode, setMode] = useState("");
    const [ta, setTAInfo] = useState<TA>();


    const checkValidTA = async () => {
        try {
            if (mode === "Email") {
                const res = await callBackend(`/api/ta/email/${email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return await res.json();
            }
            else if (mode === "StudentNumber") {
                const res = await callBackend(`/api/ta/student-number/${studentNumber}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return await res.json();
            }
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

        setDisplayError(false)
        setMode("StudentNumber");
        const ta = await checkValidTA();
        console.log(ta)
        if (ta !== null && ta !== undefined) {
            setSubPage("TA");
            setTAInfo(ta);
        }
        else {
            setDisplayError(true);
        }
    };


    const handleTAEmailSearchClick = async () => {

        setDisplayError(false)
        setMode("Email");
        const ta = await checkValidTA();
        console.log(ta)

        if (ta !== null && ta !== undefined) {
            setSubPage("TA");
            setTAInfo(ta);
        }
        else {
            setDisplayError(true);
        }
    };

    return (
        <div>
            {subPage === "Search" && (
                <div>
                    <SearchTA
                        studentNumber={studentNumber}
                        email={email}
                        handleStudentNumber={setStudentNumber}
                        handleEmail={setEmail}
                        handleTASNSearchClick={handleTASNSearchClick}
                        handleTAEmailSearchClick={handleTAEmailSearchClick}
                        displayError={displayError}
                    ></SearchTA>
                </div>
            )}

            {subPage === "TA" && (
                <div>
                    <Button
                        width="15rem"
                        type="primary"
                        value="Go Back"
                        onClick={handleGoBack}
                    ></Button>

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