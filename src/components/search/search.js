import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase'; // adjust this path to your firebase.js file

export default function Search() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, 'testusers'));
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const filteredUsers = searchTerm.length > 2
  ? users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.skills && user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())))
    )
  : [];

  return (
    <>
      <input
      className='Search'
        type="text"
        placeholder="Search by skill e.g WebGL"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      {searchTerm.length > 2 && (
        <div className="table-container">
          <div className="table-row heading">
            <div className="row-item">Name</div>
            <div className="row-item">Company</div>
            <div className="row-item">Skills</div>
            <div className="row-item">Social</div>
          </div>
          {filteredUsers.map((user, index) => (
            <div className="table-row" key={index}>
              <div className="row-item">{user.name}</div>
              <div className="row-item">{user.company}</div>

              <div className="row-item">
                <p style={{ padding: 5, backgroundColor: '#ff00ff' }}>
                {user.skills && user.skills.length > 0 ? user.skills.join(', ') : 'No skills'}
                </p>
              </div>
              <div className="row-item">
                <a href={user.linkedin} target="_blank" rel="noreferrer">
                  <img className='indexsocial' src="/images/in.png" alt="Linked-in" />
                </a>
                <a href={user.twitter} target="_blank" rel="noreferrer">
                  <img className='indexsocial' src="/images/tw.png" alt="Twitter" />
                </a>
                <a href={user.instagram} target="_blank" rel="noreferrer">
                  <img className='indexsocial' src="/images/insta.png" alt="Instagram" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
