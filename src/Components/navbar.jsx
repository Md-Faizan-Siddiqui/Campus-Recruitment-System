import React, { useState } from "react";
import "../Style/nav.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Config/firebaseConfig";
import { userDetails } from "../Redux/Action/userAction";
import { Drawer } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
// import CustomizedDialogs from "./modal";
// import StudentProfile from "./Student/studentProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btnColor: {
    color: "white",
    textDecoration: "none",
  },
  drawer: {
    width: "200px",
    textAlign: "center",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.addUser);
  const dispatch = useDispatch();

  // drawer //
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  const list = () => (
    <div onClick={toggleDrawer(false)} className={classes.drawer}>
      <h1>ToggleDrawer</h1>
      <List>
        <ListItem button> it's work</ListItem>
        <ListItem button> it's work</ListItem>
        <ListItem button> it's work</ListItem>
        <ListItem button> it's work</ListItem>
        <ListItem button> it's work</ListItem>
        <ListItem button> it's work</ListItem>
      </List>
    </div>
  );
  // drawer //

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(
          userDetails({
            loginUser: null,
            loginStatus: false,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(user?.loginUser?.role);
  return (
    <div className={classes.root}>
      {/* drawer */}
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      {/* drawer */}

      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CRS
          </Typography>
          {user.loginStatus === false ? (
            <>
              <Link to="/" className={classes.btnColor}>
                <Button className={classes.btnColor}>SignUp</Button>
              </Link>
              <Link to="/login" className={classes.btnColor}>
                <Button className={classes.btnColor}>Login</Button>
              </Link>
            </>
          ) : null}
          {user?.loginStatus === true && user?.loginUser?.role === "student" ? (
            <>
              <Link to="/" className={classes.btnColor}>
                <Button className={classes.btnColor}>Vacancies</Button>
              </Link>
              <Link to="/companies" className={classes.btnColor}>
                <Button className={classes.btnColor}>Companies</Button>
              </Link>
              <Link to="/studentProfile" className={classes.btnColor}>
                <Button className={classes.btnColor}>Profile</Button>
              </Link>
              <Button className={classes.btnColor} onClick={logout}>
                Logout
              </Button>
              {/* <StudentProfile /> */}
              {/* <CustomizedDialogs
                imgURL={
                  "https://www.clipartmax.com/png/middle/98-984206_profile-photo-facebook-profile-picture-icon.png"
                }
              /> */}
            </>
          ) : null}
          {user?.loginStatus === true && user?.loginUser?.role === "company" ? (
            <>
              <Link to="/" className={classes.btnColor}>
                <Button className={classes.btnColor}>Students</Button>
              </Link>
              <Link to="/jobpost" className={classes.btnColor}>
                <Button className={classes.btnColor}>Job Post</Button>
              </Link>
              <Link to="/profile" className={classes.btnColor}>
                <Button className={classes.btnColor}>Profile</Button>
              </Link>
              <Button className={classes.btnColor} onClick={logout}>
                Logout
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
