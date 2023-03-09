import logo from './logo.svg'
import React, { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import Member from './components/Section/Member'
import Nav from './components/Top/Nav'
import { Canvas } from "@react-three/fiber";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

function App() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  return (
    <section className="main">
      <header className="elements">
          <img src={logo} className="App-logo" alt="Chords" /> 
          <h1>Creative Chords</h1>
          <Nav />
          <section className='join'>
          <h1>Join us</h1>
          </section>
      </header>

      <main className="container">

        <main className="intro"
          style={{
            display: "block",
            height: "60vh",
            width: "100vw",
            backgroundColor: "#000",
          }}
        >
        <h1>
            CREATIVE <br /> CHORDS
          </h1>
        <h3>
        Creative Chords is an index of talented and innovative Creative Technologists <br /> from around the world - your ultimate guide to the world of Creative Technology!        </h3>
        
        </main>
      </main>
      <main className="featured">
        <section>
          <h1>
            FEATURED <br /> CREATIVE
          </h1>

          <Carousel showThumbs={false} emulateTouch={true} infiniteLoop={true} showIndicators={false} showStatus={false} swipeable={false}>
          
          <div>
            <Member bkname="DPM" 
            imageSrc = './images/DPM.png'
            imageSrcAlt ='DPM'
            nameMain = 'DPM'
            introDescription = 'A Creative Technologist is a professional who combines a deep understanding of technology with a creative mindset to develop innovative solutions to complex problems. They are skilled in using technology to create unique and engaging user experiences, often working on projects that involve web and mobile applications, interactive installations'
            company = 'AKQA'
            instagram = 'https://www.instagram.com/ddpmarshall/'
            linkedin = 'https://www.linkedin.com/in/ddpmarshall/'
            twitter = 'https://twitter.com/DDP_Marshall'
             />
           </div> 

           <div>
            <Member bkname="Nikola" 
            imageSrc = './images/Nikolaibibo.png'
            imageSrcAlt ='Nikolaibibo'
            nameMain = 'Nikolaibibo'
            introDescription = 'innovation FTW'
            company = 'Google'
             />
           </div> 
           <div>
            <Member bkname="YOSHI" 
            imageSrc = './images/YOSHI.png'
            imageSrcAlt ='Yoshi'
            nameMain = 'Yoshi'
            introDescription = 'test'
            company = 'test'
            website = 'https://www.yoshitsugukosaka.com'
            instagram = ''
            twitter = ''
            linkedin = ''
             />
           </div> 


          </Carousel>
        </section>
      </main>
     
    </section>
  );
}

export default App;
