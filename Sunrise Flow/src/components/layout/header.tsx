import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-2xl items-center justify-between">
        <div className="flex items-center gap-2">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M12 2a7 7 0 1 0 10 10" />
            <path d="M12 2A7 7 0 1 1 2 12" />
            <path d="M12 2v2" />
            <path d="M12 22v-2" />
            <path d="m22 12-2 0" />
            <path d="m4 12-2 0" />
            <path d="m19.78 4.22-1.42 1.42" />
            <path d="m5.64 18.36-1.42 1.42" />
            <path d="m19.78 19.78-1.42-1.42" />
            <path d="m5.64 5.64-1.42-1.42" />
          </svg>
          <h1 className="text-xl font-bold text-foreground">Sunrise Flow</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
