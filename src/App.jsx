import logo from "./logo.svg";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

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

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) { 
    return <div className="main container loading"> <h1> Loading...</h1></div>;
  }
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
    
      <Router>
      <header className="elements">
      <Link to="/">
        <img src={logo} className="App-logo" alt="Chords" />
        </Link> 
        <Nav />
      </header>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

function MainLayout() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <section className="main">
      

      {location.pathname !== "/about" && (
        <>
          <main className="container">
            <main className="intro"
              style={{
                display: "block",
                height: "50vh",
                width: "100vw",
                backgroundColor: "#000",
              }}
            >
              {user ? (
                <Onboarding />
              ) : (
                <h1>
                  CREATIVE CHORDS
                </h1>
              )}

              {user ? null : <><h3>
                Creative Chords is an index of talented and innovative Creative Technologists from around the world. 
                <br />From interactive design to digital artistry, we cover the spectrum of tech-driven creativity - your ultimate guide to the world of Creative Technology!
              </h3></>  }
            </main>
          </main>

          <div className="main-container">
            {user ? null : <SeachResults />}

            <main className="featured">
              {user ? null : <Featuredcreative />}
            </main>
            
          </div>
        </>
      )}
    </section>
  );
}

export default App;
