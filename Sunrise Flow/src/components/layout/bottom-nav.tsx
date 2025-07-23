'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AlarmClock, HeartPulse, ListTodo, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Meditate', icon: HeartPulse },
  { href: '/alarms', label: 'Alarms', icon: AlarmClock },
  { href: '/planner', label: 'Planner', icon: ListTodo },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-sm">
      <nav className="container mx-auto grid h-20 max-w-2xl grid-cols-4">
        {navItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </footer>
  )
}
