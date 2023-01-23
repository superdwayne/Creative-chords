import React, { useRef, useState, Suspense, useLayoutEffect } from "react";
import * as THREE from "three";
import Member from './components/Section/Member'
import { Nav, DarkMode } from './components/Top/Nav'
import { Logo } from './components/Top/Logo'
import { Text } from './components/Text'
import {
  Canvas,
  useFrame,
  useThree,
  useLoader,
  extend,
} from "@react-three/fiber";

import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";

import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";


import {
  Scroll,
  ScrollControls,
  Stars,
  Lathe,
  CameraShake, 
  Environment,
  OrbitControls,
  Effects,
  Image
} from "@react-three/drei";
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';


import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";


extend({GlitchPass, BloomPass });
RectAreaLightUniformsLib.init();


function Light() {
  const ref = useRef()
  useFrame((_) => (ref.current.rotation.x = _.clock.elapsedTime))
  return (
    <group ref={ref}>
      <rectAreaLight width={15} height={100} position={[30, 30, -10]} intensity={5} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </group>
  )
}

function Rig() {
  const [vec] = useState(() => new THREE.Vector3())
  const { camera, mouse } = useThree()
  useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.05))
  return <CameraShake maxYaw={0.01} maxPitch={0.01} maxRoll={0.01} yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.4} />
}



function Imagemap() {
  const ref = useRef()
  useFrame(() => {
    ref.current.material.zoom = 1 // 1 and higher
    ref.current.material.grayscale = 0 // between 0 and 1
    ref.current.material.color.set(0x7289da) // mix-in color
  })
  return <Image ref={ref} position={[0,-5,0]} scale={20} transparent url="./images/icon_clyde_white_RGB.png" />
}

function LatheScene() {
  const points = React.useMemo(() => {
    const points = [THREE.Vector2];
    for (let i = 0; i < 10; i++) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }

    return points;
  }, []);

  return (
    <Lathe args={[points]} rotation={[-0.2, 0.7, 1.5]} scale={[0.9, 6, 0.9]}>
      <meshStandardMaterial color="white" wireframe />
    </Lathe>
  );
}


function Title(){
  const titleRef = useRef();
  const logoRef = useRef();
  useLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(titleRef.current,{
      opacity:0, duration: 0.1, ease: "power3.inOut", display:'none', scrollTrigger: {
      trigger: logoRef.current,
      start: "top",
      end: "top 50%",
      markers: true,
      stagger: 0.1,
      scrub: true,
    }
    });
    
    gsap.to(logoRef.current,{
      opacity:0, duration: 0.1, ease: "power3.inOut", scrollTrigger: {
      trigger: logoRef.current,
      start: "top top",
      end: "bottom top",
      markers: true,
      scrub: true,
    }
    });

    gsap.to(logoRef.current,{
      scale: 0.25, duration: 0.25, xPercent: -120, ease: "power3.inOut", scrollTrigger: {
      trigger: logoRef.current,
      start: "top",
      end: "top 30%",
      markers: true,
      stagger: 0.7,
      scrub: true,
    }
    });
  },[]);
  
// ---------
  return (
    <section ref={titleRef} className="title">
    
     {/* <h1 className="headerTitle">
       CREATIVE <br /> CHORDS
     </h1> */}
     <div ref={logoRef}>
     <Logo/>
     </div>

   </section>
  )
};

function App() {
  // const ref = useRef();
  // useFrame((state) => (ref.current.time = state.clock.elapsedTime * 3))

  return (
    <section className="main">
      <header className="elements">
        <section>
        </section>
        <section>
          {/* <Nav/> */}
        </section>
      </header>
      <main className="container" >
        <Title />
        <section>
           <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 160, 160], fov: 20 }} 
           style={{
            display: "block",
            height: "100vh",
            width: "100vw",
            display: 'flex',
            zIndex:"1",
            backgroundColor: "#000",
          }}>
      <fog attach="fog" args={['lightpink', 60, 100]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        {/* <Model position={[-4.5, -4, 0]} rotation={[0, -2.8, 0]} /> */}
        <spotLight position={[50, 50, -30]} castShadow />
        <pointLight position={[-10, -10, -10]} color="" intensity={3} />
        <pointLight position={[0, -5, 5]} intensity={0.5} />
        <directionalLight position={[0, -5, 0]} color="blue" intensity={2} />
        <Light />
        <Environment preset="warehouse" />
        <Rig />
      </Suspense>
      <OrbitControls makeDefault />
          <ScrollControls
            pages={1.1} // Each page takes 100% of the height of the canvas
            distance={1} // A factor that increases scroll bar travel (default: 1)
            damping={4} // Friction, higher is faster (default: 4)
            horizontal={false} // Can also scroll horizontally (default: false)
            infinite={false} // Can also scroll infinitely (default: false)
          >
            <Scroll>
              <ambientLight />
              <LatheScene />
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
              />
            </Scroll>
            <Scroll html className="wide" id="mission">
              <h1 style={{ color: "white" }}>
                {" "}
                MISSION
                <br />
                MISSION
                <br />
                MISSION{" "}
              </h1>
              <h2 style={{ color: "white" }}>
                {" "}
                Innovate as a community to shape the world of web3.0 and beyond
              </h2>
            </Scroll>
          </ScrollControls>
        </Canvas>
        </section>
      </main>
      <main className="featured" id="profiles">
        <section>
          <h1>
            FEATURED <br /> CREATIVE
          </h1>
          <Carousel showThumbs={false} emulateTouch={true} infiniteLoop={true} showIndicators={false} showStatus={false} swipeable={true}>
          
          <div>
            <Member bkname="DPM" 
            imageSrc = './images/DPM.png'
            imageSrcAlt ='DPM'
            nameMain = 'DPM'
            introDescription = 'Just a dreamer and a realist, I curate experiences I push boundaries, I am always thinking, always learning and always up for a challange.'
            company = 'AKQA'
            website = ''
            instagram = ''
            twitter = ''
            linkedin = ''
             />
           </div> 

           <div>
            <Member bkname="Nikola" 
            imageSrc = './images/Nikolaibibo.png'
            imageSrcAlt ='Nikolaibibo'
            nameMain = 'Nikolaibibo'
            introDescription = 'innovation FTW'
            company = 'Google'
            website = ''
            instagram = ''
            twitter = ''
            linkedin = ''
             />
           </div> 

           <div>
            <Member bkname="YOSHI" 
            imageSrc = './images/YOSHI.png'
            imageSrcAlt ='Yoshi'
            nameMain = 'Yoshi'
            introDescription = 'test'
            company = 'Ford'
            website = 'https://www.yoshitsugukosaka.com'
            instagram = ''
            twitter = ''
            linkedin = ''
             />
           </div> 

          </Carousel>
        </section>
      </main>
      {/* <footer id='joinus'>
        <Canvas
          gl={{ alpha: true }}
          camera={{ fov: 55, near: 0.1, far: 1000, position: [0, 0, 40]}}
          style={{
            backgroundColor: "black",
            display: "block",
            // position: "relative",
            // height: "100vh",
            // width: "100vw",
          }}
        >
        <ScrollControls
            pages={1.0} // Each page takes 100% of the height of the canvas
            distance={2} // A factor that increases scroll bar travel (default: 1)
            damping={4} // Friction, higher is faster (default: 4)
            horizontal={false} // Can also scroll horizontally (default: false)
            infinite={false} // Can also scroll infinitely (default: false)
          >
            <Scroll>
          <ambientLight />
          <Effects multisamping={8} >
      <glitchPass attachArray="passes" />
    </Effects>
          <gridHelper
            rotation={[0.8, 1.58, 2.26]}
            args={[160, 150, 20, "white"]}
            position={[1, 0, -2]}
          />
         <Imagemap/>
         <gridHelper
            rotation={[0.8, 1.58, 2.5]}
            args={[160, 50, 20, "white"]}
            position={[0, -20, -2]}
          />
         
          </Scroll>
        </ScrollControls>
        </Canvas>
      </footer> */}
    </section>
  );
}

export default App;






