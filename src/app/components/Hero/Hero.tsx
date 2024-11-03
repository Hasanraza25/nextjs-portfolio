"use client";
import React, { useState } from 'react'
import Header from '../Header/Header';

const Hero = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuVisible = (inVisible : boolean) => {
        setMenuVisible(inVisible)
    }
  return (
   <>
   <Header onMenuToggle={handleMenuVisible} />
   </>
  )
}

export default Hero