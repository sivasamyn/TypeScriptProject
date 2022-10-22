import React, { useState } from "react";
import LocationCard from "./locationCard";
import { Grid, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Title from "../../common/Title";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import LocationApi from "../../api/api";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Container } from "@mui/material";
import useStyles from "../theme";

function Copyright(props:any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Neudesic Location Data
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function LocationList() {
  var classes:any = useStyles();

  const [locationData, setlocationData] = useState<Array<null>>([]);
  const [infoLoaded, setInfoLoaded] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<null>>([]);
  const [curAddressSearch, setCurAddressSearch] = useState<string>("");

  React.useEffect(function loadlocationData() {
    async function getlocationData() {
      try {
        let data:any = await LocationApi.getAlllocations();
        setlocationData(data);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getlocationData();
  }, []);

  function handleSearchInput(evt:any) {
    let search = evt.target.value;
    setCurAddressSearch(search);
    let tempFilteredData = locationData.filter((location:any) =>
      location.address.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilteredData(tempFilteredData);
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.inputStyle}
          >
            <Title
              className={classes.titleStyle}
            >
              Search By Address
            </Title>
            <Input
              sx={{
                   textAlign: "left",
                   border: 0,
                   outline: 0,
                   background: "transparent",
                   width: "100%",
                 }}
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search By Address - Click Item To Go To Listing"
              aria-label="Search"
              onChange={(e) => handleSearchInput(e)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.sxStyle}
          >
            <Title className={classes.titleStyle}
            >
              Filtered Location By Address
            </Title>
            {filteredData.length === 0 || curAddressSearch === "" ? (
              <Typography>
                No Location To Show. Please Modify Your Search.
              </Typography>
            ) : (
              filteredData.map((location:any, idx:number) => (
                <Link
                  href={location.url}
                  underline="none"
                  className={classes.linkWidth}
                  key={location.id}
                >
                  <LocationCard key={idx} location={location} />
                </Link>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
      <Copyright className={classes.sxCopyRight} />
    </Container>
  );
}

export default LocationList;
