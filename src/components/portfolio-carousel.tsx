"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { portfolioItems } from "@/data/demo"

export default function PortfolioCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance the carousel
  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next item when progress reaches 100%
          setActiveIndex((prevIndex) => (prevIndex + 1) % portfolioItems.length)
          return 0
        }
        return prev + 0.5 // Increment progress
      })
    }, 50)

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  // Manual navigation
  const goToItem = (index: number) => {
    setActiveIndex(index)
    setProgress(0)
  }

  return (
    <div className="relative w-full max-w-xl mx-auto h-[620px] flex items-center justify-center">
      {/* Work Cards */}
      <div className="relative w-full h-[400px]">
        {portfolioItems.map((item, index) => {
          const isActive = index === activeIndex
          const position = index - activeIndex

          // Calculate the position and rotation for stacked cards
          let zIndex = 30 - Math.abs(position) * 10
          let translateX = 0
          let translateY = 0
          let rotate = 0
          let scale = 1

          if (position > 0) {
            // Cards to the right
            translateX = 20 + position * 10
            translateY = -10 * position
            rotate = 5 * position
            scale = 1 - 0.05 * position
            zIndex = 20 - position
          } else if (position < 0) {
            // Cards to the left
            translateX = -20 + position * 10
            translateY = -10 * Math.abs(position)
            rotate = 5 * position
            scale = 1 - 0.05 * Math.abs(position)
            zIndex = 20 - Math.abs(position)
          }

          return (
            <div
              key={`work-${index}`}
              className={cn(
                "absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-lg transition-all duration-500",
                item.work.color,
                isActive ? "opacity-100" : "opacity-70",
              )}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.work.image || "/placeholder.svg"}
                  alt={item.work.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Person Card */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:translate-0 md:-left-30 z-40 mb-8">
        <div className="bg-white rounded-xl shadow-xl p-4 w-[250px] border border-zinc-200">
          <div className="relative flex flex-col items-center gap-4">
            {portfolioItems[activeIndex].person.isPro && (
              <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-2 py-1 rounded">PRO</div>
            )}
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={portfolioItems[activeIndex].person.image || "/placeholder.svg"}
                alt={portfolioItems[activeIndex].person.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{portfolioItems[activeIndex].person.name}</h3>
              <p className="text-gray-600 text-center">{portfolioItems[activeIndex].person.title}</p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="mt-4 flex items-center w-fit mx-auto gap-2">
            {portfolioItems.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => goToItem(index)}
                className="relative h-2 rounded-full bg-gray-200 overflow-hidden"
                style={{ width: index === activeIndex ? "60px" : "12px" }}
              >
                {index === activeIndex && (
                  <div
                    className="absolute top-0 left-0 h-full bg-black rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
