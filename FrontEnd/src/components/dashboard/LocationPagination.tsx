import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import Title from "../../common/Title";
import HouseIcon from "@mui/icons-material/House";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import useStyles from "./../theme";

export default function LocationPagination(data:any) {
  let classes:any = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (evt:Event, newPage:number) => {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(evt:any) {
    setRowsPerPage(parseInt(evt.target.value, 10));
    setPage(1);
  }

  return (
    <Grid item xs={12}>
      <Paper className={classes.locationPaginationPaper}>
        <React.Fragment>
          <Title>Neudesic office locations</Title>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>PostalCode</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((location:any) => (
                  <TableRow key={location.id}>
                    <TableCell>{location.address}</TableCell>
                    <TableCell>{location.city}</TableCell>
                    <TableCell>{location.stateOrProvince}</TableCell>
                    <TableCell>{location.zipOrPostalCode}</TableCell>
                    <TableCell>{location.empolyee}</TableCell>
                    <TableCell>
                      <Link color="primary" href={location.locationUrl}>
                        <HouseIcon />
                      </Link>
                    </TableCell>
                    <TableCell align="right">{location.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Paper>
    </Grid>
  );
}
