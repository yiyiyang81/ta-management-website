import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../style/primaryTopbar.css";



function RoleTabs(props: any) {
    const navigate = useNavigate();

    const [activeKey, setActiveKey] = useState(3);

    const handleSelect = (activeKey) => {
        let route;
        // TODO: change keys
        switch (activeKey) {
            case 1:
                route = 'link1';
                console.log("HI");
                setActiveKey(1);
                break;
            case 2:
                route = '/course';
                setActiveKey(2);
                break;
            case 3:
                route = 'link3';
                setActiveKey(3);
                break;
            default:
                route = '/course';
        }
        console.log(activeKey);
        navigate(route);
    }

    return (
        <Tabs
            activeKey={activeKey}
            className="primary mb-3"
            onSelect={(k)=>handleSelect(k)}
        >
            <Tab eventKey={0} title="Dashboard" />
            <Tab eventKey={1} title="TA Management" />
            <Tab eventKey={2} title="TA Administration" disabled />
            <Tab eventKey={3} title="Rate a TA" />
        </Tabs>
    );
}

export default RoleTabs;