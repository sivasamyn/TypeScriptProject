import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router";
import Alert from "../common/Alert";
import useStyles from "./../components/theme";

function Copyright(props:any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      { <Link color="inherit" href="https://www.neudesic.com/about/contact/">
        Neudesic Location Data
       
      </Link>}
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme:any = createTheme();

export default function SignIn(login:any) {
  let classes:any = useStyles();
  const history:any = useHistory();
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const data:any = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let dataToSend:object = {
      email: data.get("email"),
      password: data.get("password"),
    };

    let result:any = await login(dataToSend);
    if (result.success) {
      history.push("/dashboard");
    } else {
      console.log("Error Logging In");
      setFormErrors(result.errors);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className={classes.locationImage}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box className={classes.signinBox}
           
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              className={classes.signinmt}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.userSubmitBtn}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} className={classes.userCopyRight}/>
              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
