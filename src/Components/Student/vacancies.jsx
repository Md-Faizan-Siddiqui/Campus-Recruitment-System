import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../card";
import "../../App.css";

function Vacancies() {
  const user = useSelector((state) => state.addUser);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    database
      .ref("/CRA")
      .child("jobs/")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          dispatch(
            userDetails({
              allJobs: snapshot.val(),
            })
          );
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const allJobs = Object.values(user.allJobs);
  console.log("allJobs====>", allJobs);

  return (
    <div className="marginAdjustment">
      <h1>Vacancies</h1>
      {allJobs &&
        allJobs?.reverse().map((data, index) => {
          return <OutlinedCard cardData={data} apply />;
        })}
    </div>
  );
}

export default Vacancies;
