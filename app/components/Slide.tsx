import React from 'react'

interface SlideProps {
  children: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ children }) => (
  <div
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
)

export default Slide 
