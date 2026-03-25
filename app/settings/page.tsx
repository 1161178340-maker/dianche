import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header-auth"
import { ThemeProvider } from "@/components/theme-provider"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Settings</h1>
          <p className="text-lg text-muted-foreground">管理您的账户设置</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>账户信息</CardTitle>
            <CardDescription>更新您的个人资料和联系信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">姓名</Label>
              <Input id="name" defaultValue="张三" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" defaultValue="zhangsan@example.com" />
            </div>
            <Button>保存更改</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>密码</CardTitle>
            <CardDescription>更改您的账户密码</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">当前密码</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">新密码</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">确认新密码</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button>更改密码</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
