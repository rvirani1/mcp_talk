import React, { forwardRef } from 'react'

interface SlideProps {
  children: React.ReactNode
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(({ children }, ref) => (
  <div
    ref={ref}
    style={{
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100vw',
    }}
  >
    {children}
  </div>
))

Slide.displayName = 'Slide'

export default Slide 
