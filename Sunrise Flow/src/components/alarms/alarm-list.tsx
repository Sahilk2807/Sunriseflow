import type { Alarm } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Trash2, Edit, Puzzle, Music } from 'lucide-react'
import { ringtones } from '@/lib/data'

interface AlarmListProps {
  alarms: Alarm[]
  onEdit: (alarm: Alarm) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

export function AlarmList({
  alarms,
  onEdit,
  onDelete,
  onToggle,
}: AlarmListProps) {
  if (alarms.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        <p>No alarms set.</p>
        <p className="text-sm">Tap the '+' icon to add a new alarm.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {alarms.map(alarm => {
        const ringtoneName = ringtones.find(r => r.path === alarm.ringtone)?.name || 'Default'
        return (
            <li
            key={alarm.id}
            className="flex items-center gap-4 rounded-lg bg-muted p-4 transition-colors"
            >
            <div className="flex-1">
                <p className="text-2xl font-bold text-foreground">{alarm.time}</p>
                <p className="text-sm text-muted-foreground">{alarm.label}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-medium">
                    {alarm.repeat.length === 7 ? 'Every day' : 
                    alarm.repeat.length === 0 ? 'Once' :
                    alarm.repeat.map(day => day.slice(0,3)).join(', ')
                    }
                    </span>
                    {alarm.puzzle && <div className="flex items-center gap-1"><Puzzle className="h-3 w-3 text-primary" /><span>Puzzle</span></div>}
                    <div className="flex items-center gap-1"><Music className="h-3 w-3 text-primary" /><span>{ringtoneName}</span></div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Switch
                checked={alarm.enabled}
                onCheckedChange={() => onToggle(alarm.id)}
                />
                <Button size="icon" variant="ghost" onClick={() => onEdit(alarm)}>
                <Edit className="h-4 w-4" />
                </Button>
                <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => onDelete(alarm.id)}
                >
                <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            </li>
        )
      })}
    </ul>
  )
}
