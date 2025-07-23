'use server'

import { generateMeditationPlaylist } from '@/ai/flows/meditation-playlist'
import { meditationTracks } from '@/lib/data'

export async function getAiPlaylist(categories: string[]) {
  try {
    if (!categories.length) {
      return { playlist: '' }
    }
    const trackListString = meditationTracks.map(t => t.title).join(', ')

    const result = await generateMeditationPlaylist({
      meditationCategories: categories.join(', '),
      trackList: trackListString,
    })

    return result
  } catch (error) {
    console.error('Error generating AI playlist:', error)
    return { playlist: '' }
  }
}
