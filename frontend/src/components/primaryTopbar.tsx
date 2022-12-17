import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../style/primaryTopbar.css";



function RoleTabs(props: any) {
    const navigate = useNavigate();

    const [activeKey, setActiveKey] = useState(3);



    const handleSelect = (e) => {
        let route;
        // TODO: change keys
        setActiveKey(e);
        switch (e) {
            case 1:
                route = '/course';
                break;
            case 2:
                route = '/course';
                break;
            case 3:
                route = '/course';
                break;
            default:
                route = '/course';
                break;
        }
        navigate(route);
    }

    return (
        <Tabs
            activeKey={activeKey}
            className="primary mb-3"
            onSelect={handleSelect}
        >
            <Tab eventKey={0} title="Dashboard"/>
            <Tab eventKey={1} title="TA Management" />
            <Tab eventKey={2} title="TA Administration" disabled />
            <Tab eventKey={3} title="Rate a TA" />
        </Tabs>
    );
}

export default RoleTabs;