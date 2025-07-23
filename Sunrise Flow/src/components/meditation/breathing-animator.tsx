'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wind, BellOff } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const breathCycle = [
  { text: 'Breathe In', duration: 4000, className: 'scale-150' },
  { text: 'Hold', duration: 7000, className: 'scale-150' },
  { text: 'Breathe Out', duration: 8000, className: 'scale-100' },
]

export function BreathingAnimator() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [cycleStep, setCycleStep] = useState(0)

  useEffect(() => {
    if (!isAnimating) return

    const interval = setTimeout(() => {
      setCycleStep(prev => (prev + 1) % breathCycle.length)
    }, breathCycle[cycleStep].duration)

    return () => clearTimeout(interval)
  }, [isAnimating, cycleStep])

  const handleToggle = () => {
    setIsAnimating(!isAnimating)
    if (isAnimating) {
        setCycleStep(0)
    }
  }

  const currentPhase = breathCycle[cycleStep]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="text-primary" />
          Guided Breathing
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-8 pt-8 min-h-[400px]">
        <AnimatePresence>
            {isAnimating && (
                 <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 10 }}
                 transition={{ duration: 0.5 }}
                 className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground"
               >
                 <BellOff className="h-4 w-4" />
                 For best results, enable Do Not Disturb mode.
               </motion.div>
            )}
        </AnimatePresence>
        <div className="relative flex h-64 w-64 items-center justify-center">
          {isAnimating &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full w-full rounded-full bg-primary/20 animate-pulse"
                style={{
                  animationDelay: `${i * 1}s`,
                  animationDuration: '3s',
                }}
              />
            ))}
          <div
            className={`absolute h-48 w-48 rounded-full bg-primary/30 transition-transform duration-[3000ms] ease-in-out ${
              isAnimating ? currentPhase.className : 'scale-100'
            }`}
          />
           <div
            className={`absolute h-32 w-32 rounded-full bg-primary/40 transition-transform duration-[3000ms] ease-in-out ${
              isAnimating ? currentPhase.className : 'scale-100'
            }`}
          />
          <div className="z-10 text-center">
            <p className="text-2xl font-bold">
              {isAnimating ? currentPhase.text : 'Ready?'}
            </p>
            {isAnimating && (
                 <p className="text-muted-foreground">{currentPhase.duration/1000}s</p>
            )}
          </div>
        </div>
        <Button onClick={handleToggle} className="w-32">
          {isAnimating ? 'Stop' : 'Start'}
        </Button>
      </CardContent>
    </Card>
  )
}
