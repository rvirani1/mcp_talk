'use client'

import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import type { SlideWithAnimations } from '../index'
import Carousel from './Carousel'
import CodingJourneyContent from './contents/CodingJourneyContent'
import SuccessContent from './contents/SuccessContent'
import FailureContent from './contents/FailureContent'
import LocationContent from './contents/LocationContent'
import './styles.css'

const carouselItems = [
  {
    component: LocationContent,
    title: 'Can\'t We All Be Friends?',
  },
  {
    component: CodingJourneyContent,
    title: 'Writing Code Since...Damn, I\'m Old',
  },
  {
    component: SuccessContent,
    title: 'Had Some Success 🚀',
  },
  {
    component: FailureContent,
    title: 'Had Some Failure', 
  },
]

// Interface for Carousel to expose its methods
export interface CarouselRef {
  canAdvance: () => boolean
  advance: () => void
  getCurrentIndex: () => number
}

const PersonalSlide = forwardRef<SlideWithAnimations>((props, ref) => {
  const titleControls = useAnimation()
  const carouselControls = useAnimation()
  const carouselRef = useRef<CarouselRef | null>(null)

  // Expose animation interface
  useImperativeHandle(ref, () => ({
    advanceAnimation: () => {
      if (carouselRef.current) {
        carouselRef.current.advance()
      }
    },
    canAdvanceAnimation: () => carouselRef.current ? carouselRef.current.canAdvance() : false,
  }))

  useEffect(() => {
    const animateSequence = async () => {
      // First: Fade in the title at center position
      await titleControls.start({
        opacity: 1,
        transition: { duration: 1.2 },
        y: 0,
      })

      // Second: Move title up to final position
      await titleControls.start({
        transition: { duration: 0.7, ease: 'easeInOut' },
        y: -300,
      })

      // Third: Fade in the carousel
      await carouselControls.start({
        opacity: 1,
        transition: { duration: 1.4 },
      })
    }

    void animateSequence()
  }, [titleControls, carouselControls])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-8">
      <motion.h1 
        className="text-6xl font-medium text-slate-800 mb-16 text-center"
        initial={{ opacity: 0, y: 0 }}
        animate={titleControls}
      >
        Hi, I'm Riaz <span className="wave-emoji">👋</span>
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={carouselControls}
      >
        <Carousel items={carouselItems} ref={carouselRef} />
      </motion.div>
    </div>
  )
})

export default PersonalSlide
