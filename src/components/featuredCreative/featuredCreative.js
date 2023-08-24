import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';  
import { db } from '../../firebase';
import Grid from "@mui/material/Grid";
import './featuredCreative.css'

export default function Featuredcreative() {
  const [members, setMembers] = useState([]);

  // Fisher-Yates (aka Durstenfeld) array shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const fetchAllMembers = async () => {
      const userCollection = collection(db, 'testusers');
      const querySnapshot = await getDocs(userCollection);
      const membersData = querySnapshot.docs.map(doc => doc.data()).filter(member => member.photoURL); 
      setMembers(shuffleArray(membersData));  
    };

    fetchAllMembers();
  }, []);

  return (
    <section>
      {members.length > 0 && (
        <>
        <Grid container spacing={2} alignItems="end" className="featuredcreative">
            <Grid xs={12} md={7} display="flex">
              <main className="featuredcreative" >
                <p>
                  FEATURED CREATIVES
                </p>
              </main>
            </Grid>
            <Grid xs={12} md={5} display="flex" alignItems="center"></Grid>
          </Grid>
          <div className="horizontal-scroll-container">
            {members.map(member => (
              <div className="member-container" key={member.name}>
                <img src={member.photoURL} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.company}</p>
                {/* <p>{member.about}</p> */}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Styles for horizontal scroll and hover bio */}
      <style jsx>{`
        .horizontal-scroll-container {
          display: flex;
          overflow-x: scroll;
          white-space: nowrap;
          gap: 1rem;
          width: 100%;
          box-sizing: border-box;
        }

        .member-container {
          flex: 0 0 auto;
          width: 25%;
          position: relative;
          
          cursor: pointer;
          overflow: hidden;
          padding-right: 4rem;
          transition: background-color 0.3s;
        }

        .hover-bio {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 80%; 
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          opacity: 0;
          transition: opacity 0.3s;
          padding: 10px;
          text-align: center;
          border-radius: 8px; 
          pointer-events: none; 
        }

        .member-container:hover {
          background-color: rgba(0, 0, 0, 0.1); 
        }

        .member-container:hover .hover-bio {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
