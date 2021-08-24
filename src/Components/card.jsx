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
import { object } from "yup";

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
    justifyContent: "flex-end",
    paddingTop: "20px",
    // boxShadow: "0 0 10px gray",
  },
});

export default function OutlinedCard({
  campusData,
  updateBtn,
  apply,
  details,
}) {
  const state = useSelector((state) => state);
  const classes = useStyles();
  const student = state.addUser.loginUser.role === "student";
  const company = state.addUser.loginUser.role === "company";
  const admin = state.addUser.loginUser.role === "admin";

  console.log(state.addUser.loginUser.role);
  console.log(campusData);
  console.log("student", student);
  console.log("company", company);
  console.log("admin", admin);

  return (
    <Grid container justifyContent="center">
      <Grid item xl={2} md={4} sm={6} xs={12}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <div className={classes.main_img_div}>
              <div className={classes.profileImg}>
                <p>H</p>
              </div>
            </div>
            <div className={classes.card_content1}>
              <div>
                <Typography variant="body2" component="p">
                  Name : {campusData.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Email : {campusData?.email}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.jobTitle
                    ? `Available Jobs : ${campusData.jobTitle}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.dob
                    ? `Date Of Birth : ${campusData.dob}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.education
                    ? `Education : ${campusData.education}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.cgpa
                    ? `CGPA : ${campusData.cgpa}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.skills
                    ? `Skills : ${campusData.skills}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.experience
                    ? `Experience : ${campusData.experience}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.phone
                    ? `Phone : ${campusData.phone}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.description
                    ? `Job Description : ${campusData.description}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.lastDate
                    ? `Last Date : ${campusData.lastDate}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.salary
                    ? `Salary : ${campusData.salary}`
                    : null}
                </Typography>
              </div>
            </div>
            {updateBtn ? (
              <div className={classes.modal_div}>
                <div>
                  <CardActions>
                    <CustomizedDialogs />
                  </CardActions>
                </div>
              </div>
            ) : null}
            {apply ? (
              <div className={classes.modal_div}>
                <div>
                  <CardActions>
                    <Button variant="contained" color="primary">
                      Apply Now
                    </Button>
                  </CardActions>
                </div>
              </div>
            ) : null}
            {details ? (
              <div className={classes.modal_div}>
                <div>
                  <CardActions>
                    <Button variant="contained" color="primary">
                      Details
                    </Button>
                  </CardActions>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
