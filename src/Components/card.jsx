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
  deleteData, //jobPost
  btnText, //jobPost, vacancies
  campusData,
  updateBtn,
  apply, // vacancies
  details,
  cardData, // vacancies
  formTitle,
  companyDetails,
  studentDetails,
  companyPostJob, //jobPost
}) {
  console.log("Card Data====> in card", cardData)
  console.log("Campus Data====> in card", campusData)
  const state = useSelector((state) => state);
  const classes = useStyles();
  const student = state?.addUser?.loginUser?.role === "student";
  const company = state?.addUser?.loginUser?.role === "company";
  const admin = state?.addUser?.loginUser?.role === "admin";

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {companyPostJob || apply || admin ? null : (
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
        )}
        <div className={classes.card_content1}>
          <div>
            {companyPostJob ? <h1>Posted Job</h1> : null}
            <Typography variant="body2" component="p">
              {details
                ? null
                : `Name : ${campusData?.name || cardData?.name}`}
            </Typography>
            <Typography variant="body2" component="p">
              {details
                ? null
                : `Email : ${campusData?.email || cardData?.email}`}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.jobTitle
                ? `Available Jobs : ${campusData?.jobTitle}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.dob
                ? `Date Of Birth : ${campusData?.dob || cardData?.dob}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.education
                ? `Education : ${campusData?.education || cardData?.education
                }`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.cgpa
                ? `CGPA : ${campusData?.cgpa || cardData?.cgpa}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.skills
                ? `Skills : ${campusData?.skills || cardData?.skills}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.experience
                ? `Experience : ${campusData?.experience || cardData?.experience
                }`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {(company || student) && details
                ? null
                : `Phone : ${campusData?.phone || cardData?.phone}`}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.description
                ? `Job Description : ${campusData?.description}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.lastDate
                ? `Last Date : ${campusData?.lastDate}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {student && campusData?.salary
                ? `Salary : ${campusData?.salary}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {company && campusData?.website
                ? `Website : ${campusData?.website}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Job Title : ${cardData?.jobTitle}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Job Description : ${cardData?.jobDescription}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Job Type : ${cardData?.jobType}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Experience : ${cardData?.experience}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Website : ${cardData?.website}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Salary : ${cardData?.salary}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Last Date : ${cardData?.lastDate}`
                : null}
            </Typography>
            <Typography variant="body2" component="p">
              {companyPostJob || apply
                ? `Education : ${cardData?.education}`
                : null}
            </Typography>
          </div>
        </div>
        {(company || student) && details ? (
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
                  cardData={campusData}
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
                  cardData={campusData}
                  icons
                  details={details}
                  formTitle={formTitle}
                />
              </CardActions>
            </div>
          </div>
        ) : null}
        {(company || student) && (apply || companyPostJob) ? (
          <div className={classes.modal_div}>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={deleteData ? deleteData : null}
              >
                {companyPostJob || apply ? btnText : null}
              </Button>
            </CardActions>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
