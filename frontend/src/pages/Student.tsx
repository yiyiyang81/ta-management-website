import RateTA from "../components/allUsers/RateTA";
import TopTabs from "../components/TopTabs";
import { NavObject } from "../components/TopTabs";
const Student = () => {
  const studentNav : Array<NavObject> = [
    { eventKey: "rateTA", title: "Rate a TA", component: <RateTA />},
  ];

  return (
    <>
      <TopTabs navArray={studentNav}></TopTabs>
    </>
  );
};

export default Student;
