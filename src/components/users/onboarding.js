import React, { useEffect, useState } from 'react';
import {  collection, query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'; 
import SignIn from '../../signin';

const AddUser = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState(''); // new state variable for company
  const [skills, setSkills] = useState([{skill: ''}]);
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [about, setAbout] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [step, setStep] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [featured, setFeatured] = useState(false); // New state for Featured Creative choice
  const [photo, setPhoto] = useState(null); // New state for uploaded photo

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName);

      const checkExistingUser = async () => {
        const userCollection = collection(db, 'testusers');
        const q = query(userCollection, where("name", "==", auth.currentUser.displayName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setName(userData.name);
          setCompany(userData.company); // set company from Firestore data
          setSkills(userData.skills.map(skill => ({skill: skill})) || [{skill: ''}]);
          setInstagram(userData.instagram);
          setTwitter(userData.twitter);
          setLinkedin(userData.linkedin);
          setAbout(userData.about);
          setIsUpdating(true);
        }
      };

      checkExistingUser();
    }
  }, []);

  const addSkill = () => {
    setSkills([...skills, {skill: ''}]);
  };

  const updateSkill = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].skill = value;
    setSkills(updatedSkills);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };


  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const deleteUser = async () => {
    try {
      const userCollection = collection(db, 'testusers');
      const q = query(userCollection, where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(userCollection, querySnapshot.docs[0].id);
        await deleteDoc(docRef);

        setName('');
        setCompany(''); // reset company
        setSkills([{skill: ''}]);
        setInstagram('');
        setTwitter('');
        setLinkedin('');
        setAbout('');

        setAlertMessage('User deleted successfully');
      }
    } catch (e) {
      console.error('Error deleting document: ', e);
      setAlertMessage('An error occurred while deleting the user');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalSkills = skills.map(skillObj => skillObj.skill);

    try {
      const docRef = doc(db, 'testusers', auth.currentUser.uid);

      await setDoc(docRef, {
        name: name,
        company: company,
        skills: finalSkills,
        instagram: instagram,
        twitter: twitter,
        linkedin: linkedin,
        about: about,
        featured: featured,
        photoURL: photo, // set photoURL directly from state
      }, { merge: true });
      
      setAlertMessage('User updated successfully');
    } catch (e) {
      console.error('Error adding/updating document: ', e);
      setAlertMessage('An error occurred while processing the form');
    }

    if (step < 5 && !isUpdating) { // Update step condition
      setStep(step + 1);
    }
  };


  return (
    <>
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <><h1>NAME</h1>
            <input type="text" value={name} readOnly />
            <h1>SKILLS</h1>
            <div className="skills-grid">
            {skills.map((skillObj, index) => (
              <div key={`skill-${index}`}>
                <input
                  type="text"
                  value={skillObj.skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                />
                <button type="button" onClick={() => removeSkill(index)}>Remove this skill</button>
              </div>
            ))}
            </div>
            <button type="button" className='mb20' onClick={addSkill}>Add another skill</button>
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
          <h1>Company</h1>
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <button type="button" onClick={prevStep}>Previous</button>
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {step === 3 && (
          <>
          <h1>SOCIAL</h1>
            <input
              type="text"
              placeholder="Instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
            <input
              type="text"
              placeholder="Twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <button type="button" onClick={prevStep}>Previous</button>
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}


         
        
        {step === 4 && (
          <>
      <h1>FEATURED CREATIVE</h1>
      <label>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <span>I want to be featured</span>
      </label>
      {featured && (
        <>
          <input 
            type="text" 
            placeholder="Image URL" 
            value={photo} 
            onChange={(e) => setPhoto(e.target.value)} 
          />
          <img src={photo} alt="" />
        </>
      )}
      <button type="button" onClick={prevStep}>Previous</button>
      <button type="button" onClick={nextStep}>Next</button>
    </>
        )}

        {step === 5 && (
          <>
         
    <h1>Review Your Profile</h1>
    <div>
      <h3>Name</h3>
      <p>{name}</p>
    </div>
    <div>
      <h3>Photo</h3>
      <img src={photo} alt={name} />
    </div>
    <div>
      <h3>Company</h3>
      <p>{company}</p>
    </div>
    <div>
      <h3>Skills</h3>
      {skills.map((skillObj, index) => (
        <p key={`skill-${index}`}>{skillObj.skill}</p>
      ))}
    </div>
    <div>
      <h3>Instagram</h3>
      <p>{instagram}</p>
    </div>
    <div>
      <h3>Twitter</h3>
      <p>{twitter}</p>
    </div>
    <div>
      <h3>LinkedIn</h3>
      <p>{linkedin}</p>
    </div>
    <button type="button" onClick={prevStep}>Previous</button>
            <input type="submit" value="Submit" />
            <button type="button" onClick={deleteUser}>Delete Profile</button>
  </>
)}
          
        {alertMessage && <p>{alertMessage}</p>}
      </form>
      {!auth.currentUser && <SignIn />}
    </>
  );
};

export default AddUser;
