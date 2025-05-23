import React from 'react'
import Image from 'next/image'
import Wondy from '../../../_images/wondy_logo.png'
import Emcien from '../../../_images/emcien_logo.webp'

export default function FailureContent() {
  return (
    <div>
      <div className="gap-y-12 flex flex-col justify-center items-center">
        <div className="flex items-center gap-8">
          <div className="bg-gray-300 border-2 border-gray-400 rounded-t-full rounded-b-lg px-4 py-3 shadow-lg">
            <p className="text-2xl font-bold text-gray-700 text-center">RIP<br />2025</p>
          </div>
          <Image src={Wondy} alt="Wondy" width={300} height={300} className="rounded-xl" />
        </div>
        <div className="flex items-center gap-8">
          <div className="bg-gray-300 border-2 border-gray-400 rounded-t-full rounded-b-lg px-4 py-3 shadow-lg">
            <p className="text-2xl font-bold text-gray-700 text-center">RIP<br />2018</p>
          </div>
          <Image src={Emcien} alt="Emcien" width={300} height={300} className="rounded-xl" />
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl italic text-gray-600">
          🔥 <strong>Real Talk:</strong> Sales/Marketing Will Trump Tech. 
        </p>
      </div>
    </div>
  )
} 
