import React from "react";
import OutlinedCard from "../card";

function Companies() {
  const companiesData = [
    {
      companyName: "Doller",
    },
    {
      companyName: "Dear",
    },
    {
      companyName: "Walls",
    },
    {
      companyName: "Food Panda",
    },
    {
      companyName: "CY",
    },
  ];

  return (
    <div>
      <h1>Companies</h1>
      <OutlinedCard
        data={companiesData}
        btnText={
          <>
            <b>Details</b>
          </>
        }
      />
    </div>
  );
}

export default Companies;
