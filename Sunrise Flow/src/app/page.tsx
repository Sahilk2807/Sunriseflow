'use client'

import React, { useState, useTransition } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { getAiPlaylist } from './actions'
import { meditationTracks } from '@/lib/data'
import type { MeditationTrack } from '@/lib/types'
import { Loader2, Music4, Play, Sparkles } from 'lucide-react'
import { BreathingAnimator } from '@/components/meditation/breathing-animator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const meditationCategories: MeditationTrack['category'][] = [
  'Sleep',
  'Calm',
  'Focus',
  'Breath',
]

export default function MeditationPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [playlist, setPlaylist] = useState<MeditationTrack[]>([])
  const [currentTrack, setCurrentTrack] = useState<MeditationTrack | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleCheckboxChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    )
  }

  const handleGeneratePlaylist = () => {
    startTransition(async () => {
      const result = await getAiPlaylist(selectedCategories)
      if (result.playlist) {
        const playlistTitles = result.playlist.split(',').map(t => t.trim())
        const newPlaylist = meditationTracks.filter(track =>
          playlistTitles.includes(track.title)
        )
        setPlaylist(newPlaylist)
      } else {
        setPlaylist([])
      }
    })
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Tabs defaultValue="playlist" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="playlist">AI Playlist</TabsTrigger>
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
        </TabsList>
        <TabsContent value="playlist">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                Personalized Meditation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-lg font-semibold text-foreground">
                  What's on your mind?
                </Label>
                <p className="text-muted-foreground">
                  Select categories to generate a personalized playlist.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {meditationCategories.map(category => (
                    <div
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={category}
                        onCheckedChange={checked =>
                          handleCheckboxChange(category, !!checked)
                        }
                      />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                onClick={handleGeneratePlaylist}
                disabled={isPending || selectedCategories.length === 0}
                className="w-full"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Playlist
              </Button>

              {playlist.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Your Custom Playlist</h3>
                  <ul className="space-y-2">
                    {playlist.map(track => (
                      <li
                        key={track.id}
                        className="flex items-center justify-between rounded-lg bg-muted p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Music4 className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{track.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {track.category} - {Math.floor(track.duration / 60)} min
                              {track.author && ` - by ${track.author}`}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setCurrentTrack(track)}
                        >
                          <Play className="h-5 w-5" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentTrack && (
                <div className="mt-6 rounded-lg border bg-card p-4">
                  <h4 className="font-semibold">Now Playing</h4>
                  <p className="text-lg text-primary">{currentTrack.title}</p>
                  {currentTrack.author && (
                    <p className="text-sm text-muted-foreground">
                      by {currentTrack.author}
                    </p>
                  )}
                  <audio
                    controls
                    autoPlay
                    src={currentTrack.src}
                    className="mt-2 w-full"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="breathing">
          <BreathingAnimator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
