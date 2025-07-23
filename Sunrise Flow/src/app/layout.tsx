import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Toaster } from '@/components/ui/toaster'
import { SplashScreen } from '@/components/layout/splash-screen'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sunrise Flow',
  description: 'All-in-one Alarm, Planner & Meditation App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head />
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SplashScreen>
              <div className="relative flex min-h-dvh flex-col bg-background">
                <Header />
                <main className="flex-1 pb-24 pt-16">{children}</main>
                <BottomNav />
                <Toaster />
              </div>
            </SplashScreen>
        </ThemeProvider>
      </body>
    </html>
  )
}
