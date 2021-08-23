import React from "react";
import { useSelector } from "react-redux";

function CompanyProfile() {
  const user = useSelector((state) => state.addUser);
  console.log(user);
  return (
    <div>
      <h1>Company Profile</h1>
      <h1>Role : {user.loginUser.role}</h1>
    </div>
  );
}

export default CompanyProfile;
