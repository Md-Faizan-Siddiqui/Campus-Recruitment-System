import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { database, auth } from "../../Config/firebaseConfig";
import { userDetails } from "../../Redux/Action/userAction";
import { useSelector } from "react-redux";
import OutlinedCard from "../card";

function Students() {
  const user = useSelector((state) => state.addUser.allUsers);
  console.log(user, "alluser");
  const dispatch = useDispatch();

  const allStudents = Object.values(user)?.filter(
    (userData) => userData.role === "student"
  );
  console.log(allStudents);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref("/CRA")
          .child("users")
          .on("value", (snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              dispatch(
                userDetails({
                  allUsers: snapshot.val(),
                })
              );
              // console.log(dispatch());
            } else {
              console.log("No data available");
            }
            // console.log(auth.currentUser.uid);
          });
      }
    });
  }, []);
  return (
    <div>
      <h1>Students</h1>
      <OutlinedCard students={allStudents} />
    </div>
  );
}

export default Students;
