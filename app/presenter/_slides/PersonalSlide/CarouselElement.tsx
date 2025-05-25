import React from 'react'

interface CarouselElementProps {
  title: string
  children: React.ReactNode
}

export default function CarouselElement({ title, children }: CarouselElementProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center w-full h-[54rem] flex flex-col">
      <h3 className="text-4xl font-bold text-slate-800 mb-12 leading-relaxed">
        {title}
      </h3>
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
} 
