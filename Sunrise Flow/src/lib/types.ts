export interface Alarm {
  id: string
  time: string // "HH:mm"
  repeat: string[] // e.g., ['Mon', 'Wed']
  label: string
  enabled: boolean
  puzzle: boolean
  ringtone?: string
}

export interface MeditationTrack {
  id: string
  title: string
  category: 'Sleep' | 'Calm' | 'Focus' | 'Breath'
  src: string
  duration: number // in seconds
  author?: string
}

export type Priority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: string // ISO string
  priority: Priority
}
