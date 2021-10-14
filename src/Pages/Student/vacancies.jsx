import "../../App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import { Grid } from "@material-ui/core";
import OutlinedCard from "../../Components/card";
import CustomizedSnackbars from "../../Components/snackBar"
import VacanciesCard from "../../Components/vacanciesCard"

function Vacancies() {
  const user = useSelector((state) => state.addUser);
  const [alert, setAlert] = useState(false)
  console.log(user);
  const dispatch = useDispatch();
  // const [jobs, setJobs] = useState([]);
  useEffect(() => {
    database
      .ref("/CRA")
      .child("jobs/")
      .on("value", (snapshot) => {
        console.log("snapshot====>", snapshot.val());
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((data, index) => {
            // setJobs(data);
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
    console.log('block func')
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
        setAlert(true)
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
                {/* <VacanciesCard campusData={data} /> */}
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
      {alert ?
        <CustomizedSnackbars setAlert={setAlert} message={"Sucessfully Applied"} errMessage={"Unexpected Error"} />
        : null}
    </div>
  );
}

export default Vacancies;



