import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../Authcontext';
import { auth } from '../../firebase';
import SignIn from '../../signin';

const Nav = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error(error);
    });
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav className='nav'>
        <h1><Link className='about' to="/about">About</Link></h1>
        <h1><Link className='about' hidden to="/admin">admin</Link></h1>
      </nav>

      {isHomePage && (
        <section className="join">
          {user ? (
            <button onClick={handleSignOut}>Sign out</button>
          ) : (
            <SignIn name="Create a profile" />
          )}
        </section>
      )}
    </>
  );
};

export default Nav;
