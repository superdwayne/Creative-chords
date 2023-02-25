import React, { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Sobel } from '@react-three/postprocessing'
import { a } from "react-spring";
import { useScroll } from "@react-three/drei";



const Model = ({ modelPath, scale = 1, position = [0, 0, -100] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = useState(false);
  const data = useScroll();
  useFrame((state, delta) => (ref.current.rotation.y += 0.0001));
  useFrame((state, delta) => (ref.current.position.x -= 0.001));
  // useFrame(( => (data.delta));

  useFrame(() => {
    // // data.offset = current scroll position, between 0 and 1, dampened
    // // data.delta = current delta, between 0 and 1, dampened

    // // Will be 0 when the scrollbar is at the starting position,
    // // then increase to 1 until 1 / 3 of the scroll distance is reached
    // const a = data.range(0, 1 / 3)
    // // Will start increasing when 1 / 3 of the scroll distance is reached,
    // // and reach 1 when it reaches 2 / 3rds.
    // const b = data.range(1 / 3, 1 / 3)
    // // Same as above but with a margin of 0.1 on both ends
    // const c = data.range(1 / 3, 1 / 3, 0.1)
    // // Will move between 0-1-0 for the selected range
    // const d = data.curve(1 / 3, 1 / 3)
    // // Same as above, but with a margin of 0.1 on both ends
    // // const d = data.curve(1 / 3, 1 / 3, 0.1)
    // // Returns true if the offset is in range and false if it isn't
    // const e = data.visible(2 / 3, 1 / 3)
    // // The visible function can also receive a margin
    // const f = data.visible(2 / 3, 1 / 3, 0.1)
  })
  return (
    <>
      <mesh ref={ref} visible={true} scale={[0.1, 0.1, 0.1]} rotation={[0, 180, 0]} castShadow receiveShadow >
        <primitive
          // ref={ref}
          object={gltf.scene}
          position={position}
          scale={hovered ? scale * 1.1 : scale}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        />
        {/* <meshBasicMaterial toneMapped={false} /> */}

        {/* <meshStandardMaterial wireframe color={"green"} /> */}
      </mesh>
      <EffectComposer>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        <Noise opacity={0.04} />
      </EffectComposer>

    </>
  );
};

export default Model; 