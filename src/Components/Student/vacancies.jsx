import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import OutlinedCard from "../card";

function Vacancies() {
  const postedJobs = useSelector((state) => state);
  console.log(postedJobs);
  const dispatch = useDispatch();
  useEffect(() => {
    database
      .ref("/CRA")
      .child("jobs/")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          dispatch(
            userDetails({
              allJobs: snapshot.val(),
            })
          );
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const CPJD = [
    {
      lastDate: "13-May-2020",
      name: "Dear",
      jobTitle: "computer oprator",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      salary: "0$",
      email: "company1@gmail.com",
      phone: "3247236436",
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

export default Vacancies;
