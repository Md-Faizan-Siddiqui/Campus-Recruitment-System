import "../../App.css";
import React from "react";
import { useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { Grid } from "@material-ui/core";
import CustomizedDialogs from "../../Components/modal";
import VacanciesCard from "../../Components/vacanciesCard";

function JobPost() {
  const user = useSelector((state) => state.addUser);
  const role = user.loginUser.role;
  let myPostedJobs = []

  const deleteData = (key) => {
    database.ref(`/CRA/jobs/${user.loginUser.id}/${key}`).remove();
  };

  if (user?.allJobs[user?.loginUser?.id]) {
    myPostedJobs = Object.values(user?.allJobs[user?.loginUser?.id])
  } else {
    myPostedJobs = []
  }

  return (
    <div className="marginAdjustment">
      <CustomizedDialogs formTitle="Create Job" btnText="Create Job" jobPost />
      <Grid container>
        {myPostedJobs.length === 0 ? 
        (<div className="noData"><p>No Jobs Available</p></div>)
          : myPostedJobs &&
          myPostedJobs?.reverse().map((data, index) => {
            return (
              <Grid item xl={3} md={4} sm={6} xs={12}  >
                <VacanciesCard
                  campusData={data}
                  btnText={"delete"}
                  deleteData={() => deleteData(data.jobId)}
                  companyPostJob
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default JobPost;