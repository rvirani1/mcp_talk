import { useEffect, useState } from 'react'
import PageHeader from '../../_components/PageHeader'

export default function UnknownAndUnanswered() {
  const [visibleCards, setVisibleCards] = useState(0)

  const challenges = [
    {
      icon: '🔐',
      subtitle: 'Authentication and authorization mechanisms remain unclear across different MCP implementations',
      title: 'Auth',
    },
    {
      icon: '🔍',
      subtitle: 'No standardized way to discover available MCP servers or their capabilities',
      title: 'Discovery',
    },
    {
      icon: '👥',
      subtitle: 'Limited ecosystem of client applications that can effectively consume MCP services',
      title: 'Consumer MCP Clients',
    },
    {
      icon: '🐛',
      subtitle: 'Lack of robust debugging tools and error handling patterns for MCP integrations',
      title: 'Debugging',
    },
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setVisibleCards(prev => Math.min(prev + 1, challenges.length))
      } else if (event.key === 'ArrowUp') {
        setVisibleCards(prev => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [challenges.length])

  return (
    <div className="h-full flex flex-col mt-16 pb-16">
      <PageHeader title="Unknowns and Unanswered Questions" />
      
      <div className="flex-1 grid grid-cols-2 gap-8 px-12 py-8">
        {challenges.map((challenge, index) => (
          <div 
            key={index}
            className={`rounded-2xl p-12 flex flex-row items-center text-left transition-all duration-500 transform ${
              index < visibleCards 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="text-[7rem] mr-8 flex-shrink-0">
              {challenge.icon}
            </div>
            <div className="flex flex-col">
              <h3 className="text-5xl font-bold text-gray-800 mb-4">
                {challenge.title}
              </h3>
              <p className="text-2xl text-gray-600 leading-relaxed">
                {challenge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
