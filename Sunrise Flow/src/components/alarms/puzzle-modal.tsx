import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Alarm } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import { Lightbulb } from 'lucide-react'

interface PuzzleModalProps {
  isOpen: boolean
  onSolve: () => void
  alarm: Alarm | null
}

export function PuzzleModal({ isOpen, onSolve, alarm }: PuzzleModalProps) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [answer, setAnswer] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setNum1(Math.floor(Math.random() * 10) + 1)
      setNum2(Math.floor(Math.random() * 20) + 1)
      setAnswer('')
    }
  }, [isOpen])
  
  if (!alarm) return null

  const handleSubmit = () => {
    if (parseInt(answer, 10) === num1 + num2) {
      toast({ title: 'Correct!', description: 'Alarm dismissed.' })
      onSolve()
    } else {
      toast({
        variant: 'destructive',
        title: 'Incorrect',
        description: 'Try again!',
      })
      setAnswer('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onSolve()}>
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {alarm.label}
          </DialogTitle>
          <DialogDescription className="text-center text-5xl font-bold text-foreground">
            {alarm.time}
          </DialogDescription>
        </DialogHeader>
        {alarm.puzzle ? (
          <>
            <div className="grid gap-4 py-4">
              <p className="text-center text-lg">
                Solve the puzzle to dismiss the alarm:
              </p>
              <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                <span>{num1}</span>
                <span>+</span>
                <span>{num2}</span>
                <span>=</span>
                <span>?</span>
              </div>
              <div className="mx-auto w-1/2">
                <Label htmlFor="answer" className="sr-only">
                  Answer
                </Label>
                <Input
                  id="answer"
                  type="number"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  className="text-center text-xl"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} className="w-full">
                Dismiss Alarm
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-4 py-4 text-center">
             <div className="flex justify-center items-center gap-2 text-muted-foreground">
                <Lightbulb className="h-4 w-4" />
                <span>Shake your device to dismiss.</span>
             </div>
            <Button onClick={onSolve} className="w-full">
              Dismiss
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
