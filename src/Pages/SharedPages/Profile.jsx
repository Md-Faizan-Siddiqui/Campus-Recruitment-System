import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../../Components/card";
import "../../App.css";
import { Grid } from "@material-ui/core";
import UserProfileCard from "../../Components/userProfileCard"

function Profile() {
  const user = useSelector((state) => state.addUser);
  console.log("User===>", user.loginUser);

  return (
    <div className="marginAdjustment">
      {/* <h1>{user.loginUser.role} Profile</h1> */}
      <UserProfileCard
        campusData={user.loginUser}
      />
      <Grid container justifyContent="center">
        <Grid item xl={3} md={4} sm={6} xs={12}  >
          <OutlinedCard
            campusData={user.loginUser}
            updateBtn
            showImg
            formTitle={"Registration Form"}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
