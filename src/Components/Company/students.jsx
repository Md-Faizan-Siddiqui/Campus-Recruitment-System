import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../card";

function Students() {
  const allUsers = useSelector((state) => state.addUser.allUsers);
  console.log(allUsers, "alluser");

  const allStudents = Object.values(allUsers)?.filter(
    (userData) => userData.role === "student"
  );
  console.log(allStudents);
  return (
    <>
      <h1>Students</h1>
      {allStudents &&
        allStudents.map((data, index) => {
          return (
            <OutlinedCard
              campusData={data}
              details
              image
              formTitle={"Student Details"}
              studentDetails
            />
          );
        })}
    </>
  );
}
export default Students;
