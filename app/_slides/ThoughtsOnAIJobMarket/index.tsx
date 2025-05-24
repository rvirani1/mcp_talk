import { useState, useEffect } from 'react'
import PageHeader from '@/app/_components/PageHeader'

export default function ThoughtsOnAIJobMarket() {
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setShowAnswer(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <div>
    <PageHeader title="Will AI Take Your Job?" />
    <h1 className={`text-4xl font-light transition-opacity duration-300 ${showAnswer ? 'opacity-100' : 'opacity-0'}`}>
      Yes, but I'll explain...
    </h1>
  </div>
}
