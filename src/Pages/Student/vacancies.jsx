import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../../Components/card";
import { Grid } from "@material-ui/core";
import "../../App.css";
import Alert from "../../Components/snackBar"

function Vacancies() {
  const [applicantIDstate, setapplicantIDstate] = useState("");
  const user = useSelector((state) => state.addUser);
  console.log(user);
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    database
      .ref("/CRA")
      .child("jobs/")
      .on("value", (snapshot) => {
        console.log("snapshot====>", snapshot.val());
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
      const res = database
        .ref(`/CRA/jobs/${userid}/${jobid}`)
        .update({ block: true });
    } else {
      const res = database
        .ref(`/CRA/jobs/${userid}/${jobid}`)
        .update({ block: false });
    }
  };

  const applyFunc = ({ jobId, userId }) => {
    database
      .ref(`/CRA/jobs/${userId}/${jobId}/applicantUserId`)
      .push({
        id: user.loginUser.id,
      })
      .then(() => {
        console.log("Sucess");
      })
      .catch(() => {
        console.log("Error");
      });
  };

  const allJobs = Object.values(user?.allJobs)
    .map((val, ind) => Object.values(val))
    .flat(1);

  console.log("alljobs", allJobs);

  return (
    <div className="marginAdjustment">
      <h1>Vacancies</h1>
      <Grid container>
        {allJobs &&
          allJobs?.reverse().map((data, index) => {
            const condition = data?.applicantUserId &&
              Object.values(data?.applicantUserId).find((item) => item?.id === user.loginUser.id)
            return (
              <Grid item xl={3} md={4} sm={6} xs={12}>
                <OutlinedCard
                  campusData={data}
                  btnText={
                    data?.block
                      ? "Blocked"
                      : condition
                        ? "Applied"
                        : "Apply Now"
                  }
                  apply
                  disableApply={
                    data?.block ||
                    condition
                  }
                  applyFunc={() =>
                    applyFunc({
                      jobId: data.jobId,
                      userId: data.userId,
                    })
                  }
                  disableFunc={() =>
                    disableFunc({
                      userid: data.userId,
                      jobid: data.jobId,
                      block: data.block,
                    })
                  }
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default Vacancies;
