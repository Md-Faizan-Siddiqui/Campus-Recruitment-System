import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { auth, database } from "../../Config/firebaseConfig";
import { useDispatch } from "react-redux";
import { userDetails } from "../../Redux/Action/userAction";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "../../Components/snackBar";
import { LoginFormValidation } from "../../Validation/validation";
import { useFormik } from "formik";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loader, setLoader] = useState(false);

console.log( "MSG",message, "ERR MSG",errMessage)
  
const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormValidation,

    onSubmit: (values) => {
      const { email, password } = values;
      setErrMessage("");
      setMessage("");
      setLoader(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          let user = userCredential.user;
          database.ref(`/CRA/users/${user?.uid}`).on("value", (snapshot) => {
            snapshot.val().block ? setErrMessage("You are Blocked") : setMessage("Login Success!");
            setLoader(false);
            dispatch(
              userDetails({
                loginUser: user,
                loginStatus: true,
                role: snapshot.val().role,
              })
              );
            })
        })
        .catch((error) => {
          var errorMessage = error.message;
          setErrMessage(errorMessage);
          setLoader(false);
        });
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          {formik.errors.email && formik.touched.email && (
            <p style={{ color: "red", marginLeft: "5px" }}>
              {formik.errors.email}
            </p>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          {formik.errors.password && formik.touched.password && (
            <p style={{ color: "red", marginLeft: "5px" }}>
              {formik.errors.password}
            </p>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loader ? true : false}
          >
            {loader === true ? <Loader width="15px" height="15px" color="#3f51b5" type="Bars" />
              : "LogIn"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="forgetPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              Don't have an account?
              <Link to="signup" variant="body2">
                {" Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {message || errMessage ? (
        <Alert errMessage={errMessage} message={message} />
      ) : null}
    </Container>
  );
}
