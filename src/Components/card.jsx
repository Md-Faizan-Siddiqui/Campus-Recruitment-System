import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import CustomizedDialogs from "./modal";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
  profileImg: {
    borderRadius: "50%",
    border: "1px solid black",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 100,
  },
  card_content1: {
    display: "flex",
    justifyContent: "center",
  },
  main_img_div: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  modal_div: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function OutlinedCard(props) {
  const state = useSelector((state) => state);
  console.log(state.addUser.loginUser.role);
  const {
    data,
    companyName,
    lastDate,
    jobTitle,
    description,
    salary,
    btnText,
  } = props;
  const classes = useStyles();
  // console.log(props);
  // console.log(window.location);
  const student = state.addUser.loginUser.role === "student";
  console.log("student", student);
  const company = state.addUser.loginUser.role === "company";
  console.log("company", company);

  return (
    <Grid container justifyContent="center">
      {window.location.pathname === "/studentProfile" ? (
        <Grid item xl={2} md={4} sm={6} xs={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              {student === "student" ? (
                <>
                  <div className={classes.main_img_div}>
                    <div className={classes.profileImg}>
                      <p>H</p>
                    </div>
                  </div>
                  <div className={classes.card_content1}>
                    <div>
                      <Typography variant="body2" component="p">
                        {props.userName}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.eMail}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.pHone}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.rOle}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.cGpa}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.dOb}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.eDucation}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.eXperience}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sKills}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" component="p">
                        {props.sName}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sEmail}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sPhone}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sRole}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sCgpa}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sDob}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sEducation}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sExperience}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {props.sSkills}
                      </Typography>
                    </div>
                  </div>
                </>
              ) : null}
            </CardContent>
            <div className={classes.modal_div}>
              <div>
                <CardActions>
                  <CustomizedDialogs />
                  {/* <Button size="small">{btnText}</Button> */}
                </CardActions>
              </div>
            </div>
          </Card>
        </Grid>
      ) : window.location.pathname === "/" ? (
        ///////////////
        props.students &&
        props.students.map((value, key) => {
          console.log(value, "value", key, "key");
          return (
            <Grid item xl={2} md={4} sm={6} xs={12}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <div className={classes.card_content1}>
                    <div>
                      <Typography variant="body2" component="p">
                        <h1>Students Show krwany hy..</h1>
                      </Typography>
                    </div>
                  </div>
                </CardContent>
                <div className={classes.modal_div}>
                  <div>
                    <CardActions>
                      <CustomizedDialogs />
                      {/* <Button size="small">{btnText}</Button> */}
                    </CardActions>
                  </div>
                </div>
              </Card>
            </Grid>
          );
        })
      ) : (
        ////////////////////
        props.data.map((value, key) => {
          // console.log("value", value, "key", key);
          return (
            <Grid item xl={2} md={4} sm={6} xs={12}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  {/* <div className={classes.profileImg}>
                    <p>H</p>
                  </div> */}
                  <div>
                    <Typography variant="body2" component="p">
                      {companyName} {value.companyName}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {lastDate} {value.lastDate}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {jobTitle} {value.jobTitle}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {description} {value.description}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {salary} {value.salary}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small">{btnText}</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
}
