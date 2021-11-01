import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Config/firebaseConfig";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "../Components/snackBar";
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

export default function ForgetPassword() {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: (values) => {
      const { email } = values;
      setErrMessage("");
      setMessage("");
      setLoader(true);

      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setMessage("Send Email Successfully!");
          setLoader(false);
          setTimeout(() => {
            history.push("/")
          }, 1000);
        })
        .catch((error) => {
          var errorCode = error.code;
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
        <Typography component="h1" variant="h5">
          Forget Password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loader ? true : false}
          >
            {loader === true ? <Loader width="15px" height="15px" color="#3f51b5" type="Bars" />
              : "Send Email"}
          </Button>
          <Grid container>
            <Grid item>
              <Link to="login" variant="body2">
                {"Sign In"}
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
