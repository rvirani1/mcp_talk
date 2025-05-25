import React from 'react'
import Image from 'next/image'
import Atlanta from '../../../_images/toronto_atlanta.png'

export default function LocationContent() {
  return (
    <div className="flex justify-between space-x-12">
      <Image src={Atlanta} alt="Atlanta" width={300} height={500} className="rounded-xl" />
      <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-[20rem]">
        <p className="text-2xl text-slate-600">
          Found myself baking <br /> like a cookie in
        </p>
        <p className="text-5xl font-bold text-orange-500">
          🔥🥵<br />
          Hotlanta 
        </p>
        <p className="text-2xl text-slate-600">
          so I left to become a human popsicle in
        </p>
        <p className="text-5xl font-bold text-blue-500">
          🧊❄️<br />
          Toronto ️
        </p>
      </div>
    </div>
  )
} 
