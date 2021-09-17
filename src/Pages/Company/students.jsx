import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../../Components/card";
import "../../App.css";
import { List, ListItem, Grid } from "@material-ui/core";

function Students() {
  const allUsers = useSelector((state) => state.addUser.allUsers);
  const allStudents = Object.values(allUsers)?.filter(
    (userData) => userData.role === "student"
  );
  return (
    <div className="marginAdjustment">
      <h1>Students</h1>
      <Grid container>
        {allStudents &&
          allStudents.map((data, index) => {
            return (
              <Grid item xl={3} md={4} sm={6} xs={12}  >
                <OutlinedCard
                  campusData={data}
                  details
                  // showImg
                  formTitle={"Student Details"}
                  studentDetails
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
export default Students;
