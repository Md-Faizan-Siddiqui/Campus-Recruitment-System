import React from "react";
import { useSelector } from "react-redux";
import Profile from "../SharedPages/Profile";
import OutlinedCard from "../../Components/card";
import "../../App.css";


function AdminProfile() {
    const user = useSelector((state) => state.addUser);
    console.log(user);
    return (
        <div className="marginAdjustment">
            <h1>Admin</h1>
            <OutlinedCard />
            <Profile />
        </div>)
}

export default AdminProfile;
