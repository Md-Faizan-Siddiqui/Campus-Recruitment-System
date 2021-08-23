import React from "react";
import { useSelector } from "react-redux";
// import { database, auth } from "../../Config/firebaseConfig";
import OutlinedCard from "../card";

function StudentProfile() {
  const user = useSelector((state) => state.addUser);
  console.log(user);

  const {
    email,
    name,
    phone,
    role,
    id,
    password,
    cgpa,
    dob,
    education,
    experience,
    skills,
  } = user.loginUser;
  console.log(
    email,
    name,
    phone,
    role,
    id,
    password,
    cgpa,
    dob,
    education,
    experience,
    skills
  );

  return (
    <>
      <OutlinedCard
        userName={
          <>
            <b>Name</b>
          </>
        }
        sName={
          <>
            <b>: </b>
            {name}
          </>
        }
        eMail={
          <>
            <b>Email</b>
          </>
        }
        sEmail={
          <>
            <b>: </b>
            {email}
          </>
        }
        pHone={
          <>
            <b>Phone</b>
          </>
        }
        sPhone={
          <>
            <b>: </b>
            {phone}
          </>
        }
        rOle={
          <>
            <b>Role</b>
          </>
        }
        sRole={
          <>
            <b>: </b>
            {role}
          </>
        }
        cGpa={
          <>
            <b>CGPA</b>
          </>
        }
        sCgpa={
          <>
            <b>: </b>
            {cgpa}
          </>
        }
        dOb={
          <>
            <b>DOB</b>
          </>
        }
        sDob={
          <>
            <b>: </b>
            {dob}
          </>
        }
        eDucation={
          <>
            <b>Education</b>
          </>
        }
        sEducation={
          <>
            <b>: </b>
            {education}
          </>
        }
        eXperience={
          <>
            <b>Experience</b>
          </>
        }
        sExperience={
          <>
            <b>: </b>
            {experience}
          </>
        }
        sKills={
          <>
            <b>Skills</b>
          </>
        }
        sSkills={
          <>
            <b>: </b>
            {skills}
          </>
        }
      />
    </>
  );
}

export default StudentProfile;
