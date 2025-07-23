
'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { PlusCircle, Bell, MessageSquareWarning, Vibrate } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAlarms } from '@/hooks/use-alarms'
import { AlarmList } from '@/components/alarms/alarm-list'
import { SetAlarmDialog } from '@/components/alarms/set-alarm-dialog'
import { PuzzleModal } from '@/components/alarms/puzzle-modal'
import type { Alarm } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useDeviceShake } from '@/hooks/use-device-shake'

export default function AlarmsPage() {
  const {
    alarms,
    addAlarm,
    updateAlarm,
    deleteAlarm,
    toggleAlarm,
    activeAlarm,
    dismissAlarm,
  } = useAlarms()
  const [isClient, setIsClient] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null)
  const [notificationPermission, setNotificationPermission] = useState('default')
  const { toast } = useToast()

  const handleShake = useCallback(() => {
    if (activeAlarm && !activeAlarm.puzzle) {
      toast({ title: 'Shake detected!', description: 'Alarm dismissed.' })
      dismissAlarm(activeAlarm.id)
    }
  }, [activeAlarm, dismissAlarm, toast])
  
  const {
    requestPermission: requestShakePermission,
    permissionGranted: shakePermissionGranted,
  } = useDeviceShake(handleShake)

  useEffect(() => {
    setIsClient(true)
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  const handleRequestNotificationPermission = () => {
    if (!('Notification' in window)) {
      toast({
        variant: 'destructive',
        title: 'Notifications not supported',
        description: 'Your browser does not support desktop notifications.',
      })
      return
    }

    Notification.requestPermission().then(permission => {
      setNotificationPermission(permission)
      if (permission === 'denied') {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: 'Alarm notifications won’t work.',
        })
      } else if (permission === 'granted') {
        toast({
          title: 'Permission Granted',
          description: 'You will now receive alarm notifications.',
        })
      }
    })
  }

  const handleAddNew = () => {
    setEditingAlarm(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (alarm: Alarm) => {
    setEditingAlarm(alarm)
    setIsDialogOpen(true)
  }

  const handleSave = (alarm: Omit<Alarm, 'id' | 'enabled'>) => {
    if (editingAlarm) {
      updateAlarm(editingAlarm.id, alarm)
    } else {
      addAlarm(alarm)
    }
    setIsDialogOpen(false)
    setEditingAlarm(null)
  }

  const handleDelete = (id: string) => {
    deleteAlarm(id)
  }

  const handleToggle = (id: string) => {
    toggleAlarm(id)
  }

  const handlePuzzleSolved = useCallback(() => {
    if (activeAlarm) {
      dismissAlarm(activeAlarm.id)
    }
  }, [activeAlarm, dismissAlarm])

  if (!isClient) {
    return null // or a loading skeleton
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="text-primary" />
              My Alarms
            </div>
            <Button size="icon" variant="ghost" onClick={handleAddNew}>
              <PlusCircle />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notificationPermission !== 'granted' && (
            <div className="mb-4 flex items-center gap-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
              <MessageSquareWarning className="h-6 w-6" />
              <div className="flex-1">
                <p className="font-bold">Notifications are disabled.</p>
                <p className="text-sm">
                  To get alarm sounds and alerts, please grant notification
                  permissions.
                </p>
              </div>
              <Button onClick={handleRequestNotificationPermission} size="sm">
                Grant
              </Button>
            </div>
          )}
          {!shakePermissionGranted && (
             <div className="mb-4 flex items-center gap-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
             <Vibrate className="h-6 w-6" />
             <div className="flex-1">
               <p className="font-bold">Shake to dismiss is disabled.</p>
               <p className="text-sm">
                 Enable motion sensor access to dismiss alarms by shaking your device.
               </p>
             </div>
             <Button onClick={requestShakePermission} size="sm">
               Enable
             </Button>
           </div>
          )}

          <AlarmList
            alarms={alarms}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </CardContent>
      </Card>
      <SetAlarmDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        alarm={editingAlarm}
      />
      {activeAlarm && (
        <PuzzleModal
          isOpen={!!activeAlarm}
          onSolve={handlePuzzleSolved}
          alarm={activeAlarm}
        />
      )}
    </div>
  )
}
