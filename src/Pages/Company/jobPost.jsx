import "../../App.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import { Grid } from "@material-ui/core";
import OutlinedCard from "../../Components/card";
import CustomizedDialogs from "../../Components/modal";
import VacanciesCard from "../../Components/vacanciesCard";

function JobPost() {
  const user = useSelector((state) => state.addUser);
  const role = user.loginUser.role;
  console.log("Role in Job Post",role)
  const dispatch = useDispatch();
  // useEffect(() => {
  //   database
  //     .ref("/CRA")
  //     .child(`jobs/${user.loginUser.id}`)
  //     .on("value", (snapshot) => {
  //       if (snapshot.exists()) {
  //         dispatch(
  //           userDetails({
  //             allJobs: snapshot.val(),
  //           })
  //         );
  //       } else {
  //         dispatch(
  //           userDetails({
  //             allJobs: {},
  //           })
  //         );
  //         console.log("No data available");
  //       }
  //     });
  // }, []);

  const deleteData = (key) => {
    console.log(key);
    database.ref(`/CRA/jobs/${user.loginUser.id}/${key}`).remove();
  };
  const myPostedJobs = Object.values(user.allJobs[user?.loginUser?.id]);
  console.log(myPostedJobs)
  return (
    <div className="marginAdjustment">
      <h1>Job Post</h1>
      <CustomizedDialogs formTitle="Create Job" btnText="Create Job" jobPost />
      <Grid container>
        {myPostedJobs.length === 0 ? "Data Not Found"
          : myPostedJobs &&
          myPostedJobs?.reverse().map((data, index) => {
            return (
              <Grid item xl={3} md={4} sm={6} xs={12}  >
                <VacanciesCard
                  campusData={data}
                  btnText={"delete"}
                  deleteData={() => deleteData(data.jobId)}
                  companyPostJob
                  role={role} />
                {/* <OutlinedCard
                  campusData={data}
                  btnText={"delete"}
                  deleteData={() => deleteData(data.jobId)}
                  companyPostJob
                /> */}
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default JobPost;
