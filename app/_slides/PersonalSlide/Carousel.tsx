'use client'

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CarouselElement from './CarouselElement'
import type { CarouselRef } from './index'

interface CarouselItem {
  component: React.ComponentType
  title: string
}

interface CarouselProps {
  items: CarouselItem[]
}

const Carousel = forwardRef<CarouselRef, CarouselProps>(({ items }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Expose methods for parent component
  useImperativeHandle(ref, () => ({
    advance: () => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1)
      }
    },
    canAdvance: () => currentIndex < items.length - 1,
    getCurrentIndex: () => currentIndex,
  }))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setCurrentIndex(prev => prev < items.length - 1 ? prev + 1 : prev)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setCurrentIndex(prev => prev > 0 ? prev - 1 : prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [items.length])

  const CurrentComponent = items[currentIndex].component

  return (
    <div className="relative w-full min-w-5xl h-2/3">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex flex-col items-center justify-center h-2/3 w-full"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -50 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <CarouselElement title={items[currentIndex].title}>
            <CurrentComponent />
          </CarouselElement>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}) 

export default Carousel 
