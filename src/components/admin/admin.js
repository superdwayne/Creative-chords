import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminDashboard = () => {
  const [registrationRequests, setRegistrationRequests] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // To store the user ID for the selected request

  useEffect(() => {
    // Fetch pending registration requests from Firestore
    const fetchRegistrationRequests = async () => {
      const requestsCollection = collection(db, 'registrationRequests');
      const querySnapshot = await getDocs(requestsCollection);
      const requestsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRegistrationRequests(requestsData);
    };

    fetchRegistrationRequests();
  }, []);

  const approveUser = (userId) => {
    setSelectedUserId(userId); // Store the user ID for the selected request
  };

  const handleApproveConfirmation = async () => {
    if (selectedUserId) {
      try {
        // Construct the correct DocumentReference
        const requestDocRef = doc(db, 'registrationRequests', selectedUserId);

        // Fetch the registration request data using getDoc instead of getDocs
        const requestSnapshot = await getDoc(requestDocRef);
        if (requestSnapshot.exists()) {
          const requestData = requestSnapshot.data();

          // Check if the user already exists in 'testusers' collection
          const testUsersDocRef = doc(db, 'testusers', selectedUserId);
          const testUsersSnapshot = await getDoc(testUsersDocRef);

          if (!testUsersSnapshot.exists()) {
            // Create a new document in 'testusers' collection using the same user data
            const testUsersCollection = collection(db, 'testusers');
            await setDoc(doc(testUsersCollection, selectedUserId), {
              ...requestData,
              isNewRegistration: true, // Set the isNewRegistration field to true for new registrations
            });
          } else {
            // Update the existing document in 'testusers' collection for profile updates
            await setDoc(testUsersDocRef, requestData, { merge: true });
          }

          // Delete the registration request from 'registrationRequests' collection
          await deleteDoc(requestDocRef);

          // Update the local state to remove the approved request
          setRegistrationRequests(prevRequests => prevRequests.filter(request => request.id !== selectedUserId));

          console.log('User approved and moved to testusers collection (if first-time registration).');
        } else {
          console.error('Error: Requested document does not exist.');
        }
      } catch (error) {
        console.error('Error approving user:', error);
      } finally {
        setSelectedUserId(null); // Reset selectedUserId after approval
      }
    }
  };

  const rejectUser = async (userId) => {
    try {
      // Delete the registration request from 'registrationRequests' collection
      const requestDocRef = doc(db, 'registrationRequests', userId);
      await deleteDoc(requestDocRef);

      // Update the local state to remove the rejected request
      setRegistrationRequests(prevRequests => prevRequests.filter(request => request.id !== userId));
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  // Filter out users who are not new registrations
  const pendingRegistrationRequests = registrationRequests.filter(request => request.isNewRegistration);

  return (
    <section className="main">
      <div className='container'>
        <h1>Admin Dashboard</h1>
        {pendingRegistrationRequests.length > 0 ? (
          <ul>
            {pendingRegistrationRequests.map(request => (
              <li key={request.id}>
                <p>Name: {request.name}</p>
                <p>Company: {request.company}</p>
                <button onClick={() => approveUser(request.id)}>Approve</button>
                <button onClick={() => rejectUser(request.id)}>Reject</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending registration requests.</p>
        )}

        {/* Confirmation modal */}
        {selectedUserId && (
          <div className="confirmation-modal">
            <p>Are you sure you want to approve this user?</p>
            <button onClick={handleApproveConfirmation}>Yes</button>
            <button onClick={() => setSelectedUserId(null)}>No</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
