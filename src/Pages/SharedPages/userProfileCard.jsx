import "../../Style/userProfileCard.css";
import React from 'react';
import fallBackImage from "../../Images/images.png";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from '@material-ui/core';
import { GiSkills } from "react-icons/gi";
import { useSelector } from "react-redux";
import CustomizedDialogs from "../../Components/modal"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LanguageIcon from '@mui/icons-material/Language';

const useStyles = makeStyles({
    root: {
        margin: 10,
    },
    icon: {
        color: '#1976d2',
        marginTop: "3px",
        marginRight: "10px",
    }
});

function UserProfileCard({ campusData, formTitle, showImg, updateBtn, btnText }) {
    const user = useSelector(state => state)
    console.log("Redux Data", user.addUser.loginUser.role);
    const role = campusData.role;
    console.log("campusData", role);
    const classes = useStyles();

    return (
        <Grid container className="grid">
            <Grid item xl={3} lg={5} md={6} sm={6} xs={12} >
                <Card className={classes.root} style={{ padding: "0 30px 30px 30px", marginTop: "100px" }}>

                    <div className="pImgDiv">
                        <img src={campusData?.fileToUpload
                            ? campusData.fileToUpload
                            : fallBackImage} alt="" />
                    </div>
                    <div className="pInfoDiv">

                        <h1>{campusData.name}</h1>
                        {role === "student" ?
                            <>
                                <h4>{campusData.bio}</h4>

                            </>
                            : null}
                        <div className="iconDiv">
                            <LocationOnOutlinedIcon color="primary" fontSize="small" />
                            <p>{campusData.city}</p>
                        </div>
                    </div>
                    <div className="detailsParents">
                        <div className="detailsMain">
                            <div className="iconOrData">
                                <EmailOutlinedIcon className={classes.icon} fontSize="small" />
                                <p>{campusData.email}</p>
                            </div>

                            <div className="iconOrData">
                                <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                                <p>{campusData.phone}</p>
                            </div>
                            {role === "student" ?
                                <>
                                    <div className="iconOrData">
                                        <DateRangeOutlinedIcon className={classes.icon} fontSize="small" />
                                        <p>{campusData.dob}</p>
                                    </div>

                                    <div className="iconOrData">
                                        <CalculateOutlinedIcon className={classes.icon} fontSize="small" />
                                        <p>{campusData.cgpa}</p>
                                    </div>

                                    <div className="iconOrData">
                                        <GiSkills fontSize="large" className={classes.icon} />
                                        <p>{campusData.skills}</p>
                                    </div>

                                    <div className="iconOrData">
                                        <WorkOutlineIcon className={classes.icon} fontSize="small" />
                                        <p>{campusData?.experienceYears + " " + campusData?.experienceMonths}</p>
                                    </div>

                                    <div className="iconOrData">
                                        <CastForEducationOutlinedIcon className={classes.icon} fontSize="small" />
                                        <p>{campusData.education}</p>
                                    </div>
                                </>
                                : role === "company" ?
                                    <>
                                        <div className="iconOrData">
                                            <LanguageIcon className={classes.icon} fontSize="small" />
                                            <p>{campusData.website}</p>
                                        </div>
                                    </>
                                    : null}
                        </div>
                    </div>
                    <div className="editBtn">
                        <CustomizedDialogs
                            campusData={campusData}
                            icons
                            formTitle={formTitle}
                            btnText={btnText}
                        />
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserProfileCard