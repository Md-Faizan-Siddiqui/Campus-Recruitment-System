import "../../App.css";
import React from "react";
import { useSelector } from "react-redux";
import UserProfileCard from "./userProfileCard"
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
  const user = useSelector((state) => state.addUser);

  return (
    <div className="marginAdjustment">
      <UserProfileCard
        campusData={user.loginUser}
        btnText={<EditIcon/>}
        formTitle={"Registration Form"}
      />
    </div>
  );
}

export default Profile;
