import React from 'react'
import Image from 'next/image'
import LoadUpLogo from '../../../_images/loadup_logo.png'
import Inc5000 from '../../../_images/inc5000.png'

export default function SuccessContent() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={LoadUpLogo} alt="LoadUp Logo" width={250} />
      <Image
        src={Inc5000}
        alt="Inc5000 Logo"
        width={150}
        height={150}
      />
    </div>
  )
} 
