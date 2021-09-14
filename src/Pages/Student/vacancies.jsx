import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../../Components/card";
import "../../App.css";

function Vacancies() {
  const user = useSelector((state) => state.addUser);
  // console.log(user);
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    database
      .ref("/CRA")
      .child("jobs/")
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          // console.log("jobs", snapshot.val());
          Object.keys(snapshot.val()).map((data, index) => {
            // console.log("after map====>", data);
            setJobs(data);
          });
          dispatch(
            userDetails({
              allJobs: snapshot.val(),
            })
          );
        } else {
          console.log("No data available");
        }
      });
    // console.log("jobs state===>", jobs);
  }, []);

  const allJobs = Object.values(user?.allJobs)
    .map((val, ind) => Object.values(val))
    .flat(1);
  // console.log("allJobs====>", allJobs);

  return (
    <div className="marginAdjustment">
      <h1>Vacancies</h1>
      {allJobs &&
        allJobs?.reverse().map((data, index) => {
          console.log("data", data);
          return <OutlinedCard cardData={data} btnText={"Apply Now"} apply />;
        })}
    </div>
  );
}

export default Vacancies;
