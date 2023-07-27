import React, { useEffect, useState } from 'react';
import Member from "../Section/Member";
import { Carousel } from "react-responsive-carousel";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase'; 

export default function Featuredcreative() {
    const [featuredMembers, setFeaturedMembers] = useState([]);

    useEffect(() => {
        const fetchFeaturedMembers = async () => {
            const userCollection = collection(db, 'testusers');
            const q = query(userCollection, where("featured", "==", true));
            const querySnapshot = await getDocs(q);
            const membersData = querySnapshot.docs.map(doc => doc.data());

            setFeaturedMembers(membersData);
        };

        fetchFeaturedMembers();
    }, []);

    return (
      <>
       <section>
                <h1>
                  FEATURED <br /> CREATIVE
                </h1>
  
                <Carousel
                  showThumbs={false}
                  emulateTouch={true}
                  infiniteLoop={true}
                  showIndicators={false}
                  showStatus={false}
                  swipeable={false}
                >
                  {featuredMembers.map((member, index) => (
                    <div key={index}>
                        <Member
                          bkname="DPM"
                          imageSrc={member.photoURL}
                          imageSrcAlt={member.name}
                          nameMain={member.name}
                          company={member.company}
                          instagram={member.instagram}
                          linkedin={member.linkedin}
                          twitter={member.twitter}
                        />
                    </div>
                  ))}
                </Carousel>
              </section>
      </>
    )
}
