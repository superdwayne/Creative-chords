import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import SignIn from "../../signin";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { MeshStandardMaterial, Color, BoxGeometry } from "three";
import Grid from "@mui/material/Grid"; // Grid version 1

const AddUser = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState([{ skill: "" }]);
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [about, setAbout] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [step, setStep] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [isApproved, setIsApproved] = useState(false); // New state variable for profile approval status
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false); // create state for hasProfile
  const [isEditing, setIsEditing] = useState(false); // Add this line
  const [skillInput, setSkillInput] = useState("");

  console.log("Profile approved:" + isApproved);
  console.log("Profile created:" + isProfileCreated);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName);

      const googlePhotoURL = auth.currentUser.photoURL;
      if (googlePhotoURL) {
        setPhoto(googlePhotoURL);
      }

      const checkExistingUser = async () => {
        setLoading(false);
        const userCollection = collection(db, "testusers");
        let q = query(userCollection, where("uid", "==", auth.currentUser.uid)); // CHANGE HERE
        let querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setName(userData.name);
          setCompany(userData.company);
          setSkills(
            userData.skills.map((skill) => ({ skill: skill })) || [
              { skill: "" },
            ]
          );
          setInstagram(userData.instagram);
          setTwitter(userData.twitter);
          setLinkedin(userData.linkedin);
          setAbout(userData.about);
          setFeatured(userData.featured);
          setPhoto(userData.photoURL);
          setIsUpdating(true);

          setIsProfileCreated(true);
          setIsApproved(userData.approved); // Set approval status based on the 'approved' field
        } else {
          // Check in 'registrationRequests' if the profile is not found in 'testusers'
          const registrationRequestsCollection = collection(
            db,
            "registrationRequests"
          );
          q = query(
            registrationRequestsCollection,
            where("uid", "==", auth.currentUser.uid)
          ); // CHANGE HERE
          querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // User found in 'registrationRequests'
            setIsProfileCreated(true);
            setIsApproved(false); // Assuming the 'approved' field is false for pending profiles
          } else {
            setIsProfileCreated(false);
          }
        }
      };

      checkExistingUser();
    }
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  const addSkillsFromInput = () => {
    const newSkills = skillInput
      .split(",")
      .map((skill) => ({ skill: skill.trim() }));
    setSkills([...skills, ...newSkills]);
    setSkillInput("");
  };

  const addSkill = () => {
    setSkills([...skills, { skill: "" }]);
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

    if (confirmInput === "DELETE") {
      try {
        const userCollection = collection(db, "testusers");
        let q = query(userCollection, where("uid", "==", auth.currentUser.uid)); // CHANGE HERE
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docRef = doc(userCollection, querySnapshot.docs[0].id);
          await deleteDoc(docRef);

          // remove hasProfile from local storage
          localStorage.removeItem("hasProfile");
          setHasProfile(false); // Update the hasProfile state

          await auth.signOut();

          setName("");
          setCompany("");
          setSkills([{ skill: "" }]);
          setInstagram("");
          setTwitter("");
          setLinkedin("");
          setAbout("");

          setAlertMessage("<h1>User deleted successfully</h1>");
        }
      } catch (e) {
        console.error("Error deleting document: ", e);
        setAlertMessage("An error occurred while deleting the user");
      }
    } else {
      setAlertMessage('Deletion canceled. Please type "DELETE" to confirm.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalSkills = skills
      .map((skillObj) => skillObj.skill)
      .filter((skill) => skill.trim() !== "");

    try {
      if (isUpdating) {
        // Code to update an existing profile
        const userDocRef = doc(db, "testusers", auth.currentUser.uid);
        await setDoc(
          userDocRef,
          {
            name: name,
            company: company,
            skills: finalSkills,
            instagram: instagram,
            twitter: twitter,
            linkedin: linkedin,
            about: about,
            featured: featured,
            photoURL: photo,
            uid: auth.currentUser.uid, // CHANGE HERE
          },
          { merge: true }
        );

        setAlertMessage("User updated successfully");
      } else {
        // Code to create a new profile
        const docRef = doc(db, "registrationRequests", auth.currentUser.uid);
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
          uid: auth.currentUser.uid, // CHANGE HERE
          isNewRegistration: true,
          approved: false,
        });

        setIsProfileCreated(true); // Set the profile created state to true when a new profile is submitted
        setIsApproved(false); // Set the isApproved field to false for new profile submissions

        // After creating a new profile, reset the step to the first step
        setStep(1);
      }

      // Show the appropriate success message
      setAlertMessage(isUpdating ? "User updated successfully" : null);
    } catch (e) {
      console.error("Error adding/updating document: ", e);
      setAlertMessage("An error occurred while processing the form");
    }
  };

  const renderProfileOverview = () => (
    <main className="main">
      <div className="profile">
        <p>Welcome {name} </p>
        <p>
          <img src={photo} className="half" />{" "}
        </p>
        <p>
          <strong>Company:</strong> {company}
        </p>
        <p>
          <strong>Skills:</strong>{" "}
          {skills.map((skillObj) => skillObj.skill).join(", ")}
        </p>
        <p>
          <strong>Instagram:</strong> {instagram}
        </p>
        <p>
          <strong>Twitter:</strong> {twitter}
        </p>
        <p>
          <strong>LinkedIn:</strong> {linkedin}
        </p>
        <p>
          <strong>About:</strong> {about}
        </p>
        <button type="button" onClick={deleteUser}>
          Delete Profile
        </button>
        <button type="button" onClick={toggleEditing}>
          Update Profile
        </button>{" "}
      </div>
    </main>
  );

  const renderUpdateForm = () => (
    <main className="main height100percent">
      <p>Complete your profile</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={company}
          placeholder="Company"
          onChange={(e) => setCompany(e.target.value)}
        />

<label>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span>I woud like to be a featured Creative?</span>
            </label>

            {featured && (
                <>
            <div>
              <p>Current Profile photo</p>
              <img src={photo} alt="" className="half" />
            </div>
      
          <p>Use a different image URL:</p>
          <input
          className="90width"
            type="text"
            placeholder="Image URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
      
                  <p>BIO</p>
                  <input
                    type="text"
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </>
              )}

        <p>Social</p>

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
          placeholder="Linked-in"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <p>Skills</p>

        <input
          type="text"
          placeholder="Enter skills separated by commas"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkillsFromInput();
            }
          }}
        />
        <button type="button" onClick={addSkillsFromInput}>
          Add Skills
        </button>

        <div className="skills-grid">
          {skills.map((skillObj, index) => (
            <div key={`skill-${index}`} className="skill-container">
              <p className="skill">{skillObj.skill}</p>
              <span className="remove-skill" onClick={() => removeSkill(index)}>
                X
              </span>
            </div>
          ))}
        </div>

        {auth.currentUser ? (
          <input
            type="submit"
            value={isUpdating ? "Update profile" : "Complete profile"}
          />
        ) : null}

        {isProfileCreated ? (
          <button type="button" onClick={deleteUser}>
            Delete Profile
          </button>
        ) : null}

        {isUpdating && (
        <button type="button" onClick={toggleEditing}>
          Back to Profile
        </button>
      )}
      </form>

      {/* <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>  
              <h1>NAME</h1>
              <TextField onChange={(e) => setName(e.target.value)} defaultValue={name} />
              <h1>SKILLS</h1>
              <div className="skills-grid">
                {skills.map((skillObj, index) => (
                  <div key={`skill-${index}`}>
                    <input
                      type="text"
                      value={skillObj.skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                    /> <button type="button" onClick={() => removeSkill(index)}>Remove this skill</button>
                  </div>
                ))}
              </div>
              {auth.currentUser && isProfileCreated ? <input type="submit" value={isUpdating ? 'Update profile' : 'Complete profile'} /> : null}

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
                <div>
          <h3>Current Featured Image:</h3>
          <img src={photo} alt="" />
        </div>
        <label>
          <span>Use a different image URL:</span>
          <input
            type="text"
            placeholder="Image URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </label>
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
              {auth.currentUser ? <input type="submit" value={isUpdating ? 'Update profile' : 'Complete profile'} /> : null}
              {isProfileCreated ? <button type="button" onClick={deleteUser}>Delete Profile</button> : null} 
            </>
          )}
        </form> */}
    </main>
  );

  return (
    <>
      {!isEditing && isProfileCreated && isApproved
        ? renderProfileOverview()
        : isUpdating ||
          (isProfileCreated && isApproved) ||
          (!isProfileCreated && !isApproved)
        ? renderUpdateForm()
        : null}

      {isProfileCreated && !isApproved ? (
        <div className="pending">
          <p>Thanks for signing up, you are number #10 on the waiting list</p>
          <p>Share your excitement to get up the waitlist! 💙</p>
          <p>@cre8tive_chords</p>
          
          {/* <h3>Your profile has been submitted for approval and will be visible once approved.</h3> */}
        </div>
      ) : null}
      {alertMessage && <p>{alertMessage}</p>}
    </>
  );
};

export default AddUser;
