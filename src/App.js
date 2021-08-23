import SignUp from '../src/Components/signUp';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../src/Components/login';
import Navbar from './Components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { auth, database } from './Config/firebaseConfig';
import { userDetails } from './Redux/Action/userAction';
import Loader from './Components/loader'
import StudentProfile from '../src/Components/Student/studentProfile';
import AdminProfile from './Components/Admin/adminProfile';
import CompanyProfile from './Components/Company/companyProfile';
// import HomePage from './Pages/homePage';
import Vacancies from '../src/Components/vacancies';
import Companies from './Components/Student/companies';
import Students from './Components/Company/students';
import JobPost from './Components/Company/jobPost';



function App() {
  const user = useSelector((state) => state.addUser)
  const loader = useSelector((state) => state.addUser.isLoader)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({});
  console.log(userData)

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
            // console.log(auth.currentUser.uid);
          });
      }
    });
  }, []);
  console.log(userData)

  if (loader === true) {
    return <Loader />
  }
  // console.log("loader ", loader)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* <HomePage /> */}
        {user.loginStatus === false ?
          <>
            <Switch>
              {/* <Route exact path="/" component={HomePage} /> */}
              <Route exact path="/" component={SignUp} />
              <Route path="/login" component={SignIn} />
              <Route path='*' >
                <Redirect to='/' />
              </Route>
            </Switch>
          </> : null}
        {user.loginStatus === true && user.loginUser.role === 'student' ?
          <>
            <Switch>
              <Route exact path='/' component={Vacancies} />
              <Route path='/studentProfile' component={StudentProfile} />
              <Route path='/companies' component={Companies} />
              {/* <Route path='/profileUpdate' component={ProfileUpdate} /> */}
              {/* <Route path='*'>
                <Redirect to='/' />
              </Route> */}
            </Switch>
          </> : null}

        {user.loginStatus === true && user.loginUser.role === "admin" ?
          <>
            <Switch>
              <Route exact path='/' component={AdminProfile} />
              {/* <Route path='*'>
                <Redirect to='/' />
              </Route> */}
            </Switch>
          </> : null}

        {user.loginStatus === true && user.loginUser.role === "company" ?
          <>
            <Switch>
              <Route exact path='/' component={Students} />
              <Route path='/profile' component={CompanyProfile} />
              <Route path='/jobpost' component={JobPost} />
              {/* <Route path='*'>
                <Redirect to='/' />
              </Route> */}
            </Switch>
          </> : null}




      </BrowserRouter>
    </div>
  );
}

export default App;
