'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Info, ChevronRight, Shield, Settings as SettingsIcon, Palette } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

const settingsItems = [
  {
    href: '/about',
    label: 'About Us',
    icon: Info,
  },
  {
    href: '/privacy',
    label: 'Privacy Policy',
    icon: Shield,
  },
]

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="text-primary" />
            Settings
          </CardTitle>
          <CardDescription>
            Manage your application settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {settingsItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lg bg-muted p-4 transition-colors hover:bg-muted/80"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </li>
            ))}
             <li>
                <div
                  className="flex items-center justify-between rounded-lg bg-muted p-4"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="h-5 w-5 text-primary" />
                    <span className="font-medium">Theme</span>
                  </div>
                  <ThemeToggle />
                </div>
              </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
