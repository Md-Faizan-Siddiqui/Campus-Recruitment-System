import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../card";
import "../../App.css";

function Profile() {
  const user = useSelector((state) => state.addUser);
  console.log("User===>", user.loginUser);
  return (
    <div className="marginAdjustment">
      <h1>{user.loginUser.role} Profile</h1>
      <OutlinedCard
        campusData={user.loginUser}
        updateBtn
        formTitle={"Registration Form"}
      />
    </div>
  );
}

export default Profile;
