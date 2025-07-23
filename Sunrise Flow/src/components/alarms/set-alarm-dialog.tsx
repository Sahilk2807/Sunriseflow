import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { Alarm } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ringtones } from '@/lib/data'

interface SetAlarmDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSave: (alarm: Omit<Alarm, 'id' | 'enabled'>) => void
  alarm: Alarm | null
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function SetAlarmDialog({
  isOpen,
  onOpenChange,
  onSave,
  alarm,
}: SetAlarmDialogProps) {
  const [time, setTime] = useState('07:00')
  const [label, setLabel] = useState('Wake Up')
  const [repeat, setRepeat] = useState<string[]>([])
  const [puzzle, setPuzzle] = useState(false)
  const [ringtone, setRingtone] = useState(ringtones[0].path)

  useEffect(() => {
    if (alarm) {
      setTime(alarm.time)
      setLabel(alarm.label)
      setRepeat(alarm.repeat)
      setPuzzle(alarm.puzzle)
      setRingtone(alarm.ringtone || ringtones[0].path)
    } else {
      // Reset to default for new alarm
      setTime('07:00')
      setLabel('Wake Up')
      setRepeat([])
      setPuzzle(false)
      setRingtone(ringtones[0].path)
    }
  }, [alarm, isOpen])

  const handleSave = () => {
    onSave({ time, label, repeat, puzzle, ringtone })
  }

  const toggleDay = (day: string) => {
    setRepeat(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{alarm ? 'Edit Alarm' : 'Add Alarm'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input
              id="label"
              value={label}
              onChange={e => setLabel(e.target.value)}
              className="col-span-3"
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
             <Label htmlFor="ringtone" className="text-right">
                Ringtone
             </Label>
             <Select value={ringtone} onValueChange={setRingtone}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a ringtone" />
                </SelectTrigger>
                <SelectContent>
                    {ringtones.map((r) => (
                        <SelectItem key={r.path} value={r.path}>{r.name}</SelectItem>
                    ))}
                </SelectContent>
             </Select>
           </div>
          <div>
            <Label className="mb-2 block text-center">Repeat</Label>
            <div className="flex justify-center gap-1">
              {weekDays.map(day => (
                <Button
                  key={day}
                  variant={repeat.includes(day) ? 'default' : 'outline'}
                  size="icon"
                  className={cn(
                    'h-9 w-9 rounded-full',
                    repeat.includes(day)
                      ? 'bg-primary text-primary-foreground'
                      : ''
                  )}
                  onClick={() => toggleDay(day)}
                >
                  {day.charAt(0)}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <Label htmlFor="puzzle-mode" className="flex flex-col space-y-1">
              <span>Puzzle Dismissal</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Solve a math puzzle to turn off the alarm.
              </span>
            </Label>
            <Switch
              id="puzzle-mode"
              checked={puzzle}
              onCheckedChange={setPuzzle}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
