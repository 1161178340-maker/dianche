import type React from "react"
import { Header } from "@/components/header-auth"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Dashboard</h1>
          <p className="text-lg text-muted-foreground">欢迎回来！这是您的仪表板。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Total Projects", value: "24", icon: "📁" },
            { title: "Active Users", value: "156", icon: "👥" },
            { title: "Revenue", value: "$4,250", icon: "💰" },
          ].map((stat, index) => (
            <div key={index} className="bg-card p-6 rounded-xl border border-border/50">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border/50 p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "Created new project", time: "2 hours ago" },
              { action: "Updated settings", time: "4 hours ago" },
              { action: "Viewed analytics", time: "5 hours ago" },
              { action: "Exported report", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <span className="text-foreground">{activity.action}</span>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
