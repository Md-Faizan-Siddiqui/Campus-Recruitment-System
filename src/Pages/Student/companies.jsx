import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../../Components/card";
import "../../App.css";

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
      {allCompanies &&
        allCompanies.map((data, index) => {
          return (
            <OutlinedCard
              campusData={data}
              details
              image
              formTitle={"Company Details"}
              companyDetails
            />
          );
        })}
    </div>
  );
}
export default Companies;
