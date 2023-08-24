import logo from "./logo.svg";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase';
import LinearProgress from '@mui/material/LinearProgress';
import Footer from './components/footer/footer'
import Grid from "@mui/material/Grid"; // Grid version 1

import ProfileContext from './components/users/profilecontext';  // import the context

import Nav from "./components/Top/Nav";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import SignIn from "./signin";
import AuthContext from "./Authcontext";
import Onboarding from "./components/users/onboarding";
import Edit from "./components/users/edit";
import SeachResults from "./components/search/search";
import Featuredcreative from "./components/featuredCreative/featuredCreative";
import About from "./components/about/about"; // import About component
import Admin from "./components/admin/admin"; // import About component
import Sign from "./components/sign/signin";
import Privacy from "./components/users/privacy";
import Terms from "./components/users/terms";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);  // create state for hasProfile


  useEffect(() => {
    console.log(`Has profile: ${hasProfile}`);
  }, [hasProfile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        checkUserProfile(currentUser.uid).then(profileExists => {
          setHasProfile(profileExists); // Set hasProfile state
          localStorage.setItem('hasProfile', profileExists);
        });
      } else {
        setUser(null);
        const profileExists = localStorage.getItem('hasProfile') === 'true';
        setHasProfile(profileExists); // Set hasProfile state
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  const checkUserProfile = async (uid) => {
    const userCollection = collection(db, 'testusers');
    const q = query(userCollection, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      // User profile exists
      return true;
    } else {
      // No user profile found
      return false;
    }
  };
  

  if (loading) { 
    return  <LinearProgress /> ;
  }

  
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
    <ProfileContext.Provider value={hasProfile}>
        <Router>
        <header className="elements">
          <Nav  />
        </header>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-and-conditons" element={<Terms />} />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </Router>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

function MainLayout() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { hasProfile } = useContext(ProfileContext);

  return (

    <>
    <section className="main">


        {location.pathname !== "/about" && (
          <>
            <main className="container">

            <Grid container spacing={2} alignItems="end" >
      <Grid xs={12} md={7} display="flex">
      <main className="intro"
                
              >
                {user ? (
                  <Onboarding />
                ) : (
                  <p>
                    CREATIVE CHORDS
                  </p>
                )}

                {user ? null : <><h3>
                  An index of <br /> 
Creative Technologists 

                </h3></>}
              </main>
      </Grid>
      <Grid xs={12} md={5} display="flex" alignItems="end">
        <p>From interactive design to digital artistry, we cover the spectrum of tech-driven creativity - your ultimate guide to the world of Creative Technology!</p>
      </Grid>
    </Grid>

              
            </main>

            <div className="main-container">
              {user ? null : <SeachResults />}

              <main className="featured">
                {user ? null : <Featuredcreative />}
              </main>

            </div>

            <Footer logo={logo} />
          </>
        )}

      </section></>
  );
}



export default App;
