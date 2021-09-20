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
  const [disable, setDisable] = useState(false)
  console.log(disable)
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

  const disableFunc = async ({ userid, jobid }) => {
    alert("running disable function")
    setDisable(prev => !prev)
    const res =  await database.ref(`/CRA/jobs/${userid}/${jobid}`).update({ block: disable })
    console.log("res",res)
    console.log(userid, jobid, "data")
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
                  disableFunc={() => disableFunc({
                    userid: data.userId,
                    jobid: data.jobId,
                  })}
                  disableState={disable} />
              </Grid>
            )
          })}
      </Grid>
    </div>
  );
}

export default Vacancies;