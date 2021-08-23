import React from "react";
import OutlinedCard from "../Components/card";
function vacancies() {
  const CPJD = [
    {
      lastDate: "13-May-2020",
      companyName: "Dear",
      jobTitle: "computer oprator",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
    },
    {
      lastDate: "15-April-2022",
      companyName: "ABC",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
    },
    {
      lastDate: "20-May-2020",
      companyName: "EFG",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
    },
    {
      lastDate: "25-May-2020",
      companyName: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
    },
    {
      lastDate: "25-May-2020",
      companyName: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
    },
    {
      lastDate: "25-May-2020",
      companyName: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
    },
    {
      lastDate: "25-May-2020",
      companyName: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
    },
    {
      lastDate: "25-May-2020",
      companyName: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
    },
  ];
  return (
    <div>
      <h1>Vacancies</h1>
      <OutlinedCard
        data={CPJD}
        companyName="Company Name :"
        lastDate="Last Date :"
        jobTitle="Job Tital :"
        description="Description :"
        salary="Salary :"
        btnText={
          <>
            <b>Apply Now</b>
          </>
        }
      />
    </div>
  );
}

export default vacancies;
