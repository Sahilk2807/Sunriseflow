'use client'

import React, { useState } from 'react'
import { useTasks } from '@/hooks/use-tasks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ListTodo, Trash2 } from 'lucide-react'
import { TaskList } from '@/components/planner/task-list'
import { AddTaskForm } from '@/components/planner/add-task-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Task, Priority } from '@/lib/types'

export default function PlannerPage() {
  const {
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  } = useTasks()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleEdit = (task: Task) => {
    setEditingTask(task)
  }

  const handleSave = (text: string, priority: Priority) => {
    if (editingTask) {
      updateTask(editingTask.id, text, priority)
      setEditingTask(null)
    } else {
      addTask(text, priority)
    }
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="text-primary" />
              My Planner
            </div>
            {completedCount > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Completed
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {completedCount} completed
                      task(s).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearCompleted}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AddTaskForm
            onSave={handleSave}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>
    </div>
  )
}
