import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
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
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { GiSkills } from "react-icons/gi";
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState } from "react"

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
    console.log("campusData in accordian", campusData)
    const allUsers = useSelector(state => state.addUser.allUsers)
    console.log("All Users in accordian", allUsers)
    // const [applicantId, setApplicantId] = useState([])

    const [expanded, setExpanded] = React.useState('');
    // const temp = campusData

    let tempdata = [];
    if (campusData?.applicantUserId) {
        Object.keys(campusData?.applicantUserId).map((applicants, ind) => {
            const user = Object.values(allUsers).filter(user => user.id === campusData?.applicantUserId[applicants]?.id)
            tempdata.push(user);
            console.log("users", user)
        })
    }
    // setApplicantId(tempdata)

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    // const testing = allUsers.filter()
    const user = Object.values(allUsers)
    console.log("Applicant State", tempdata)
    return (
        <div>
            {tempdata.length == 0 && "No data found"}
            {tempdata.flat().map((value, index) => {
                console.log("index", index, "value", value)
                return (
                    <>
                        <Accordion Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} >
                            <AccordionSummary aria-controls="`panel1d-content`" id="panel1d-header">
                                <Typography>{value.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>{value.phone}</p>
                            </AccordionDetails>
                        </Accordion>
                    </>)
            })}
        </div >
    );
}
