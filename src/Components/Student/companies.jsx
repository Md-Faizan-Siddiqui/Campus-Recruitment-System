import React from "react";
import OutlinedCard from "../card";

function Companies() {
  const companiesData = [
    {
      name: "Doller",
      email: "company@gmail.com",
    },
    {
      name: "Dear",
      email: "company1@gmail.com",
    },
    {
      name: "Walls",
      email: "company2@gmail.com",
    },
    {
      name: "Food Panda",
      email: "company3@gmail.com",
    },
    {
      name: "CY",
      email: "company4@gmail.com",
    },
  ];

  return (
    <>
      <h1>Companies</h1>
      {companiesData &&
        companiesData.map((data, index) => {
          return <OutlinedCard campusData={data} />;
        })}
    </>
  );
}

export default Companies;
