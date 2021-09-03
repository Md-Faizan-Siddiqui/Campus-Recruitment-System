import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { auth, database } from "../Config/firebaseConfig";
import { useState } from "react";
import Alert from "../Components/snackBar";
import Loader from "../Components/loader";
import RadioBtn from "../Components/radioButton";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { CountryDropdown } from 'react-country-region-selector';

// import PhoneInput from 'react-phone-number-input'
// import { useDispatch, useSelector } from "react-redux";
// import { userDetails } from "../Redux/Action/userAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
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

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [phone, setPhone] = useState("")
  // const [role, setRole] = useState("")
  const [errMessage, setErrMessage] = useState("");
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // const loader = useSelector(state => state.addUser.isLoader)
  // const dispatch = useDispatch()

  // console.log(email);
  // console.log(password);

  // useEffect(() => {
  //   dispatch(userDetails({
  //     isLoader: false,
  //   }))
  // }, [])
  // console.log(name);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 charaters")
        .required("Password is Required"),
      role: Yup.mixed()
        .required("Selection is Required")
        .oneOf(["company", "student"]),
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    }),

    onSubmit: (values) => {
      const { email, password, name, role, phone } = values;
      console.log("values are ", values);
      // const userSignUp = (e) => {
      setErrMessage("");
      setMessage("");
      setLoader(true);
      // e.preventDefault();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log(userCredential);
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
              console.log("user", user);
            })
            .catch((err) => {
              console.log(err.message);
              setErrMessage(err.message);
              setLoader(false);
            });
        })
        .catch((error) => {
          // var errorCode = error.code;
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
          >
            {loader === true ? <Loader /> : "Sign Up"}
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
