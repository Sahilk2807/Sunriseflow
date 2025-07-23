'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import type { Alarm } from '@/lib/types'
import { useToast } from './use-toast'
import { Button } from '@/components/ui/button'

export function useAlarms() {
  const [alarms, setAlarms] = useState<Alarm[]>([])
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null)
  const { toast } = useToast()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedAlarms = localStorage.getItem('alarms')
        if (storedAlarms) {
          setAlarms(JSON.parse(storedAlarms))
        }
      } catch (error) {
        console.error("Failed to parse alarms from localStorage", error);
        setAlarms([])
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('alarms', JSON.stringify(alarms))
    }
  }, [alarms])

  const playAlarmSound = useCallback((alarm: Alarm) => {
    if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null;
    }
    if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current)
    }

    const audioSrc = alarm.ringtone || '/audio/alarm-default.mp3'
    audioRef.current = new Audio(audioSrc)
    audioRef.current.loop = true
    
    audioRef.current.volume = 0.1
    audioRef.current.play().catch(e => console.error("Audio play failed:", e))

    volumeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < 1) {
        audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.1)
      } else if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current)
      }
    }, 2000)
    
  }, [])

  const stopAlarmSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null;
    }
    if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current)
        volumeIntervalRef.current = null
    }
  }, [])

  const dismissAlarm = useCallback((id?: string) => {
      stopAlarmSound()
      const alarmToDismiss = id ? alarms.find(a => a.id === id) : activeAlarm;

      if (alarmToDismiss) {
         if (alarmToDismiss.repeat.length === 0) {
            setAlarms(prevAlarms => prevAlarms.map(a => a.id === alarmToDismiss.id ? {...a, enabled: false} : a))
         }
         // Clear the last triggered date for this alarm so it can ring again tomorrow if it's a repeating alarm
         localStorage.removeItem(`alarm_triggered_${alarmToDismiss.id}`);
      }
      
      setActiveAlarm(null)

  }, [stopAlarmSound, alarms, activeAlarm])


  const triggerAlarm = useCallback(
    (alarm: Alarm) => {
      setActiveAlarm(alarm);
      playAlarmSound(alarm);

      if (!alarm.puzzle) {
        toast({
          title: alarm.label,
          description: `It's ${alarm.time}! Shake to dismiss.`,
          duration: 30000 
       })
      }

      if (Notification.permission === 'granted') {
        new Notification(alarm.label || 'Alarm', {
          body: `It's ${alarm.time}!`,
          requireInteraction: true,
        })
      }
    },
    [toast, playAlarmSound]
  )
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeAlarm) return;

      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' })

      for (const alarm of alarms) {
        if (alarm.enabled && alarm.time === currentTime) {
           const lastTriggeredKey = `alarm_triggered_${alarm.id}`;
           const lastTriggeredDate = localStorage.getItem(lastTriggeredKey);
           const todayStr = now.toDateString();

          if (lastTriggeredDate !== todayStr) {
             const isRepeating = alarm.repeat.length > 0
             if (!isRepeating || alarm.repeat.includes(currentDay)) {
                localStorage.setItem(lastTriggeredKey, todayStr);
                triggerAlarm(alarm);
                break; 
             }
          }
        }
      }
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [alarms, activeAlarm, triggerAlarm])

  const addAlarm = (newAlarmData: Omit<Alarm, 'id' | 'enabled'>) => {
    const newAlarm: Alarm = {
      ...newAlarmData,
      id: new Date().toISOString(),
      enabled: true,
    }
    setAlarms(prev => [...prev, newAlarm])
    toast({ title: 'Alarm Added', description: `Alarm set for ${newAlarm.time}.` })
  }

  const updateAlarm = (id: string, updatedData: Omit<Alarm, 'id' | 'enabled'>) => {
    setAlarms(prev =>
      prev.map(alarm => (alarm.id === id ? { ...alarm, ...updatedData, enabled: alarm.enabled } : alarm))
    )
    toast({ title: 'Alarm Updated'})
  }

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(alarm => alarm.id !== id))
    toast({ variant: 'destructive', title: 'Alarm Deleted' })
  }

  const toggleAlarm = (id: string) => {
    setAlarms(prev =>
      prev.map(alarm =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    )
  }

  return {
    alarms,
    addAlarm,
    updateAlarm,
    deleteAlarm,
    toggleAlarm,
    activeAlarm,
    dismissAlarm
  }
}
