import React from 'react'
import Image from 'next/image'
import ApisIpasLogo from './logo.png'
import ViraniRiazPhoto from './virani_riaz.jpg'

// This component now just exports the content for a slide.
// The <Slide> wrapper and ref handling are done in Presentation.tsx.
export default function IntroSlide() {
  return <div className="flex flex-col items-center justify-center h-full">
    <Image src={ApisIpasLogo} alt="APIs & IPAS Logo" width={200} height={200} />
    <h1 className="text-7xl font-bold">Model Context Protocol</h1>
    <h3 className="text-3xl font-medium">Connecting the Dots in the AI Ecosystem</h3>
    <div className="mt-16 space-y-4 text-center">
      <p className="text-xl">With</p>
      <Image
        src={ViraniRiazPhoto}
        alt="Riaz Virani"
        width={150}
        height={150}
        className="rounded-full"
      />
      <p className="text-3xl font-semibold">Riaz Virani</p>
    </div>
  </div>
}
