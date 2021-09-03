import SignUp from '../src/Components/signUp';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../src/Components/login';
import Navbar from './Components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { auth, database } from './Config/firebaseConfig';
import { userDetails } from './Redux/Action/userAction';
import Loader from './Components/loader'
import Profile from './Components/Student/Profile';
import Vacancies from './Components/Student/vacancies';
import Companies from './Components/Student/companies';
import Students from './Components/Company/students';
import JobPost from './Components/Company/jobPost';



function App() {
  const user = useSelector((state) => state.addUser)
  const loader = useSelector((state) => state.addUser.isLoader)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({});
  console.log(userData)

  // get current user and dispatch
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref("/CRA")
          .child("users/" + auth.currentUser.uid)
          .on("value", (snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
              dispatch(
                userDetails({
                  loginUser: snapshot.val(),
                  loginStatus: true,
                  isLoader: false,
                })
              )
            } else {
              setUserData([]);
              console.log("No data available");
            }
          });
      }
    });
  }, []);
  console.log(userData)

  // get all user from database and dispatch in redux..

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
            } else {
              console.log("No data available");
            }
          });
      }
    });
  }, []);

  // get and dispatch end...

  if (loader === true) {
    return <Loader />
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {user?.loginStatus === false ?
          <>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path='*' >
                <Redirect to='/' />
              </Route>
            </Switch>
          </> : null}
        {user?.loginUser?.role === 'student' ?
          <>
            <Switch>
              <Route exact path='/' component={Vacancies} />
              <Route path='/profile' component={Profile} />
              <Route path='/companies' component={Companies} />
            </Switch>
          </> : null}

        {user?.loginUser?.role === "admin" ?
          <>
            <Switch>
              <Route exact path='/' component={Profile} />
            </Switch>
          </> : null}

        {user?.loginUser?.role === "company" ?
          <>
            <Switch>
              <Route exact path='/' component={Students} />
              <Route path='/profile' component={Profile} />
              <Route path='/jobpost' component={JobPost} />
            </Switch>
          </> : null}
      </BrowserRouter>
    </div>
  );
}

export default App;
