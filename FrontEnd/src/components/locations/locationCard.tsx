import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import useStyles from "../theme";

function LocationCard(location:any) {
  var classes:any = useStyles();
  return (
    <Card className={classes.locationList}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        className={classes.locationList}
      >
        {location.address} - Employee: {location.empolyee} - Location: {location.locationUrl}
      </Typography>
    </Card>
  );
}

export default LocationCard;
