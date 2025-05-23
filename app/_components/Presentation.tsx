'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SLIDES, FADE_VARIANTS } from '../_slides'
import Slide from './Slide'

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
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

  const CurrentSlideDetails = SLIDES[currentSlide]

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={CurrentSlideDetails.id}
          variants={FADE_VARIANTS}
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
