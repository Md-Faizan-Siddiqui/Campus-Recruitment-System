import SignUp from "../src/Pages/Auth/signUp";
import SignIn from "../src/Pages/Auth/login";
import Navbar from "./Components/navbar";
import Profile from "../src/Pages/SharedPages/Profile";
import Vacancies from "../src/Pages/Student/vacancies";
import Companies from "../src/Pages/Student/companies";
import Students from "../src/Pages/Company/students";
import JobPost from "./Pages/Company/jobPost";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth, database } from "./Config/firebaseConfig";
import { userDetails } from "./Redux/Action/userAction";
import PageNotFound from "./Pages/pageNotFound";
import Loader from "react-loader-spinner";
import "./App.css";
import JobDetails from "./Components/jobDetails";
import ForgetPassword from "./Components/forgetPassword"
import ResetPassword from "./Components/resetPassword"

function App() {
  const user = useSelector((state) => state.addUser)
  const dispatch = useDispatch()
  useEffect(() => {
    database
      .ref("/CRA")
      .child("jobs/")
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch(
            userDetails({
              allJobs: snapshot.val(),
            })
          );
        }
      });
  }, []);
  useEffect(() => {
    dispatch(
      userDetails({
        isLoader: true
      })
    )
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref("/CRA")
          .child("users/" + auth.currentUser.uid)
          .on("value", (snapshot) => {
            if (snapshot.exists()) {
              const snapshotData = snapshot.val();
              if (snapshotData.block === true) {
                database.ref("/CRA")
                  .child("users/" + auth.currentUser.uid).off()
                auth
                  .signOut()
                  .then(() => {
                    dispatch(
                      userDetails({
                        loginUser: null,
                        loginStatus: false,
                        isLoader: false,
                      })
                    );
                    localStorage.removeItem("UID")
                    localStorage.removeItem("ROLE")
                  })
                  .catch((error) => {
                  });
              } else {
                dispatch(
                  userDetails({
                    loginUser: snapshot.val(),
                    loginStatus: true,
                    isLoader: false,
                    allUsers:snapshotData,
                  })
                )
              }
            } else {
              dispatch(
                userDetails({
                  isLoader: false
                })
              )
            }
          });
      }
      else {
        dispatch(
          userDetails({
            isLoader: false
          })
        )
      }
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref("/CRA")
          .child("users")
          .on("value", (snapshot) => {
            if (snapshot.exists()) {
              dispatch(
                userDetails({
                  allUsers: snapshot.val(),
                })
              );
            } else {
              // console.log("No data available");
            }
          });
      }
    });
  }, []);

  // get and dispatch end...

  if (!user.loginStatus && user.isLoader === true) {
    return (
      <div className="loader_div">
        <Loader width="50px" height="50px" color="#3f51b5" type="Bars" />
      </div>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {!user?.loginStatus || (user?.loginUser?.block && user?.loginStatus) ? (
          <>
          {console.log("blockeduser ")}
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/forgetPassword" component={ForgetPassword} />
              <Route path="/resetPassword" component={ResetPassword} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </>
        ) : null}
        {user?.loginUser?.role === "student" ? (
          <>
            <Switch>
              <Route exact path="/" component={Vacancies} />
              <Route path="/profile" component={Profile} />
              <Route path="/companies" component={Companies} />
              <Route path="/jobdetails/:id" component={JobDetails} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </>
        ) : null}

        {user?.loginUser?.role === "admin" ? (
          <>
            <Switch>
              <Route exact path="/" component={Vacancies} />
              {/* <Route path='/adminProfile' component={AdminProfile} /> */}
              <Route path="/companies" component={Companies} />
              <Route path="/students" component={Students} />
              <Route path="/jobdetails/:id" component={JobDetails} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </>
        ) : null}

        {user?.loginUser?.role === "company" ? (
          <>
            <Switch>
              <Route exact path="/" component={Students} />
              <Route path="/profile" component={Profile} />
              <Route path="/jobpost" component={JobPost} />
              <Route path="/jobdetails/:id" component={JobDetails} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </>
        ) : null}
      </BrowserRouter>
    </div>
  );
}

export default App;
