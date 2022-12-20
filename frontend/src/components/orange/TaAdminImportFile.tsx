import React, { useState } from "react";
import Tile from "../../common/Tile";
import TeachingAssitantIcon from "../../assets/images/ta-icon.png";
import TeachingAssistantAdminIcon from "../../assets/images/ta-admin-icon.png";
import AdminImportForm from "./AdminImportForm";
import { callBackend, createBackendUrl } from "../../apiConfig";

const TaAdminImportFile = (props: {}) => {
    const [fileType, setFileType] = useState("");

    return (
        <div>
            <div className="rowC">
                <h2 style={{ marginBottom: "20px" }}>Choose File Type</h2>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-center">
                <Tile
                    image={TeachingAssitantIcon}
                    value="TA Cohort"
                    width="15rem"
                    margin="0.5rem"
                    onClick={() => setFileType("tacohort")}
                ></Tile>
                <Tile
                    image={TeachingAssistantAdminIcon}
                    value="Course Quota"
                    width="15rem"
                    margin="0.5rem"
                    onClick={() => setFileType("coursequota")}
                ></Tile>
            </div>
            <AdminImportForm taskName="" uploadUrl={createBackendUrl("/api/ta/upload")} fileType={fileType} />

        </div>
    )
};

export default TaAdminImportFile;
