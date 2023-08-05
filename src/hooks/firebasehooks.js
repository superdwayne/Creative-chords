import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const useFirebase = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [userStatus, setUserStatus] = useState({ isUpdating: false, isProfileCreated: false, isApproved: false });

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
    const userCollection = collection(db, 'testusers');
    const q = query(userCollection, where('name', '==', userData.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(userCollection, querySnapshot.docs[0].id);
      await deleteDoc(docRef);
      setUserData({});
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
