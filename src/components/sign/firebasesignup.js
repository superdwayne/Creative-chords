import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import 'firebase/auth';

function Firebasesignup() {
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleTermsChange = (event) => {
        setIsTermsAccepted(event.target.checked);
    };

    const handleGoogleSignup = async () => {
        if (!isTermsAccepted) {
            setError('You must accept the terms and conditions to sign up.');
            return;
        }

        const provider = new initializeApp.auth.GoogleAuthProvider();

        try {
            const result = await initializeApp.auth().signInWithPopup(provider);
            setUser(result.user);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {user ? (
                <div>Welcome, {user.displayName}!</div>
            ) : (
                <div className='dashed'>
                <img onClick={handleGoogleSignup} src='images/Fixed.png' alt='Sign up with Google' />
                    <label>
                        <input
                            type="checkbox"
                            checked={isTermsAccepted}
                            onChange={handleTermsChange}
                        />
                        By signing up you agree to the terms and conditions
                    </label>
                   
                    {error && <div>{error}</div>}
                </div>
            )}
        </div>
    );
}

export default Firebasesignup;
