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

// Speech Bubble Component
interface SpeechBubbleProps {
  text: string
  tailDirection: 'left' | 'right' | 'bottom'
  visible: boolean
  onClick?: () => void
}

const SpeechBubble = ({ text, tailDirection, visible, onClick }: SpeechBubbleProps) => {
  if (!visible) return null

  const getTailClasses = (direction: 'left' | 'right' | 'bottom') => {
    if (direction === 'left') {
      return 'top-1/2 -left-4 transform -translate-y-1/2 border-t-[16px] border-b-[16px] border-r-[16px] border-t-transparent border-b-transparent border-r-white dark:border-r-gray-800'
    }
    if (direction === 'right') {
      return 'top-1/2 -right-4 transform -translate-y-1/2 border-t-[16px] border-b-[16px] border-l-[16px] border-t-transparent border-b-transparent border-l-white dark:border-l-gray-800'
    }
    return 'left-1/2 -bottom-4 transform -translate-x-1/2 border-l-[16px] border-r-[16px] border-t-[16px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <div 
        className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border-2 border-gray-200 dark:border-gray-600 max-w-md ${onClick ? 'cursor-pointer hover:shadow-3xl transition-shadow' : ''}`}
        onClick={onClick}
      >
        <p className="text-2xl font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
          {text}
        </p>
        
        {/* Code icon when modal is available */}
        {onClick && (
          <div className="absolute top-3 right-3 text-blue-500 dark:text-blue-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        
        {/* Speech bubble tail */}
        <div className={`absolute w-0 h-0 ${getTailClasses(tailDirection)}`} />
      </div>
    </motion.div>
  )
}

// Directional Arrow Component
interface DirectionalArrowProps {
  fromX: number
  fromY: number
  toX: number
  toY: number
  color: string
  visible: boolean
}

const DirectionalArrow = ({ fromX, fromY, toX, toY, color, visible }: DirectionalArrowProps) => {
  if (!visible) return null

  // Calculate arrow angle for arrowhead
  const angle = Math.atan2(toY - fromY, toX - fromX)
  const arrowHeadLength = 20
  const arrowHeadAngle = Math.PI / 6

  // Arrowhead points
  const arrowHead1X = toX - arrowHeadLength * Math.cos(angle - arrowHeadAngle)
  const arrowHead1Y = toY - arrowHeadLength * Math.sin(angle - arrowHeadAngle)
  const arrowHead2X = toX - arrowHeadLength * Math.cos(angle + arrowHeadAngle)
  const arrowHead2Y = toY - arrowHeadLength * Math.sin(angle + arrowHeadAngle)

  return (
    <>
      {/* Main arrow line */}
      <motion.line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={color}
        strokeWidth='3'
        strokeDasharray='8,4'
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      
      {/* Arrowhead */}
      <motion.polygon
        points={`${toX},${toY} ${arrowHead1X},${arrowHead1Y} ${arrowHead2X},${arrowHead2Y}`}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      />
    </>
  )
}

// Stage Configuration
interface Stage {
  id: number
  aiToClientArrow?: boolean
  clientToAiArrow?: boolean
  serverToClientArrow?: boolean
  clientToServerArrow?: boolean
  speechBubble?: {
    text: string
    tailDirection: 'left' | 'right' | 'bottom'
    modal?: {
      title: string
      requestMethod: string
      exampleResponse: string
    }
  }
}

const stages: Stage[] = [
  {
    id: 0,
    // Default state - no arrows or speech bubbles
  },
  {
    clientToServerArrow: true,
    id: 1,
    speechBubble: {
      modal: {
        exampleResponse: '',
        requestMethod: 'tools/list',
        title: 'Server Capabilities Discovery',
      },
      tailDirection: 'bottom',
      text: 'Hey brah, my user wants us to collab. What can you do?',
    },
  },
  {
    id: 2,
    serverToClientArrow: true,
    speechBubble: {
      modal: {
        exampleResponse: `{
  "tools": [
    {
      "name": "get_calendar_events",
      "description": "Retrieve calendar events for a specified date range",
      "inputSchema": {
        "type": "object",
        "properties": {
          "start_date": {
            "type": "string",
            "format": "date",
            "description": "Start date in YYYY-MM-DD format"
          },
          "end_date": {
            "type": "string", 
            "format": "date",
            "description": "End date in YYYY-MM-DD format"
          },
          "calendar_id": {
            "type": "string",
            "description": "Optional calendar ID, defaults to primary"
          }
        },
        "required": ["start_date", "end_date"]
      }
    },
    {
      "name": "schedule_meeting",
      "description": "Schedule a new meeting with attendees",
      "inputSchema": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Meeting title/subject"
          },
          "start_time": {
            "type": "string",
            "format": "date-time", 
            "description": "Meeting start time in ISO 8601 format"
          },
          "duration_minutes": {
            "type": "integer",
            "description": "Meeting duration in minutes"
          },
          "attendees": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "email"
            },
            "description": "List of attendee email addresses"
          },
          "description": {
            "type": "string",
            "description": "Optional meeting description"
          }
        },
        "required": ["title", "start_time", "duration_minutes", "attendees"]
      }
    }
  ]
}`,
        requestMethod: '',
        title: 'Available Tools Response',
      },
      tailDirection: 'right',
      text: 'Uhh, like a lot dude. I have resources, tools, sample prompts. I\'m the wizard of calendar Oz.',
    },
  },
  {
    clientToServerArrow: true,
    id: 3,
    speechBubble: {
      tailDirection: 'bottom',
      text: 'Wicked, I\'ll cache that.',
    },
  },
  {
    clientToAiArrow: true,
    id: 4,
    speechBubble: {
      modal: {
        exampleResponse: `{
  "model": "claude-3-opus-20240229",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": "Find a time for me and coworker@example.com to meet."
    }
  ],
  "tools": [
    {
      "name": "get_calendar_events",
      "description": "Retrieve calendar events for a specified date range",
      "input_schema": {
        "type": "object",
        "properties": {
          "start_date": {
            "type": "string",
            "format": "date",
            "description": "Start date in YYYY-MM-DD format"
          },
          "end_date": {
            "type": "string",
            "format": "date",
            "description": "End date in YYYY-MM-DD format"
          },
          "calendar_id": {
            "type": "string",
            "description": "Optional calendar ID, defaults to primary"
          }
        },
        "required": ["start_date", "end_date"]
      }
    },
    {
      "name": "schedule_meeting",
      "description": "Schedule a new meeting with attendees",
      "input_schema": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Meeting title/subject"
          },
          "start_time": {
            "type": "string",
            "format": "date-time",
            "description": "Meeting start time in ISO 8601 format"
          },
          "duration_minutes": {
            "type": "integer",
            "description": "Meeting duration in minutes"
          },
          "attendees": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "email"
            },
            "description": "List of attendee email addresses"
          },
          "description": {
            "type": "string",
            "description": "Optional meeting description"
          }
        },
        "required": ["title", "start_time", "duration_minutes", "attendees"]
      }
    }
  ]
}`,
        requestMethod: '',
        title: 'Claude API Request',
      },
      tailDirection: 'bottom',
      text: 'Hey Smarty Pants, my user just asked me to schedule a meeting with Jane. By the way, I have access to their calendars via this MCP server if you think we should use it.',
    },
  },
  {
    aiToClientArrow: true,
    id: 5,
    speechBubble: {
      modal: {
        exampleResponse: `{
  "id": "msg_...",
  "model": "claude-3-opus-20240229",
  "stop_reason": "tool_use",
  "role": "assistant",
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_id_1", // Unique ID for this tool call
      "name": "get_calendar_events",
      "input": {
        "start_date": "2025-05-23", // Today (Friday)
        "end_date": "2025-05-27"    // Tuesday
        // Assumes default primary calendar for the user
      }
    },
    {
      "type": "tool_use",
      "id": "toolu_id_2", // Another unique ID for this tool call
      "name": "get_calendar_events",
      "input": {
        "start_date": "2025-05-23", // Today (Friday)
        "end_date": "2025-05-27",    // Tuesday
        "calendar_id": "coworker@example.com" // Explicitly request coworker's calendar
      }
    }
  ]
}`,
        requestMethod: '',
        title: 'Claude API Response - Tool Use',
      },
      tailDirection: 'left',
      text: 'Beep...boop...bop...please use the tool to get both of their calendar events and get back to me...',
    },
  },
  {
    clientToServerArrow: true,
    id: 6,
    speechBubble: {
      modal: {
        exampleResponse: `[
  {
    "jsonrpc": "2.0",
    "method": "get_calendar_events",
    "params": {
      "start_date": "2025-05-23",
      "end_date": "2025-05-27"
      // "calendar_id" is omitted for your primary calendar
    },
    "id": "req-id-get-user-calendar"
  },
  {
    "jsonrpc": "2.0",
    "method": "get_calendar_events",
    "params": {
      "start_date": "2025-05-23",
      "end_date": "2025-05-27",
      "calendar_id": "coworker@example.com"
    },
    "id": "req-id-get-coworker-calendar"
  }
]`,
        requestMethod: '',
        title: 'MCP JSON RPC Tool Requests',
      },
      tailDirection: 'bottom',
      text: 'Yo, can you run this tool to get me calendar availability?',
    },
  },
  {
    id: 7,
    serverToClientArrow: true,
    speechBubble: {
      modal: {
        exampleResponse: `[
  {
    "jsonrpc": "2.0",
    "result": [
      {
        "title": "Morning Standup",
        "start": "2025-05-26T09:00:00-04:00",
        "end": "2025-05-26T09:30:00-04:00"
      },
      {
        "title": "Client Meeting",
        "start": "2025-05-27T14:00:00-04:00",
        "end": "2025-05-27T15:00:00-04:00"
      }
    ],
    "id": "req-id-get-user-calendar"
  },
  {
    "jsonrpc": "2.0",
    "result": [
      {
        "title": "Project Alpha Review",
        "start": "2025-05-26T10:00:00-04:00",
        "end": "2025-05-26T11:00:00-04:00"
      },
      {
        "title": "Team Sync",
        "start": "2025-05-27T09:00:00-04:00",
        "end": "2025-05-27T09:30:00-04:00"
      }
    ],
    "id": "req-id-get-coworker-calendar"
  }
]`,
        requestMethod: '',
        title: 'MCP JSON RPC Tool Responses',
      },
      tailDirection: 'right',
      text: 'Here ya go!',
    },
  },
  {
    clientToAiArrow: true,
    id: 8,
    speechBubble: {
      modal: {
        exampleResponse: `{
  "model": "claude-3-opus-20240229",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": "Find a time for me and coworker@example.com to meet."
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "tool_use",
          "id": "toolu_id_1",
          "name": "get_calendar_events",
          "input": {
            "start_date": "2025-05-23",
            "end_date": "2025-05-27"
          }
        },
        {
          "type": "tool_use",
          "id": "toolu_id_2",
          "name": "get_calendar_events",
          "input": {
            "start_date": "2025-05-23",
            "end_date": "2025-05-27",
            "calendar_id": "coworker@example.com"
          }
        }
      ]
    },
    {
      "role": "user", // The client sends the results of the tool calls as a user message
      "content": [
        {
          "type": "tool_result",
          "tool_use_id": "toolu_id_1",
          "content": "[{\\"title\\": \\"Morning Standup\\", \\"start\\": \\"2025-05-26T09:00:00\\", \\"end\\": \\"2025-05-26T09:30:00\\"}, {\\"title\\": \\"Client Meeting\\", \\"start\\": \\"2025-05-27T14:00:00\\", \\"end\\": \\"2025-05-27T15:00:00\\"}]"
        },
        {
          "type": "tool_result",
          "tool_use_id": "toolu_id_2",
          "content": "[{\\"title\\": \\"Project Alpha Review\\", \\"start\\": \\"2025-05-26T10:00:00\\", \\"end\\": \\"2025-05-26T11:00:00\\"}, {\\"title\\": \\"Team Sync\\", \\"start\\": \\"2025-05-27T09:00:00\\", \\"end\\": \\"2025-05-27T09:30:00\\"}]"
        }
      ]
    }
  ],
  "tools": [ /* ... same tool definitions as above ... */ ]
}`,
        requestMethod: '',
        title: 'Claude API Request with Tool Results',
      },
      tailDirection: 'bottom',
      text: 'Here is the calendar availability, my friend. Also remember, we have access to all these tools.',
    },
  },
  {
    aiToClientArrow: true,
    id: 9,
    speechBubble: {
      modal: {
        exampleResponse: `{
  "id": "msg_...",
  "model": "claude-3-opus-20240229",
  "stop_reason": "tool_use",
  "role": "assistant",
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_id_3", // New unique ID for this call
      "name": "schedule_meeting",
      "input": {
        "title": "Quick Sync", // Claude might come up with a default title
        "start_time": "2025-05-27T11:00:00Z", // Example: Tuesday at 11 AM UTC (or specific timezone)
        "duration_minutes": 30,
        "attendees": ["user@example.com", "coworker@example.com"] // Claude infers both attendees
      }
    }
  ]
}`,
        requestMethod: '',
        title: 'Claude API Response - Schedule Meeting',
      },
      tailDirection: 'left',
      text: 'Zing...I\'m done. Please use the schedule meeting tool to schedule a meeting for 2pm tomorrow. Also have you been cheating on me with that little *@i&# Gemini.',
    },
  },
  {
    clientToAiArrow: true,
    id: 10,
    speechBubble: {
      tailDirection: 'left',
      text: 'No, you know you\'re the only one for me! Oh no, my network latency is bad. Gotta go!.',
    },
  },
  {
    id: 11,
    speechBubble: {
      tailDirection: 'bottom',
      text: 'Hey user, is it OK if I schedule a meeting tomorrow at 2pm?',
    },
  },
  {
    clientToServerArrow: true,
    id: 12,
    speechBubble: {
      modal: {
        exampleResponse: `{
  "jsonrpc": "2.0",
  "method": "schedule_meeting",
  "params": {
    "title": "Quick Sync",
    "start_time": "2025-05-27T11:00:00-04:00",
    "duration_minutes": 30,
    "attendees": [
      "user@example.com",
      "coworker@example.com"
    ]
  },
  "id": "12345"
}`,
        requestMethod: '',
        title: 'MCP JSON RPC Tool Call',
      },
      tailDirection: 'bottom',
      text: 'Hey pal, I\'d like to use the scheduling tool to schedule a call at 2pm tomorrow',
    },
  },
  {
    id: 13,
    serverToClientArrow: true,
    speechBubble: {
      modal: {
        exampleResponse: `{
  "jsonrpc": "2.0",
  "result": {
    "message": "Meeting 'Quick Sync' scheduled successfully.",
    "event_id": "cal_event_abc123",
    "calendar_url": "https://calendar.example.com/event/cal_event_abc123"
  },
  "id": "12345"
}`,
        requestMethod: '',
        title: 'MCP JSON RPC Response',
      },
      tailDirection: 'right',
      text: '500 Error...Psyche. Yeah, it\'s done.',
    },
  },
]

// Speech Bubble Modal Component
interface SpeechBubbleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  requestMethod: string
  exampleResponse: string
}

const SpeechBubbleModal = ({ isOpen, onClose, title, requestMethod, exampleResponse }: SpeechBubbleModalProps) => {
  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-8 shadow-2xl max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex justify-between items-start p-8 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {requestMethod && (
            <div className="mb-6">
              <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">JSON RPC Request Method</h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <code className="text-xl font-mono text-blue-800 dark:text-blue-200">{requestMethod}</code>
              </div>
            </div>
          )}
          
          {exampleResponse && (
            <div>
              <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Example Request/Response</h4>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
                  <code>{exampleResponse}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const McpArchitecture = forwardRef<SlideWithAnimations>((props, ref) => {
  const [currentStage, setCurrentStage] = useState(0)
  const [speechBubbleModalOpen, setSpeechBubbleModalOpen] = useState(false)

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
      setSpeechBubbleModalOpen(false)
    } else if (e.key === 'ArrowRight') {
      setCurrentStage(prev => Math.min(prev + 1, stages.length - 1))
    } else if (e.key === 'ArrowLeft') {
      setCurrentStage(prev => Math.max(prev - 1, 0))
    }
  }

  const currentStageConfig = stages[currentStage]
  const modalContent = currentStageConfig.speechBubble?.modal

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full" onKeyDown={handleKeyDown} tabIndex={0}>
      <PageHeader title="TLDR: Tool Use In Real Life" />
      
      <div className="relative w-full max-w-7xl h-[500px]">
        <svg width="100%" height="100%" viewBox="0 0 1200 500" className="absolute inset-0">
          {/* Directional Arrows */}
          <DirectionalArrow
            fromX={200}
            fromY={100}
            toX={500}
            toY={350}
            color="rgba(59, 130, 246, 0.8)"
            visible={Boolean(currentStageConfig.aiToClientArrow)}
          />
          
          <DirectionalArrow
            fromX={500}
            fromY={350}
            toX={200}
            toY={120}
            color="rgba(59, 130, 246, 0.8)"
            visible={Boolean(currentStageConfig.clientToAiArrow)}
          />
          
          <DirectionalArrow
            fromX={1000}
            fromY={100}
            toX={700}
            toY={350}
            color="rgba(34, 197, 94, 0.8)"
            visible={Boolean(currentStageConfig.serverToClientArrow)}
          />
          
          <DirectionalArrow
            fromX={700}
            fromY={350}
            toX={1000}
            toY={120}
            color="rgba(34, 197, 94, 0.8)"
            visible={Boolean(currentStageConfig.clientToServerArrow)}
          />
        </svg>
        
        {/* Speech Bubble */}
        <SpeechBubble
          text={currentStageConfig.speechBubble?.text || ''}
          tailDirection={currentStageConfig.speechBubble?.tailDirection || 'bottom'}
          visible={Boolean(currentStageConfig.speechBubble)}
          onClick={modalContent ? () => setSpeechBubbleModalOpen(true) : undefined}
        />
        
        {/* AI (LLM) - Top Left */}
        <motion.div
          className="absolute top-4 left-2 flex flex-col items-center p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-purple-600 dark:text-purple-400 mb-3">
            <AIIcon />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-3xl text-gray-800 dark:text-gray-200">Claude API</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">any LLM API</p>
          </div>
        </motion.div>

        {/* Server - Top Right */}
        <motion.div
          className="absolute top-4 right-2 flex flex-col items-center p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-green-600 dark:text-green-400 mb-3">
            <ServerIcon />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-3xl text-gray-800 dark:text-gray-200">Calendar MCP</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">or any other MCP</p>
          </div>
        </motion.div>

        {/* Client - Bottom Center */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="text-blue-600 dark:text-blue-400 mb-3">
            <ClientIcon />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-3xl text-gray-800 dark:text-gray-200">Claude Desktop</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">or any other MCP client</p>
          </div>
        </motion.div>
      </div>

      {/* Stage Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg border">
        <button
          onClick={() => setCurrentStage(prev => Math.max(prev - 1, 0))}
          disabled={currentStage === 0}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {currentStage} / {stages.length - 1}
        </span>
        
        <button
          onClick={() => setCurrentStage(prev => Math.min(prev + 1, stages.length - 1))}
          disabled={currentStage === stages.length - 1}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Speech Bubble Modal */}
      <AnimatePresence>
        {speechBubbleModalOpen && modalContent && (
          <SpeechBubbleModal
            isOpen={speechBubbleModalOpen}
            onClose={() => setSpeechBubbleModalOpen(false)}
            title={modalContent.title}
            requestMethod={modalContent.requestMethod}
            exampleResponse={modalContent.exampleResponse}
          />
        )}
      </AnimatePresence>
    </div>
  )
})

export default McpArchitecture
