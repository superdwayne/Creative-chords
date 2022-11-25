//1st Page Immersive Animation Page 

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
import { Nav, SubText, DarkMode } from './Nav'

const { Anime, stagger } = ReactAnime;

function DrawLines(props) {
  const { width, height } = useThree((state) => state.viewport);
  const ref = useRef();

  useFrame(() => (ref.current.position.x += 0.075))

  // const {position} = useSpring({
  //   position:isClicked ? 2 : 1,
  //   config: config.wobbly
  //   });

  const points = []
  points.push(new Vector3(-width, 10, 0))
  points.push(new Vector3(width, 10, 0))
  // points.push(new Vector3(10, 0, 0))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  // const positions = new Float32Array(points.length * 2)
  return (
    <animated.group  {...props} ref={ref} position={[0, -2.5, -10]}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#000'} linewidth={50} linecap={'round'} linejoin={'round'} />
      </line>
    </animated.group>
  )
}




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


const Logo = ({ children }) => {

  const [playing, setPlaying] = useState(false);
  const handleClick = () => {
    setPlaying(!playing);
  };

  const random = x => {
    return Math.random() * x;
  };
  const animation = [
    {
      targets: ".atomic",
      easing: "easeInOutSine",
      fontSize: "+=22px",
      delay: stagger(80)
    }
  ];

  //  const scatter = [
  //    {
  //      targets: ".atomic",
  //    //   translateX: () => {
  //    //     return random(10);
  //    //   },
  //    //   translateY: () => {
  //    //     return random(-10);
  //    //   },
  //      scale: 2.0,
  //      fontSize: () => {
  //        return random(100);
  //      },
  //    //   fontSize: "+=22px",
  //      direction: "alternate",
  //      easing: "easeInOutSine",
  //      duration: 750
  //    }
  //  ];


  //  const colors = ['#ff0000', '#ff4000']; 
  //  for(let i=0;i<colors.length;i++){
  // var color = colors[i]


  const animation1 = [
    {
      targets: ".atomic",
      // color: colors[i],
      // translateX: [20,20],
      opacity: [0.0, 1.0],
      // fontSize:"+=10px",
      color: ['', '#000'],
      //   delay: stagger(200),
      //   translateX: stagger(100),
      //  direction: "reverse",
      delay: 200,
      // delay: stagger(50),
      easing: 'easeOutSine',

    }
  ];

  // const anim2 = [
  //    {

  //          targets: '.atomic',
  //          points: [
  //            { value: [
  //              '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369',
  //              '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369']
  //            },
  //            { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
  //            { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
  //            { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
  //          ],
  //          easing: 'easeOutQuad',
  //          duration: 2000,
  //          loop: true
  //        });
  //    }
  // ];

  const yMax = 5;
  const idlingAnimation = [
    {
      targets: ".atomic",

      translateY: [
        {
          value: yMax * -1,
        },
        {
          value: yMax,
        },
        {
          value: yMax / -2,
        },
        {
          value: yMax / 2,
        },
        {
          value: 0
        }
      ],
      loop: true,
      duration: 1000,
      direction: 'alternate',
      delay: stagger(200),
      easing: 'easeInOutQuad',
      // duration: 7500,
      // loop: true,
      // d: [
      //   { value: [wave1, wave2] },
      //   { value: wave3 },
      //   { value: wave4 },
      //   { value: wave1 },
      // easing: 'easeInOutQuad',
    }
  ]


  return (
    // <SuperDiv children="Creative Chords" />
    <Anime
      type="h1"
      style={{ scale: '30px' }}
      // fontSize ="20px"
      explode="characters"
      // color=[#ef3550','#f48fb1']

      explodeOptions={{ name: "atomic" }}
      id="self"
      // _onEntering={{ animation1 }}
      _onUpdate={animation1}
      _onUnmount={idlingAnimation}

      _onClick={[
        {
          targets: ".atomic",
          fontSize: "+=22px",
          delay: stagger(100)
        }
      ]}
      // onEntering={{ translateX: [300, 0], opacity: [0., 1], easing: "linear" }}
      _onContextMenu={[
        {
          targets: ".atomic",
          fontSize: "-=22px",
          delay: stagger(100)
        }
      ]}
    >
      {children}
      {/* <Text2D /> */}
    </Anime>
  )
}
const DotLine = ({ color }) => (
  <hr
    style={{
      color: color,
      width: '130%',
      borderBottom: "4px dashed",
      borderTop: 'none',
      marginTop: '10%',
      marginLeft: '43.5%'
    }}
  />
);

const Headline = () => {
  const logo = `Creative \n Chords`;
  return (
    <>
      {/* <div className='new-line'><Logo children={message} /></div> */}
      <SubText />
      <DotLine color='#000' />
      <Nav />
      <div className='new-line'>{logo}</div>
      <DarkMode />
    </>
  )
}


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


export { Headline, DrawLines }


