import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../Redux/Action/userAction";
import { auth } from "../Config/firebaseConfig";
import { List, ListItem, Drawer, ListItemText, ListItemIcon } from "@material-ui/core";
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { FaUserGraduate } from "react-icons/fa";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { NavLink, useLocation } from "react-router-dom";
import cx from "classnames"
const useStyles = makeStyles((theme) => ({
  regular: {
    minHeight: "64px"
  },
  menuButton: {
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
    fontSize: "18px",
    minHeight: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleLogoutBtn: {
    color: "white",
    backgroundColor: "#3f51b5",
  },
  iconStyle: {
    fontSize: "20px",
    color: "#3f51b5"
  },
  powerBtnMobleScreen: {
    color: "white",
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  navBtnStyle: {
    textDecoration: "none",
  },
  btnActive: {
    margin: "5px",
    padding: "6px 8px",
    textDecoration: "none",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    borderRadius: "4px",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.addUser);
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const location = useLocation()

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
            <ListItem component={Link} to={"/"} className={classes.toggleBtnColor}>
              <ListItemIcon>
                <WorkRoundedIcon className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText>Vacancies</ListItemText>
            </ListItem>
            <ListItem component={Link} to={"/companies"} className={classes.toggleBtnColor}>
              <ListItemIcon>
                <BusinessRoundedIcon className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText>Companies</ListItemText>
            </ListItem>
            <ListItem component={Link} to={"/profile"} className={classes.toggleBtnColor}>
              <ListItemIcon>
                <PersonRoundedIcon className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
          </List>
        </>
      ) : null}
      {user?.loginStatus === true && user?.loginUser?.role === "company" ? (
        <>
          <List>
            <ListItem component={Link} to={"/"} className={classes.toggleBtnColor}>
              <ListItemIcon>
                <FaUserGraduate className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText>Students</ListItemText>
            </ListItem>
            <ListItem component={Link} to={"/jobpost"} className={classes.toggleBtnColor}>
              <ListItemIcon>
                <WorkRoundedIcon className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText>Jobs</ListItemText>
            </ListItem>
            <ListItem component={Link} to={"/profile"} className={classes.toggleBtnColor}>
              <ListItemIcon>
                <PersonRoundedIcon className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
          </List>
        </>
      ) : null}
      {user?.loginStatus === true && user?.loginUser?.role === "admin" ? (
        <><List>
          <ListItem component={Link} to={"/"} className={classes.toggleBtnColor}>
            <ListItemIcon>
              <WorkRoundedIcon className={classes.iconStyle} />
            </ListItemIcon>
            <ListItemText>Jobs</ListItemText>
          </ListItem>
          <ListItem component={Link} to={"/companies"} className={classes.toggleBtnColor}>
            <ListItemIcon>
              <BusinessRoundedIcon className={classes.iconStyle} />
            </ListItemIcon>
            <ListItemText>Companies</ListItemText>
          </ListItem>
          <ListItem component={Link} to={"/students"} className={classes.toggleBtnColor}>
            <ListItemIcon>
              <FaUserGraduate className={classes.iconStyle} />
            </ListItemIcon>
            <ListItemText>Students</ListItemText>
          </ListItem>
        </List>
        </>
      ) : null}
    </div>
  );

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
        localStorage.removeItem("UID")
        localStorage.removeItem("ROLE")
      })
      .catch((error) => {
      });
  };
  return (
    <div className={classes.root}>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <AppBar position="fixed">
        <Toolbar classes={{ regular: classes.regular }}>
          {user.loginStatus === false ? null :
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>}
          <Typography variant="h6" className={classes.title}>
            CRS
          </Typography>
          {user.loginStatus === false && location.pathname === "/" ? (
              <Link to="/signup" className={classes.navBtnStyle}>
                <Button
                  classes={location.pathname === "/signup" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                  className={classes.btnColor}>SignUp</Button>
              </Link>
          ) : user.loginStatus === false && location.pathname === "/signup" ?
            <Link to="/" className={classes.navBtnStyle}>
              <Button
                classes={location.pathname === "/" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                className={classes.btnColor}>Login</Button>
            </Link> : null}
          <div className={classes.navBtn}>
            {user?.loginStatus === true &&
              user?.loginUser?.role === "student" ? (
              <>
                <Link to="/" className={classes.navBtnStyle} >
                  <Button
                    classes={location.pathname === "/" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}>Vacancies</Button>
                </Link>
                <Link to="/companies" className={classes.navBtnStyle}>
                  <Button
                    classes={location.pathname === "/companies" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}>Companies</Button>
                </Link>
                <Link to="/profile" className={classes.navBtnStyle} >
                  <Button
                    classes={location.pathname === "/profile" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}>Profile</Button>
                </Link>
                <Button className={classes.btnColor} onClick={logout}>
                  <PowerSettingsNewIcon />
                </Button>
              </>
            ) : null}
            {user?.loginStatus === true &&
              user?.loginUser?.role === "company" ? (
              <>
                <Link to="/" className={classes.navBtnStyle}>
                  <Button
                    classes={location.pathname === "/" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}>Students</Button>
                </Link>
                <Link to="/jobpost" className={classes.navBtnStyle}>
                  <Button
                    classes={location.pathname === "/jobpost" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}>Jobs</Button>
                </Link>
                <Link to="/profile" className={classes.navBtnStyle}>
                  <Button
                    classes={location.pathname === "/profile" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}>Profile</Button>
                </Link>
                <Button className={classes.btnColor} onClick={logout}>
                  <PowerSettingsNewIcon />
                </Button>
              </>
            ) : null}
            {user?.loginStatus === true && user?.loginUser?.role === "admin" ? (
              <>
                <Link to="/" className={classes.navBtnStyle}>
                  <Button
                    classes={location.pathname === "/" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}
                  >Jobs</Button>
                </Link>
                <Link to="/companies" className={classes.navBtnStyle}>
                  <Button
                    classes={location.pathname === "/companies" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}>Companies</Button>
                </Link>
                <Link to="/students" className={classes.navBtnStyle}>
                  <Button
                    classes={location.pathname === "/students" ? { root: cx(classes.btnActive, classes.btnColor) } : classes.btnColor}
                    className={classes.btnColor}>Students</Button>
                </Link>
                <Button className={classes.btnColor} onClick={logout}>
                  <PowerSettingsNewIcon />
                </Button>
              </>
            ) : null}
          </div>
          {user.loginStatus === false ? null :
            <Button size="small" className={classes.powerBtnMobleScreen} onClick={logout}>
              <PowerSettingsNewIcon />
            </Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
