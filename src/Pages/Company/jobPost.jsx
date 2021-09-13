import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../../Components/card";
import CustomizedDialogs from "../../Components/modal";
import "../../App.css";

function JobPost() {
  const user = useSelector((state) => state.addUser);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    database
      .ref("/CRA")
      .child(`jobs/${user.loginUser.id}`)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("jobs", snapshot.val());
          dispatch(
            userDetails({
              allJobs: snapshot.val(),
            })
          );
        } else {
          console.log("No data available");
        }
      });
  }, []);
  useEffect(() => {
    database
      .ref("/CRA")
      .child(`jobs/`)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("jobs", snapshot.val());
          dispatch(
            userDetails({
              allJobs: snapshot.val(),
            })
          );
        } else {
          console.log("No data available");
        }
      });
  }, []);

  const deleteData = (key) => {
    console.log(key);
    database.ref(`/CRA/jobs/${user.loginUser.id}/${key}`).remove();
  };

  const myPostedJobs = Object.values(user.allJobs);
  console.log("My Posted Jobs====>", myPostedJobs);

  return (
    <div className="marginAdjustment">
      <h1>Job Post</h1>
      <CustomizedDialogs formTitle="Create Job" btnText="Create Job" jobPost />
      {myPostedJobs &&
        myPostedJobs?.reverse().map((data, index) => {
          console.log("data", data.jobId);
          return (
            <OutlinedCard
              cardData={data}
              btnText={"delete"}
              deleteData={() => deleteData(data.jobId)}
              companyPostJob
            />
          );
        })}
    </div>
  );
}

export default JobPost;
