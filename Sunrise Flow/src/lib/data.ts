import type { MeditationTrack } from './types'

export const meditationTracks: MeditationTrack[] = [
  { id: '1', title: 'Gentle Sleep Flow', category: 'Sleep', src: '/audio/meditation.mp3', duration: 300, author: 'Sunrise Flow' },
  { id: '2', title: 'Deep Rest', category: 'Sleep', src: '/audio/meditation.mp3', duration: 600 },
  { id: '3', title: 'Calming Waves', category: 'Calm', src: '/audio/meditation.mp3', duration: 240, author: 'Nature Sounds' },
  { id: '4', title: 'Peaceful Mind', category: 'Calm', src: '/audio/meditation.mp3', duration: 480 },
  { id: '5', title: 'Laser Focus', category: 'Focus', src: '/audio/meditation.mp3', duration: 180, author: 'Sunrise Flow' },
  { id: '6', title: 'Productivity Boost', category: 'Focus', src: '/audio/meditation.mp3', duration: 540 },
  { id: '7', title: '4-7-8 Breathing', category: 'Breath', src: '/audio/meditation.mp3', duration: 120 },
  { id: '8', title: 'Box Breathing', category: 'Breath', src: '/audio/meditation.mp3', duration: 300, author: 'Dr. Weil' },
];

export const ringtones = [
    { name: 'Default', path: '/audio/alarm-default.mp3' },
    { name: 'Gentle', path: '/audio/alarm-gentle.mp3' },
]
