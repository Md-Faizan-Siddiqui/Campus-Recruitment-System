import React from "react";
import OutlinedCard from "../card";
function vacancies() {
  const CPJD = [
    {
      lastDate: "13-May-2020",
      name: "Dear",
      jobTitle: "computer oprator",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
    },
    {
      lastDate: "15-April-2022",
      name: "ABC",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
    },
    {
      lastDate: "20-May-2020",
      name: "EFG",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
    },
    {
      lastDate: "25-May-2020",
      name: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
    },
    {
      lastDate: "25-May-2020",
      name: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
    },
    {
      lastDate: "25-May-2020",
      name: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
    },
    {
      lastDate: "25-May-2020",
      name: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
    },
    {
      lastDate: "25-May-2020",
      name: "XYZ",
      jobTitle: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
    },
  ];
  return (
    <div>
      <h1>Vacancies</h1>
      {CPJD &&
        CPJD?.map((data, index) => {
          return <OutlinedCard campusData={data} apply />;
        })}
    </div>
  );
}

export default vacancies;

// data={CPJD}
// name="Company Name :"
// lastDate="Last Date :"
// jobTitle="Job Tital :"
// description="Description :"
// salary="Salary :"
// btnText={
//   <>
//     <b>Apply Now</b>
//   </>
// }
