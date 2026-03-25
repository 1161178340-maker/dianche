import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header-auth"
import { ThemeProvider } from "@/components/theme-provider"

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">账单与订阅</h1>
          <p className="text-lg text-muted-foreground">管理您的支付信息和订阅计划</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>当前计划</CardTitle>
            <CardDescription>您当前的订阅状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg mb-4">
              <div>
                <div className="text-lg font-semibold">专业版</div>
                <div className="text-sm text-muted-foreground">每月 $20</div>
              </div>
              <div className="text-green-600 font-medium">✓ 已激活</div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>订阅周期：每月 1 日自动续费</p>
              <p>下次续费：2026年4月1日</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>支付信息</CardTitle>
            <CardDescription>管理您的支付方式</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-border/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-sm text-muted-foreground">到期: 12/2025</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">编辑</Button>
              </div>
            </div>
            <Button className="w-full">添加新支付方式</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
