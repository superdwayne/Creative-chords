// SignIn.js
import React, { useContext } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './firebase'; // adjust the path if necessary
import AuthContext from './Authcontext'; // adjust the path if necessary

const SignIn = (props) => {
    const { user, setUser } = useContext(AuthContext);

    const signInWithGoogle = () => {      
        signInWithPopup(auth, provider)
        .then((result) => {
            setUser(result.user);
        }).catch((error) => {
            console.error(error);
        });
    }

    const signOutHandler = () => {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {
            console.error(error);
        });
    }
  
    return (
        <div>
            {user ? (
            <>
                {/* <h1>Signed in as: {user.displayName}</h1> */}
                <button onClick={signOutHandler}>Sign Out</button>
            </>
            ) : (
            <button onClick={signInWithGoogle}>{props.name}</button>
            )}
        </div>
    );
};
  
export default SignIn;
