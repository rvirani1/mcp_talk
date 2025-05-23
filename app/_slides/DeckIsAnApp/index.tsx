import { useState, useEffect, useRef } from 'react'

export default function DeckIsAnApp() {
  const [count, setCount] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const scrollTop = containerRef.current.scrollTop
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight
      const progress = Math.min(scrollTop / scrollHeight, 1)
      setScrollProgress(progress)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen text-gray-800 overflow-y-auto overflow-x-hidden relative w-full"
      style={{ height: '100vh' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + (i % 3)}s`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content container - taller to enable scrolling */}
      <div className="relative z-10 w-full" style={{ height: '200vh' }}>
        
        {/* Original content - always visible */}
        <div className="h-screen flex items-center justify-center p-8 min-w-screen w-full">
          <div className="text-center space-y-8 max-w-2xl w-full">
            {/* Title with glow effect */}
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
              I'll Let You In On a Secret
            </h1>
            
            {/* Subtitle with typewriter effect */}
            <div className="text-2xl text-purple-700 font-mono">
              <span className="inline-block">
                This whole presentation is a{' '}
                <span className="text-orange-600 font-bold animate-bounce">
                  Next.js app
                </span>
                <span className="animate-ping">|</span>
              </span>
            </div>

            {/* Interactive demo section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-purple-300 shadow-2xl">
              <p className="text-lg mb-4 text-gray-700">Prove it yourself:</p>
              
              {/* Interactive button with effects */}
              <button 
                onClick={() => setCount(count + 1)}
                className="relative group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transform transition-all duration-200 hover:scale-110 hover:rotate-1 active:scale-95"
              >
                <span className="relative z-10">🚀 Click me!</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              </button>
              
              {/* Counter with celebration effects */}
              <div className="mt-6">
                <p className="text-2xl">
                  <span className="text-gray-600">Count:</span>{' '}
                  <span 
                    className={`font-bold text-4xl transition-all duration-300 ${
                      count > 0 ? 'text-orange-600 animate-bounce' : 'text-gray-800'
                    }`}
                  >
                    {count}
                  </span>
                  {count > 0 && (
                    <span className="ml-2 text-orange-500 animate-spin inline-block">
                      ✨
                    </span>
                  )}
                </p>
                {count > 10 && (
                  <p className="text-green-600 animate-pulse mt-2">
                    🎉 You're really going for it! This is LIVE React state!
                  </p>
                )}
              </div>
            </div>

            {/* Scroll hint */}
            <div className="mt-8 text-purple-600 animate-bounce">
              <p className="text-lg">Scroll down for more magic! ↓</p>
            </div>
          </div>
        </div>

        {/* Parallax Mind Blown Section */}
        <div className="sticky top-0 h-screen flex items-center justify-center w-full">
          <div 
            className="text-center transition-all duration-1000"
            style={{
              opacity: Math.min(Math.max(scrollProgress - 0.5, 0) * 3, 1),
              transform: `scale(${0.5 + Math.min(Math.max(scrollProgress - 0.5, 0) * 1.5, 1)}) rotateX(${Math.max(45 - scrollProgress * 90, 0)}deg)`,
            }}
          >
            <h2 className="text-8xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-8 animate-pulse">
              Mind = Blown 🤯
            </h2>
            <p className="text-3xl text-gray-700 max-w-3xl leading-relaxed">
              This entire presentation is a fully interactive web application built with{' '}
              <span className="text-blue-600 font-bold">Next.js</span>,{' '}
              <span className="text-cyan-600 font-bold">React</span>, and{' '}
              <span className="text-purple-600 font-bold">Tailwind CSS</span>.
            </p>
            <div className="mt-12 space-y-4">
              <p className="text-xl text-purple-600 animate-bounce">
                🚀 Real components, real state, real magic!
              </p>
              <p className="text-lg text-gray-600">
                Scroll back up to experience it again! ↑
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Floating React logo with parallax */}
      <div 
        className="fixed top-8 right-8 text-6xl opacity-20 pointer-events-none transition-transform duration-300"
        style={{
          transform: `rotate(${scrollProgress * 360}deg) scale(${1 + scrollProgress * 0.5})`,
        }}
      >
        ⚛️
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-4 left-4 bg-white/80 backdrop-blur rounded-full px-4 py-2 text-sm text-gray-600">
        Scroll: {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  )
}
