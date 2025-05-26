import React, { forwardRef } from 'react'

interface SlideProps {
  children: React.ReactNode
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(({ children }, ref) => (
  <div
    ref={ref}
    className="absolute inset-0 flex items-center justify-center align-middle h-screen w-screen top-0 left-0"
  >
    {children}
  </div>
))

Slide.displayName = 'Slide'

export default Slide 
