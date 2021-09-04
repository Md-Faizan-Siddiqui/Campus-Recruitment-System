import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../card";
import CustomizedDialogs from "../modal";
// import JobPostForm from "./jobPostForm";

function JobPost() {
  const user = useSelector((state) => state.addUser);
  const dispatch = useDispatch();
  console.log(user);
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
    <div>
      <h1>Job Post</h1>
      <CustomizedDialogs formTitle="Create Job" btnText="Create Job" jobPost />
      {/* <OutlinedCard /> */}
      {allJobs &&
        allJobs?.map((data, index) => {
          return <OutlinedCard cardData={data} companyPostJob />;
        })}
    </div>
  );
}

export default JobPost;
