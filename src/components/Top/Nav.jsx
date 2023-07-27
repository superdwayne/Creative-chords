// Nav.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Authcontext';
import { auth } from '../../firebase';

const Nav = () => {
  const { user } = useContext(AuthContext);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <>
      <nav className='nav'>
        <h1><Link to="/about">About</Link></h1>
      </nav>

      <section className="join">
        {user ? (
            <button onClick={handleSignOut}>Sign out</button>
        ) : (
            null
        )}
      </section>
    </>
  );
};

export default Nav;
