"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Zap, User, LogOut, Settings, CreditCard } from "lucide-react"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <header className="w-full border-b border-[#37322f]/6 bg-[#f7f5f3]">
        <div className="max-w-[1060px] mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="text-[#37322f] font-semibold text-lg">Brillance</div>
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="w-full border-b border-[#37322f]/6 bg-[#f7f5f3]">
      <div className="max-w-[1060px] mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div 
              className="text-[#37322f] font-semibold text-lg cursor-pointer flex items-center gap-2"
              onClick={() => router.push("/")}
            >
              <Zap className="w-5 h-5" />
              Brillance
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                className="text-[#37322f] hover:text-[#37322f]/80 text-sm font-medium"
                onClick={() => router.push("/")}
              >
                Products
              </button>
              <button 
                className="text-[#37322f] hover:text-[#37322f]/80 text-sm font-medium"
                onClick={() => router.push("/pricing")}
              >
                Pricing
              </button>
              <button className="text-[#37322f] hover:text-[#37322f]/80 text-sm font-medium">Docs</button>
            </div>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email || ""} />
                    <AvatarFallback>{user.email?.[0].toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/billing")}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                className="text-[#37322f] hover:bg-[#37322f]/5"
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
              <Button 
                className="bg-[#37322f] hover:bg-[#37322f]/90 text-white"
                onClick={() => router.push("/register")}
              >
                Sign up
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
