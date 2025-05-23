import Image from 'next/image'
import React from 'react'
import RubyLogo from '../../../_images/ruby_logo.png'
import RailsLogo from '../../../_images/rails_logo.png'
import ReactLogo from '../../../_images/react_logo.png'
import SuiteScriptLogo from '../../../_images/suitescript_logo.png'
import SalesforceLogo from '../../../_images/salesforce_logo.png'
import TypescriptLogo from '../../../_images/typescript_logo.png'

export default function CodingJourneyContent() {
  return (
    <div>
      <div className="gap-6 space-y-12">
        <div className="flex flex-row items-center justify-center gap-12">
          <Image src={RubyLogo} alt="Ruby Logo" width={140} height={140} />
          <Image src={RailsLogo} alt="Rails Logo" width={140} height={140} />
          <Image src={ReactLogo} alt="React Logo" width={140} height={140} />
        </div>
        <div className="flex flex-row items-center justify-center gap-6">
          <Image src={TypescriptLogo} alt="Typescript Logo" width={140} height={140} />
          <Image src={SalesforceLogo} alt="Salesforce Logo" width={140} height={140} />
          <Image src={SuiteScriptLogo} alt="SuiteScript Logo" width={140} height={140} />
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl italic text-gray-600">
            🕵️ <strong>Easter Egg:</strong> I wrote my first "Hello World" the same year React said 
            "Hello World"
          </p>
        </div>
      </div>
      
    </div>
  )
} 
