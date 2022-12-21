import { Tab, Tabs } from "react-bootstrap";
import "../style/topTabs.css";

export interface NavObject {
  eventKey: string;
  title: string;
  component: any;
  disabled?: boolean;
  hidden?: boolean;
}

function TopTabs(props: { navArray: Array<NavObject> }) {
  const renderTabs = props.navArray.map((navObject, i) => {
    return (
      <Tab
        eventKey={navObject.eventKey}
        title={navObject.title}
        key={i}
        className="tab-content"
        disabled={
          !navObject.disabled
          ? false
          : true
        }
      >
        {navObject.component}
      </Tab>
    );
  });

  return (
    <>
      <div className="nav-container">
        <Tabs
          defaultActiveKey={props.navArray[0].eventKey}
          className="tabs-container primary mb-3"
        >
          {renderTabs}
        </Tabs>
      </div>
    </>
  );
}

export default TopTabs;
