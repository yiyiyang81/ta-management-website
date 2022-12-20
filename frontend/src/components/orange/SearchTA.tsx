import React from "react";
import Button from "../../common/Button";
import ErrorBox from "../../common/ErrorBox";
import Select from "../../common/Select";

const SearchTA = (props: {
    courseNumber: string;
    handleCourseNumber: React.Dispatch<React.SetStateAction<any>>;
    handleCourseSearchClick: React.Dispatch<React.SetStateAction<any>>;
    displayError: boolean;
}) => {

    return (
        <>
            <h1 className="">Search for a TA </h1>
            <div className="mb-3">
                <h4>Manage TA of a course by first selecting a course number and a term year.  </h4>
                <div>
                    <div>

                    </div>
                </div>
                <div>
                    {props.displayError && (
                        <div>
                            <ErrorBox errorMessage="TA does not exist!"></ErrorBox>
                        </div>
                    )}
                    <div>
                        <Button
                            width="15rem"
                            type="primary"
                            value="Search for TA"
                            onClick={props.handleCourseSearchClick}
                        ></Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchTA;
