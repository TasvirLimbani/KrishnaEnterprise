import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import MainNav from "@/components/main-nav"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Krishna Enterprise</span>
        </Link>

        <MainNav />

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Admin</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

