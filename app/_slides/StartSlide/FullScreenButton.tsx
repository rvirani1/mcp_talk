import React from 'react'

export default function FullScreenButton() {
  const handleFullscreen = async () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !window.document) {
      return
    }

    const doc = window.document

    try {
      if (doc.fullscreenElement) {
        await doc.exitFullscreen()
      } else {
        await doc.documentElement.requestFullscreen()
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error toggling fullscreen:', error)
    }
  }

  return (
    <button 
      className="text-7xl font-bold hover:text-gray-600 transition-colors cursor-pointer" 
      onClick={handleFullscreen}
    >
      Full Screen Mode
    </button>
  )
} 
