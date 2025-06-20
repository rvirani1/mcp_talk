'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SLIDES, FADE_VARIANTS } from '../_slides'
import Slide from './Slide'

// Interface for slides that support internal animations
export interface SlideWithAnimations {
  canAdvanceAnimation: () => boolean
  advanceAnimation: () => void
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRef = useRef<SlideWithAnimations | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const handleSpaceBar = useCallback(() => {
    // First, try to advance the current slide's animation
    if (slideRef.current && slideRef.current.canAdvanceAnimation()) {
      slideRef.current.advanceAnimation()
    } else {
      // If no animation can be advanced, move to next slide
      nextSlide()
    }
  }, [nextSlide])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === ' ') {
        event.preventDefault() // Prevent default spacebar behavior (scroll)
        handleSpaceBar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextSlide, prevSlide, handleSpaceBar])

  const CurrentSlideDetails = SLIDES[currentSlide]

  // Check if the current slide component supports refs (is a forwardRef component)
  const isSlideWithAnimations = (component: any): component is React.ForwardRefExoticComponent<any> => 
    component.$$typeof === Symbol.for('react.forward_ref')

  // Check if current slide can advance animations
  const canAdvanceCurrentSlide = slideRef.current ? slideRef.current.canAdvanceAnimation() : false

  return (
    <div className="relative h-screen w-screen">
      {/* Mobile Warning Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 sm:hidden">
        <div className="bg-amber-100 border-b border-amber-200 px-4 py-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <span className="text-lg">⚠️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-amber-800 font-medium">
                Mobile Notice
              </p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                This presentation was designed for live desktop presentation and may not display optimally on mobile devices. For the best experience, view on a larger screen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={CurrentSlideDetails.id}
          variants={FADE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Slide>
            {isSlideWithAnimations(CurrentSlideDetails.Content) ? (
              <CurrentSlideDetails.Content ref={slideRef} />
            ) : (
              <CurrentSlideDetails.Content />
            )}
          </Slide>
        </motion.div>
      </AnimatePresence>

      {/* On-screen Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-2 flex items-center space-x-2">
          {/* Previous Slide Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
            title="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Next Button - Advances through animations then slides */}
          <button
            onClick={handleSpaceBar}
            disabled={currentSlide === SLIDES.length - 1 && !canAdvanceCurrentSlide}
            className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors touch-manipulation flex items-center space-x-2"
            title={canAdvanceCurrentSlide ? 'Next animation' : 'Next slide'}
          >
            {canAdvanceCurrentSlide ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
                </svg>
                <span className="text-sm font-medium hidden sm:inline">Next</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium hidden sm:inline">Next Slide</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-4 py-2">
          <span className="text-sm font-medium text-gray-700">
            {currentSlide + 1} / {SLIDES.length}
          </span>
        </div>
      </div>

      {/* Mobile-friendly edge touch areas for navigation */}
      <div 
        className="fixed left-0 top-0 w-16 h-full z-40 sm:hidden"
        onClick={prevSlide}
        style={{ touchAction: 'manipulation' }}
      />
      <div 
        className="fixed right-0 top-0 w-16 h-full z-40 sm:hidden"
        onClick={nextSlide}
        style={{ touchAction: 'manipulation' }}
      />
    </div>
  )
}
