import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { auth, database } from "../../Config/firebaseConfig";
import { useState } from "react";
import Alert from "../../Components/snackBar";
import RadioBtn from "../../Components/radioButton";
import { useFormik } from "formik";
import { SignUpFormValidation } from "../../Validation/validation";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
    validationSchema: SignUpFormValidation,

    onSubmit: (values) => {
      const { email, password, name, role, phone } = values;
      setErrMessage("");
      setMessage("");
      setLoader(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          database
            .ref("/CRA")
            .child("users/" + userCredential.user.uid)
            .set({
              id: userCredential.user.uid,
              name: name,
              email: email,
              role: role,
              phone: phone,
              password: password,
            })
            .then((res) => {
              console.log("res", res);
              history.push("/");
              var user = userCredential;
              setLoader(false);
              setMessage("User Created Successful");
            })
            .catch((err) => {
              console.log(err.message);
              setErrMessage(err.message);
              setLoader(false);
            });
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
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                autoFocus
              />
              {formik.errors.name && formik.touched.name && (
                <p style={{ color: "red", marginLeft: "5px" }}>
                  {formik.errors.name}
                </p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <p style={{ color: "red", marginLeft: "5px" }}>
                  {formik.errors.email}
                </p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                country="US"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                value={formik.values.phone}
                onChange={formik.handleChange("phone")}
              />
              {formik.errors.phone && formik.touched.phone && (
                <p style={{ color: "red", marginLeft: "5px" }}>
                  {formik.errors.phone}
                </p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <RadioBtn onChange={formik.handleChange("role")} />
              {formik.errors.role && formik.touched.role && (
                <p style={{ color: "red", marginLeft: "5px" }}>
                  {formik.errors.role}
                </p>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loader ? true : false}
          >
            {loader === true ? <Loader width="15px" height="15px" color="#3f51b5" type="Bars" /> : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
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
