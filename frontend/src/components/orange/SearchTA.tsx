import React from "react";
import Button from "../../common/Button";
import ErrorBox from "../../common/ErrorBox";
import LabeledInput from "../../common/LabeledInput";
import Select from "../../common/Select";

const SearchTA = (props: {
    studentNumber: string;
    email: string;
    handleStudentNumber: React.Dispatch<React.SetStateAction<any>>;
    handleEmail: React.Dispatch<React.SetStateAction<any>>;
    handleTASNSearchClick: React.Dispatch<React.SetStateAction<any>>;
    handleTAEmailSearchClick: React.Dispatch<React.SetStateAction<any>>;
    displayErrorEmail: boolean;
    displayErrorSN: boolean;
}) => {

    return (
        <>
            <h1 className="">Search for a TA </h1>
            <div className="mb-3">
                <h4>Search for a TA by student number or email to view TA information.  </h4>
                <div>
                    <div>
                        <LabeledInput
                            label="Student Number"
                            required={false}
                            type="text"
                            name="studentnumber"
                            id="studentnumber"
                            value={props.studentNumber}
                            handleChange={props.handleStudentNumber}
                        ></LabeledInput>
                    </div>
                    {props.displayErrorSN && (
                        <div>
                            <ErrorBox errorMessage="TA does not exist!"></ErrorBox>
                        </div>
                    )}
                    <div>
                        <Button
                            width="15rem"
                            type="primary"
                            value="Search by Student Number"
                            onClick={props.handleTASNSearchClick}
                        ></Button>
                    </div>
                </div>
                <div>
                    <div>
                        <LabeledInput
                            label="Student Email"
                            required={false}
                            type="text"
                            name="studentemail"
                            id="studentemail"
                            value={props.email}
                            handleChange={props.handleEmail}
                        ></LabeledInput>
                    </div>
                    {props.displayErrorEmail && (
                        <div>
                            <ErrorBox errorMessage="TA does not exist!"></ErrorBox>
                        </div>
                    )}
                    <div>
                        <Button
                            width="15rem"
                            type="primary"
                            value="Search by Email"
                            onClick={props.handleTAEmailSearchClick}
                        ></Button>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>
    );
};

export default SearchTA;
