import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({

    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
}));

export default function FloatingActionButtonZoom({ onClick }) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
        {
            color: 'primary',
            className: classes.fab,
            icon: <AddIcon />,
            label: 'Add',
        },
        {
            color: 'secondary',
            className: classes.fab,
            icon: <EditIcon />,
            label: 'Edit',
        },
        {
            color: 'inherit',
            className: clsx(classes.fab, classes.fabGreen),
            icon: <UpIcon />,
            label: 'Expand',
        },
    ];

    return (
        <div className={classes.root}>
            {fabs.map((fab, index) => (
                <Zoom
                    key={fab.color}
                    in={value === index}
                    timeout={transitionDuration}
                    onClick={onClick}
                    style={{
                        zIndex: 9999,
                        transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
                        {fab.icon}
                    </Fab>
                </Zoom>
            ))}
        </div>
    );
}
