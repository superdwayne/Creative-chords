import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const useFirebase = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [userStatus, setUserStatus] = useState({ isUpdating: false, isProfileCreated: false, isApproved: false });


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
  const [isApproved, setIsApproved] = useState(false); // New state variable for profile approval status

  const [hasProfile, setHasProfile] = useState(false);  // create state for hasProfile
  const [isEditing, setIsEditing] = useState(false); // Add this line

  useEffect(() => {
    const checkExistingUser = async () => {
      if (auth.currentUser) {
        setLoading(true);
        const userCollection = collection(db, 'testusers');
        let q = query(userCollection, where('name', '==', auth.currentUser.displayName));
        let querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
          setUserStatus({ isUpdating: true, isProfileCreated: true, isApproved: userData.approved });

        } else {
          const registrationRequestsCollection = collection(db, 'registrationRequests');
          q = query(registrationRequestsCollection, where('name', '==', auth.currentUser.displayName));
          querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setUserStatus({ isUpdating: false, isProfileCreated: true, isApproved: false });
          } else {
            setUserStatus({ isUpdating: false, isProfileCreated: false, isApproved: false });
          }
        }

        setLoading(false);
      }
    };
    checkExistingUser();
  }, []);

  const updateUser = async (newData) => {
    const userDocRef = doc(db, 'testusers', auth.currentUser.uid);
    await setDoc(userDocRef, newData, { merge: true });
    setUserData({ ...userData, ...newData });
  };

  const deleteUser = async () => {
    const confirmInput = prompt("Type 'DELETE' to confirm deletion:");
  
    if (confirmInput === 'DELETE') {
      try {
        const userCollection = collection(db, 'testusers');
        let q = query(userCollection, where('uid', '==', auth.currentUser.uid)); // CHANGE HERE
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docRef = doc(userCollection, querySnapshot.docs[0].id);
          await deleteDoc(docRef);
  
          // remove hasProfile from local storage
          localStorage.removeItem('hasProfile');
          setHasProfile(false); // Update the hasProfile state
  
          await auth.signOut();
  
          setName('');
          setCompany('');
          setSkills([{ skill: '' }]);
          setInstagram('');
          setTwitter('');
          setLinkedin('');
          setAbout('');
  
          setAlertMessage('<h1>User deleted successfully</h1>');
        }
      } catch (e) {
        console.error('Error deleting document: ', e);
        setAlertMessage('An error occurred while deleting the user');
      }
    } else {
      setAlertMessage('Deletion canceled. Please type "DELETE" to confirm.');
    }
  };

  return {
    loading,
    userData,
    userStatus,
    updateUser,
    deleteUser,
  };
};
