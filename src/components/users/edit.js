// EditUser.js
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // adjust this path to your firebase.js file

const skillsList = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']; // adjust with your own skill list

const EditUser = () => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if(auth.currentUser) {
      setName(auth.currentUser.displayName);
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    const docRef = doc(db, 'testusers', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserId(docSnap.id);
      setSkills(docSnap.data().skills || {});
    }
  };

  const handleCheckboxChange = (e) => {
    setSkills({...skills, [e.target.value]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      try {
        const docRef = doc(db, 'testusers', userId);
        await updateDoc(docRef, { name: name, skills: skills });
        console.log("Document updated with ID: ", docRef.id);
      } catch (e) {
        console.error('Error updating document: ', e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        readOnly
      />
      {skillsList.map((skill) => (
        <div key={skill}>
          <label>
            <input 
              type="checkbox"
              value={skill}
              checked={!!skills[skill]}
              onChange={handleCheckboxChange}
            />
            {skill}
          </label>
        </div>
      ))}
      <button type="submit">Update user</button>
    </form>
  );
};

export default EditUser;
