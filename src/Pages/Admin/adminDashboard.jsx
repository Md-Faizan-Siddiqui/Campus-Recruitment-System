import React from "react";
import { useSelector } from "react-redux";
import "../../Style/adminProfile.css";

function AdminProfile() {
  const user = useSelector((state) => state.addUser);
  console.log(user);
  return (
    <div className="parent_div">
      <div className="div_1">
        <h1>div 1</h1>
        <h1>Admin Profile</h1>
        <h1>Role : {user.loginUser.role}</h1>
      </div>
      <div className="div_2">
        <h1>div 2</h1>
      </div>
    </div>
  );
}

export default AdminProfile;
