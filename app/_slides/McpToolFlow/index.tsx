import { motion, AnimatePresence } from 'framer-motion'
import { useState, useImperativeHandle, forwardRef } from 'react'
import type { SlideWithAnimations } from '../index'
import PageHeader from '@/app/_components/PageHeader'

// Icon components
const ClientIcon = () => (
  <svg width="100" height="100" viewBox="0 0 60 60" fill="none">
    <rect x="5" y="8" width="50" height="35" rx="3" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)"/>
    <rect x="5" y="43" width="50" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)"/>
    <rect x="10" y="13" width="40" height="25" rx="1" fill="rgba(59, 130, 246, 0.2)"/>
    <circle cx="30" cy="47" r="2" fill="currentColor"/>
  </svg>
)

const ServerIcon = () => (
  <svg width="100" height="100" viewBox="0 0 60 60" fill="none">
    <rect x="10" y="10" width="40" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.1)"/>
    <rect x="10" y="24" width="40" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.1)"/>
    <rect x="10" y="38" width="40" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.1)"/>
    <circle cx="45" cy="16" r="2" fill="currentColor"/>
    <circle cx="45" cy="30" r="2" fill="currentColor"/>
    <circle cx="45" cy="44" r="2" fill="currentColor"/>
    <rect x="14" y="14" width="12" height="4" rx="1" fill="rgba(34, 197, 94, 0.3)"/>
    <rect x="14" y="28" width="12" height="4" rx="1" fill="rgba(34, 197, 94, 0.3)"/>
    <rect x="14" y="42" width="12" height="4" rx="1" fill="rgba(34, 197, 94, 0.3)"/>
  </svg>
)

const AIIcon = () => (
  <svg width="100" height="100" viewBox="0 0 60 60" fill="none">
    <path
      d="M30 50C41.0457 50 50 41.0457 50 30C50 18.9543 41.0457 10 30 10C18.9543 10 10 18.9543 10 30C10 41.0457 18.9543 50 30 50Z" 
      stroke="currentColor"
      strokeWidth="2"
      fill="rgba(168, 85, 247, 0.1)"
    />
    <path
      d="M22 25C23.1046 25 24 24.1046 24 23C24 21.8954 23.1046 21 22 21C20.8954 21 20 21.8954 20 23C20 24.1046 20.8954 25 22 25Z" 
      fill="currentColor"
    />
    <path
      d="M38 25C39.1046 25 40 24.1046 40 23C40 21.8954 39.1046 21 38 21C36.8954 21 36 21.8954 36 23C36 24.1046 36.8954 25 38 25Z" 
      fill="currentColor"
    />
    <path
      d="M30 35C32.2091 35 34 33.2091 34 31C34 28.7909 32.2091 27 30 27C27.7909 27 26 28.7909 26 31C26 33.2091 27.7909 35 30 35Z" 
      fill="rgba(168, 85, 247, 0.3)"
    />
    <path d="M18 35C18 35 20 40 30 40C40 40 42 35 42 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M25 18C25 18 27 15 30 15C33 15 35 18 35 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

// Bidirectional Arrow Component with Label
interface BidirectionalArrowProps {
  fromX: number
  fromY: number
  toX: number
  toY: number
  color: string
  visible: boolean
  label: string
}

const BidirectionalArrow = ({ fromX, fromY, toX, toY, color, visible, label }: BidirectionalArrowProps) => {
  if (!visible) return null

  // Calculate arrow angle and midpoint
  const angle = Math.atan2(toY - fromY, toX - fromX)
  const midX = (fromX + toX) / 2
  const midY = (fromY + toY) / 2
  const arrowHeadLength = 15
  const arrowHeadAngle = Math.PI / 6

  // Arrowhead points for both ends
  const arrowHead1X = fromX + arrowHeadLength * Math.cos(angle - arrowHeadAngle)
  const arrowHead1Y = fromY + arrowHeadLength * Math.sin(angle - arrowHeadAngle)
  const arrowHead2X = fromX + arrowHeadLength * Math.cos(angle + arrowHeadAngle)
  const arrowHead2Y = fromY + arrowHeadLength * Math.sin(angle + arrowHeadAngle)

  const arrowHead3X = toX - arrowHeadLength * Math.cos(angle - arrowHeadAngle)
  const arrowHead3Y = toY - arrowHeadLength * Math.sin(angle - arrowHeadAngle)
  const arrowHead4X = toX - arrowHeadLength * Math.cos(angle + arrowHeadAngle)
  const arrowHead4Y = toY - arrowHeadLength * Math.sin(angle + arrowHeadAngle)

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main arrow line - converted to path for pathLength animation */}
      <motion.path
        d={`M ${fromX} ${fromY} L ${toX} ${toY}`}
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      
      {/* Left arrowhead */}
      <motion.polygon
        points={`${fromX},${fromY} ${arrowHead1X},${arrowHead1Y} ${arrowHead2X},${arrowHead2Y}`}
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.3, ease: 'easeOut' }}
      />

      {/* Right arrowhead */}
      <motion.polygon
        points={`${toX},${toY} ${arrowHead3X},${arrowHead3Y} ${arrowHead4X},${arrowHead4Y}`}
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.3, ease: 'easeOut' }}
      />

      {/* Label */}
      <motion.text
        x={midX}
        y={midY - 172}
        textAnchor="middle"
        className="fill-gray-800 dark:fill-gray-200 text-2xl font-bold"
        initial={{ opacity: 0, scale: 0.8, y: midY - 20 }}
        animate={{ opacity: 1, scale: 1, y: midY - 172 }}
        transition={{ delay: 0.9, duration: 0.4, ease: 'easeOut' }}
      >
        {label}
      </motion.text>
    </motion.g>
  )
}

// Stage Configuration
interface Stage {
  id: number
  aiClientBidirectional?: {
    label: string
  }
  clientServerBidirectional?: {
    label: string
  }
  showClientServerLabels?: boolean
}

const stages: Stage[] = [
  {
    id: 0,
    // Default state - no arrows
  },
  {
    clientServerBidirectional: {
      label: 'JSON RPC or STDIO',
    },
    id: 1,
  },
  {
    clientServerBidirectional: {
      label: 'Optional OAuth 2',
    },
    id: 2,
  },
  {
    aiClientBidirectional: {
      label: 'AI SDK',
    },
    id: 3,
  },
  {
    id: 4,
    showClientServerLabels: true,
  },
]

type ModalType = 'ai' | 'server' | 'client' | null

interface ModalContentProps {
  type: ModalType
  onClose: () => void
}

const ModalContent = ({ type, onClose }: ModalContentProps) => {
  const content = {
    ai: {
      description: 'The core AI that processes user requests and generates responses. Popular providers include:',
      details: 'The AI model receives structured requests from MCP clients and can call tools through the MCP protocol to access external data and services.',
      features: [
        'OpenAI (GPT-4, GPT-3.5)',
        'Anthropic (Claude)',
        'Google (Gemini)',
        'Meta (Llama)',
        'Local models (Ollama, etc.)',
      ],
      subtitle: 'Large Language Models',
      title: 'AI Model',
    },
    client: {
      description: 'Applications that connect users to AI models with MCP capabilities:', 
      details: 'MCP clients manage the connection between users, AI models, and external tools, providing a seamless experience for complex workflows.',
      features: [
        'Claude Desktop',
        'Cursor IDE', 
        'Windsurf',
        'Custom applications',
        'Command-line tools',
      ],
      subtitle: 'AI Applications',
      title: 'MCP Client',
    },
    server: {
      description: 'Servers that expose tools and resources through the MCP protocol:',
      details: 'MCP servers standardize how AI models interact with external systems, eliminating the need for custom integration code for each tool.',
      features: [
        'Database connections',
        'File system access', 
        'Web APIs (Stripe, Weather, etc.)',
        'Custom business logic',
        'Third-party integrations',
      ],
      subtitle: 'External APIs & Tools',
      title: 'MCP Server',
    },
  }

  const currentContent = content[type!]
  if (!currentContent) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-12 max-w-4xl w-full mx-8 shadow-2xl"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-5xl font-bold text-gray-800 dark:text-gray-200">{currentContent.title}</h3>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mt-2">{currentContent.subtitle}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      
      <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{currentContent.description}</p>
      
      <ul className="space-y-4 mb-8">
        {currentContent.features.map((feature, index) => (
          <li key={index} className="flex items-center text-xl text-gray-600 dark:text-gray-400">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-6"></span>
            {feature}
          </li>
        ))}
      </ul>
      
      <p className="text-lg text-gray-500 dark:text-gray-400 italic leading-relaxed">{currentContent.details}</p>
    </motion.div>
  )
}

const McpToolFlow = forwardRef<SlideWithAnimations>((props, ref) => {
  const [modalType, setModalType] = useState<ModalType>(null)
  const [currentStage, setCurrentStage] = useState(0)

  // Expose animation interface
  useImperativeHandle(ref, () => ({
    advanceAnimation: () => {
      if (currentStage < stages.length - 1) {
        setCurrentStage(prev => prev + 1)
      }
    },
    canAdvanceAnimation: () => currentStage < stages.length - 1,
  }))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setModalType(null)
    } else if (e.key === 'ArrowDown') {
      setCurrentStage(prev => Math.min(prev + 1, stages.length - 1))
    } else if (e.key === 'ArrowUp') {
      setCurrentStage(prev => Math.max(prev - 1, 0))
    }
  }

  const currentStageConfig = stages[currentStage]

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full" onKeyDown={handleKeyDown} tabIndex={0}>
      <PageHeader title="The Major Players" />

      <div className="relative w-full max-w-7xl h-[500px]">
        <svg width="100%" height="100%" viewBox="0 0 1200 500" className="absolute inset-0">
          {/* Client-Server Bidirectional Arrow */}
          {currentStageConfig.clientServerBidirectional && (
            <BidirectionalArrow
              fromX={700}
              fromY={350}
              toX={1000}
              toY={120}
              color="rgba(34, 197, 94, 0.8)"
              visible={true}
              label={currentStageConfig.clientServerBidirectional.label}
            />
          )}

          {/* AI-Client Bidirectional Arrow */}
          {currentStageConfig.aiClientBidirectional && (
            <BidirectionalArrow
              fromX={200}
              fromY={120}
              toX={500}
              toY={350}
              color="rgba(168, 85, 247, 0.8)"
              visible={true}
              label={currentStageConfig.aiClientBidirectional.label}
            />
          )}
        </svg>
        
        {/* AI (LLM) - Top Left */}
        <motion.button
          className="absolute top-4 left-2 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setModalType('ai')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-purple-600 dark:text-purple-400 mb-3">
            <AIIcon />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-3xl text-gray-800 dark:text-gray-200">AI Model</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">OpenAI, Anthropic, etc.</p>
          </div>
        </motion.button>

        {/* Server - Top Right */}
        <motion.button
          className="absolute top-4 right-2 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onClick={() => setModalType('server')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-green-600 dark:text-green-400 mb-3">
            {currentStageConfig.showClientServerLabels ? (
              <div className="flex items-center space-x-2">
                <div className="scale-75">
                  <ClientIcon />
                </div>
                <span className="text-4xl font-bold">/</span>
                <div className="scale-75">
                  <ServerIcon />
                </div>
              </div>
            ) : (
              <ServerIcon />
            )}
          </div>
          <div className="text-center">
            <h3 className="font-bold text-3xl text-gray-800 dark:text-gray-200">
              {currentStageConfig.showClientServerLabels ? 'MCP Client/Server' : 'MCP Server'}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">External APIs & Tools</p>
          </div>
        </motion.button>

        {/* Client - Bottom Center */}
        <motion.button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={() => setModalType('client')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-blue-600 dark:text-blue-400 mb-3">
            {currentStageConfig.showClientServerLabels ? (
              <div className="flex items-center space-x-2">
                <div className="scale-75">
                  <ClientIcon />
                </div>
                <span className="text-4xl font-bold">/</span>
                <div className="scale-75">
                  <ServerIcon />
                </div>
              </div>
            ) : (
              <ClientIcon />
            )}
          </div>
          <div className="text-center">
            <h3 className="font-bold text-3xl text-gray-800 dark:text-gray-200">
              {currentStageConfig.showClientServerLabels ? 'MCP Client/Server' : 'MCP Client'}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">Claude Desktop, Cursor, etc.</p>
          </div>
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalType(null)}
          >
            <div onClick={e => e.stopPropagation()}>
              <ModalContent type={modalType} onClose={() => setModalType(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default McpToolFlow
