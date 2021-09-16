import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../../Components/card";
import CustomizedDialogs from "../../Components/modal";
import "../../App.css";
import { Grid } from "@material-ui/core";

function JobPost() {
  const user = useSelector((state) => state.addUser);
  const dispatch = useDispatch();
  useEffect(() => {
    database
      .ref("/CRA")
      .child(`jobs/${user.loginUser.id}`)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
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
  return (
    <div className="marginAdjustment">
      <h1>Job Post</h1>
      <CustomizedDialogs formTitle="Create Job" btnText="Create Job" jobPost />
      <Grid container justifyContent="center">
        {myPostedJobs &&
          myPostedJobs?.reverse().map((data, index) => {
            return (
              <Grid item xl={3} md={4} sm={6} xs={10}  >
                <OutlinedCard
                  cardData={data}
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
