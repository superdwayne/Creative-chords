// Navigation bar for Top page
import React, { useRef, useState } from "react";
import * as THREE from 'three'

import { Scroll, ScrollControls, Environment } from '@react-three/drei'
// import { Turn as Hamburger } from 'hamburger-react'


const Nav = () => {
   // const [isOpen, setOpen] = useState(false)

   // return (
   //    <Hamburger className='hamburger'
   //       style={{
   //          marginRight: '0%'
   //       }}
   //       size={40}
   //       distance="sm"
   //       toggled={isOpen} toggle={setOpen}
   //    // onToggle={toggled => setOpen(!isOpen)}
   //    />
   // )
};

const SubText = () => {
   var text = '10-11-21';
   const [isOpen, setOpen] = useState(false)
   return (
      <h1 className='subtext'
         style={{
            fontSize: '1em'
         }}
      // onToggle={toggled => setOpen(!isOpen)}
      >{text}</h1>
   )
};


const DarkMode = () => {
   // console.log('');

};

export { Nav, SubText, DarkMode }