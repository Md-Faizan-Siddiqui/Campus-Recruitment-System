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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  navBtn: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
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
  toggleBtnColor: {
    color: "#3f51b5",
    textDecoration: "none",
  },
  toggleHeading: {
    backgroundColor: "#3f51b5",
    color: "white",
    margin: 0,
    padding: "15px",
    fontSize: "18px",
  },
  toggleLogoutBtn: {
    color: "white",
    backgroundColor: "#3f51b5",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.addUser);
  const dispatch = useDispatch();
  // console.log(user?.loginUser?.name);

  // drawer //
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  const list = () => (
    <div onClick={toggleDrawer(false)} className={classes.drawer}>
      <p className={classes.toggleHeading}>{user?.loginUser?.name}</p>
      {user.loginStatus === false ? (
        <>
          <Link to="/" className={classes.toggleBtnColor}>
            <ListItem button>SignUp</ListItem>
          </Link>
          <Link to="/login" className={classes.toggleBtnColor}>
            <ListItem button>Login</ListItem>
          </Link>
        </>
      ) : null}
      {user?.loginStatus === true && user?.loginUser?.role === "student" ? (
        <>
          <List>
            <Link to="/" className={classes.toggleBtnColor}>
              <ListItem button>Vacancies</ListItem>
            </Link>
            <Link to="/companies" className={classes.toggleBtnColor}>
              <ListItem button>Companies</ListItem>
            </Link>
            <Link to="/profile" className={classes.toggleBtnColor}>
              <ListItem button>Profile</ListItem>
            </Link>
            <ListItem
              className={classes.toggleBtnColor}
              onClick={logout}
              button
            >
              Logout
            </ListItem>
          </List>
        </>
      ) : null}
      {user?.loginStatus === true && user?.loginUser?.role === "company" ? (
        <>
          <Link to="/" className={classes.toggleBtnColor}>
            <ListItem button>Students</ListItem>
          </Link>
          <Link to="/jobpost" className={classes.toggleBtnColor}>
            <ListItem button>Jobs</ListItem>
          </Link>
          <Link to="/profile" className={classes.toggleBtnColor}>
            <ListItem button>Profile</ListItem>
          </Link>
          <ListItem className={classes.toggleBtnColor} onClick={logout} button>
            Logout
          </ListItem>
        </>
      ) : null}
      {user?.loginStatus === true && user?.loginUser?.role === "admin" ? (
        <>
          <Link to="/" className={classes.toggleBtnColor}>
            <ListItem button>Students</ListItem>
          </Link>
          <Link to="/jobpost" className={classes.toggleBtnColor}>
            <ListItem button>Jobs</ListItem>
          </Link>
          <Link to="/profile" className={classes.toggleBtnColor}>
            <ListItem button>Profile</ListItem>
          </Link>
          <ListItem className={classes.toggleBtnColor} onClick={logout} button>
            Logout
          </ListItem>
        </>
      ) : null}
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
            isLoader: false,
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

      <AppBar position="fixed">
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
          <div className={classes.navBtn}>
            {user.loginStatus === false ? (
              <>
                <Link to="/signup" className={classes.btnColor}>
                  <Button className={classes.btnColor}>SignUp</Button>
                </Link>
                <Link to="/" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Login</Button>
                </Link>
              </>
            ) : null}
            {user?.loginStatus === true &&
              user?.loginUser?.role === "student" ? (
              <>
                <Link to="/" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Vacancies</Button>
                </Link>
                <Link to="/companies" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Companies</Button>
                </Link>
                <Link to="/profile" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Profile</Button>
                </Link>
                <Button className={classes.btnColor} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : null}
            {user?.loginStatus === true &&
              user?.loginUser?.role === "company" ? (
              <>
                <Link to="/" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Students</Button>
                </Link>
                <Link to="/jobpost" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Jobs</Button>
                </Link>
                <Link to="/profile" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Profile</Button>
                </Link>
                <Button className={classes.btnColor} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : null}
            {user?.loginStatus === true && user?.loginUser?.role === "admin" ? (
              <>
                <Link to="/" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Students</Button>
                </Link>
                <Link to="/jobpost" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Jobs</Button>
                </Link>
                <Link to="/profile" className={classes.btnColor}>
                  <Button className={classes.btnColor}>Profile</Button>
                </Link>
                <Button className={classes.btnColor} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
