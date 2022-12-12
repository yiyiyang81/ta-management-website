import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "../style/primaryTopbar.css";


function RoleTabs(props:any) {
  return (
    <Tabs
      defaultActiveKey="rate"
      className="primary mb-3"
    >
      <Tab eventKey="manage" title="TA Management"/>
      <Tab eventKey="admin" title="TA Administration" disabled/>
      <Tab eventKey="rate" title="Rate a TA" />
    </Tabs>
  );
}

export default RoleTabs;