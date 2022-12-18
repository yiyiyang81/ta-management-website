import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../style/primaryTopbar.css";



function RoleTabs(props: any) {
    const navigate = useNavigate();

    const handleSelect = (eventKey) => {
        let route;
        // TODO: change keys
        switch (eventKey) {
            case "0":
                route = '/dashboard';
                break;
            case "1":
                route = '/dashboard/tamanagement';
                break;
            case "2":
                route = '/dashboard';
                break;
            case "3":
                route = '/dashboard';
                break;
        }
        navigate(route)
    }

    return (
        <Tabs
            defaultActiveKey={3}
            className="primary mb-3"
            onSelect={handleSelect}
        >
            <Tab eventKey={0} title="Dashboard" />
            <Tab eventKey={1} title="TA Management" />
            <Tab eventKey={2} title="TA Administration" />
            <Tab eventKey={3} title="Rate a TA" />
        </Tabs>
    );
}

export default RoleTabs;