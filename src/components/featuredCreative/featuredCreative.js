import React, { useEffect, useState } from 'react';
import Member from '../Section/Member';
import { Carousel } from 'react-responsive-carousel';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Featuredcreative() {
  const [featuredMembers, setFeaturedMembers] = useState([]);
  const [randomFeaturedMember, setRandomFeaturedMember] = useState(null);

  useEffect(() => {
    const fetchFeaturedMembers = async () => {
      const userCollection = collection(db, 'testusers');
      const q = query(userCollection, where('featured', '==', true));
      const querySnapshot = await getDocs(q);
      const membersData = querySnapshot.docs.map(doc => doc.data());

      setFeaturedMembers(membersData);
    };

    fetchFeaturedMembers();
  }, []);

  useEffect(() => {
    if (featuredMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * featuredMembers.length);
      setRandomFeaturedMember(featuredMembers[randomIndex]);
    }
  }, [featuredMembers]);

  return (
    <>
      <section>
        {randomFeaturedMember && (
          <><h1>FEATURED CREATIVE</h1><Carousel
            showThumbs={false}
            emulateTouch={true}
            infiniteLoop={true}
            showIndicators={false}
            showStatus={false}
            swipeable={false}
          >
            <div>
              <Member
                introDescription={randomFeaturedMember.about}
                bkname="FEATURED CREATIVE"
                imageSrc={randomFeaturedMember.photoURL}
                imageSrcAlt={randomFeaturedMember.name}
                nameMain={randomFeaturedMember.name}
                company={randomFeaturedMember.company}
                instagram={randomFeaturedMember.instagram}
                linkedin={randomFeaturedMember.linkedin}
                twitter={randomFeaturedMember.twitter} />
            </div>
          </Carousel></>
        )}
      </section>
    </>
  );
}
