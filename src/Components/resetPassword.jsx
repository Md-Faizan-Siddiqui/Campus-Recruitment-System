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
import { ResetPasswordValidation } from "../Validation/validation"

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

export default function ResetPassword() {
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const history = useHistory();
    const [loader, setLoader] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: ResetPasswordValidation,

        onSubmit: (values) => {
            const { password } = values;
            setErrMessage("");
            setMessage("");
            setLoader(true);

            const queryParams = new URLSearchParams(window.location.search)
            const oobCode = queryParams.get("oobCode")
            auth
                .confirmPasswordReset(oobCode, password)
                .then(() => {
                    setMessage("Password Change Successfully!");
                    setLoader(false);
                    setTimeout(() => {
                        history.push("/")
                    }, 1000);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    setErrMessage(errorMessage);
                    setLoader(false);
                })
        },
    });
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Reset Password
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
                            : "Reset Password"}
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
