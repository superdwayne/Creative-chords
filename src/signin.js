import React, { useContext } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import AuthContext from './Authcontext';

const SignIn = (props) => {
  const { user, setUser } = useContext(AuthContext);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signOutWithGoogle = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {user ? (
        <>
          {/* <h1>Signed in as: {user.displayName}</h1> */}
          <button onClick={signOutWithGoogle}>Sign Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>{props.name}</button>
      )}
    </div>
  );
};

export default SignIn;
