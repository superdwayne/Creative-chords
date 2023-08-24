import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AuthContext from "../../Authcontext";
import { auth } from "../../firebase";
import SignIn from "../../signin";
import Button from "@mui/material/Button";
import ProfileContext from "../users/profilecontext";
import logo from "../../logoxs.png";
import "./nav.css";
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Nav = () => {
  const hasProfile = useContext(ProfileContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error(error);
    });
  };

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={2} md={9} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Link to="/">
            <img src={logo} className="App-logo" alt="Chords" />
          </Link>
        </Grid>
        <Grid xs={12} md={3} display="flex" className="Navgrid">
          
          <nav className="desktop-nav">
            <Link className="about" to="/">Home</Link>
            <Link className="about" to="/about">About</Link>
            <Link className="about" to="/sign">Sign up</Link>
          </nav>
          
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} className="custom-drawer">
            <nav className="mobdraw">
              <ListItem button component={Link} className="moblink" to="/" onClick={toggleDrawer(false)}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button component={Link} to="/sign" onClick={toggleDrawer(false)}>
                <ListItemText primary="Sign up" />
              </ListItem>
            </nav>
          </Drawer>
          <button className="hamburger" onClick={toggleDrawer(true)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>

        </Grid>
      </Grid>

      {/* <SignIn name={hasProfile ? "Login" : "Create a profile"} /> */}

      {/* {isHomePage && (
    <section className="join">
      {user ? (
        <Button onClick={handleSignOut} variant="contained">
          Sign out
        </Button>
      ) : (
        <SignIn name={hasProfile ? "Login" : "Create a profile"} />
      )}
    </section>
  )} */}
    </>
  );
};

export default Nav;
