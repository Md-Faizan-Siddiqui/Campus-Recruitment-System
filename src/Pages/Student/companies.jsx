import "../../App.css";
import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../../Components/card";
import { Grid } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CustomizedDialogs from "../../Components/modal";

function Companies() {
  // get data from redux..

  const allUsers = useSelector((state) => state.addUser.allUsers);
  console.log(allUsers, "allUsers");

  // filter companies..

  const allCompanies = Object.values(allUsers)?.filter(
    (userData) => userData.role === "company"
  );
  console.log(allCompanies);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#3f51b5",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      // minWidth: 700,
    },
  });

  const classes = useStyles();

  return (
    <div className="marginAdjustment">
      <h1>Companies</h1>
      {/* <Grid container>
        {allCompanies &&
          allCompanies.map((data, index) => {
            return (
              <Grid item xl={3} md={4} sm={6} xs={12}  >
                <OutlinedCard
                  campusData={data}
                  details
                  image
                  formTitle={"Company Details"}
                  companyDetails
                />
              </Grid>
            );
          })}
      </Grid> */}

      <Grid container justifyContent="center">
        <Grid
          xs={11}
          md={11}
          sm={11}
          xl={11}
          item
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Companies</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCompanies &&
                  allCompanies.map((data, index) => {
                    return (
                      <StyledTableRow >
                        <StyledTableCell component="th" scope="row">
                          {data.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <CustomizedDialogs
                            campusData={data}
                            details
                            image
                            formTitle={"Company Details"}
                            companyDetails />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Block
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
export default Companies;
