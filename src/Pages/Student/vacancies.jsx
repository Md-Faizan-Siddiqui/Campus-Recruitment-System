import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../../Components/card";
import { Grid } from "@material-ui/core";
import "../../App.css";

function Vacancies() {
  const [applicantIDstate, setapplicantIDstate] = useState([])
  const user = useSelector((state) => state.addUser);
  console.log(user)
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    database
      .ref("/CRA")
      .child("jobs/")
      .on("value", (snapshot) => {
        console.log("snapshot====>", snapshot)
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((data, index) => {
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
  }, []);

  const disableFunc = ({ userid, jobid, block }) => {
    if (block === false) {
      const res = database.ref(`/CRA/jobs/${userid}/${jobid}`).update({ block: true })
    } else {
      const res = database.ref(`/CRA/jobs/${userid}/${jobid}`).update({ block: false })
    }
  }

  const applyFunc = ({ jobId, userId }) => {
    // const key = Date.now();
    alert("run apply function")
    database
      .ref(`/CRA/jobs/${userId}/${jobId}/applicantUserId`)
      .push({
        id: user.loginUser.id,
      })
      .then(() => { console.log("Sucess") })
      .catch(() => { console.log("Error") })
  }

  const allJobs = Object.values(user?.allJobs)
    .map((val, ind) => Object.values(val))
    .flat(1);

  console.log("alljobs", allJobs)




  // applied btn disable kerwana h....
  // const appliedJobs = allJobs
  // console.log("jobs====>", appliedJobs)

  // Object.keys(allJobs).map((data, ind) => {
  //   if (allJobs[data]?.applicantUserId !== undefined || null) {
  //     const applicantID = Object.keys(allJobs[data]?.applicantUserId);
  //     applicantID?.map((applicants, ind) => {
  //       const temp1 = allJobs[data]?.applicantUserId[applicants]?.id
  //       setapplicantIDstate(temp1)
  //       console.log("temp1", temp1)
  //     })
  //     // Object.keys(allJobs[data]?.applicantUserId).map((applicants, ind) => {
  //     //   console.log(allJobs[data]?.applicantUserId[applicants]?.id)
  //     // })
  //     console.log("applicantIDstate", applicantIDstate)
  //     console.log("applicantID", applicantID)
  //     // console.log("temp", temp)
  //   }
  //   // console.log(allJobs[data].applicantUserId, "data")
  // })

  // console.log("All Jobs", allJobs.filter((data) => {
  //   console.log("Data", data?.applicantUserId.map((data, index) => {
  //     return
  //   }))
  // }))

  { }


  return (
    <div className="marginAdjustment">
      <h1>Vacancies</h1>
      <Grid container>
        {allJobs &&
          allJobs?.reverse().map((data, index) => {
            console.log("data====>in vacancies", data);
            return (
              <Grid item xl={3} md={4} sm={6} xs={12}  >
                <OutlinedCard
                  campusData={data}
                  btnText={"Apply Now"}
                  apply
                  applyFunc={() => applyFunc({
                    jobId: data.jobId,
                    userId: data.userId,
                  })}
                  disableFunc={() => disableFunc({
                    userid: data.userId,
                    jobid: data.jobId,
                    block: data.block,
                  })}
                />
              </Grid>
            )
          })}
      </Grid>
    </div>
  );
}

export default Vacancies;