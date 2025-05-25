import { useState, useEffect } from 'react'
import PageHeader from '@/app/slides/_components/PageHeader'

export default function ThoughtsOnAIJobMarket() {
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setCurrentStage(prev => Math.min(prev + 1, 3))
      } else if (event.key === 'ArrowUp') {
        setCurrentStage(prev => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <div>
    <PageHeader title="Will AI Take Your Job?" />
    
    <h1 className={`text-5xl font-light mt-8 mb-4 text-center transition-opacity duration-300 ${currentStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
      Yes, but I'll explain...
    </h1>
    
    <div className={`mt-12 flex justify-center transition-opacity duration-300 ${currentStage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-amber-50 border-l-4 border-amber-700 px-8 py-6 max-w-4xl rounded-r-lg shadow-sm">
        <blockquote className="text-3xl font-serif italic text-amber-900 text-center leading-relaxed relative">
          <span className="text-6xl text-amber-700 absolute -top-4 -left-2 leading-none">"</span>
          <span className="relative z-10">The destructive power of an occupation is inversely proportional to AI's ability to replace it.</span>
          <span className="text-6xl text-amber-700 absolute -bottom-8 -right-2 leading-none">"</span>
        </blockquote>
        
        <div className={`mt-6 text-center transition-opacity duration-300 ${currentStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-4xl font-serif text-amber-800">
            — Riaz Virani
          </p>
        </div>
      </div>
    </div>
  </div>
}
