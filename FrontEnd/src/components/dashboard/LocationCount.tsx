import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../../common/Title";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import useStyles from "./../theme";

export default function LocationCount(data:any) {
  let classes:any = useStyles();
  let today:Date = new Date();

  return (
    <Grid item xs={2}>
      <Paper className={classes.locationCountPaper}
      >
        <React.Fragment>
          <Title>Number Of Office's</Title>
          <Typography component="p" variant="h4">
            {data.data.length}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            as of {today.toLocaleDateString()}
          </Typography>
        </React.Fragment>
      </Paper>
    </Grid>
  );
}
