import { makeStyles } from "@material-ui/styles";
import Image from "./../assets/neudesic.jpg"



export default makeStyles(theme => ({

  inputStyle: {
    textAlign: "left",
    border: 0,
    outline: 0,
    background: "transparent",
    width: "100%",
  },

  titleStyle: {
    justifyContent: "center",
  },

  sxStyle: {
    p: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  linkWidth: {
    width: "100%",
  },

  sxCopyRight: {
    pt: 4
  },


  locationList: {
    display: "flex",
    width: "100%",
    margin: "3px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  locationImage: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "left",
  },

  sxStyleToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },

  sxStyleBox: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },

  drawerWidth: {
    width: 240,
    marginLeft: 240
  },

  dashboardToolbarWidth: {
    pr: "24px",
  },

  dashboardFlexGrow: {
    flexGrow: 1,
  },

  userBox: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  userBox1: { mt: 3 },

  userSubmitBtn: { mt: 3, mb: 2 },

  userCopyRight: { mt: 5 },


  signinBox: {
    my: 8,
    mx: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  signinmt: {
    mt: 1
  },

  signupBox: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  signupAvatar: {
    m: 1,
    bgcolor: "secondary.main"
  },

  locationCountPaper: {
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: 500,
  },

  locationPaginationPaper: { p: 2, display: "flex", flexDirection: "column" }

}));