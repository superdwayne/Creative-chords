//Carousel section for Members 
import React, { useState, useRef, useEffect } from "react";
import ReactAnime from 'react-animejs'

import { Canvas, useFrame, useThree, useLoader, extend } from "@react-three/fiber";
import {
  RawShaderMaterial,
  Vector2, Vector3, WebGLRenderTarget,
  OrthographicCamera, BufferGeometry,
  BufferAttribute
} from 'three';
import { Scroll, ScrollControls, useScroll, Sky, Stars, Environment } from "@react-three/drei";
import { config, useSpring, animated } from "@react-spring/three";
const { Anime, stagger } = ReactAnime;





// const { width, height } = useThree((state) => state.viewport);
// const ref = useRef();
// useFrame(()=>(ref.current.rotation.x += 0.075))

// const [isClicked, setClicked ] = useState(false);
// const [isHovered, setHovered ] = useState(false);


// return (
//   <animated.mesh {...props} ref={ref} 
//   onClick={()=> setClicked(!isClicked)}
//   onPointerOver={()=> setHovered(true)}
//   onPointerOut={()=> setHovered(false)}
//   scale={scale}>
//     <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//     <meshStandardMaterial attach="material" color={isHovered ? "hotpink" : "black"} />
//     <ambientLight intensity={0.5} />
//     <hemisphereLight intensity={0.4} />
//   </animated.mesh>
// );




const Background = ({ color }) => (
  <div
    style={{
      backgroundColor: color,
      width: '100%',
      height: '100%'
    }}
  />
);


const Carousel = () => {

  return (
    <Background color="#000" />
  )
};

// <div className='header'>
//   <h1
//     style={{
//       position: 'absolute',
//       top: '1vh',
//       left: '7vw',
//       transform: 'translateX(-50%)',
//       color: '#000000',
//     }}>
//     Creative Chords
//   </h1>
//   </div>
/*{ <h1
  style={{
    position: 'absolute',
    top: '140vh',
    left: '50vw',
    transform: 'translateX(-65%)',
    color: '#f4b677'
  }}>
  Your Future
</h1>
<h1
  style={{
    position: 'absolute',
    top: '250vh',
    left: '50vw',
    transform: 'translateX(-50%)',
    color: '#673ab7'
  }}>
  Awaits
</h1> }*/










export { Carousel }


