'use client'

import { useState, useEffect, useCallback } from 'react'

const SHAKE_THRESHOLD = 15 // m/s^2

export function useDeviceShake(onShake: () => void) {
  const [permissionGranted, setPermissionGranted] = useState(false)

  const requestPermission = useCallback(async () => {
    if (
      typeof (DeviceMotionEvent as any).requestPermission === 'function'
    ) {
      try {
        const permissionState = await (DeviceMotionEvent as any).requestPermission()
        if (permissionState === 'granted') {
          setPermissionGranted(true)
        }
      } catch (error) {
        console.error('Shake detection permission request failed', error)
      }
    } else {
      // For browsers that don't require permission
      setPermissionGranted(true)
    }
  }, [])

  useEffect(() => {
    if (!permissionGranted) return

    let lastX: number | null = null
    let lastY: number | null = null
    let lastZ: number | null = null
    let lastTime = new Date().getTime()

    const handleMotionEvent = (event: DeviceMotionEvent) => {
      const { acceleration } = event
      if (!acceleration) return

      const currentTime = new Date().getTime()
      if ((currentTime - lastTime) > 100) {
        const diffTime = currentTime - lastTime
        lastTime = currentTime

        const { x, y, z } = acceleration
        if (lastX !== null && lastY !== null && lastZ !== null && x !== null && y !== null && z !== null) {
            const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
            
            if (speed > SHAKE_THRESHOLD) {
                onShake();
            }
        }
        
        lastX = x
        lastY = y
        lastZ = z
      }
    }

    window.addEventListener('devicemotion', handleMotionEvent)
    return () => {
      window.removeEventListener('devicemotion', handleMotionEvent)
    }
  }, [permissionGranted, onShake])

  return { requestPermission, permissionGranted }
}
