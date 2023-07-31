import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import SignIn from '../../signin';

const AddUser = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState([{ skill: '' }]);
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [about, setAbout] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [step, setStep] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName);

      const checkExistingUser = async () => {
        const userCollection = collection(db, 'testusers');
        const q = query(userCollection, where('name', '==', auth.currentUser.displayName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setName(userData.name);
          setCompany(userData.company);
          setSkills(userData.skills.map(skill => ({ skill: skill })) || [{ skill: '' }]);
          setInstagram(userData.instagram);
          setTwitter(userData.twitter);
          setLinkedin(userData.linkedin);
          setAbout(userData.about);
          setFeatured(userData.featured);
          setPhoto(userData.photoURL);
          setIsUpdating(true);
        }
      };

      checkExistingUser();
    }
  }, []);

  const addSkill = () => {
    setSkills([...skills, { skill: '' }]);
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
    const confirmInput = prompt("Type 'DELETE' to confirm deletion:");

    if (confirmInput === 'DELETE') {
      try {
        const userCollection = collection(db, 'testusers');
        const q = query(userCollection, where('name', '==', name));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docRef = doc(userCollection, querySnapshot.docs[0].id);
          await deleteDoc(docRef);

          await auth.signOut();

          setName('');
          setCompany('');
          setSkills([{ skill: '' }]);
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
    } else {
      setAlertMessage('Deletion canceled. Please type "DELETE" to confirm.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalSkills = skills.map(skillObj => skillObj.skill).filter(skill => skill.trim() !== '');

    try {
      if (isUpdating) {
        const userDocRef = doc(db, 'testusers', auth.currentUser.uid);
        await setDoc(userDocRef, {
          name: name,
          company: company,
          skills: finalSkills,
          instagram: instagram,
          twitter: twitter,
          linkedin: linkedin,
          about: about,
          featured: featured,
          photoURL: photo,
        }, { merge: true });
      } else {
        const docRef = doc(db, 'registrationRequests', auth.currentUser.uid);
        await setDoc(docRef, {
          name: name,
          company: company,
          skills: finalSkills,
          instagram: instagram,
          twitter: twitter,
          linkedin: linkedin,
          about: about,
          featured: featured,
          photoURL: photo,
          isNewRegistration: true,
          approved: false,
        });

        setIsProfileCreated(true); // Set the profile created state to true when a new profile is submitted
      }

      setAlertMessage(isUpdating ? 'User updated successfully' : null);
    } catch (e) {
      console.error('Error adding/updating document: ', e);
      setAlertMessage('An error occurred while processing the form');
    }

    if (step < 5 && !isUpdating) {
      setStep(step + 1);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h1>NAME</h1>
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
              placeholder="Instagram Handle"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
            <input
              type="text"
              placeholder="Twitter Handle no @"
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
                <h1>BIO</h1>
                <input
                  type="text"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
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
            {featured && (
              <div>
                <h3>Photo</h3>
                <img src={photo} alt={name} />
              </div>
            )}
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
            {auth.currentUser ? <input type="submit" value={isUpdating ? 'Update user' : 'Submit'} /> : null}
            <button type="button" onClick={deleteUser}>Delete Profile</button>
          </>
        )}

        {isProfileCreated && (
          <div className="overlay">
            <div className="popup">
              <p>Your profile will be ready within 24 hours.</p>
              <p>If you want to speed up the process, follow us on social media.</p>
              <button onClick={() => setIsProfileCreated(false)}>Close</button>
            </div>
          </div>
        )}

        {alertMessage && <p>{alertMessage}</p>}
      </form>
      {!auth.currentUser && <SignIn />}
    </>
  );
};

export default AddUser;
