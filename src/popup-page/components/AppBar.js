import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import chromeService from "../../services/chromeService";
import firebaseService from "../../services/firebaseService";
import dbService from "../../services/dbService";
import appIconImage from "./48x48.png";
const chromeServiceObj = new chromeService();
const dbServiceObj = new dbService();

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#35cce6",
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar(props) {
  const { userInfo } = props;
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const openProfile = () => {
    chromeServiceObj.openHelpPage();
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    firebaseService.logout();
    await dbServiceObj.set({ authenticated: false });
    window.location.reload();
  };

  const handleSettings = () => {
    handleClose();
  };

  return (
    <AppBar
      title={appIconImage}
      position="static"
      style={{ backgroundColor: "#35cce6", height: "48px" }}
    >
      <Toolbar>
        <img
          src={appIconImage}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="AppIcon"
        />
        <Typography variant="h6" className={classes.title}>
          Chat Anywhere
        </Typography>
        {auth && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {userInfo.profilePicUrl == "" ? (
                <AccountCircle />
              ) : (
                <Avatar
                  style={{ height: "40px" }}
                  alt={userInfo.displayName}
                  src={userInfo.profilePicUrl}
                />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={openProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
