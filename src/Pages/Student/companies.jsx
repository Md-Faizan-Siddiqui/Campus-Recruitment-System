import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../../Components/card";
import "../../App.css";
import { List, ListItem, Grid } from "@material-ui/core";

function Companies() {
  // get data from redux..

  const allUsers = useSelector((state) => state.addUser.allUsers);
  console.log(allUsers, "allUsers");

  // filter companies..

  const allCompanies = Object.values(allUsers)?.filter(
    (userData) => userData.role === "company"
  );
  console.log(allCompanies);

  return (
    <div className="marginAdjustment">
      <h1>Companies</h1>
      <Grid container>
        {allCompanies &&
          allCompanies.map((data, index) => {
            return (
              <Grid item xl={3} md={4} sm={6} xs={12}  >
                <OutlinedCard
                  campusData={data}
                  details
                  image
                  formTitle={"Company Details"}
                  companyDetails
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
export default Companies;
