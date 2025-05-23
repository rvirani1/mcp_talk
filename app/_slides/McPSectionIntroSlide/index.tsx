'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import mcpLogo from '../../_images/mcp_logo.png'

// Icon components
const NewIcon = () => (
  <svg className="w-20 h-20 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
)

const BuyInIcon = () => (
  <svg className="w-20 h-20 text-green-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
  </svg>
)

const OpenIcon = () => (
  <svg className="w-20 h-20 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V13C8,12.4 8.4,11.5 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11.5H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
  </svg>
)

const LSPIcon = () => (
  <svg className="w-20 h-20 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.4,16.6L4.8,12l4.6-4.6L8,6L2,12l6,6L9.4,16.6z M14.6,16.6l4.6-4.6l-4.6-4.6L16,6l6,6l-6,6L14.6,16.6z"/>
  </svg>
)

const headerVariants = {
  centered: {
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
    y: 0,
  },
  moved: {
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
    y: -50,
  },
}

const quickFactsVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
    y: 0,
  },
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8, 
    y: 50,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
    y: -8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
    y: 0,
  },
}

export default function McPSectionIntroSlide() {
  const [stage, setStage] = useState(0)

  const cards = [
    {
      description: 'Created by Anthropic in October 2024 with a major revision in March 2025',
      icon: <NewIcon />,
      title: 'Really New',
    },
    {
      description: 'Google, Microsoft, OpenAI, and Amazon + 100s of others are all onboard',
      icon: <BuyInIcon />,
      title: 'Big Buy In',
    },
    {
      description: 'Public RFCs and steering committee with OpenAI, GitHub, and Microsoft',
      icon: <OpenIcon />,
      title: 'Open',
    },
    {
      description: 'Language Server Protocol is used by code editors to support multiple languages',
      icon: <LSPIcon />,
      title: 'LSP Inspired',
    },
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setStage(prev => Math.min(prev + 1, 5)) // Max 5 stages (0-5)
      } else if (event.key === 'ArrowUp') {
        setStage(prev => Math.max(prev - 1, 0)) // Min 0 stages
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <motion.div 
        className="max-w-7xl mx-auto text-center"
        animate={stage >= 1 ? 'moved' : 'centered'}
        variants={headerVariants}
      >
        {/* Header Section */}
        <div className="mb-16 space-y-4">
          <div className="flex justify-center mb-6">
            <Image src={mcpLogo} alt="MCP Logo" width={200} height={200} className="object-contain" />
          </div>
          <p className="text-3xl font-bold text-gray-700 max-w-4xl mx-auto">
            Model Context Protocol
          </p>
          <p className="text-2xl text-gray-600 mb-4">
            Universal interfaces for managing context for AI applications
          </p>
        </div>

        {/* Quick Facts Section */}
        {stage >= 1 && (
          <motion.div 
            className="mb-12"
            initial="hidden"
            animate="visible"
            variants={quickFactsVariants}
          >
            <h2 className="text-4xl font-semibold text-gray-700 mb-12">Quick Facts</h2>
          </motion.div>
        )}

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: stage >= 2 ? 'auto' : 0,
            opacity: stage >= 2 ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
        >
          {cards.map((card, index) => (
            stage >= index + 2 && (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                <div className="flex justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            )
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
