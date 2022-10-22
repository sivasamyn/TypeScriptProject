import React, { useState } from "react";
import LocationCount from "./LocationCount";
import LocationPagination from "./LocationPagination";
import Chart from "./Chart";
import LocationApi from "../../api/api";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright(props:any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.neudesic.com/about/contact/">
        Neudesic Location Data
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function LocationContent() {
  const [locationData, setlocationData] = useState<Array<null>>([]);
  const [infoLoaded, setInfoLoaded] = useState<boolean>(false);

  React.useEffect(function loadlocationData() {
    async function getlocationData() {
      try {
        let data = await LocationApi.getAlllocations();
        setlocationData(data);
        console.log("DATA FROM SERVER");
        console.log(data);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getlocationData();
  }, []);

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Recent Listings */}
        <LocationPagination data={locationData} />
        {/* Chart */}
          <Chart data={locationData} />
        {/* # Listings */}
        <LocationCount data={locationData} />
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default LocationContent;
