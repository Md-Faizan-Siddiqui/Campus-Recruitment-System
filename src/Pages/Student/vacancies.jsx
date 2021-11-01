import "../../App.css";
import React from "react";
import { useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { Grid } from "@material-ui/core";
import VacanciesCard from "../../Components/vacanciesCard"

function Vacancies() {
  const user = useSelector((state) => state.addUser);

  const disableFunc = ({ userid, jobid, block }) => {
    if (block === false) {
      database
        .ref(`/CRA/jobs/${userid}/${jobid}`)
        .update({ block: true });
    } else {
      database
        .ref(`/CRA/jobs/${userid}/${jobid}`)
        .update({ block: false });
    }
  };

  const allJobs = Object.values(user?.allJobs)
    .map((val, ind) => Object.values(val))
    .flat(1);

  return (
    <div className="marginAdjustment">
      <Grid container >
        {allJobs.length === 0 ? 
        (<div className="noData"><p>No Jobs Available</p></div>)
          : allJobs &&
          allJobs?.reverse().map((data, index) => {
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={index}>
                <VacanciesCard
                  apply
                  campusData={data}
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



