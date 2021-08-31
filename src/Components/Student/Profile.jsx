import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../card";

function Profile() {
  const user = useSelector((state) => state.addUser);
  console.log("User===>", user.loginUser);
  return (
    <>
      <h1>{user.loginUser.role} Profile</h1>
      <OutlinedCard campusData={user.loginUser} updateBtn />
    </>
  );
}

export default Profile;
