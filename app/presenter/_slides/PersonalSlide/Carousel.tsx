'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CarouselElement from './CarouselElement'

interface CarouselItem {
  component: React.ComponentType
  title: string
}

interface CarouselProps {
  items: CarouselItem[]
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setCurrentIndex(prev => (prev + 1) % items.length)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
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
} 
