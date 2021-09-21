import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../../Components/card";
import { Grid } from "@material-ui/core";
import "../../App.css";

function Vacancies() {
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

  const applyFunc = () => {
    alert("run apply function")
  }

  const allJobs = Object.values(user?.allJobs)
    .map((val, ind) => Object.values(val))
    .flat(1);

  return (
    <div className="marginAdjustment">
      <h1>Vacancies</h1>
      <Grid container>
        {allJobs &&
          allJobs?.reverse().map((data, index) => {
            console.log("data====hassam", data);
            return (
              <Grid item xl={3} md={4} sm={6} xs={12}  >
                <OutlinedCard
                  campusData={data}
                  btnText={"Apply Now"}
                  apply
                  applyFunc={() => applyFunc()}
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