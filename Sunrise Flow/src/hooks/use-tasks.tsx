'use client'

import { useState, useEffect } from 'react'
import type { Task, Priority } from '@/lib/types'
import { useToast } from './use-toast'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('tasks')
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (text: string, priority: Priority) => {
    if (!text.trim()) return
    const newTask: Task = {
      id: new Date().toISOString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
    }
    setTasks(prev => [newTask, ...prev])
    toast({ title: 'Task Added' })
  }

  const updateTask = (id: string, text: string, priority: Priority) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, text, priority } : task))
    )
    toast({ title: 'Task Updated' })
  }

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
    toast({ variant: 'destructive', title: 'Task Deleted' })
  }

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed))
    toast({ title: 'Completed tasks cleared' })
  }

  return { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted }
}
