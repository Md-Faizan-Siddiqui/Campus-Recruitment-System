import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { GiSkills } from "react-icons/gi";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: '#1976d2',
        marginTop: "3px",
        marginRight: "10px",
    },
    dataOrIcon: {
        fontWeight: "bold",
        display: "flex",
        lineHeight: "30px",
        alignItems: "center",
    },
}))
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ campusData }) {
    const classes = useStyles();
    const allUsers = useSelector(state => state.addUser.allUsers)
    const [expanded, setExpanded] = React.useState('');

    let tempdata = [];
    if (campusData?.applicantUserId) {
        Object.keys(campusData?.applicantUserId).map((applicants, ind) => {
            const user = Object.values(allUsers).filter(user => user.id === campusData?.applicantUserId[applicants]?.id)
            tempdata.push(user);
        })
    }

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const user = Object.values(allUsers)
    return (
        <div className={classes.accordionMain}>
            {tempdata.length == 0 && "No Applied Candidate's"}
            {tempdata.flat().map((value, index) => {
                return (
                    <>
                        <Accordion Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} >
                            <AccordionSummary aria-controls="`panel1d-content`" id="panel1d-header">
                                <Typography>{value.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {value?.email ?
                                    <div className={classes.dataOrIcon} >
                                        <EmailOutlinedIcon className={classes.icon} />
                                        <p>{value.email}</p>
                                    </div>
                                    : null}
                                {value?.phone ?
                                    <div className={classes.dataOrIcon} >
                                        <PhoneIphoneOutlinedIcon className={classes.icon} />
                                        <p>{value.phone}</p>
                                    </div>
                                    : null}
                                {value?.cgpa ?
                                    <div className={classes.dataOrIcon} >
                                        <CalculateOutlinedIcon className={classes.icon} />
                                        <p>{value.cgpa}</p>
                                    </div>
                                    : null}
                                {value?.education ?
                                    <div className={classes.dataOrIcon} >
                                        <CastForEducationOutlinedIcon className={classes.icon} />
                                        <p>{value.education}</p>
                                    </div>
                                    : null}
                                {value?.experience ?
                                    <div className={classes.dataOrIcon} >
                                        <WorkOutlineIcon className={classes.icon} />
                                        <p>{value.experience}</p>
                                    </div> : null}
                                {value?.skills ?
                                    <div className={classes.dataOrIcon} >
                                        <GiSkills className={classes.icon} />
                                        <p>{value.skills}</p>
                                    </div>
                                    : null}
                                {value?.dob ?
                                    <div className={classes.dataOrIcon} >
                                        <DateRangeOutlinedIcon className={classes.icon} />
                                        <p>{value.dob}</p>
                                    </div>
                                    : null}
                                {value?.city ?
                                    <div className={classes.dataOrIcon} >
                                        <LocationOnOutlinedIcon className={classes.icon} />
                                        <p>{value.city}</p>
                                    </div>
                                    : null}
                            </AccordionDetails>
                        </Accordion>
                    </>)
            })}
        </div >
    );
}
