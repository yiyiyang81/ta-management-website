import { useState } from "react";
import Tile from "../../common/Tile";
import TeachingAssitantIcon from "../../assets/images/ta-icon.png";
import TeachingAssistantAdminIcon from "../../assets/images/ta-admin-icon.png";
import AdminImportForm from "./AdminImportForm";
import { createBackendUrl } from "../../apiConfig";
import "../../style/taAdmin.css"

const AdminImportFile = (props: {}) => {
    const [fileType, setFileType] = useState("tacohort");

    //switch color when tile is selected
    return (
        <div className="ta-admin-container">
            <div className="rowC">
                <h1 style={{ marginBottom: "20px" }}>Choose File Type</h1>
            </div>
            <div>
                {fileType === "tacohort" && (
                    <div className="d-flex flex-wrap align-items-center justify-content-center">
                        <Tile
                            image={TeachingAssistantAdminIcon}
                            value="TA Cohort"
                            width="15rem"
                            margin="0.5rem"
                            color="#B71A29"
                            onClick={() => setFileType("tacohort")}
                        ></Tile>
                        <Tile
                            value="Course Quota"
                            image={TeachingAssitantIcon}
                            width="15rem"
                            margin="0.5rem"
                            onClick={() => setFileType("coursequota")}
                        ></Tile>
                        <AdminImportForm taskName="import" uploadUrl={createBackendUrl("/api/ta/upload")} fileType={fileType} />

                    </div>
                )

                }
                {fileType === "coursequota" && (
                    <div className="d-flex flex-wrap align-items-center justify-content-center">
                        <Tile
                            image={TeachingAssistantAdminIcon}
                            value="TA Cohort"
                            width="15rem"
                            margin="0.5rem"
                            onClick={() => setFileType("tacohort")}
                        ></Tile>
                        <Tile
                            image={TeachingAssitantIcon}
                            value="Course Quota"
                            width="15rem"
                            margin="0.5rem"
                            color="#B71A29"
                            onClick={() => setFileType("coursequota")}
                        ></Tile>
                        <AdminImportForm taskName="import" uploadUrl={createBackendUrl("/api/ta/upload")} fileType={fileType} />

                    </div>
                )
                }
            </div>

        </div>
    )
};

export default AdminImportFile;
