'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500); // Simulate loading time
    return () => clearTimeout(timer);
  }, [])


  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[101] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
          isLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
      >
        <div className="flex animate-pulse items-center gap-2">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary"
          >
            <path d="M12 2a7 7 0 1 0 10 10" />
            <path d="M12 2A7 7 0 1 1 2 12" />
            <path d="M12 2v2" />
            <path d="M12 22v-2" />
            <path d="m22 12-2 0" />
            <path d="m4 12-2 0" />
            <path d="m19.78 4.22-1.42 1.42" />
            <path d="m5.64 18.36-1.42 1.42" />
            <path d="m19.78 19.78-1.42-1.42" />
            <path d="m5.64 5.64-1.42-1.42" />
          </svg>
          <h1 className="text-3xl font-bold text-foreground">Sunrise Flow</h1>
        </div>
        <p className="mt-2 text-muted-foreground">Your morning companion.</p>
      </div>
      {isLoaded && (
        <div className="transition-opacity duration-300 opacity-100">
            {children}
        </div>
      )}
    </>
  )
}
