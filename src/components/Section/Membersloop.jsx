
import React from "react";
import Member from './Member'

function MemberLoop() {
    const MemberLoop = [
        {
            name: 'DPM',
            bkname: 'DPM',
            imageSrc: './images/DPM.png',
            imageSrcAlt: 'DPM',
            nameMain: 'DPM',
            introDescription: 'A Creative Technologist is a professional who combines a deep understanding of technology with a creative mindset to develop innovative solutions to complex problems. They are skilled in using technology to create unique and engaging user experiences, often working on projects that involve web and mobile applications, interactive installations',
            company: 'AKQA',
            instagram: 'https://www.instagram.com/ddpmarshall/',
            linkedin: 'https://www.linkedin.com/in/ddpmarshall/',
            twitter: 'https://twitter.com/DDP_Marshall',
        },
        {
            name: 'DPM',
            bkname: 'DPM',
            imageSrc: './images/DPM.png',
            imageSrcAlt: 'DPM',
            nameMain: 'DPM',
            introDescription: 'A Creative Technologist is a professional who combines a deep understanding of technology with a creative mindset to develop innovative solutions to complex problems. They are skilled in using technology to create unique and engaging user experiences, often working on projects that involve web and mobile applications, interactive installations',
            company: 'AKQA',
            instagram: 'https://www.instagram.com/ddpmarshall/',
            linkedin: 'https://www.linkedin.com/in/ddpmarshall/',
            twitter: 'https://twitter.com/DDP_Marshall',
        },
        
    ]
    
      const InevitablePostsLoop = Object.keys(MemberLoop).map((title, i) => {

        return (
            <div>
                  <Member 
        name={MemberLoop[i].name}
        bkname={MemberLoop[i].bkname}
        imageSrc={MemberLoop[i].imageSrc} 
        imageSrcAlt={MemberLoop[i].imageSrcAlt} 
        nameMain={MemberLoop[i].nameMain}
        introDescription={MemberLoop[i].introDescription}
        company={MemberLoop[i].company}
        instagram={MemberLoop[i].instagram}
        linkedin={MemberLoop[i].linkedin}
        twitter={MemberLoop[i].twitter}
      
        />
            </div>     
           
           
          );
      }) 

  return (

<div>
  {InevitablePostsLoop}
</div>
    
     


  );
}

export default MemberLoop;
