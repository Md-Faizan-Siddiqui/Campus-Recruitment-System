import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { List, ListItem, Grid } from "@material-ui/core";
import CustomizedDialogs from "./modal";
import fallBackImage from "../Images/images.png";

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
  main_img_div: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  profileImg: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imgTag: {
    width: "200px",
    height: "200px",
  },
  card_content1: {
    display: "flex",
    justifyContent: "center",
  },
  modal_div: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "20px",
  },
  show_C_S_Data: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function OutlinedCard({
  applyFunc, // vacancies
  disableFunc, // vacancies
  showImg,//student profile
  deleteData, //jobPost
  btnText, //jobPost, vacancies
  campusData, //student, company,
  updateBtn,
  apply, // vacancies
  details,//student
  formTitle,//student
  companyDetails,
  studentDetails,//student
  companyPostJob, //jobPost
  web,
}) {
  console.log("Campus Data====> in card", campusData)
  const state = useSelector((state) => state);
  const classes = useStyles();
  const student = state?.addUser?.loginUser?.role === "student";
  const company = state?.addUser?.loginUser?.role === "company";
  const admin = state?.addUser?.loginUser?.role === "admin";

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {/* {companyPostJob || apply || admin ? null : (
          <div className={classes.main_img_div}>
            <div className={classes.profileImg}>
              <img
                className={classes.imgTag}
                src={
                  campusData?.fileToUpload
                    ? campusData.fileToUpload
                    : fallBackImage
                }
                alt="profilePic"
              />
            </div>
          </div>
        )} */}
        {showImg ? <div className={classes.main_img_div}>
          <div className={classes.profileImg}>
            <img
              className={classes.imgTag}
              src={
                campusData?.fileToUpload
                  ? campusData.fileToUpload
                  : fallBackImage
              }
              alt="profilePic"
            />
          </div>
        </div> : null}
        <div className={classes.card_content1}>
          <div>
            {companyPostJob ? <h2>Posted Job</h2> : null}
            {student && apply ? <h2>Vacancies</h2> : null}
            {/* {admin ? <h2>Company Posted Jobs</h2> : null} */}
            {/* <Typography variant="body2" component="p">
              {(student && apply) || !campusData.lengths ? "No Data To Show"
                : null}
            </Typography> */}
            <Typography variant="body2" component="p">
              {details
                ? null
                : `Name : ${campusData?.name}`}
            </Typography>
            <Typography variant="body2" component="p">
              {details
                ? null
                : `Email : ${campusData?.email}`}
            </Typography>
            <Typography variant="body2" component="p">
              {(company && web) || (student && campusData?.dob)
                ? `Date Of Birth : ${campusData?.dob}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {(company && web) || (student && campusData?.cgpa)
                ? `CGPA : ${campusData?.cgpa}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {(company && web) || (student && campusData?.skills)
                ? `Skills : ${campusData?.skills}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {(company || student || admin) && details
                ? null
                : `Phone : ${campusData?.phone}`}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.description
                ? `Job Description : ${campusData?.description}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Job Title : ${campusData?.jobTitle}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Job Description : ${campusData?.jobDescription}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Job Type : ${campusData?.jobType}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {(student && campusData.experience) || companyPostJob || apply
                ? `Experience : ${campusData?.experience}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {(company && updateBtn) || (student && web) || (admin && web) || (companyPostJob || apply)
                ? `Website : ${campusData?.website}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Salary : ${campusData?.salary}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Last Date : ${campusData?.lastDate}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {(company && web) || (student && campusData?.education) || companyPostJob || apply
                ? `Education : ${campusData?.education}`
                : null}
            </Typography>
          </div>
        </div>
        {(company || student || admin) && details ? (
          <div className={classes.show_C_S_Data}>
            <div>
              <List>
                <ListItem>{campusData?.name}</ListItem>
              </List>
            </div>
            <div>
              <CardActions>
                <CustomizedDialogs
                  campusData={campusData}
                  formTitle={formTitle}
                  companyDetails={companyDetails}
                  studentDetails={studentDetails}
                />
              </CardActions>
            </div>
          </div>
        ) : null}
        {updateBtn ? (
          <div className={classes.modal_div}>
            <div>
              <CardActions>
                <CustomizedDialogs
                  campusData={campusData}
                  icons
                  details={details}
                  formTitle={formTitle}
                />
              </CardActions>
            </div>
          </div>
        ) : null}
        {(admin || company || student) && (apply || companyPostJob) ? (
          <div className={classes.modal_div}>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={student ? campusData.block : false}
                onClick={deleteData ? deleteData : admin ? disableFunc : student ? applyFunc : null}
              >
                {admin && campusData.block === true ? "Unblock"
                  : admin && campusData.block === false ? "Block"
                    : companyPostJob || apply ? btnText
                      : null}
              </Button>
            </CardActions>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
