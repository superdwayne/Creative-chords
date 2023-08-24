import React, { useState } from 'react';
import { db } from '../../firebase';
import { Link, useLocation } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

function EmailSubscription() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'subscriptions'), { email, timestamp: new Date() });
      setMessage('Thanks for subscribing!');
    } catch (error) {
        console.error(error); 
      setMessage('There was an error. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="footerSignup">
        <input
          type="email"
          placeholder="Enter your email for updates"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      <small>By signing up you agree to our <Link className='about'  to="/privacy-policy">Privacy policy</Link> </small>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EmailSubscription;
