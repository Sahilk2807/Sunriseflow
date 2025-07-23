
import type { Task, Priority } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2, Edit } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

const priorityOrder: Record<Priority, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
}

const priorityColors: Record<Priority, string> = {
    High: 'bg-red-500/80 border-red-500/80 text-white',
    Medium: 'bg-yellow-500/80 border-yellow-500/80 text-white',
    Low: 'bg-blue-500/80 border-blue-500/80 text-white',
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        <p>No tasks yet.</p>
        <p className="text-sm">Add a task to get started.</p>
      </div>
    )
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <ul className="space-y-3">
      {sortedTasks.map(task => (
        <li
          key={task.id}
          className="flex items-start gap-4 rounded-lg bg-muted p-4 transition-colors"
        >
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            aria-label={
              task.completed ? 'Mark task as incomplete' : 'Mark task as complete'
            }
            className="mt-1"
          />
          <div className="flex-1">
            <label
                htmlFor={`task-${task.id}`}
                className={cn(
                'cursor-pointer text-sm font-medium',
                task.completed && 'text-muted-foreground line-through'
                )}
            >
                {task.text}
            </label>
            <div className='mt-2'>
                 <Badge className={cn('text-xs', priorityColors[task.priority])}>{task.priority}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
