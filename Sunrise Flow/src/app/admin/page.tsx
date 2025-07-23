
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Upload } from 'lucide-react'

const meditationCategories = ['Sleep', 'Calm', 'Focus', 'Breath']

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleLogin = () => {
    // In a real app, this would be a secure authentication call.
    if (password === 'z7n49c0Mvq1zC45x') {
      setIsAuthenticated(true)
      toast({ title: 'Authentication successful.' })
    } else {
      toast({ variant: 'destructive', title: 'Incorrect password.' })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!title || !category || !file) {
      toast({
        variant: 'destructive',
        title: 'Please fill all required fields and select a file.',
      })
      return
    }
    setIsUploading(true)

    // Firebase upload logic will go here.
    // For now, we'll simulate an upload.
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: 'Upload Successful!',
        description: `${file.name} has been added to the ${category} category.`,
      })
      setTitle('')
      setAuthor('')
      setCategory('')
      setFile(null)
    }, 2000)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-[80dvh] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
           <CardDescription>
            Enter the password to access the admin panel.
           </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </CardContent>
      </Card>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Add New Meditation Track
        </CardTitle>
        <CardDescription>
            Upload new audio files to be used in the meditation section of the app.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Track Title</Label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., 'Peaceful Garden'"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author (Optional)</Label>
          <Input
            id="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="e.g., 'Nature Sounds'"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {meditationCategories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="audio-file">Audio File</Label>
          <Input
            id="audio-file"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <Button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            'Uploading...'
          ) : (
            <>
              <Upload className="mr-2" />
              Upload Track
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
