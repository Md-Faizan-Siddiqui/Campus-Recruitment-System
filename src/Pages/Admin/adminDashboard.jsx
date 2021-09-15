import React from "react";
import { useSelector } from "react-redux";
// import "../../Style/adminProfile.css";

function AdminProfile() {
  const user = useSelector((state) => state.addUser);
  console.log(user);
  return
}

export default AdminProfile;
