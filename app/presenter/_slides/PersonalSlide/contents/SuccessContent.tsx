import React from 'react'
import Image from 'next/image'
import LoadUpLogo from '../../../_images/loadup_logo.png'
import LoadupApp from '../../../_images/loadup_app.png'
import Inc5000 from '../../../_images/inc5000.png'

export default function SuccessContent() {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-12">
        <Image src={LoadUpLogo} alt="LoadUp Logo" width={300} height={300} />
        <Image src={LoadupApp} alt="Loadup App Logo" width={300} height={300} />
      </div>
      <Image
        className="rounded-xl shadow-lg"
        src={Inc5000}
        alt="Inc5000 Logo"
        width={500}
        height={500}
      />
    </div>
  )
} 
