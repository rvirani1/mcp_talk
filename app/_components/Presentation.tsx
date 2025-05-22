'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Slide1Content from '../_slides/01_slide'
import Slide2Content from '../_slides/02_slide'
import Slide from './Slide'
// Note: globals.css is imported in the main page.tsx

// Define a type for slide content components
type SlideContentComponent = React.FC

const slides: { Content: SlideContentComponent, id: string }[] = [
  { Content: Slide1Content, id: 'slide1' },
  { Content: Slide2Content, id: 'slide2' },
]

const fadeVariants = {
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  initial: {
    opacity: 0,
  },
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === 'ArrowLeft') {
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextSlide, prevSlide])

  const CurrentSlideDetails = slides[currentSlide]

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={CurrentSlideDetails.id}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Slide>
            <CurrentSlideDetails.Content />
          </Slide>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
