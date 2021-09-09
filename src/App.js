import SignUp from '../src/Pages/Auth/signUp';
import SignIn from '../src/Pages/Auth/login';
import Navbar from './Components/navbar';
import Loader from './Components/loader'
import Profile from '../src/Pages/SharedPages/Profile';
import Vacancies from '../src/Pages/Student/vacancies';
import Companies from '../src/Pages/Student/companies';
import Students from '../src/Pages/Company/students';
import JobPost from './Pages/Company/jobPost';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { auth, database } from './Config/firebaseConfig';
import { userDetails } from './Redux/Action/userAction';
import PageNotFound from './Pages/pageNotFound';

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
  console.log("login status", user.loginStatus);

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
              {/* <Route path='*' component={PageNotFound} /> */}
              {/* <Route path='*' >
                <PageNotFound />
              </Route> */}
            </Switch>
          </> : null}

        {user?.loginUser?.role === "admin" ?
          <>
            <Switch>
              <Route exact path='/' component={Profile} />
              {/* <Route path='*' component={PageNotFound} /> */}
              {/* <Route path='*' >
                <PageNotFound />
              </Route> */}
            </Switch>
          </> : null}

        {user?.loginUser?.role === "company" ?
          <>
            <Switch>
              <Route exact path='/' component={Students} />
              <Route path='/profile' component={Profile} />
              <Route path='/jobpost' component={JobPost} />
              {/* <Route path='*' component={PageNotFound} /> */}
              {/* <Route path='*' >
                <PageNotFound />
              </Route> */}
            </Switch>
          </> : null}
      </BrowserRouter>
    </div>
  );
}

export default App;
