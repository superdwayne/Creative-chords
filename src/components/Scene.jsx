// Composition of Top, Member, Bottom
import React, { useRef, useState } from "react";
import * as THREE from 'three'

import { Scroll, ScrollControls, Environment } from '@react-three/drei'
import { config, useSpring, animated } from "@react-spring/three";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree, useLoader, extend } from "@react-three/fiber";
import { Headline } from './Top/Header'
import { Carousel } from './Section/Member'
import { Footer } from './Bottom/Footer'

function Scene() {
  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.8, 0.01)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(4, Math.abs(mouse.x * mouse.y * 8)), 0.01)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * -Math.PI * 0.025, 0.001)
  })





  return (

    <ScrollControls pages={3}>
      <Scroll html>
        <Headline />
        <Carousel />
        <Footer />
      </Scroll>
      {/* <DrawLines position={[0, -2.5, -10]}/> */}
    </ScrollControls>

  )
}

export { Scene }