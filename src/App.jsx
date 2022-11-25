import React, { useRef, useState, Suspense} from "react";
import { Canvas, useFrame, useThree, useLoader, extend } from "@react-three/fiber";
import { Scroll, ScrollControls, useScroll, Sky, Stars,Environment } from "@react-three/drei";
import {config, useSpring, animated} from "@react-spring/three";
import './App.css';
// import Text from './Text';
import { Scene } from './components/Scene'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader';
let effectSobel;


// Sobel operator
// effectSobel = new ShaderPass( SobelOperatorShader );
// effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
// effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;
// composer.addPass( effectSobel );

  // useFrame(()  {=>
  //   group.current.children[0].material.color = "pink";
  //   // group.current.children[1];
  // });

function Box(props) {
  const { width, height } = useThree((state) => state.viewport);
  const ref = useRef();
  useFrame(()=>(ref.current.rotation.x += 0.075))

const [isClicked, setClicked ] = useState(false);
const [isHovered, setHovered ] = useState(false);

const {scale} = useSpring({
  scale:isClicked ? 2 : 1,
  config: config.wobbly
});

  return (
    <animated.mesh {...props} ref={ref} 
    onClick={()=> setClicked(!isClicked)}
    onPointerOver={()=> setHovered(true)}
    onPointerOut={()=> setHovered(false)}
    scale={scale}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={isHovered ? "hotpink" : "black"} />
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.4} />
    </animated.mesh>
  );
}

  // const { x } = useSpring({ x: 0, from: { x: 1 } })
  // return <a.mesh position-x={x} />
  
  // const { x } = useSpring({ x: 0, from: { x: 1 } })
  // return <a.mesh position={x.to(x => [x, 0, 0])} />
  
  // const { x } = useSpring({ x: [0, 0, 0], from: { x: [1, 0, 0] } })
  // return <a.mesh position={x} />





{/* <animated.group position={y.interpolate(r => ([0, y, 0])} */}




// function Text3D() {
//   const ref = useRef();
//   const meshMat = useRef()

//   const toggle= useState(false);
//   const [isHovered, setHovered ] = useState(false);
//   const [isClicked, setClicked ] = useState(false);


//   // const {opacity} = useSpring({
//   //   opacity:isHovered ? 1 : 0,
//   //   config: config.wobbly
//   // });


//   // const {styles} = useSpring({
//   //   from: { opacity: '0' },
//   //   to: { opacity: '1' },
//   //   config: { duration: '2000' },
//   // });

//   // Update spring with new props
//   // api.start({ opacity: toggle ? 1 : 0 })
//   // Stop animation
//   // api.stop();
// // return <animated.div style={styles}>i will fade</animated.div>
//   // useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.3))
//   return (
//     <animated.group ref={ref} onPointerOver={()=> setHovered(true) }
//     onPointerOut={()=> setHovered(false)}>
//       <Text coordinates={[-4.75 ,3, 0]} scale={[0.5,0.5, 0.001]} text="Creative"  />
//       <Text coordinates={[-4.75,2.5,0]} scale={[0.5,0.5, 0.001]} text="Chord"  />
//       <meshStandardMaterial ref={meshMat} color={isHovered ? 'hotpink' : 'orange'} />
//       {/* <meshStandardMaterial ref={meshMat} attach='material' color={isHovered ? "hotpink" : "black"} /> */}
//     </animated.group>
//   )
// }
// const AnimatedText = animated(Text3D);

// function BouncyHello() {
//   const spring = useSpring({
//     from: { scale: [0, 0, 0] },
//     to: { scale: [10, 10, 10] },
//     config: {
//       friction: 10,
//     },
//     delay: 1000,
//   })
//   return <AnimatedText {...spring}>Hello!</AnimatedText>
// }


// function DrawLines(props){
//   const { width, height } = useThree((state) => state.viewport);
//   const ref = useRef();

//   useFrame(()=>(ref.current.position.x += 0.075))
  
//   const points = []
//   points.push(new Vector3(-width, 10, 0))
//   points.push(new Vector3(width, 10, 0))
//   // points.push(new Vector3(10, 0, 0))

//   const lineGeometry = new BufferGeometry().setFromPoints(points)
  
//   // const positions = new Float32Array(points.length * 2)
//   return (
//       <group  {...props} ref={ref} position={[0, -2.5, -10]}>
//         <line geometry={lineGeometry}>
//           <lineBasicMaterial attach="material" color={'#000'} linewidth={15} linecap={'round'} linejoin={'round'} />
//         </line>
//       </group>
//   )
// }



function App() {
  return (
    <Canvas>
      {/* <DrawLines /> */}
      <ScrollControls horizontal={false} damping={3} pages={3}>
        <Suspense fallback={null}>
        <Scene />
      </Suspense>
        {/* <Scroll><Box position={[1.3,0,0]}/><DrawLines /></Scroll> */}
      </ScrollControls>
      {/* <Sky distance={450000} // Camera distance (default=450000)
  sunPosition={[0, -1, -1]} // Sun position normal (defaults to inclination and azimuth if not set)
  inclination={0} // Sun elevation angle from 0 to 1 (default=0)
  azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
  /> */}

  {/* <Stars
  radius={100} // Radius of the inner sphere (default=100)
  depth={50} // Depth of area where stars should fit (default=50)
  count={5000} // Amount of stars (default=5000)
  factor={4} // Size factor (default=4)
  saturation={0} // Saturation 0-1 (default=0)
  fade // Faded dots (default=false)
/> */}
      <Environment preset="forest" /> 
      {/* sunset: 'venice/venice_sunset_1k.hdr',
  dawn: 'kiara/kiara_1_dawn_1k.hdr',
  night: 'dikhololo/dikhololo_night_1k.hdr',
  warehouse: 'empty-wharehouse/empty_warehouse_01_1k.hdr',
  forest: 'forrest-slope/forest_slope_1k.hdr',
  apartment: 'lebombo/lebombo_1k.hdr',
  studio: 'studio-small-3/studio_small_03_1k.hdr',
  city: 'potsdamer-platz/potsdamer_platz_1k.hdr',
  park: 'rooitou/rooitou_park_1k.hdr',
  lobby: 'st-fagans/st_fagans_interior_1k.hdr', */}

    </Canvas>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Edit <code>src/App.js</code> and save to reload.</p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
