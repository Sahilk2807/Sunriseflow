'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Save } from 'lucide-react'
import { Task, Priority } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AddTaskFormProps {
  onSave: (text: string, priority: Priority) => void
  editingTask: Task | null
  onCancelEdit: () => void
}

const priorities: Priority[] = ['Low', 'Medium', 'High']

export function AddTaskForm({
  onSave,
  editingTask,
  onCancelEdit,
}: AddTaskFormProps) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('Medium')

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text)
      setPriority(editingTask.priority)
    } else {
      // Reset form only when not editing
      setText('')
      setPriority('Medium')
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSave(text, priority)
    // Clear form only if we are not in edit mode.
    // In edit mode, onSave will trigger onCancelEdit, which clears the form.
    if (!editingTask) {
        setText('')
        setPriority('Medium')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-start gap-2">
      <div className="flex-1 space-y-2">
        <Input
          type="text"
          placeholder={editingTask ? 'Update your task...' : 'Add a new task...'}
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1"
        />
         <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
            <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Set priority" />
            </SelectTrigger>
            <SelectContent>
                {priorities.map((p) => (
                    <SelectItem key={p} value={p} className="text-xs">{p} Priority</SelectItem>
                ))}
            </SelectContent>
         </Select>
      </div>
      {editingTask ? (
        <div className="flex gap-2">
          <Button type="submit" size="icon" aria-label="Save task">
            <Save />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onCancelEdit}
            aria-label="Cancel edit"
          >
            X
          </Button>
        </div>
      ) : (
        <Button type="submit" size="icon" aria-label="Add task">
          <Plus />
        </Button>
      )}
    </form>
  )
}
